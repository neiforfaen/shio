import { AspectRatio } from "@repo/shadcn-ui/components/ui/aspect-ratio"
import type { Meta, StoryObj } from "@storybook/react"

/**
 * Displays content within a desired ratio.
 */
const meta = {
  title: "shadcn-ui/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default 16:9 aspect ratio, commonly used for video and photography.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <AspectRatio {...args}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted text-muted-foreground text-sm">
          16:9
        </div>
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: 16 / 9,
  },
}

/**
 * Use a `1:1` ratio for square content, such as profile photos or thumbnails.
 */
export const Square: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <AspectRatio {...args}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted text-muted-foreground text-sm">
          1:1
        </div>
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: 1,
  },
}

/**
 * Use a `9:16` ratio for portrait-oriented content, such as mobile video.
 */
export const Portrait: Story = {
  render: (args) => (
    <div className="w-[300px]">
      <AspectRatio {...args}>
        <div className="flex h-full w-full items-center justify-center rounded-md bg-muted text-muted-foreground text-sm">
          9:16
        </div>
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: 9 / 16,
  },
}
