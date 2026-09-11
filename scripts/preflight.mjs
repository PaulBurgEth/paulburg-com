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

import { execSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";

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

// Minimum bytes of prerendered HTML. Floors sit well under the real sizes so
// ordinary copy edits never trip them; they exist to catch a missing half of a
// page, not a reworded paragraph.
const REQUIRED_ROUTES = [
  { file: ".next/server/app/index.html", min: 40_000 },
  { file: ".next/server/app/outbound.html", min: 100_000 },
  // Was 30 000, which was read off an already-broken page: seven of the ten
  // sections loaded with `ssr: false`, so a complete /services was 54 KB of
  // HTML and the floor could never have caught the missing two thirds. With
  // static imports the page is 92 KB.
  { file: ".next/server/app/services.html", min: 75_000 },
  { file: ".next/server/app/mentorship.html", min: 20_000 },
  { file: ".next/server/app/blog.html", min: 10_000 },
];

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

for (const { file, min } of REQUIRED_ROUTES) {
  if (!existsSync(file)) {
    fail.push(`маршрут не собрался: ${file}`);
    continue;
  }
  const size = statSync(file).size;
  if (size < min) {
    fail.push(`${file} — ${kb(size)}, ожидалось от ${kb(min)}. Страница отдаётся неполной.`);
  }
}

if (fail.length) {
  console.error("\n  PREFLIGHT ОСТАНОВЛЕН — сборка неполная\n");
  for (const f of fail) console.error(`   ${f}`);
  console.error("\n  Деплой отменён. Прод не тронут.\n");
  process.exit(1);
}

console.log("\n  Preflight пройден:");
for (const { file } of REQUIRED_ROUTES) {
  console.log(`   ${file.replace(".next/server/app/", "")} — ${kb(statSync(file).size)}`);
}
console.log("\n  Выкатываю на продакшен…\n");
