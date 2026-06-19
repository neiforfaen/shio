import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@repo/shadcn-ui/components/ui/resizable"
import type { Meta, StoryObj } from "@storybook/react"

/**
 * Accessible resizable panel groups and layouts with keyboard support.
 */
const meta = {
  title: "shadcn-ui/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ResizablePanelGroup>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default resizable layout, split into two panels.
 */
export const Default: Story = {
  render: () => (
    <ResizablePanelGroup
      className="max-w-md rounded-lg border"
      orientation="horizontal"
    >
      <ResizablePanel>
        <div className="flex h-32 items-center justify-center">One</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <div className="flex h-32 items-center justify-center">Two</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

/**
 * Add `withHandle` to `ResizableHandle` to render a visible grip indicator
 * on the divider.
 */
export const WithHandle: Story = {
  render: () => (
    <ResizablePanelGroup
      className="max-w-md rounded-lg border"
      orientation="horizontal"
    >
      <ResizablePanel>
        <div className="flex h-32 items-center justify-center">One</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <div className="flex h-32 items-center justify-center">Two</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
