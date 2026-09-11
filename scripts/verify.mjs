#!/usr/bin/env node
/**
 * Repeatable accessibility, contrast, motion and weight check.
 *
 * Why this exists. The first audit pass measured by hand, in the editor's
 * preview pane, and three whole classes of defect were invisible there:
 *
 *   - `document.hasFocus()` is false in that pane, so `:focus-visible` never
 *     matches and a missing focus ring cannot be seen;
 *   - `requestAnimationFrame` never fires (verified: rafFired false while a
 *     setTimeout in the same tick ran), so anything gated on a frame looks
 *     broken or looks fine for the wrong reason;
 *   - `largest-contentful-paint` entries are not emitted at all.
 *
 * On top of that the hand-rolled checks only looked at the colour of *text*,
 * which is how `#e88` at 2.47:1 (the site's only error message), the Tailwind
 * greys on the theme toggle at 1.13:1 on hover, and `--c-border` at 1.11:1 as
 * a control boundary all survived a pass that was specifically about contrast.
 *
 * So this is deliberately not "run axe once". It is five checks that each cover
 * a hole a previous pass fell into, over every page in both themes and both
 * languages, with an exit code — so the next regression is caught by the
 * machine rather than by reading the diff.
 */

import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { chromium } from "@playwright/test";

const ROOT = process.cwd();
const AXE = path.join(ROOT, "node_modules/axe-core/axe.min.js");

const PAGES = [
  { path: "/", name: "главная" },
  { path: "/services", name: "/services" },
  { path: "/outbound", name: "/outbound" },
  { path: "/mentorship", name: "/mentorship" },
  { path: "/blog", name: "/blog" },
];
const THEMES = ["dark", "light"];
const LANGS = ["en", "ru"];

const failures = [];
const notes = [];
function fail(area, msg) { failures.push({ area, msg }); }

// ─────────────────────────────────────────────────────────────────────────────
// Colour maths. Shared by the token matrix and the non-text contrast check.
// ─────────────────────────────────────────────────────────────────────────────

function parseColor(c) {
  if (!c) return null;
  const hex = c.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = [...h].map((x) => x + x).join("");
    return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16), a: 1 };
  }
  const m = c.match(/[\d.]+/g);
  if (!m || m.length < 3) return null;
  return { r: +m[0], g: +m[1], b: +m[2], a: m[3] === undefined ? 1 : +m[3] };
}
const over = (f, b) => ({ r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a), b: f.b * f.a + b.b * (1 - f.a), a: 1 });
function luminance(c) {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
}
function contrast(a, b) {
  const l1 = luminance(a), l2 = luminance(b);
  return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100;
}

// ─────────────────────────────────────────────────────────────────────────────
// Check 1 — token contrast matrix. No browser needed.
//
// Every --c-* token that is used anywhere as a text colour, against every
// surface it can land on. This is the check that was missing: --c-muted was
// tuned against --c-bg and read 4.11:1 on a /services card, and --c-violet
// arrived later with 4.45:1 on --c-bg2, because nothing compared a token to
// anything but the page background.
// ─────────────────────────────────────────────────────────────────────────────

function readTokens() {
  const css = readFileSync(path.join(ROOT, "app/globals.css"), "utf8");
  const grab = (selector) => {
    const i = css.indexOf(selector);
    if (i < 0) return {};
    const block = css.slice(i, css.indexOf("\n}", i));
    const out = {};
    for (const m of block.matchAll(/--(c-[\w-]+):\s*([^;]+);/g)) out[m[1]] = m[2].trim();
    return out;
  };
  return { light: grab(":root {"), dark: grab(":root.dark {") };
}

/**
 * The surfaces this static check judges against: the four declared page and
 * card backgrounds. Deliberately NOT the composited ones — a gold-tinted
 * pricing card is a real surface, but only the gold badge sits on it, and
 * judging every text token against it produced six false failures on the first
 * run. Composites are the browser's job: axe measures the colour that actually
 * rendered, against the ancestor that actually painted. This matrix is the
 * cheap pre-flight over what the stylesheet declares.
 */
const SURFACES = ["c-bg", "c-bg2", "c-card", "c-card2"];

