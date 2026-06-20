import { Button } from "@repo/shadcn-ui/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@repo/shadcn-ui/components/ui/item"
import type { Meta, StoryObj } from "@storybook/react"
import { BellIcon } from "lucide-react"

/**
 * Displays a single, flexible content row, such as a list entry or
 * notification.
 */
const meta = {
  title: "shadcn-ui/Item",
  component: Item,
} satisfies Meta<typeof Item>

export default meta

type Story = StoryObj<typeof meta>

function ExampleItem({
  variant,
}: {
  variant?: "default" | "outline" | "muted"
}) {
  return (
    <Item className="w-96" variant={variant}>
      <ItemMedia variant="icon">
        <BellIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>New notification</ItemTitle>
        <ItemDescription>You have a new message.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          View
        </Button>
      </ItemActions>
    </Item>
  )
}

/**
 * The default item, composed from media, content, and actions.
 */
export const Default: Story = {
  render: () => <ExampleItem />,
}

/**
 * Use the `outline` variant to add a visible border.
 */
export const Outline: Story = {
  render: () => <ExampleItem variant="outline" />,
}

/**
 * Use the `muted` variant for a subdued background.
 */
export const Muted: Story = {
  render: () => <ExampleItem variant="muted" />,
}

/**
 * Use `ItemGroup` with `ItemSeparator` to stack several items together.
 */
export const Group: Story = {
  render: () => (
    <ItemGroup className="w-96">
      <ExampleItem />
      <ItemSeparator />
      <ExampleItem />
      <ItemSeparator />
      <ExampleItem />
    </ItemGroup>
  ),
}
