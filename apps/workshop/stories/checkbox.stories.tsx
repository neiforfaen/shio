import { Checkbox } from "@repo/shadcn-ui/components/ui/checkbox"
import { Label } from "@repo/shadcn-ui/components/ui/label"
import type { Meta, StoryObj } from "@storybook/react"

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
  title: "shadcn-ui/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default, unchecked checkbox.
 */
export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

/**
 * Set `defaultChecked` to render the checkbox already checked.
 */
export const Checked: Story = {
  render: Default.render,
  args: {
    defaultChecked: true,
  },
}

/**
 * Add the `disabled` prop to prevent interaction with the checkbox.
 */
export const Disabled: Story = {
  render: Default.render,
  args: {
    disabled: true,
  },
}
