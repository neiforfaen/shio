import { Button } from "@repo/shadcn-ui/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/shadcn-ui/components/ui/dialog"
import type { Meta, StoryObj } from "@storybook/react"

/**
 * A window overlaid on the primary window, rendering the content behind it
 * inert.
 */
const meta = {
  title: "shadcn-ui/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default dialog, shown here open so its content is visible.
 */
export const Default: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger render={<Button variant="outline" />}>
        Edit Profile
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
