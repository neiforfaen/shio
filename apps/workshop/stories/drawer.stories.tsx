import { Button } from "@repo/shadcn-ui/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/shadcn-ui/components/ui/drawer"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

/**
 * A drawer component, built on top of Vaul.
 */
const meta = {
  title: "shadcn-ui/Drawer",
  component: Drawer,
  decorators: [Center()],
} satisfies Meta<typeof Drawer>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default drawer. Vaul drives the open/closed state through gesture
 * and animation logic that doesn't render open by default in a static
 * canvas, so use the trigger to open it.
 */
export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
