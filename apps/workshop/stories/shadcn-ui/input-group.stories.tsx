import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@repo/shadcn-ui/components/ui/input-group"
import type { Meta, StoryObj } from "@storybook/react"
import { SearchIcon, SendIcon } from "lucide-react"
import { Center } from "@/.storybook/decorators/center"

/**
 * Groups an input with related addons, such as icons and buttons.
 */
const meta = {
  component: InputGroup,
  decorators: [Center],
} satisfies Meta<typeof InputGroup>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default input group, with a leading icon addon.
 */
export const Default: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search..." />
    </InputGroup>
  ),
}

/**
 * Add a trailing `InputGroupAddon` with an `InputGroupButton` for an
 * in-input action.
 */
export const WithButton: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupInput placeholder="Ask anything..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs">
          <SendIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

/**
 * Use `InputGroupTextarea` to group a multi-line input instead.
 */
export const Textarea: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupTextarea placeholder="Ask anything..." />
      <InputGroupAddon align="block-end">
        <InputGroupButton size="sm" variant="outline">
          Send
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}
