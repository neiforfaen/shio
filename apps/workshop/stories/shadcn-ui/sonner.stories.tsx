import { Button } from "@repo/shadcn-ui/components/ui/button"
import { Toaster } from "@repo/shadcn-ui/components/ui/sonner"
import type { Meta, StoryObj } from "@storybook/react"
import { toast } from "sonner"
import { Center } from "@/.storybook/decorators/center"

/**
 * A toast notification component, built on top of the `sonner` library.
 */
const meta = {
  component: Toaster,
  decorators: [Center],
} satisfies Meta<typeof Toaster>

export default meta

type Story = StoryObj<typeof meta>

/**
 * Render the `Toaster` once near the root of the app, then call `toast()`
 * from anywhere to show a notification.
 */
export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <Button onClick={() => toast("Event has been created")} variant="outline">
        Show toast
      </Button>
    </>
  ),
}
