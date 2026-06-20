import { Label } from "@repo/shadcn-ui/components/ui/label"
import { Switch } from "@repo/shadcn-ui/components/ui/switch"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

/**
 * A control that allows the user to toggle between checked and not checked.
 */
const meta = {
  title: "shadcn-ui/Switch",
  component: Switch,
  decorators: [Center()],
  args: {
    size: "default",
  },
} satisfies Meta<typeof Switch>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default, unchecked switch.
 */
export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" {...args} />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
}

/**
 * Set `defaultChecked` to render the switch already on.
 */
export const Checked: Story = {
  render: Default.render,
  args: {
    defaultChecked: true,
  },
}

/**
 * Use the `sm` size for a more compact switch.
 */
export const Small: Story = {
  render: Default.render,
  args: {
    size: "sm",
  },
}

/**
 * Add the `disabled` prop to prevent interaction with the switch.
 */
export const Disabled: Story = {
  render: Default.render,
  args: {
    disabled: true,
  },
}
