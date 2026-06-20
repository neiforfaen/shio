import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import type { StorybookConfig } from "@storybook/nextjs-vite"

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}
const config: StorybookConfig = {
  stories: [
    {
      directory: "../stories/shadcn-ui",
      titlePrefix: "Primitives",
      files: "**/*.stories.tsx",
    },
    {
      directory: "../stories/components",
      titlePrefix: "Components",
      files: "**/*.stories.tsx",
    },
  ],
  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-vitest"),
  ],
  framework: getAbsolutePath("@storybook/nextjs-vite"),
  staticDirs: ["../public"],
}
export default config
