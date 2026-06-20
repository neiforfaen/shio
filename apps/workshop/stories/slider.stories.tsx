import { Slider } from "@repo/shadcn-ui/components/ui/slider"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

/**
 * An input where the user selects a value from within a given range.
 */
const meta = {
  title: "shadcn-ui/Slider",
  component: Slider,
  decorators: [Center()],
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
    className: "w-64",
  },
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default slider, with a single thumb.
 */
export const Default: Story = {}

/**
 * Pass two values to `defaultValue` to render a range slider with two
 * thumbs.
 */
export const Range: Story = {
  args: {
    defaultValue: [25, 75],
  },
}

/**
 * Add the `disabled` prop to prevent interaction with the slider.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
