import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@repo/shadcn-ui/components/ui/sidebar"
import type { Meta, StoryObj } from "@storybook/react"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { Center } from "@/.storybook/decorators/center"

const items = [
  { title: "Home", icon: Home },
  { title: "Inbox", icon: Inbox },
  { title: "Calendar", icon: Calendar },
  { title: "Search", icon: Search },
  { title: "Settings", icon: Settings },
]

/**
 * A composable, themeable sidebar component for application navigation.
 */
const meta = {
  title: "shadcn-ui/Sidebar",
  component: Sidebar,
  decorators: [Center],
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

function ExampleSidebar({
  defaultOpen = true,
  collapsible,
  variant,
}: {
  defaultOpen?: boolean
  collapsible?: "offcanvas" | "icon" | "none"
  variant?: "sidebar" | "floating" | "inset"
}) {
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar collapsible={collapsible} variant={variant}>
        <SidebarHeader>Application</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 p-4">
          <SidebarTrigger />
          <span className="text-sm">Page content</span>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

/**
 * The default sidebar, expanded, with a header, a grouped menu, and an
 * inset page area with a trigger.
 */
export const Default: Story = {
  render: () => <ExampleSidebar />,
}

/**
 * Use the `icon` collapsible mode, starting collapsed, to shrink the
 * sidebar down to icon-only width.
 */
export const Collapsed: Story = {
  render: () => <ExampleSidebar collapsible="icon" defaultOpen={false} />,
}

/**
 * Use the `floating` variant for a sidebar that appears detached from the
 * edge of the viewport.
 */
export const Floating: Story = {
  render: () => <ExampleSidebar variant="floating" />,
}

/**
 * Use the `inset` variant to render the sidebar alongside an inset content
 * area with rounded corners.
 */
export const Inset: Story = {
  render: () => <ExampleSidebar variant="inset" />,
}
