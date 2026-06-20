import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@repo/shadcn-ui/components/ui/hover-card"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Center } from "@/.storybook/decorators/center"

/**
 * For sighted users to preview content available behind a link.
 */
const meta = {
  component: HoverCard,
  decorators: [Center],
} satisfies Meta<typeof HoverCard>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default hover card, shown here open so its content is visible.
 */
export const Default: Story = {
  render: () => (
    <HoverCard defaultOpen>
      <HoverCardTrigger className="text-sm underline">
        @shio-ui
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-1">
          <h4 className="font-medium text-sm">@shio-ui</h4>
          <p className="text-muted-foreground text-sm">
            The React framework for building UI libraries.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
