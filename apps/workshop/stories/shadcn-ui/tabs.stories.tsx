import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/shadcn-ui/components/ui/tabs"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

/**
 * A set of layered sections of content, known as tab panels, displayed one
 * at a time.
 */
const meta = {
  component: Tabs,
  decorators: [Center],
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

function ExampleTabs({ variant }: { variant?: "default" | "line" }) {
  return (
    <Tabs className="w-80" defaultValue="account">
      <TabsList variant={variant}>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
      <TabsContent value="settings">Adjust your settings here.</TabsContent>
    </Tabs>
  )
}

/**
 * The default tabs, with the first tab active.
 */
export const Default: Story = {
  render: () => <ExampleTabs />,
}

/**
 * Use the `line` variant on `TabsList` for an underlined tab style instead
 * of the default pill background.
 */
export const Line: Story = {
  render: () => <ExampleTabs variant="line" />,
}
