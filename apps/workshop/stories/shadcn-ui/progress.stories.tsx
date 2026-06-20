import { Progress } from "@repo/shadcn-ui/components/ui/progress"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Center } from "@/.storybook/decorators/center"

/**
 * Displays an indicator showing the completion progress of a task.
 */
const meta = {
  component: Progress,
  decorators: [Center],
  args: {
    value: 50,
    className: "w-64",
  },
} satisfies Meta<typeof Progress>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default progress bar, partially filled.
 */
export const Default: Story = {}

/**
 * Set `value` to `100` to show a fully completed task.
 */
export const Complete: Story = {
  args: {
    value: 100,
  },
}

/**
 * Set `value` to `0` to show a task that hasn't started.
 */
export const Empty: Story = {
  args: {
    value: 0,
  },
}
