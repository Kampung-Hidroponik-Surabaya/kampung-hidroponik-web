import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import tailwindPlugin from "eslint-plugin-tailwindcss";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const eslintConfig = defineConfig([
  // ── Next.js core rules ─────────────────────────────────────
  ...nextVitals,
  ...nextTs,

  // ── Tailwind class sorting ──────────────────────────────────
  // Enforces consistent Tailwind utility class order
  // Mirrors Prettier's tailwind plugin ordering convention
  ...tailwindPlugin.configs["flat/recommended"],
  {
    settings: {
      // Points plugin to your tailwind config
      // Mechanism: plugin reads tailwind.config.ts → learns
      // all custom tokens → stops flagging them as unknown
      tailwindcss: {
        config: require.resolve("./tailwind.config.ts"),
        // callees: functions whose args are scanned for classes
        callees: ["cn", "clsx", "cva"],
      },
    },
  },

  // ── TypeScript strict rules ─────────────────────────────────
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        // project: true → enables type-aware lint rules
        // requires tsconfig.json at project root
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Prohibit implicit any → forces explicit typing
      "@typescript-eslint/no-explicit-any": "error",

      // Flag declared but unused variables
      // _prefix convention → intentionally unused params
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Enforce import type {} for type-only imports
      // Reduces runtime bundle — types stripped at compile
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // Warn on non-null assertions → prefer optional chaining
      "@typescript-eslint/no-non-null-assertion": "warn",

      // Prohibit floating promises → async errors must be handled
      "@typescript-eslint/no-floating-promises": "error",

      // Enforce === over == → prevents type coercion bugs
      eqeqeq: ["error", "always"],

      // Warn on console.log → allow warn/error for intentional logs
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Enforce self-closing JSX on components with no children
      "react/self-closing-comp": "error",
    },
  },

  // ── Prettier ────────────────────────────────────────────────
  // prettierConfig MUST come after all rule sets
  // Mechanism: disables all ESLint rules that Prettier owns
  // → prevents double-reporting format violations
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      ...prettierConfig.rules,
      // prettier/prettier → reports Prettier violations as ESLint errors
      // Single source of truth: .prettierrc drives all format rules
      "prettier/prettier": "error",
    },
  },

  // ── Ignores ─────────────────────────────────────────────────
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/sanity/**", // Sanity Studio auto-generated
    "sanity.config.ts", // Sanity config — not app code
    "sanity.cli.ts",
    ".history/**", // VSCode local history — not project files
  ]),
]);

export default eslintConfig;
