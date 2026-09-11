#!/usr/bin/env node
/**
 * Gate between a working tree and production.
 *
 * On 9 September 2026 production was overwritten by `vercel --prod` run from a
 * worktree on a different, unrelated history line. That tree had never carried
 * /outbound, so the page 404'd and the nav reverted, and nothing in the deploy
 * path noticed: the build succeeded, because the tree was internally consistent
 * — it was simply the wrong tree.
 *
 * So the checks here are not "does it build". They are "is this the whole
 * site". The size floor is the one that would have caught it: the served
 * /outbound was 15,899 bytes that day against 157,642 from a complete tree,
 * because eight of twelve sections were absent from the document.
 *
 * Run through `npm run deploy`, which refuses to call vercel if this exits
 * non-zero.
 */

import { execSync, spawn } from "node:child_process";
import { existsSync } from "node:fs";

const REQUIRED_SOURCES = [
  "app/page.tsx",
  "app/outbound/page.tsx",
  "app/services/page.tsx",
  "app/mentorship/page.tsx",
  "app/blog/page.tsx",
  "app/api/intake/route.ts",
  "components/Navbar.tsx",
  "components/outbound/OutboundPageClient.tsx",
];

// Minimum bytes of served HTML, per route and per language.
//
// This used to stat prerendered files under .next/server/app/. Those stopped
// existing when the language moved to the server: the root layout reads a
// request header now, so every route renders per request. Checking the actual
// response is the better test anyway — it measures what a reader receives, and
// it can check both languages, which the file-based version never could.
//
// The Russian floors matter as much as the English ones. Until this release
// `curl "/outbound?lang=ru"` returned zero Russian words, and nothing in the
// deploy path noticed that half the site was missing.
const REQUIRED_ROUTES = [
  { path: "/", min: { en: 40_000, ru: 40_000 } },
  { path: "/outbound", min: { en: 100_000, ru: 100_000 } },
  { path: "/services", min: { en: 75_000, ru: 75_000 } },
  { path: "/mentorship", min: { en: 20_000, ru: 20_000 } },
  { path: "/blog", min: { en: 10_000, ru: 10_000 } },
];

// A Russian page has to actually contain Russian. A floor on bytes alone would
// pass an English page served under lang="ru".
const MIN_CYRILLIC = 2_000;

const fail = [];
const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

for (const path of REQUIRED_SOURCES) {
  if (!existsSync(path)) fail.push(`отсутствует исходник: ${path}`);
}

if (fail.length) {
  console.error("\n  PREFLIGHT ОСТАНОВЛЕН — дерево неполное\n");
  for (const f of fail) console.error(`   ${f}`);
  console.error("\n  Похоже, это не та ветка или не тот рабочий каталог.");
  console.error("  Проверьте: git branch --show-current && git status\n");
  process.exit(1);
}

console.log("  Исходники на месте. Собираю…\n");
try {
  execSync("npm run build", { stdio: "inherit" });
} catch {
  console.error("\n  PREFLIGHT ОСТАНОВЛЕН — сборка упала\n");
  process.exit(1);
}

const port = 3210 + (process.pid % 300);
const server = spawn("npx", ["next", "start", "-p", String(port)], { stdio: "ignore" });
const base = `http://127.0.0.1:${port}`;
const sizes = [];

try {
  // Wait for the server, then measure every route in both languages.
  let up = false;
  for (let i = 0; i < 100 && !up; i++) {
    try {
      const r = await fetch(base, { signal: AbortSignal.timeout(2000) });
      up = r.ok;
    } catch { /* not yet */ }
    if (!up) await new Promise((r) => setTimeout(r, 400));
  }
  if (!up) {
    fail.push("next start не поднялся — маршруты не проверены");
  } else {
    for (const { path, min } of REQUIRED_ROUTES) {
      for (const lang of ["en", "ru"]) {
        const url = `${base}${path}${lang === "ru" ? (path.includes("?") ? "&" : "?") + "lang=ru" : ""}`;
        let html = "";
        try {
          const res = await fetch(url);
          if (!res.ok) { fail.push(`${path} (${lang}) — HTTP ${res.status}`); continue; }
          html = await res.text();
        } catch (e) {
          fail.push(`${path} (${lang}) — запрос упал: ${e.message}`);
          continue;
        }
        const bytes = Buffer.byteLength(html);
        const declared = /<html[^>]+lang="([a-z]{2})"/.exec(html)?.[1] ?? "?";
        const cyrillic = (html.match(/[А-Яа-я]/g) ?? []).length;
        sizes.push({ path, lang, bytes, declared, cyrillic });

        if (bytes < min[lang]) {
          fail.push(`${path} (${lang}) — ${kb(bytes)}, ожидалось от ${kb(min[lang])}. Страница отдаётся неполной.`);
        }
        if (declared !== lang) {
          fail.push(`${path} (${lang}) — <html lang="${declared}">, ожидалось "${lang}".`);
        }
        if (lang === "ru" && cyrillic < MIN_CYRILLIC) {
          fail.push(`${path} (ru) — только ${cyrillic} кириллических символов. Русская версия не отдаётся.`);
        }
      }
    }
  }
} finally {
  server.kill();
}

if (fail.length) {
  console.error("\n  PREFLIGHT ОСТАНОВЛЕН — сборка неполная\n");
  for (const f of fail) console.error(`   ${f}`);
  console.error("\n  Деплой отменён. Прод не тронут.\n");
  process.exit(1);
}

console.log("\n  Preflight пройден:");
for (const s of sizes) {
  console.log(`   ${s.path.padEnd(12)} ${s.lang}  ${kb(s.bytes).padStart(7)}  lang="${s.declared}"${s.lang === "ru" ? `  ${s.cyrillic} кириллических` : ""}`);
}
console.log("\n  Выкатываю на продакшен…\n");
