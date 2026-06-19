import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@repo/shadcn-ui/components/ui/menubar"
import type { Meta, StoryObj } from "@storybook/react"

/**
 * A horizontal menu bar, commonly used for application-level commands.
 */
const meta = {
  title: "shadcn-ui/Menubar",
  component: Menubar,
  tags: ["autodocs"],
} satisfies Meta<typeof Menubar>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default menubar, with a "File" and an "Edit" menu.
 */
export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}
