import { ScrollArea } from "@repo/shadcn-ui/components/ui/scroll-area"
import { Separator } from "@repo/shadcn-ui/components/ui/separator"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

const tags = Array.from({ length: 20 }, (_, i) => `Tag ${i + 1}`)

/**
 * Augments native scroll functionality for custom, cross-browser styling.
 */
const meta = {
  title: "shadcn-ui/ScrollArea",
  component: ScrollArea,
  decorators: [Center],
} satisfies Meta<typeof ScrollArea>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default scroll area, constrained to a fixed height so the scrollbar
 * appears.
 */
export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 font-medium text-sm leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
