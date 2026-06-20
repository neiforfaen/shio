import { Textarea } from "@repo/shadcn-ui/components/ui/textarea"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

/**
 * Displays a form textarea or a component that looks like a textarea.
 */
const meta = {
  component: Textarea,
  decorators: [Center],
  args: {
    placeholder: "Type your message here.",
  },
} satisfies Meta<typeof Textarea>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default form of the textarea.
 */
export const Default: Story = {}

/**
 * Add the `disabled` prop to prevent interaction with the textarea.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
