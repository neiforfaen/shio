import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@repo/shadcn-ui/components/ui/combobox"
import type { Meta, StoryObj } from "@storybook/react"

const frameworks = ["Next.js", "Remix", "Astro", "Vite", "Nuxt.js"]

/**
 * Combines a text input with a list of suggestions, filtered as the user
 * types.
 */
const meta = {
  title: "shadcn-ui/Combobox",
  component: Combobox,
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default, single-select combobox.
 */
export const Default: Story = {
  render: () => (
    <Combobox items={frameworks}>
      <ComboboxInput className="w-56" placeholder="Search frameworks..." />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxList>
          {(framework: string) => (
            <ComboboxItem key={framework} value={framework}>
              {framework}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

/**
 * Set `multiple` to allow selecting more than one item, shown as removable
 * chips.
 */
export const Multiple: Story = {
  render: () => {
    const anchor = useComboboxAnchor()

    return (
      <Combobox items={frameworks} multiple>
        <ComboboxChips className="w-72" ref={anchor}>
          <ComboboxValue>
            {(value: string[]) =>
              value.map((framework) => (
                <ComboboxChip key={framework}>{framework}</ComboboxChip>
              ))
            }
          </ComboboxValue>
          <ComboboxChipsInput placeholder="Search frameworks..." />
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            {(framework: string) => (
              <ComboboxItem key={framework} value={framework}>
                {framework}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}
