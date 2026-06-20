import { Button } from "@repo/shadcn-ui/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/shadcn-ui/components/ui/sheet"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Center } from "@/.storybook/decorators/center"

/**
 * A panel that slides in from the edge of the screen.
 */
const meta = {
  component: Sheet,
  decorators: [Center],
} satisfies Meta<typeof Sheet>

export default meta

type Story = StoryObj<typeof meta>

function ExampleSheet({
  side,
}: {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <Sheet defaultOpen>
      <SheetTrigger render={<Button variant="outline" />}>Open</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

/**
 * The default sheet, sliding in from the right, shown here open so its
 * content is visible.
 */
export const Default: Story = {
  render: () => <ExampleSheet />,
}

/**
 * Use `side="right"` to slide the sheet in from the right edge.
 */
export const Right: Story = {
  render: () => <ExampleSheet side="right" />,
}

/**
 * Use `side="left"` to slide the sheet in from the left edge.
 */
export const Left: Story = {
  render: () => <ExampleSheet side="left" />,
}

/**
 * Use `side="top"` to slide the sheet in from the top edge.
 */
export const Top: Story = {
  render: () => <ExampleSheet side="top" />,
}

/**
 * Use `side="bottom"` to slide the sheet in from the bottom edge.
 */
export const Bottom: Story = {
  render: () => <ExampleSheet side="bottom" />,
}