/**
 * Tokens that are text, but not text on a page surface — each is paired with
 * the fill it is designed to sit on. Without this, --c-on-gold is compared to
 * the page background and reports 1:1, which is true and meaningless.
 */
const PAIRED = { "c-on-gold": "c-gold" };

function checkTokenMatrix() {
  const tokens = readTokens();
  const css = readFileSync(path.join(ROOT, "app/globals.css"), "utf8");
  const src = collectSource();

  // Which tokens are used as a text colour?
  //
  // The property has to be exactly `color`, hence the lookbehind for a word
  // character or a dash. On the first run this regex also matched
  // `text-decoration-color` and `background-color`, which is how --c-gold-glow
  // — an underline tint at 1.32:1 — was reported as failing body text.
  const asText = new Set();
  const TEXT_COLOR = /(?<![\w-])color:\s*["'`]?var\(--(c-[\w-]+)\)/g;
  for (const m of src.matchAll(TEXT_COLOR)) asText.add(m[1]);
  for (const m of css.matchAll(TEXT_COLOR)) asText.add(m[1]);
  // The home page keeps its CSS in a template string and reaches tokens through
  // a `C` map, so `color:${C.goldDim}` has to be un-camel-cased back to a token.
  for (const m of src.matchAll(/(?<![\w-])color:\s*\$\{C\.(\w+)\}/g)) {
    asText.add("c-" + m[1].replace(/[A-Z]/g, (c) => "-" + c.toLowerCase()));
  }

  const rows = [];
  for (const theme of THEMES) {
    const t = tokens[theme];
    for (const token of [...asText].sort()) {
      const fg = parseColor(t[token]);
      if (!fg) continue;
      if (SURFACES.includes(token)) continue; // a surface is not text
      const surfaces = PAIRED[token]
        ? [[`--${PAIRED[token]}`, t[PAIRED[token]]]]
        : SURFACES.map((s) => [s, t[s]]);
      let worst = Infinity, worstOn = "";
      for (const [name, hex] of surfaces) {
        const bg = parseColor(hex);
        if (!bg) continue;
        const eff = fg.a < 1 ? over(fg, bg) : fg;
        const cr = contrast(eff, bg);
        if (cr < worst) { worst = cr; worstOn = name; }
      }
      rows.push({ theme, token, value: t[token], worst, worstOn });
      if (worst < 4.5) fail("токены", `${theme}: --${token} = ${t[token]} даёт ${worst}:1 на ${worstOn} (норма 4.5)`);
    }
  }
  return rows;
}

function collectSource() {
  const out = [];
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (e.name === "node_modules" || e.name.startsWith(".")) continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.tsx?$/.test(e.name)) out.push(readFileSync(p, "utf8"));
    }
  };
  for (const d of ["app", "components", "lib", "context"]) if (existsSync(d)) walk(d);
  return out.join("\n");
}

// ─────────────────────────────────────────────────────────────────────────────
// Server
// ─────────────────────────────────────────────────────────────────────────────

function freePort() {
  return new Promise((res, rej) => {
    const s = createServer();
    s.listen(0, () => { const { port } = s.address(); s.close(() => res(port)); });
    s.on("error", rej);
  });
}

async function startServer(port) {
  const proc = spawn("npx", ["next", "start", "-p", String(port)], { cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] });
  const base = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(base, { signal: AbortSignal.timeout(2000) });
      if (r.ok) return { proc, base };
    } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 400));
  }
  proc.kill();
  throw new Error("next start не поднялся за 60 с");
}

// ─────────────────────────────────────────────────────────────────────────────
// Page preparation.
//
// The scroll pass is load-bearing, not politeness. Sections start at opacity 0
// (.pb-reveal and framer's whileInView) and axe skips hidden content, so
// auditing a freshly loaded page would walk a nearly empty document and report
// zero violations — falsely. The KNOWN_ISSUES note about `opacity: 1
// !important` is the trap on the other side: it masks exactly the bugs being
// hunted, so it is not used here. Instead the page is actually scrolled, the
// way a reader scrolls it.
// ─────────────────────────────────────────────────────────────────────────────

