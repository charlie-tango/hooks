import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";

addons.setConfig({
  theme: {
    ...themes.normal,
    brandTitle: "Hooks",
    brandUrl: "https://github.com/charlie-tango/hooks",
  },
});
