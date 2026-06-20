/// <reference types="vite/client" />
import type { Preview } from "@storybook/nextjs-vite"

import "../main.css"

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Components", "Primitives"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
