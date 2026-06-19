import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@repo/shadcn-ui/components/ui/popover"
import type { Meta, StoryObj } from "@storybook/react"

/**
 * Displays rich content in a portal, triggered by a button.
 */
const meta = {
  title: "shadcn-ui/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default popover, shown here open so its content is visible.
 */
export const Default: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger className="text-sm underline">Open</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
}
