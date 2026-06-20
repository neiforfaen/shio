import { Button } from "@repo/shadcn-ui/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@repo/shadcn-ui/components/ui/button-group"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Center } from "@/.storybook/decorators/center"

/**
 * Groups related buttons together, visually merging their borders.
 */
const meta = {
  title: "ButtonGroup",
  component: ButtonGroup,
  decorators: [Center],
} satisfies Meta<typeof ButtonGroup>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default button group, with buttons arranged horizontally.
 */
export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Back</Button>
      <Button variant="outline">Next</Button>
      <Button variant="outline">Finish</Button>
    </ButtonGroup>
  ),
}

/**
 * Use the `vertical` orientation to stack the buttons instead.
 */
export const Vertical: Story = {
  render: Default.render,
  args: {
    orientation: "vertical",
  },
}

/**
 * Add a `ButtonGroupSeparator` to visually divide buttons within the group.
 */
export const WithSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Copy</Button>
      <ButtonGroupSeparator />
      <Button variant="outline">Paste</Button>
    </ButtonGroup>
  ),
}