async function preparePage(page, url, theme) {
  await page.addInitScript((t) => {
    try { localStorage.setItem("theme", t); } catch { /* blocked storage */ }
  }, theme);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.waitForTimeout(300);
}

async function runAxe(page) {
  await page.addScriptTag({ path: AXE });
  return page.evaluate(async () => {
    const res = await window.axe.run(document, {
      resultTypes: ["violations"],
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] },
    });
    // Check the checker: if the scroll pass failed and most content is still
    // hidden, axe will have inspected far fewer nodes than the document holds.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let textNodes = 0;
    while (walker.nextNode()) if (walker.currentNode.textContent.trim()) textNodes++;
    return {
      violations: res.violations.map((v) => ({
        id: v.id, impact: v.impact, n: v.nodes.length,
        help: v.help,
        sample: v.nodes.slice(0, 2).map((n) => n.target.join(" ")),
      })),
      inspected: res.passes ? res.passes.length : null,
      textNodes,
      visibleText: (document.body.innerText || "").trim().split(/\s+/).filter(Boolean).length,
    };
  });
}

/**
 * Non-text contrast, WCAG 1.4.11. axe's color-contrast rule is text-only, so
 * the resting border of every form field on this site — 1.40:1 light, 1.11:1
 * dark — passed every previous check.
 */
async function checkControlBorders(page) {
  return page.evaluate(() => {
    const parse = (c) => { const m = c.match(/[\d.]+/g); return m ? { r: +m[0], g: +m[1], b: +m[2], a: m[3] === undefined ? 1 : +m[3] } : null; };
    const over = (f, b) => ({ r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a), b: f.b * f.a + b.b * (1 - f.a), a: 1 });
    const lum = (c) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
    const cr = (a, b) => { const l1 = lum(a), l2 = lum(b); return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100; };
    const bgOf = (el) => {
      let n = el, acc = null;
      while (n && n !== document.documentElement) {
        const c = parse(getComputedStyle(n).backgroundColor);
        if (c && c.a > 0) { acc = acc ? over(acc, c) : c; if (c.a >= 1) return acc; }
        n = n.parentElement;
      }
      return acc || parse(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
    };
    const out = [];
    for (const el of document.querySelectorAll("input, textarea, select, button")) {
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) continue;
      const cs = getComputedStyle(el);
      const bw = parseFloat(cs.borderTopWidth) || 0;
      if (bw === 0) continue;
      const bc = parse(cs.borderTopColor);
      if (!bc || bc.a === 0) continue;
      // The boundary is judged against what is immediately outside it.
      const outside = bgOf(el.parentElement || document.body);
      const eff = bc.a < 1 ? over(bc, outside) : bc;
      const ratio = cr(eff, outside);
      if (ratio < 3) {
        const key = el.tagName + "|" + cs.borderTopColor;
        if (!out.some((x) => x.key === key)) out.push({ key, tag: el.tagName, color: cs.borderTopColor, ratio });
      }
    }
    return out;
  });
}

/** Real keyboard, real :focus-visible — impossible in the preview pane. */
async function checkFocusRing(page) {
  const seen = [];
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      const ring = (cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0) ||
        cs.boxShadow !== "none" ||
        el.matches(":focus-visible");
      return {
        tag: el.tagName,
        name: (el.innerText || el.getAttribute("aria-label") || el.getAttribute("title") || "").trim().slice(0, 28),
        focusVisible: el.matches(":focus-visible"),
        outline: cs.outlineStyle + " " + cs.outlineWidth,
        hasRing: ring,
      };
    });
    if (info) seen.push(info);
  }
  return seen;
}

/**
 * prefers-reduced-motion: nothing may be animating.
 *
 * This asks the browser for its list of running animations rather than
 * comparing screenshots. Both screenshot approaches were wrong, in opposite
 * directions, and it is worth recording why:
 *
 *   - viewport-only frames reported all five pages clean, because the two
 *     infinite animations that are not gated — `borderPulse` on
 *     `.turnkey-banner` in §01 and `pulse-dot` on `.write-new-dot` in §05 —
 *     both sit below the fold;
 *   - `fullPage: true` frames then reported three pages dirty, but for the
 *     wrong reason: stitching a full-page shot scrolls the document, which
 *     drives the scroll progress bar and the section rail's active tick, so
 *     the two images differed because of scroll, not animation.
 *
 * `getAnimations()` is immune to both, and it names the element instead of
 * saying "the frames differ".
 */
