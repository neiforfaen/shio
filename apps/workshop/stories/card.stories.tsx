import { Button } from "@repo/shadcn-ui/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/components/ui/card"
import type { Meta, StoryObj } from "@storybook/react"

/**
 * Displays a card with a header, content, and footer.
 */
const meta = {
  title: "shadcn-ui/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default card, composed from a header, content, and footer.
 */
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Choose a template to get started, or start from scratch.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Deploy</Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Add a `CardAction` to the header to place an action, such as a button,
 * alongside the title.
 */
export const WithAction: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Choose a template to get started, or start from scratch.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Deploy</Button>
      </CardFooter>
    </Card>
  ),
}
