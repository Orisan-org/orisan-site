/**
 * Flat-config conversion of the kit's .eslintrc.json, authorised as a one-time
 * exception: Next 16 ships ESLint 9, which does not read .eslintrc.json at all.
 * Rule SEMANTICS are preserved exactly — same extends, same settings, same four
 * tailwindcss rules, same no-restricted-syntax entries, same jsx-a11y rules,
 * same tailwind.config.ts override. Format changes, meaning does not.
 *
 * Mechanism note: eslint-config-next v16 is flat-config native and cannot be
 * loaded through FlatCompat (it is no longer an eslintrc shareable config), so
 * "next/core-web-vitals" comes from its native flat export. FlatCompat is used
 * for "plugin:tailwindcss/recommended", which is still eslintrc-style.
 */
import { FlatCompat } from "@eslint/eslintrc";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const repoRoot = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({ baseDirectory: repoRoot });

const config = [
  { ignores: ["test-results/", "playwright-report/"] },
  ...nextCoreWebVitals,
  ...compat.extends("plugin:tailwindcss/recommended"),
  {
    settings: {
      // Same file the kit's .eslintrc.json pointed at; absolute so the plugin's
      // module resolution has a real base directory under ESLint 9.
      tailwindcss: { config: join(repoRoot, "tailwind.config.ts"), callees: ["cn", "clsx", "cva"] },
    },
    rules: {
      "tailwindcss/no-arbitrary-value": "error",
      "tailwindcss/no-custom-classname": "error",
      "tailwindcss/no-contradicting-classname": "error",
      "tailwindcss/classnames-order": "warn",

      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='style']",
          message:
            "Inline styles bypass the design system. Use a token utility, or raise the missing token with a human.",
        },
        {
          selector: "Literal[value=/linear-gradient|radial-gradient|backdrop-filter|box-shadow/]",
          message: "Gradients, backdrop-filter and box-shadows are banned. See CLAUDE.md.",
        },
        {
          // The Inter literal ban is gone: B1 was reversed and Inter is now the
          // display and body face. The `font-sans` half stays -- that utility
          // reaches Tailwind's DEFAULT stack and bypasses the token system, which
          // is a different fault and still a fault. Undeclared faces are caught at
          // runtime by the font allowlist in tests/visual.spec.ts.
          selector: "Literal[value=/font-sans/]",
          message: "font-sans bypasses the token system. Use font-display, font-body, font-mono or font-alt.",
        },
      ],

      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/heading-has-content": "error",
    },
  },
  {
    // tailwind.config.ts is the kit's original exemption. eslint.config.mjs is
    // exempt for the same reason the old .eslintrc.json was (as JSON it was
    // never linted): the banned-pattern regexes match their own definitions.
    files: ["tailwind.config.ts", "eslint.config.mjs"],
    rules: { "no-restricted-syntax": "off" },
  },
];

export default config;
