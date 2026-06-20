import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@repo/shadcn-ui/components/ui/native-select"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Center } from "@/.storybook/decorators/center"

/**
 * A native HTML select element, styled to match the rest of the form
 * controls.
 */
const meta = {
  title: "NativeSelect",
  component: NativeSelect,
  decorators: [Center],
} satisfies Meta<typeof NativeSelect>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default native select, with a handful of plain options.
 */
export const Default: Story = {
  render: () => (
    <NativeSelect defaultValue="apple">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
    </NativeSelect>
  ),
}

/**
 * Use `NativeSelectOptGroup` to group related options under a label.
 */
export const WithGroups: Story = {
  render: () => (
    <NativeSelect defaultValue="apple">
      <NativeSelectOptGroup label="Fruits">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="banana">Banana</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Vegetables">
        <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
        <NativeSelectOption value="potato">Potato</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
}
