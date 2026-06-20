import { Calendar } from "@repo/shadcn-ui/components/ui/calendar"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Center } from "@/.storybook/decorators/center"

/**
 * A date field component that allows users to enter and edit dates.
 */
const meta = {
  title: "Calendar",
  component: Calendar,
  decorators: [Center],
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default calendar, with a single date selected.
 */
export const Default: Story = {
  render: () => (
    <Calendar
      className="rounded-lg border"
      defaultMonth={new Date(2026, 5, 1)}
      mode="single"
      selected={new Date(2026, 5, 12)}
    />
  ),
}

/**
 * Use `mode="range"` to let the user select a start and end date.
 */
export const Range: Story = {
  render: () => (
    <Calendar
      className="rounded-lg border"
      defaultMonth={new Date(2026, 5, 1)}
      mode="range"
      selected={{ from: new Date(2026, 5, 8), to: new Date(2026, 5, 16) }}
    />
  ),
}

/**
 * Use `mode="multiple"` to let the user select several independent dates.
 */
export const Multiple: Story = {
  render: () => (
    <Calendar
      className="rounded-lg border"
      defaultMonth={new Date(2026, 5, 1)}
      mode="multiple"
      selected={[
        new Date(2026, 5, 4),
        new Date(2026, 5, 11),
        new Date(2026, 5, 18),
      ]}
    />
  ),
}
