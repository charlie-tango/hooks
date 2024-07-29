import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    extends: "vitest.config.ts",
    test: {
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
      exclude: [
        "**/*.node.{test,spec}.{ts,tsx}",
        "**/node/*.{test,spec}.{ts,tsx}",
      ],
      name: "browser",
      browser: {
        enabled: true,
        name: "chromium",
        provider: "playwright",
        headless: true,
      },
    },
    publicDir: "src/__tests__/public",
  },
  {
    extends: "vitest.config.ts",
    test: {
      include: [
        "src/**/*.node.{test,spec}.{ts,tsx}",
        "src/**/node/*.{test,spec}.{ts,tsx}",
      ],
      name: "node",
      environment: "node",
    },
  },
]);
