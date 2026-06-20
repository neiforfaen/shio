import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@repo/shadcn-ui/components/ui/field"
import { Input } from "@repo/shadcn-ui/components/ui/input"
import { Switch } from "@repo/shadcn-ui/components/ui/switch"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

/**
 * Combines labels, controls, and helper text into a consistent form field
 * layout.
 */
const meta = {
  title: "shadcn-ui/Field",
  component: Field,
  decorators: [Center()],
} satisfies Meta<typeof Field>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default, vertically-stacked field.
 */
export const Default: Story = {
  render: () => (
    <Field className="w-72">
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" placeholder="you@example.com" type="email" />
      <FieldDescription>We'll never share your email.</FieldDescription>
    </Field>
  ),
}

/**
 * Use the `horizontal` orientation to place the label beside its control,
 * such as a switch.
 */
export const Horizontal: Story = {
  render: () => (
    <Field className="w-72" orientation="horizontal">
      <FieldContent>
        <FieldLabel htmlFor="notifications">Notifications</FieldLabel>
        <FieldDescription>Receive emails about your account.</FieldDescription>
      </FieldContent>
      <Switch id="notifications" />
    </Field>
  ),
}

/**
 * Render a `FieldError` below the control to surface a validation message.
 */
export const WithError: Story = {
  render: () => (
    <Field className="w-72">
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input defaultValue="ab" id="username" />
      <FieldError>Username must be at least 3 characters.</FieldError>
    </Field>
  ),
}

/**
 * Wrap a `FieldGroup` of related fields in a `FieldSet` with a
 * `FieldLegend`.
 */
export const WithLegend: Story = {
  render: () => (
    <FieldSet className="w-72">
      <FieldLegend>Address</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="street">Street</FieldLabel>
          <Input id="street" />
        </Field>
        <Field>
          <FieldLabel htmlFor="city">City</FieldLabel>
          <Input id="city" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}
