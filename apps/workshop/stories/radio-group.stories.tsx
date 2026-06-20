import { Label } from "@repo/shadcn-ui/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@repo/shadcn-ui/components/ui/radio-group"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

/**
 * A set of checkable buttons, known as radio buttons, where no more than
 * one of the buttons can be checked at a time.
 */
const meta = {
  title: "shadcn-ui/RadioGroup",
  component: RadioGroup,
  decorators: [Center],
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default radio group, with one option selected.
 */
export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="comfortable" {...args}>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="default" value="default" />
        <Label htmlFor="default">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="comfortable" value="comfortable" />
        <Label htmlFor="comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id="compact" value="compact" />
        <Label htmlFor="compact">Compact</Label>
      </div>
    </RadioGroup>
  ),
}

/**
 * Add the `disabled` prop to prevent interaction with every item in the
 * group.
 */
export const Disabled: Story = {
  render: Default.render,
  args: {
    disabled: true,
  },
}
