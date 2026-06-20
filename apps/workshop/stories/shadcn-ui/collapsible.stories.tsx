import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/shadcn-ui/components/ui/collapsible"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Center } from "@/.storybook/decorators/center"

/**
 * An interactive component which expands and collapses a panel.
 */
const meta = {
  title: "Collapsible",
  component: Collapsible,
  decorators: [Center],
} satisfies Meta<typeof Collapsible>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default collapsible, shown here open so its content is visible.
 */
export const Default: Story = {
  render: () => (
    <Collapsible className="w-80" defaultOpen>
      <CollapsibleTrigger className="font-medium text-sm underline">
        Can I use this in my project?
      </CollapsibleTrigger>
      <CollapsibleContent className="text-muted-foreground text-sm">
        Yes. Free to use for personal and commercial projects.
      </CollapsibleContent>
    </Collapsible>
  ),
}
