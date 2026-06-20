import { Kbd, KbdGroup } from "@repo/shadcn-ui/components/ui/kbd"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

/**
 * Displays textual user input from a keyboard, such as a single key or a
 * combination of keys.
 */
const meta = {
  component: Kbd,
  decorators: [Center],
} satisfies Meta<typeof Kbd>

export default meta

type Story = StoryObj<typeof meta>

/**
 * A single keyboard key.
 */
export const Default: Story = {
  render: () => <Kbd>⌘</Kbd>,
}

/**
 * Use `KbdGroup` to display a sequence of keys, such as a keyboard shortcut.
 */
export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}
