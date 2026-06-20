import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@repo/shadcn-ui/components/ui/command"
import type { Meta, StoryObj } from "@storybook/react"
import { CalendarIcon, SettingsIcon, SmileIcon, UserIcon } from "lucide-react"
import { Center } from "@/.storybook/decorators/center"

/**
 * A fast, composable command menu for searching and running actions.
 */
const meta = {
  title: "shadcn-ui/Command",
  component: Command,
  decorators: [Center()],
} satisfies Meta<typeof Command>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default command menu, with grouped suggestions and settings.
 */
export const Default: Story = {
  render: () => (
    <Command className="w-72 rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarIcon />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <SmileIcon />
            <span>Search Emoji</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <UserIcon />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
