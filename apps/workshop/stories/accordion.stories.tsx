import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/shadcn-ui/components/ui/accordion"
import type { Meta, StoryObj } from "@storybook/react"

/**
 * A vertically stacked set of interactive headings that each reveal a
 * section of content.
 */
const meta = {
  title: "shadcn-ui/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: {
    defaultValue: ["item-1"],
  },
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default accordion, where only one item can be open at a time.
 */
export const Default: Story = {
  render: (args) => (
    <Accordion className="w-96" {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the other components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

/**
 * Set `multiple` to allow more than one item to be open at once.
 */
export const Multiple: Story = {
  render: Default.render,
  args: {
    defaultValue: ["item-1", "item-2"],
    multiple: true,
  },
}
