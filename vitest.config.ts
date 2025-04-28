import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    workspace: [
      {
        test: {
          globals: true,
          include: ["src/**/*.{test,spec}.{ts,tsx}"],
          exclude: [
            "**/*.node.{test,spec}.{ts,tsx}",
            "**/node/*.{test,spec}.{ts,tsx}",
          ],
          name: "browser",
          browser: {
            enabled: true,
            provider: "playwright",
            headless: true,
            instances: [
              { browser: "chromium" },
              { browser: "firefox" },
              { browser: "webkit" },
            ],
          },
        },
        optimizeDeps: {
          include: ["react/jsx-dev-runtime"],
        },
        publicDir: "src/__tests__/public",
      },
      {
        test: {
          globals: true,
          include: [
            "src/**/*.node.{test,spec}.{ts,tsx}",
            "src/**/node/*.{test,spec}.{ts,tsx}",
          ],
          name: "node",
          environment: "node",
        },
      },
    ],
  },
});
