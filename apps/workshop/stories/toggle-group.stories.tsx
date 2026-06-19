import {
  ToggleGroup,
  ToggleGroupItem,
} from "@repo/shadcn-ui/components/ui/toggle-group"
import type { Meta, StoryObj } from "@storybook/react"
import { Bold, Italic, Underline } from "lucide-react"

/**
 * A set of two-state buttons that can be toggled on or off.
 */
const meta = {
  title: "shadcn-ui/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleGroup>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default toggle group, where only one item can be pressed at a time.
 */
export const Default: Story = {
  render: () => (
    <ToggleGroup defaultValue={["bold"]}>
      <ToggleGroupItem value="bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * Use the `outline` variant to add a visible border to each item.
 */
export const Outline: Story = {
  render: () => (
    <ToggleGroup defaultValue={["bold"]} variant="outline">
      <ToggleGroupItem value="bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/**
 * Set `multiple` to allow more than one item to be pressed at once.
 */
export const Multiple: Story = {
  render: () => (
    <ToggleGroup defaultValue={["bold", "italic"]} multiple>
      <ToggleGroupItem value="bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}
