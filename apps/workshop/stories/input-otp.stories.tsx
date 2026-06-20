import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@repo/shadcn-ui/components/ui/input-otp"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

/**
 * Accessible one-time password input, split into individual character
 * slots.
 */
const meta = {
  title: "shadcn-ui/InputOTP",
  component: InputOTP,
  decorators: [Center],
  args: {
    maxLength: 6,
    children: null,
  },
} satisfies Meta<typeof InputOTP>

export default meta

type Story = StoryObj<typeof meta>

/**
 * A 6-digit OTP input, split into two groups of 3 with a separator.
 */
export const Default: Story = {
  render: (args) => (
    <InputOTP maxLength={args.maxLength}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
}
