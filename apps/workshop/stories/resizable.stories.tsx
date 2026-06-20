import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/shadcn-ui/components/ui/resizable"
import type { Meta, StoryObj } from "@storybook/react"
import { Center } from "@/.storybook/decorators/center"

/**
 * Accessible resizable panel groups and layouts with keyboard support.
 */
const meta = {
  title: "shadcn-ui/Resizable",
  component: ResizablePanelGroup,
  decorators: [Center],
} satisfies Meta<typeof ResizablePanelGroup>

export default meta

type Story = StoryObj<typeof meta>

function ExampleResizable({ withHandle }: { withHandle?: boolean }) {
  return (
    <ResizablePanelGroup
      className="max-w-md rounded-lg border"
      orientation="horizontal"
    >
      <ResizablePanel>
        <div className="flex h-32 items-center justify-center">One</div>
      </ResizablePanel>
      <ResizableHandle withHandle={withHandle} />
      <ResizablePanel>
        <div className="flex h-32 items-center justify-center">Two</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

/**
 * The default resizable layout, split into two panels.
 */
export const Default: Story = {
  render: () => <ExampleResizable />,
}

/**
 * Add `withHandle` to `ResizableHandle` to render a visible grip indicator
 * on the divider.
 */
export const WithHandle: Story = {
  render: () => <ExampleResizable withHandle />,
}
