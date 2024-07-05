import { themes } from "@storybook/theming";

export const parameters = {
  controls: {
    expanded: true,
  },
  theme: {
    ...themes.dark,
  },
  docs: {
    theme: themes.dark,
  },
};
