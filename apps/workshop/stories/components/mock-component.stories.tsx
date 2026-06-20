import { Button } from "@repo/shadcn-ui/components/ui/button"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

/**
 * Displays a button or a component that looks like a button.
 */
const meta = {
  component: Button,
  decorators: [Center],
  argTypes: {
    children: {
      control: "text",
    },
  },
  args: {
    variant: "default",
    size: "default",
    children: "Button",
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default form of the button, used for primary actions and commands.
 */
export const Default: Story = {}
