import type { Decorator } from "@storybook/react"

export const Center: Decorator = (Story) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "95vh",
    }}
  >
    <Story />
  </div>
)
