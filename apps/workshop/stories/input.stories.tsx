import { Input } from "@repo/shadcn-ui/components/ui/input"
import type { Meta, StoryObj } from "@storybook/react"

/**
 * Displays a form input field or a component that looks like an input field.
 */
const meta = {
  title: "shadcn-ui/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
    },
  },
  args: {
    placeholder: "Email",
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default form of the input field.
 */
export const Default: Story = {}

/**
 * Add the `disabled` prop to prevent interaction with the input.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

/**
 * Use `type="password"` to mask sensitive input, such as passwords.
 */
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Password",
  },
}