async function checkReducedMotion(context, url) {
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(url, { waitUntil: "networkidle" });
  // Scroll once so lazily revealed sections exist and can be inspected.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);
  const running = await page.evaluate(() => {
    const out = [];
    const seen = new Set();
    for (const el of document.querySelectorAll("*")) {
      for (const a of el.getAnimations?.() ?? []) {
        if (a.playState !== "running") continue;
        const cs = getComputedStyle(el);
        // A transition that is mid-flight when we look is not evidence of a
        // reduced-motion violation; a keyframe animation, especially an
        // infinite one, is.
        const name = a.animationName ?? "";
        if (!name) continue;
        const key = name + "|" + String(el.className || el.tagName);
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({
          name,
          tag: el.tagName,
          cls: String(el.className || "").trim().split(/\s+/)[0] || "",
          duration: cs.animationDuration,
          iterations: cs.animationIterationCount,
        });
      }
    }
    return out;
  });
  await page.close();
  return running;
}

/**
 * LCP and CLS.
 *
 * The observers are installed by addInitScript, before any page script runs.
 * `performance.getEntriesByType("largest-contentful-paint")` returns an empty
 * array in Chromium — the entry type is supported (it is listed in
 * `PerformanceObserver.supportedEntryTypes`) but it is not served from the
 * timeline buffer, so the first version of this check reported "no LCP" on
 * every page and I nearly wrote that down as a browser limitation.
 */
async function checkVitals(page, url) {
  await page.addInitScript(() => {
    window.__lcp = null;
    window.__cls = 0;
    try {
      new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__lcp = e; })
        .observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; })
        .observe({ type: "layout-shift", buffered: true });
    } catch { /* unsupported */ }
  });
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(() => new Promise((r) => setTimeout(r, 2500)));
  return page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const fcp = performance.getEntriesByName("first-contentful-paint")[0];
    return {
      lcp: window.__lcp ? Math.round(window.__lcp.startTime) : null,
      lcpEl: window.__lcp?.element ? window.__lcp.element.tagName + (window.__lcp.element.className ? "." + String(window.__lcp.element.className).split(/\s+/)[0] : "") : null,
      cls: Math.round(window.__cls * 1000) / 1000,
      fcp: fcp ? Math.round(fcp.startTime) : null,
      ttfb: nav ? Math.round(nav.responseStart) : null,
    };
  });
}

/** First-screen weight, so the 475 KB of fonts cannot drift back to 1 126. */
async function checkWeight(base, pagePath) {
  const html = await (await fetch(base + pagePath)).text();
  const fonts = new Set([...html.matchAll(/\/_next\/static\/media\/([\w.\-]+\.woff2)/g)].map((m) => m[1]));
  const js = new Set([...html.matchAll(/\/_next\/static\/chunks\/([\w.\-]+\.js)/g)].map((m) => m[1]));
  const css = new Set([...html.matchAll(/\/_next\/static\/chunks\/([\w.\-]+\.css)/g)].map((m) => m[1]));
  const size = (rel) => { const p = path.join(ROOT, ".next/static", rel); return existsSync(p) ? readFileSync(p).length : 0; };
  const gz = (rel) => { const p = path.join(ROOT, ".next/static", rel); return existsSync(p) ? gzipSync(readFileSync(p), { level: 9 }).length : 0; };
  const fontBytes = [...fonts].reduce((s, f) => s + size("media/" + f), 0);
  const jsGz = [...js].reduce((s, f) => s + gz("chunks/" + f), 0);
  const cssGz = [...css].reduce((s, f) => s + gz("chunks/" + f), 0);
  const htmlGz = gzipSync(Buffer.from(html), { level: 9 }).length;
  return {
    fontFiles: fonts.size, fontKB: Math.round(fontBytes / 1024),
    jsKB: Math.round(jsGz / 1024), cssKB: Math.round(cssGz / 1024), htmlKB: Math.round(htmlGz / 1024),
    totalKB: Math.round((fontBytes + jsGz + cssGz + htmlGz) / 1024),
  };
}

