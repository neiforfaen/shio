import { Toggle } from "@repo/shadcn-ui/components/ui/toggle"
import type { Meta, StoryObj } from "@storybook/react"
import { Bold } from "lucide-react"
import { Center } from "@/.storybook/decorators/center"

/**
 * A two-state button that can be either on or off.
 */
const meta = {
  title: "shadcn-ui/Toggle",
  component: Toggle,
  decorators: [Center],
  args: {
    variant: "default",
    size: "default",
    children: <Bold />,
  },
} satisfies Meta<typeof Toggle>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default toggle.
 */
export const Default: Story = {}

/**
 * Use the `outline` toggle to add a visible border when off.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
  },
}

/**
 * Use the `sm` size for a smaller toggle.
 */
export const Small: Story = {
  args: {
    size: "sm",
  },
}

/**
 * Use the `lg` size for a larger toggle.
 */
export const Large: Story = {
  args: {
    size: "lg",
  },
}

/**
 * Add the `disabled` prop to prevent interaction with the toggle.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
