import { Button } from "@repo/shadcn-ui/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@repo/shadcn-ui/components/ui/empty"
import type { Meta, StoryObj } from "@storybook/react"
import { InboxIcon } from "lucide-react"
import { Center } from "@/.storybook/decorators/center"

/**
 * Displays a placeholder for when there is no content to show.
 */
const meta = {
  title: "shadcn-ui/Empty",
  component: Empty,
  decorators: [Center()],
} satisfies Meta<typeof Empty>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default empty state, with an icon, title, and description.
 */
export const Default: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search or filters.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

/**
 * Add a `Button` inside `EmptyContent` to give the user something to do.
 */
export const WithAction: Story = {
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <InboxIcon />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          Try adjusting your search or filters.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm" variant="outline">
          Clear filters
        </Button>
      </EmptyContent>
    </Empty>
  ),
}