const WEIGHT_CEILING_KB = 900; // measured 781 after the font pass; headroom, not a target

// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  const onlyTokens = process.argv.includes("--tokens-only");

  console.log("\n  ── 1. Матрица контраста токенов ──────────────────────────────\n");
  const matrix = checkTokenMatrix();
  for (const theme of THEMES) {
    const rows = matrix.filter((r) => r.theme === theme).sort((a, b) => a.worst - b.worst);
    console.log(`  ${theme}:`);
    for (const r of rows) {
      const mark = r.worst < 4.5 ? "  ✗" : "   ";
      console.log(`   ${mark} --${r.token.padEnd(14)} ${String(r.value).padEnd(26)} худший ${String(r.worst).padStart(5)}:1 на ${r.worstOn}`);
    }
  }
  if (onlyTokens) return report();

  if (!existsSync(path.join(ROOT, ".next/BUILD_ID"))) {
    fail("сборка", "нет .next — сначала `npm run build`");
    return report();
  }

  const port = await freePort();
  const { proc, base } = await startServer(port);
  const browser = await chromium.launch();

  try {
    console.log("\n  ── 2. axe: 5 страниц × 2 темы × 2 языка ──────────────────────\n");
    for (const p of PAGES) {
      for (const theme of THEMES) {
        for (const lang of LANGS) {
          const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
          const page = await context.newPage();
          const url = `${base}${p.path}${lang === "ru" ? "?lang=ru" : ""}`;
          await preparePage(page, url, theme);
          const res = await runAxe(page);
          const label = `${p.name} · ${theme} · ${lang}`.padEnd(34);
          if (res.visibleText < 80) {
            fail("прогон", `${label} axe увидел только ${res.visibleText} слов — раскрытие секций не сработало, результат недостоверен`);
            console.log(`   ✗ ${label} ТОЛЬКО ${res.visibleText} слов видно`);
          } else if (res.violations.length === 0) {
            console.log(`   ✓ ${label} 0 нарушений (${res.visibleText} слов)`);
          } else {
            const total = res.violations.reduce((s, v) => s + v.n, 0);
            console.log(`   ✗ ${label} ${res.violations.length} правил, ${total} узлов`);
            for (const v of res.violations) {
              console.log(`       ${v.impact ?? "?"}  ${v.id} ×${v.n} — ${v.help}`);
              for (const s of v.sample) console.log(`           ${s.slice(0, 96)}`);
              fail("axe", `${p.name}/${theme}/${lang}: ${v.id} ×${v.n} (${v.help})`);
            }
          }
          await context.close();
        }
      }
    }

    console.log("\n  ── 3. Нетекстовый контраст границ контролов (1.4.11) ─────────\n");
    for (const theme of THEMES) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await preparePage(page, `${base}/outbound`, theme);
      const bad = await checkControlBorders(page);
      if (bad.length === 0) console.log(`   ✓ ${theme}: все границы ≥ 3:1`);
      for (const b of bad) {
        console.log(`   ✗ ${theme}: ${b.tag} border ${b.color} = ${b.ratio}:1 (норма 3)`);
        fail("1.4.11", `${theme}: граница ${b.tag} ${b.color} = ${b.ratio}:1`);
      }
      await context.close();
    }

    console.log("\n  ── 4. Кольцо фокуса, настоящая клавиатура ────────────────────\n");
    for (const theme of THEMES) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await preparePage(page, `${base}/outbound`, theme);
      const seen = await checkFocusRing(page);
      const ringless = seen.filter((s) => s.focusVisible && !s.hasRing);
      const nameless = seen.filter((s) => !s.name);
      console.log(`   ${theme}: 12 нажатий Tab, дошло до ${seen.length} элементов`);
      if (ringless.length) {
        for (const r of ringless) { console.log(`   ✗ без кольца: ${r.tag} «${r.name}» outline=${r.outline}`); fail("фокус", `${theme}: ${r.tag} «${r.name}» без видимого кольца`); }
      } else console.log(`   ✓ у всех фокусируемых есть видимое кольцо`);
      if (nameless.length) {
        for (const n of nameless) { console.log(`   ✗ без имени: ${n.tag}`); fail("имя", `${theme}: ${n.tag} в обходе без доступного имени`); }
      }
      await context.close();
    }

    console.log("\n  ── 5. prefers-reduced-motion: ничего не двигается ────────────\n");
    for (const p of PAGES) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const running = await checkReducedMotion(context, base + p.path);
      if (running.length === 0) {
        console.log(`   ✓ ${p.name.padEnd(14)} ни одной живой анимации`);
      } else {
        console.log(`   ✗ ${p.name.padEnd(14)} ${running.length} живых анимаций при reduce:`);
        for (const a of running) {
          console.log(`       ${a.name} на ${a.tag}.${a.cls} — ${a.duration} ×${a.iterations}`);
          fail("reduced-motion", `${p.name}: ${a.name} на .${a.cls} (${a.duration} ×${a.iterations})`);
        }
      }
      await context.close();
    }

    console.log("\n  ── 6. LCP / CLS ─────────────────────────────────────────────\n");
    for (const p of PAGES) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      const v = await checkVitals(page, base + p.path);
      const clsMark = v.cls > 0.1 ? "✗" : "✓";
      console.log(`   ${clsMark} ${p.name.padEnd(14)} LCP ${String(v.lcp ?? "—").padStart(5)} мс   CLS ${String(v.cls).padStart(5)}   FCP ${String(v.fcp ?? "—").padStart(5)} мс   TTFB ${String(v.ttfb).padStart(3)} мс   LCP-элемент: ${v.lcpEl ?? "—"}`);
      if (v.cls > 0.1) fail("CLS", `${p.name}: CLS ${v.cls} (порог 0.1)`);
      // A missing LCP means the check is broken, not that the page has none —
      // so it fails loudly rather than passing quietly.
      if (v.lcp === null) fail("LCP", `${p.name}: LCP не снят — проверка недостоверна`);
      await context.close();
    }

    console.log("\n  ── 7. Вес первого экрана ────────────────────────────────────\n");
    for (const p of PAGES) {
      const w = await checkWeight(base, p.path);
      const mark = w.totalKB > WEIGHT_CEILING_KB ? "✗" : "✓";
      console.log(`   ${mark} ${p.name.padEnd(14)} шрифты ${String(w.fontFiles).padStart(2)} файла / ${String(w.fontKB).padStart(4)} КБ   JS ${String(w.jsKB).padStart(3)} КБ gz   CSS ${w.cssKB} КБ   HTML ${String(w.htmlKB).padStart(2)} КБ   итого ${w.totalKB} КБ`);
      if (w.totalKB > WEIGHT_CEILING_KB) fail("вес", `${p.name}: ${w.totalKB} КБ первого экрана (порог ${WEIGHT_CEILING_KB})`);
    }
  } finally {
    await browser.close();
    proc.kill();
  }

  report();
}

function report() {
  console.log("\n  ─────────────────────────────────────────────────────────────\n");
  if (notes.length) {
    console.log("  Замечания (не провал):");
    for (const n of notes) console.log(`    · ${n}`);
    console.log("");
  }
  if (failures.length === 0) {
    console.log("  ✓ Всё зелёное.\n");
    process.exit(0);
  }
  const byArea = {};
  for (const f of failures) (byArea[f.area] ??= []).push(f.msg);
  console.log(`  ✗ ${failures.length} нарушений:\n`);
  for (const [area, msgs] of Object.entries(byArea)) {
    console.log(`  ${area} (${msgs.length}):`);
    for (const m of msgs.slice(0, 12)) console.log(`    · ${m}`);
    if (msgs.length > 12) console.log(`    … и ещё ${msgs.length - 12}`);
    console.log("");
  }
  process.exit(1);
}

main().catch((err) => {
  console.error("\n  Прогон упал:", err.message, "\n");
  process.exit(2);
});
