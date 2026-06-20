import { Separator } from "@repo/shadcn-ui/components/ui/separator"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Center } from "@/.storybook/decorators/center"

/**
 * Visually or semantically separates content.
 */
const meta = {
  component: Separator,
  decorators: [Center],
  args: {
    orientation: "horizontal",
  },
} satisfies Meta<typeof Separator>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default horizontal separator, used to divide stacked content.
 */
export const Horizontal: Story = {
  render: (args) => (
    <div className="w-64 space-y-1">
      <h4 className="font-medium text-sm leading-none">Shio UI</h4>
      <p className="text-muted-foreground text-sm">A component library.</p>
      <Separator className="my-4" {...args} />
      <p className="text-muted-foreground text-sm">
        Open source and free to use.
      </p>
    </div>
  ),
}

/**
 * Use the `vertical` orientation to divide content laid out in a row.
 */
export const Vertical: Story = {
  render: (args) => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator {...args} />
      <div>Docs</div>
      <Separator {...args} />
      <div>Source</div>
    </div>
  ),
  args: {
    orientation: "vertical",
  },
}
