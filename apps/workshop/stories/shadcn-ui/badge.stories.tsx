import { Badge } from "@repo/shadcn-ui/components/ui/badge"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Center } from "@/.storybook/decorators/center"

/**
 * Displays a small badge for status, counts, or labels.
 */
const meta = {
  component: Badge,
  decorators: [Center],
  argTypes: {
    children: {
      control: "text",
    },
  },
  args: {
    variant: "default",
    children: "Badge",
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default badge, used for general labels and counts.
 */
export const Default: Story = {}

/**
 * Use the `secondary` badge for less prominent labels.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
}

/**
 * Use the `destructive` badge to flag errors or critical states.
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
}

/**
 * Use the `outline` badge to reduce visual weight.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
  },
}

/**
 * Use the `ghost` badge for minimal, low-emphasis labels.
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
}

/**
 * Use the `link` badge for a text-only, tertiary label.
 */
export const Link: Story = {
  args: {
    variant: "link",
  },
}
