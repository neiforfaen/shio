import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/shadcn-ui/components/ui/carousel"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

const slides = Array.from({ length: 5 }, (_, i) => i + 1)

/**
 * A carousel with motion and swipe, built on Embla.
 */
const meta = {
  title: "shadcn-ui/Carousel",
  component: Carousel,
  decorators: [Center()],
} satisfies Meta<typeof Carousel>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default, horizontally-scrolling carousel.
 */
export const Default: Story = {
  render: () => (
    <Carousel className="w-64">
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide}>
            <div className="flex aspect-square items-center justify-center rounded-lg border text-4xl">
              {slide}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

/**
 * Set `orientation="vertical"` to scroll the slides top to bottom instead.
 */
export const Vertical: Story = {
  render: () => (
    <Carousel className="h-64 w-64" orientation="vertical">
      <CarouselContent className="h-64">
        {slides.map((slide) => (
          <CarouselItem key={slide}>
            <div className="flex h-full items-center justify-center rounded-lg border text-4xl">
              {slide}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
