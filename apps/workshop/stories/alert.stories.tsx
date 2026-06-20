import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@repo/shadcn-ui/components/ui/alert"
import { Button } from "@repo/shadcn-ui/components/ui/button"
import type { Meta, StoryObj } from "@storybook/react"
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"
import { Center } from "@/.storybook/decorators/center"

/**
 * Displays a callout for important, contextual messages.
 */
const meta = {
  title: "shadcn-ui/Alert",
  component: Alert,
  decorators: [Center],
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default alert, used for general informational messages.
 */
export const Default: Story = {
  render: () => (
    <Alert>
      <CheckCircle2Icon />
      <AlertTitle>Success! Your changes have been saved.</AlertTitle>
      <AlertDescription>
        This is an alert with icon, title and description.
      </AlertDescription>
    </Alert>
  ),
}

/**
 * Use the `destructive` variant to flag errors that need attention.
 */
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Unable to process your payment.</AlertTitle>
      <AlertDescription>
        Please verify your billing information and try again.
      </AlertDescription>
    </Alert>
  ),
}

/**
 * Add an `AlertAction` to give the user something to do about the alert.
 */
export const WithAction: Story = {
  render: () => (
    <Alert>
      <CheckCircle2Icon />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>A new version is ready to install.</AlertDescription>
      <AlertAction>
        <Button size="sm">Update</Button>
      </AlertAction>
    </Alert>
  ),
}
