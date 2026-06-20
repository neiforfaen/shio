import { Label } from "@repo/shadcn-ui/components/ui/label"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

/**
 * Renders an accessible label associated with a form control.
 */
const meta = {
  title: "shadcn-ui/Label",
  component: Label,
  decorators: [Center()],
  argTypes: {
    children: {
      control: "text",
    },
  },
  args: {
    children: "Your email address",
  },
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default label, typically paired with a form control.
 */
export const Default: Story = {}
