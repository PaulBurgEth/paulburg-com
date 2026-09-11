import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  //
  // The patterns are anchored with `**/` on purpose. `.next/**` alone matches
  // only the build output at the repository root, so eslint was walking into
  // `.claude/worktrees/*/.next/` — three abandoned worktrees, each with its own
  // build — and linting Next's own compiled bundles. `npm run lint` reported
  // 19 234 problems, of which 6 came from this project's source, so nobody ran
  // it and three real errors sat unnoticed.
  globalIgnores([
    // Default ignores of eslint-config-next:
    "**/.next/**",
    "**/out/**",
    "**/build/**",
    "next-env.d.ts",
    // Not source: dependency trees and Claude Code's scratch worktrees.
    "**/node_modules/**",
    ".claude/**",
  ]),
]);

export default eslintConfig;
