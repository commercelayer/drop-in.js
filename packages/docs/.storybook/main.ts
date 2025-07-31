import { createRequire } from "node:module"
import remarkGfm from "remark-gfm"
import type { StorybookConfig } from "storybook/internal/types"

const require = createRequire(import.meta.url)

const storybookConfig: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  // @ts-expect-error This 'managerEntries' exists.
  managerEntries: [
    require.resolve("./addon-drop-in-css/manager.tsx"),
    require.resolve("./addon-minicart-css/manager.tsx"),
    require.resolve("./addon-scope-selector/manager.tsx"),
    require.resolve("./addon-version/manager.tsx"),
    require.resolve("./addon-gh-repository/manager.tsx"),
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  features: {},
  staticDirs: ["../public"],
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  docs: {
    docsMode: true,
  },
}

export default storybookConfig
