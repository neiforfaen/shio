import { Spinner } from "@repo/shadcn-ui/components/ui/spinner"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Center } from "@/.storybook/decorators/center"

/**
 * Used to indicate a loading state.
 */
const meta = {
  component: Spinner,
  decorators: [Center],
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default spinner.
 */
export const Default: Story = {}

/**
 * Use `className` to size the spinner down, such as `size-3`.
 */
export const Small: Story = {
  args: {
    className: "size-3",
  },
}

/**
 * Use `className` to size the spinner up, such as `size-8`.
 */
export const Large: Story = {
  args: {
    className: "size-8",
  },
}
