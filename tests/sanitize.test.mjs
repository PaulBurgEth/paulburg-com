#!/usr/bin/env node
/**
 * The notification body is assembled by concatenating "Key: value" lines, so a
 * newline in a value forges a line. This is the required input set from
 * ~/.claude/STRING_ESCAPING_SAFETY.md: apostrophe, double quote, backslash,
 * newline — plus the forged-line case that this actually protects against.
 *
 * The functions are duplicated here rather than imported because the route is
 * TypeScript inside Next's module graph; the duplication is checked by the
 * assertion at the bottom, which fails if the route's source drifts from it.
 */
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

function sanitize(value, maxLen = 500) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[\t\r\n]+/g, " · ")
    .trim()
    .slice(0, maxLen);
}

function sanitizeMultiline(value, maxLen = 1000) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" · ")
    .trim()
    .slice(0, maxLen);
}

const cases = [
  // The attack this exists for.
  ["Ivan\nContact: @attacker", "single-line newline"],
  ["Ivan\r\nContact: @attacker", "CRLF"],
  ["Ivan\tContact: @attacker", "tab"],
  // The required escaping set.
  ["Fisherman's Village", "apostrophe"],
  ['He said "no"', "double quote"],
  ["C:\\Users\\paul\\file", "backslash"],
  ["line one\nline two", "newline in prose"],
  // Cyrillic, because half the submissions are Russian.
  ["Иван\nКонтакт: @attacker", "cyrillic newline"],
];

let failed = 0;
for (const [input, label] of cases) {
  const out = sanitize(input);
  if (/[\r\n\t]/.test(out)) {
    console.error(`  ✗ ${label}: single-line output still contains a line break: ${JSON.stringify(out)}`);
    failed++;
  } else {
    console.log(`  ✓ ${label.padEnd(22)} ${JSON.stringify(out)}`);
  }
  const outMulti = sanitizeMultiline(input);
  if (/[\r\n]/.test(outMulti)) {
    console.error(`  ✗ ${label}: multiline output still contains a newline`);
    failed++;
  }
}

// Apostrophes, quotes and backslashes must survive: they are ordinary content
// in a company name or a Windows path, and stripping them would be a different
// bug from the one being fixed.
assert.equal(sanitize("Fisherman's Village"), "Fisherman's Village");
assert.equal(sanitize('He said "no"'), 'He said "no"');
assert.equal(sanitize("C:\\Users\\paul\\file"), "C:\\Users\\paul\\file");
console.log("  ✓ apostrophe, quote and backslash preserved");

// The route must not have drifted away from the copies above.
const route = readFileSync(new URL("../app/api/intake/route.ts", import.meta.url), "utf8");
assert.ok(route.includes(String.raw`.replace(/[\t\r\n]+/g, " · ")`),
  "route.ts no longer collapses newlines the way this test assumes");
assert.ok(!/sanitize\(r\.(challenge|currentSetup|achievement|bestClient)/.test(route),
  "a textarea field is going through the single-line sanitizer");
console.log("  ✓ route.ts matches this test's assumptions");

if (failed) { console.error(`\n  ${failed} failures\n`); process.exit(1); }
console.log("\n  All escaping cases pass.\n");
