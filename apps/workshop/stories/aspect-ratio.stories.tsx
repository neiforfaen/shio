import { AspectRatio } from "@repo/shadcn-ui/components/ui/aspect-ratio"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

/**
 * Displays content within a desired ratio.
 */
const meta = {
  title: "shadcn-ui/AspectRatio",
  component: AspectRatio,
  decorators: [Center],
} satisfies Meta<typeof AspectRatio>

export default meta

type Story = StoryObj<typeof meta>

function renderRatioBox(args: { ratio: number }, label: string) {
  return (
    <div className="w-[300px]">
      <AspectRatio {...args}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted text-muted-foreground text-sm">
          {label}
        </div>
      </AspectRatio>
    </div>
  )
}

/**
 * The default 16:9 aspect ratio, commonly used for video and photography.
 */
export const Default: Story = {
  render: (args) => renderRatioBox(args, "16:9"),
  args: {
    ratio: 16 / 9,
  },
}

/**
 * Use a `1:1` ratio for square content, such as profile photos or thumbnails.
 */
export const Square: Story = {
  render: (args) => renderRatioBox(args, "1:1"),
  args: {
    ratio: 1,
  },
}

/**
 * Use a `9:16` ratio for portrait-oriented content, such as mobile video.
 */
export const Portrait: Story = {
  render: (args) => renderRatioBox(args, "9:16"),
  args: {
    ratio: 9 / 16,
  },
}
