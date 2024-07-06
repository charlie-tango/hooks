import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../stories/*.@(story|stories).@(ts|tsx|js|jsx|mdx)"],
  addons: ["@storybook/addon-essentials"],
  core: {
    builder: "@storybook/builder-vite",
  },
  typescript: {
    reactDocgen: "react-docgen", // or false if you don't need docgen at all
  },
  /**
   * In preparation for the vite build plugin, add the needed config here.
   */
  async viteFinal(config) {
    if (config.optimizeDeps) {
      config.optimizeDeps.include = [
        ...(config.optimizeDeps.include ?? []),
        "@storybook/theming",
        "@storybook/addon-essentials/docs/mdx-react-shim",
        "@storybook/addon-actions",
      ];
    }
    return config;
  },
};

export default config;
