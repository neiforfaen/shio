import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@repo/shadcn-ui/components/ui/avatar"
import type { Meta, StoryObj } from "@storybook/react"

/**
 * An image element with a fallback for representing the user.
 */
const meta = {
  title: "shadcn-ui/Avatar",
  component: Avatar,
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default avatar, with an image and a fallback shown while it loads.
 */
export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage alt="shadcn" src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

/**
 * Without an `AvatarImage`, the fallback is shown on its own.
 */
export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

/**
 * Add an `AvatarBadge` to indicate status, such as whether the user is
 * online.
 */
export const WithBadge: Story = {
  render: () => (
    <Avatar>
      <AvatarImage alt="shadcn" src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
}

/**
 * Use `AvatarGroup` to stack multiple avatars together, with
 * `AvatarGroupCount` showing how many more there are.
 */
export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage alt="shadcn" src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="vercel" src="https://github.com/vercel.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>LK</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+2</AvatarGroupCount>
    </AvatarGroup>
  ),
}
