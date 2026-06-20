import { Skeleton } from "@repo/shadcn-ui/components/ui/skeleton"
import type { Meta, StoryObj } from "@storybook/react"

/**
 * Used to show a placeholder while content is loading.
 */
const meta = {
  title: "shadcn-ui/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default skeleton, composed into shapes that mirror the loading content.
 */
export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
}
