# Shadcn-UI Storybook Stories Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Storybook story file for every component in `packages/shadcn-ui/components/ui` (except `direction.tsx`, which has no visual output) so `apps/workshop` documents the full component library.

**Architecture:** One `<name>.stories.tsx` file per `packages/shadcn-ui/components/ui/<name>.tsx`, created in `apps/workshop/stories/`, following the exact structure already established by `apps/workshop/stories/button.stories.tsx`. Tasks are grouped by theme (atoms, overlays, menus, complex/data components) so each task's stories can share composition idioms. All 8 tasks are independent of each other and of any shared code — they only read from `packages/shadcn-ui` (read-only) and create new files in `apps/workshop/stories/`.

**Tech Stack:** Storybook 10 (`@storybook/nextjs-vite`), React 19, TypeScript, `@repo/shadcn-ui` component package (built on `@base-ui/react` primitives, `cva` for variants).

## Global Constraints

- New files go only in `apps/workshop/stories/`, never under `packages/shadcn-ui` (read-only reference).
- File name = source file's basename: `packages/shadcn-ui/components/ui/<name>.tsx` → `apps/workshop/stories/<name>.stories.tsx`.
- Import the component(s) from `@repo/shadcn-ui/components/ui/<name>` (same import path style as `button.stories.tsx`'s `@repo/shadcn-ui/components/ui/button`).
- `meta.title` is `"shadcn-ui/<PascalCase(name)>"` where `<PascalCase(name)>` is the kebab-case filename converted to PascalCase, treating `otp` as `OTP` (e.g. `input-otp` → `InputOTP`, `alert-dialog` → `AlertDialog`, `chart` → `Chart`).
- `meta.component` is the root/outermost exported component for that file (the one whose name the title is based on; for `chart.tsx` there's no literal `Chart` export, use `ChartContainer`).
- `meta.tags` is always `["autodocs"]`.
- A JSDoc comment (`/** ... */`) sits directly above `const meta = ...`, 1 sentence describing what the component is for, in the same voice as Button's ("Displays a button or a component that looks like a button.").
- Every `Story` export has its own JSDoc comment directly above it, 1-2 sentences, in the same voice as Button's existing story comments (e.g. "Use the `outline` button to reduce emphasis on secondary actions...").
- The `args`-vs-`render` choice is about composition, not about whether the prop is `cva`-driven. A **single, non-compound element** (Input, Label, Textarea, Skeleton's className, Separator's orientation, etc.) always uses `meta.args`/`meta.argTypes` for whatever props it exposes — variant, size, placeholder, children, disabled, orientation, anything — exactly like Button already does for its non-`cva` `children` prop (`argTypes.children: { control: "text" }`). Use `render` only when a story's children must be composed from multiple sub-components (it's a **compound/multi-part** component, or a single component whose meaningful demo requires wrapping content, like Badge needing a default child or Skeleton needing assembled shapes) — in that case omit `meta.args`/`meta.argTypes` and build every `Story` via `render: (args) => (...)`, mirroring Button's `Loading`/`WithIcon`/`Icon` stories. When a later story only changes which `args` are passed to the same composition, reuse the earlier story's `render` (e.g. `render: Default.render`) rather than duplicating the JSX.
- For overlay/disclosure primitives (popover, tooltip, dialog, sheet, drawer, dropdown-menu, context-menu, menubar, navigation-menu, hover-card, select, combobox, command, accordion, collapsible, tabs): check the primitive's props for an uncontrolled "start open" prop (e.g. `defaultOpen`, `defaultValue`, `defaultChecked`). Where one exists, set it on at least one story so the content is visible in the canvas without requiring a click. Where none exists, render the trigger + structure closed — that's a faithful Default, don't fight the component to force it open.
- Do not modify `apps/workshop/.storybook/*`, `apps/workshop/package.json`, or anything under `packages/shadcn-ui`.

---

## Pattern Reference

Two fully worked examples covering the two structural shapes used across the 53 remaining components. Every task below builds on these patterns — don't invent a different structure.

### Shape A — single component, `cva` variant prop (e.g. Badge)

Source (`packages/shadcn-ui/components/ui/badge.tsx`): `Badge` takes `variant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"` (default `"default"`), no `size`.

```tsx
import { Badge } from "@repo/shadcn-ui/components/ui/badge"
import type { Meta, StoryObj } from "@storybook/react"

/**
 * Displays a small badge for status, counts, or labels.
 */
const meta = {
  title: "shadcn-ui/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
    },
  },
  args: {
    variant: "default",
    children: "Badge",
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default badge, used for general labels and counts.
 */
export const Default: Story = {}

/**
 * Use the `secondary` badge for less prominent labels.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
}

/**
 * Use the `destructive` badge to flag errors or critical states.
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
}

/**
 * Use the `outline` badge to reduce visual weight.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
  },
}

/**
 * Use the `ghost` badge for minimal, low-emphasis labels.
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
}

/**
 * Use the `link` badge for a text-only, tertiary label.
 */
export const Link: Story = {
  args: {
    variant: "link",
  },
}
```

### Shape B — compound component, no flippable root prop (e.g. Alert)

Source (`packages/shadcn-ui/components/ui/alert.tsx`): exports `Alert` (`variant: "default" | "destructive"`), `AlertTitle`, `AlertDescription`, `AlertAction`.

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@repo/shadcn-ui/components/ui/alert"
import { Button } from "@repo/shadcn-ui/components/ui/button"
import type { Meta, StoryObj } from "@storybook/react"
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"

/**
 * Displays a callout for important, contextual messages.
 */
const meta = {
  title: "shadcn-ui/Alert",
  component: Alert,
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

/**
 * The default alert, used for general informational messages.
 */
export const Default: Story = {
  render: () => (
    <Alert>
      <CheckCircle2Icon />
      <AlertTitle>Success! Your changes have been saved.</AlertTitle>
      <AlertDescription>
        This is an alert with icon, title and description.
      </AlertDescription>
    </Alert>
  ),
}

/**
 * Use the `destructive` variant to flag errors that need attention.
 */
export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>Unable to process your payment.</AlertTitle>
      <AlertDescription>
        Please verify your billing information and try again.
      </AlertDescription>
    </Alert>
  ),
}

/**
 * Add an `AlertAction` to give the user something to do about the alert.
 */
export const WithAction: Story = {
  render: () => (
    <Alert>
      <CheckCircle2Icon />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>A new version is ready to install.</AlertDescription>
      <AlertAction>
        <Button size="sm">Update</Button>
      </AlertAction>
    </Alert>
  ),
}
```

---

## File Structure

53 new files in `apps/workshop/stories/`, one per source file below (grouped by task):

- **Task 1:** `aspect-ratio.stories.tsx`, `checkbox.stories.tsx`, `input.stories.tsx`, `label.stories.tsx`, `separator.stories.tsx`, `skeleton.stories.tsx`, `textarea.stories.tsx`
- **Task 2:** `badge.stories.tsx`, `kbd.stories.tsx`, `slider.stories.tsx`, `spinner.stories.tsx`, `switch.stories.tsx`, `toggle.stories.tsx`, `tooltip.stories.tsx`
- **Task 3:** `avatar.stories.tsx`, `card.stories.tsx`, `collapsible.stories.tsx`, `scroll-area.stories.tsx`, `progress.stories.tsx`, `radio-group.stories.tsx`, `resizable.stories.tsx`
- **Task 4:** `button-group.stories.tsx`, `input-group.stories.tsx`, `item.stories.tsx`, `field.stories.tsx`, `toggle-group.stories.tsx`, `sonner.stories.tsx`, `empty.stories.tsx`
- **Task 5:** `accordion.stories.tsx`, `alert.stories.tsx`, `breadcrumb.stories.tsx`, `hover-card.stories.tsx`, `popover.stories.tsx`, `tabs.stories.tsx`, `pagination.stories.tsx`
- **Task 6:** `dialog.stories.tsx`, `alert-dialog.stories.tsx`, `drawer.stories.tsx`, `sheet.stories.tsx`, `table.stories.tsx`, `input-otp.stories.tsx`
- **Task 7:** `dropdown-menu.stories.tsx`, `context-menu.stories.tsx`, `menubar.stories.tsx`, `navigation-menu.stories.tsx`, `select.stories.tsx`, `native-select.stories.tsx`
- **Task 8:** `command.stories.tsx`, `combobox.stories.tsx`, `calendar.stories.tsx`, `carousel.stories.tsx`, `chart.stories.tsx`, `sidebar.stories.tsx`

---

### Task 1: Foundational simple atoms

**Files:**
- Read: `packages/shadcn-ui/components/ui/{aspect-ratio,checkbox,input,label,separator,skeleton,textarea}.tsx`
- Create: `apps/workshop/stories/{aspect-ratio,checkbox,input,label,separator,skeleton,textarea}.stories.tsx`

**Interfaces:**
- Consumes: nothing from other tasks. Reference `apps/workshop/stories/button.stories.tsx` (already exists) and the Pattern Reference above for structure.
- Produces: the 7 files listed above. No other task depends on these.

- [ ] **Step 1: Read the 7 source files** to confirm each component's props (all are small, single-purpose wrappers around an HTML element or one base-ui primitive).

- [ ] **Step 2: Write each story file** per these specs:
  - `aspect-ratio.tsx` exports `AspectRatio` with a required `ratio: number` prop, rendered around a child (e.g. an `<img>` or colored `div`). Stories: `Default` (`ratio={16 / 9}`), `Square` (`ratio={1}`), `Portrait` (`ratio={9 / 16}`).
  - `checkbox.tsx` exports `Checkbox` (base-ui `CheckboxPrimitive.Root` + `Indicator`), props include `checked`/`defaultChecked`, `disabled`. Stories: `Default`, `Checked` (`defaultChecked: true`), `Disabled` (`disabled: true`).
  - `input.tsx` exports `Input` (`React.ComponentProps<"input">`, supports `type`). Stories: `Default` (`placeholder: "Email"`), `Disabled` (`disabled: true`), `WithType` showing `type="password"` or `type="file"`.
  - `label.tsx` exports `Label` (`React.ComponentProps<"label">`). Stories: `Default` (render with text content, e.g. "Email address").
  - `separator.tsx` exports `Separator` (base-ui `SeparatorPrimitive`), prop `orientation: "horizontal" | "vertical"` (default `"horizontal"`). Stories: `Horizontal`, `Vertical` (render inside a flex row with fixed height so it's visible).
  - `skeleton.tsx` exports `Skeleton` (plain `div`, no special props beyond `className`). Stories: `Default` (render a few skeleton shapes — e.g. a circle + two lines — composed via `className`, similar to the common shadcn skeleton card example).
  - `textarea.tsx` exports `Textarea` (`React.ComponentProps<"textarea">`). Stories: `Default` (`placeholder: "Type your message here."`), `Disabled` (`disabled: true`).

- [ ] **Step 3: Verify types**

Run: `pnpm --filter workshop check-types`
Expected: exits 0, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add apps/workshop/stories/aspect-ratio.stories.tsx apps/workshop/stories/checkbox.stories.tsx apps/workshop/stories/input.stories.tsx apps/workshop/stories/label.stories.tsx apps/workshop/stories/separator.stories.tsx apps/workshop/stories/skeleton.stories.tsx apps/workshop/stories/textarea.stories.tsx
git commit -m "feat: add storybook stories for foundational form/layout atoms"
```

---

### Task 2: Simple atoms — feedback & controls

**Files:**
- Read: `packages/shadcn-ui/components/ui/{badge,kbd,slider,spinner,switch,toggle,tooltip}.tsx`
- Create: `apps/workshop/stories/{badge,kbd,slider,spinner,switch,toggle,tooltip}.stories.tsx`

**Interfaces:**
- Consumes: nothing from other tasks (independent). Use the Shape A example (Badge) directly — `badge.stories.tsx` should match the Pattern Reference example essentially verbatim.
- Produces: the 7 files listed above.

- [ ] **Step 1: Read the 7 source files** (badge already shown in full in the Pattern Reference; read the other 6).

- [ ] **Step 2: Write each story file** per these specs:
  - `badge.tsx`: use the Shape A example from the Pattern Reference verbatim (6 variants: `default`, `secondary`, `destructive`, `outline`, `ghost`, `link` — Stories `Default`, `Secondary`, `Destructive`, `Outline`, `Ghost`, `Link`).
  - `kbd.tsx` exports `Kbd` and `KbdGroup` (plain elements, no variants). Stories: `Default` (single key, e.g. `<Kbd>⌘</Kbd>`), `Group` (render `KbdGroup` with multiple `Kbd`s, e.g. `⌘` + `K`).
  - `slider.tsx` exports `Slider` (base-ui `Slider`), supports `defaultValue`, `min`, `max`, `step`, `disabled`. Stories: `Default` (`defaultValue: [50]`), `Range` (`defaultValue: [25, 75]`), `Disabled` (`disabled: true`).
  - `spinner.tsx` exports `Spinner` (`<svg>` wrapper, just `className`). Stories: `Default`, `Small`/`Large` showing size via `className` (e.g. `className="size-8"`).
  - `switch.tsx` exports `Switch` (base-ui `Switch`), props `checked`/`defaultChecked`, `disabled`. Stories: `Default`, `Checked` (`defaultChecked: true`), `Disabled` (`disabled: true`).
  - `toggle.tsx` exports `Toggle` with `variant: "default" | "outline"` (default `"default"`) and `size: "default" | "sm" | "lg"` (default `"default"`). Stories: `Default`, `Outline`, `Small` (`size: "sm"`), `Large` (`size: "lg"`), `Disabled` (`disabled: true`) — same shape as Button's story file (this one also has a variant × size matrix).
  - `tooltip.tsx` exports `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`. Every story must wrap its render in `<TooltipProvider>`. Stories: `Default` (`render: () => (<TooltipProvider><Tooltip defaultOpen><TooltipTrigger>Hover</TooltipTrigger><TooltipContent>Add to library</TooltipContent></Tooltip></TooltipProvider>)`).

- [ ] **Step 3: Verify types**

Run: `pnpm --filter workshop check-types`
Expected: exits 0, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add apps/workshop/stories/badge.stories.tsx apps/workshop/stories/kbd.stories.tsx apps/workshop/stories/slider.stories.tsx apps/workshop/stories/spinner.stories.tsx apps/workshop/stories/switch.stories.tsx apps/workshop/stories/toggle.stories.tsx apps/workshop/stories/tooltip.stories.tsx
git commit -m "feat: add storybook stories for simple feedback and control atoms"
```

---

### Task 3: Simple layout & display

**Files:**
- Read: `packages/shadcn-ui/components/ui/{avatar,card,collapsible,scroll-area,progress,radio-group,resizable}.tsx`
- Create: `apps/workshop/stories/{avatar,card,collapsible,scroll-area,progress,radio-group,resizable}.stories.tsx`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: the 7 files listed above.

- [ ] **Step 1: Read the 7 source files.**

- [ ] **Step 2: Write each story file** per these specs:
  - `avatar.tsx` exports `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount`. Stories: `Default` (image + fallback initials), `Fallback` (broken/no `src`, showing initials only), `WithBadge` (`AvatarBadge` for an online-status dot), `Group` (`AvatarGroup` with 3 `Avatar`s + `AvatarGroupCount` showing `+2`).
  - `card.tsx` exports `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`. Stories: `Default` (header with title+description, content with a short paragraph, footer with a `Button`), `WithAction` (adds `CardAction` in the header, e.g. a `Button` or `Badge`).
  - `collapsible.tsx` exports `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`. Stories: `Default` (`render: () => (<Collapsible defaultOpen><CollapsibleTrigger>Toggle</CollapsibleTrigger><CollapsibleContent>...</CollapsibleContent></Collapsible>)`).
  - `scroll-area.tsx` exports `ScrollArea`, `ScrollBar`. Stories: `Default` (a fixed-height `ScrollArea` containing a long list of items, e.g. tag names, so the scrollbar is visible).
  - `progress.tsx` exports `Progress`, `ProgressTrack`, `ProgressIndicator`, `ProgressLabel`, `ProgressValue` (base-ui `Progress`), driven by a `value` prop. Stories: `Default` (`value: 50`), `Complete` (`value: 100`), `Empty` (`value: 0`).
  - `radio-group.tsx` exports `RadioGroup`, `RadioGroupItem` (base-ui radio group). Stories: `Default` (3 items with labels, `defaultValue` set to the first), `Disabled` (`disabled: true` on the group).
  - `resizable.tsx` exports `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`. Stories: `Default` (`render: () => (<ResizablePanelGroup direction="horizontal" className="max-w-md rounded-lg border"><ResizablePanel>One</ResizablePanel><ResizableHandle /><ResizablePanel>Two</ResizablePanel></ResizablePanelGroup>)`), `WithHandle` (same but `<ResizableHandle withHandle />` if that prop exists per the source file).

- [ ] **Step 3: Verify types**

Run: `pnpm --filter workshop check-types`
Expected: exits 0, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add apps/workshop/stories/avatar.stories.tsx apps/workshop/stories/card.stories.tsx apps/workshop/stories/collapsible.stories.tsx apps/workshop/stories/scroll-area.stories.tsx apps/workshop/stories/progress.stories.tsx apps/workshop/stories/radio-group.stories.tsx apps/workshop/stories/resizable.stories.tsx
git commit -m "feat: add storybook stories for simple layout and display components"
```

---

### Task 4: Form & grouping primitives

**Files:**
- Read: `packages/shadcn-ui/components/ui/{button-group,input-group,item,field,toggle-group,sonner,empty}.tsx`
- Create: `apps/workshop/stories/{button-group,input-group,item,field,toggle-group,sonner,empty}.stories.tsx`

**Interfaces:**
- Consumes: nothing from other tasks. `button-group.stories.tsx` should import `Button` from `@repo/shadcn-ui/components/ui/button`.
- Produces: the 7 files listed above.

- [ ] **Step 1: Read the 7 source files.**

- [ ] **Step 2: Write each story file** per these specs:
  - `button-group.tsx` exports `ButtonGroup`, `ButtonGroupText`, `ButtonGroupSeparator`. Root `orientation: "horizontal" | "vertical"` (default `"horizontal"`). Stories: `Default` (3 `Button`s grouped horizontally), `Vertical` (`orientation: "vertical"`), `WithSeparator` (insert `ButtonGroupSeparator` between buttons).
  - `input-group.tsx` exports `InputGroup`, `InputGroupAddon` (`align: "inline-start" | "inline-end" | "block-start" | "block-end"`, default `"inline-start"`), `InputGroupButton` (`size: "xs" | "sm" | "icon-xs" | "icon-sm"`, default `"xs"`), `InputGroupText`, `InputGroupInput`, `InputGroupTextarea`. Stories: `Default` (an `InputGroupInput` with a leading icon `InputGroupAddon`), `WithButton` (trailing `InputGroupAddon align="inline-end"` containing an `InputGroupButton`), `Textarea` (`InputGroupTextarea` variant).
  - `item.tsx` exports `ItemGroup`, `ItemSeparator` (`variant: "default" | "outline" | "muted"`, `size: "default" | "sm" | "xs"`), `Item` (`variant: "default" | "outline" | "muted"`), `ItemMedia` (`variant: "default" | "icon" | "image"`), `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`, `ItemHeader`, `ItemFooter`. Stories: `Default` (an `Item` with `ItemMedia` (icon), `ItemContent` with `ItemTitle`+`ItemDescription`, `ItemActions` with a `Button`), `Outline` (`variant: "outline"`), `Muted` (`variant: "muted"`), `Group` (`ItemGroup` with 2-3 `Item`s separated by `ItemSeparator`).
  - `field.tsx` exports `FieldSet`, `FieldLegend`, `FieldGroup` (consumes `orientation` on a sibling `Field` via context — read the file to confirm), `Field` (`orientation: "vertical" | "horizontal" | "responsive"`, default `"vertical"`), `FieldContent`, `FieldLabel`, `FieldTitle`, `FieldDescription`, `FieldSeparator`, `FieldError`. Stories: `Default` (a `Field` with `FieldLabel` + an `Input` + `FieldDescription`), `Horizontal` (`orientation: "horizontal"`, e.g. label beside a `Switch`), `WithError` (`FieldError` rendered below the input), `Set` (`FieldSet` + `FieldLegend` wrapping a `FieldGroup` of 2 `Field`s).
  - `toggle-group.tsx` exports `ToggleGroup`, `ToggleGroupItem` (read the file for the exact variant/size props — they likely mirror `toggle.tsx`'s `variant`/`size`). Stories: `Default` (3 `ToggleGroupItem`s, single selection), `Outline` (`variant: "outline"`), `Multiple` (`type="multiple"` if supported per the source file).
  - `sonner.tsx` exports `Toaster` (wraps the `sonner` package). Stories: `Default` (`render: () => (<><Toaster /><Button onClick={() => toast("Event has been created")}>Show toast</Button></>)`, importing `toast` from `"sonner"` and `Button` from `@repo/shadcn-ui/components/ui/button`).
  - `empty.tsx` exports `Empty`, `EmptyHeader`, `EmptyMedia` (`variant: "default" | "icon"`), `EmptyTitle`, `EmptyDescription`, `EmptyContent`. Stories: `Default` (icon `EmptyMedia` + `EmptyTitle` "No results found" + `EmptyDescription`), `WithAction` (adds a `Button` inside `EmptyContent`).

- [ ] **Step 3: Verify types**

Run: `pnpm --filter workshop check-types`
Expected: exits 0, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add apps/workshop/stories/button-group.stories.tsx apps/workshop/stories/input-group.stories.tsx apps/workshop/stories/item.stories.tsx apps/workshop/stories/field.stories.tsx apps/workshop/stories/toggle-group.stories.tsx apps/workshop/stories/sonner.stories.tsx apps/workshop/stories/empty.stories.tsx
git commit -m "feat: add storybook stories for form and grouping primitives"
```

---

### Task 5: Disclosure & lightweight overlays

**Files:**
- Read: `packages/shadcn-ui/components/ui/{accordion,alert,breadcrumb,hover-card,popover,tabs,pagination}.tsx`
- Create: `apps/workshop/stories/{accordion,alert,breadcrumb,hover-card,popover,tabs,pagination}.stories.tsx`

**Interfaces:**
- Consumes: nothing from other tasks. `alert.stories.tsx` should use the Shape B example from the Pattern Reference verbatim.
- Produces: the 7 files listed above.

- [ ] **Step 1: Read the 7 source files** (alert already shown in full in the Pattern Reference; read the other 6).

- [ ] **Step 2: Write each story file** per these specs:
  - `alert.tsx`: use the Shape B example from the Pattern Reference verbatim (Stories `Default`, `Destructive`, `WithAction`).
  - `accordion.tsx` exports `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` (base-ui accordion, root supports `type: "single" | "multiple"`, `defaultValue`). Stories: `Default` (3 `AccordionItem`s, `type="single"`, `defaultValue` set to the first item's value so it's open), `Multiple` (`type="multiple"`, two items open by default).
  - `breadcrumb.tsx` exports `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`. Stories: `Default` (3-level breadcrumb ending in `BreadcrumbPage`), `WithEllipsis` (use `BreadcrumbEllipsis` to collapse a middle segment).
  - `hover-card.tsx` exports `HoverCard`, `HoverCardTrigger`, `HoverCardContent` (base-ui `PreviewCardPrimitive`). Stories: `Default` (`render: () => (<HoverCard defaultOpen><HoverCardTrigger>@username</HoverCardTrigger><HoverCardContent>...</HoverCardContent></HoverCard>)`).
  - `popover.tsx` exports `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverHeader`, `PopoverTitle`, `PopoverDescription`. Stories: `Default` (`render: () => (<Popover defaultOpen><PopoverTrigger>Open</PopoverTrigger><PopoverContent><PopoverHeader><PopoverTitle>Dimensions</PopoverTitle><PopoverDescription>Set the dimensions.</PopoverDescription></PopoverHeader></PopoverContent></Popover>)`).
  - `tabs.tsx` exports `Tabs` (`variant: "default" | "line"`, default `"default"`), `TabsList`, `TabsTrigger`, `TabsContent`. Stories: `Default` (3 tabs, `defaultValue` set to the first), `Line` (`variant: "line"`).
  - `pagination.tsx` exports `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`. Stories: `Default` (Previous, a few page `PaginationLink`s with one `isActive`, an `PaginationEllipsis`, Next).

- [ ] **Step 3: Verify types**

Run: `pnpm --filter workshop check-types`
Expected: exits 0, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add apps/workshop/stories/accordion.stories.tsx apps/workshop/stories/alert.stories.tsx apps/workshop/stories/breadcrumb.stories.tsx apps/workshop/stories/hover-card.stories.tsx apps/workshop/stories/popover.stories.tsx apps/workshop/stories/tabs.stories.tsx apps/workshop/stories/pagination.stories.tsx
git commit -m "feat: add storybook stories for disclosure and lightweight overlay components"
```

---

### Task 6: Modal-style overlays & data display

**Files:**
- Read: `packages/shadcn-ui/components/ui/{dialog,alert-dialog,drawer,sheet,table,input-otp}.tsx`
- Create: `apps/workshop/stories/{dialog,alert-dialog,drawer,sheet,table,input-otp}.stories.tsx`

**Interfaces:**
- Consumes: nothing from other tasks. These import `Button` from `@repo/shadcn-ui/components/ui/button` for triggers/footers.
- Produces: the 6 files listed above.

- [ ] **Step 1: Read the 6 source files.**

- [ ] **Step 2: Write each story file** per these specs:
  - `dialog.tsx` exports `Dialog`, `DialogTrigger`, `DialogPortal`, `DialogClose`, `DialogOverlay`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`. Stories: `Default` (`render: () => (<Dialog defaultOpen><DialogTrigger asChild><Button variant="outline">Edit Profile</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Edit profile</DialogTitle><DialogDescription>Make changes to your profile here.</DialogDescription></DialogHeader><DialogFooter><Button type="submit">Save changes</Button></DialogFooter></DialogContent></Dialog>)` — check whether `DialogTrigger` actually supports a `render`/`asChild`-style prop per the source file and adjust accordingly).
  - `alert-dialog.tsx` exports `AlertDialog`, `AlertDialogTrigger`, `AlertDialogPortal`, `AlertDialogOverlay`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogMedia`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`. Stories: `Default` (`render: () => (<AlertDialog defaultOpen><AlertDialogTrigger>Delete</AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction>Continue</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>)`).
  - `drawer.tsx` exports `Drawer`, `DrawerTrigger`, `DrawerPortal`, `DrawerClose`, `DrawerOverlay`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription` (wraps `vaul`). Stories: `Default` (`render: () => (<Drawer><DrawerTrigger asChild><Button variant="outline">Open Drawer</Button></DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>Move Goal</DrawerTitle><DrawerDescription>Set your daily activity goal.</DrawerDescription></DrawerHeader><DrawerFooter><Button>Submit</Button><DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose></DrawerFooter></DrawerContent></Drawer>)` — `vaul`-based drawers typically can't render open by default in a static canvas, so it's fine for this one to render closed; don't fight it).
  - `sheet.tsx` exports `Sheet`, `SheetTrigger`, `SheetClose`, `SheetPortal`, `SheetOverlay`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`. Stories: `Default` (`render: () => (<Sheet defaultOpen><SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger><SheetContent><SheetHeader><SheetTitle>Edit profile</SheetTitle><SheetDescription>Make changes to your profile here.</SheetDescription></SheetHeader></SheetContent></Sheet>)`), `Right`/`Left`/`Top`/`Bottom` if `SheetContent` accepts a `side` prop per the source file — confirm and add those stories if so.
  - `table.tsx` exports `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`. Stories: `Default` (a small invoice-style table: header row with column labels, 3-4 body rows of sample data, a `TableCaption`).
  - `input-otp.tsx` exports `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator` (wraps the `input-otp` package, needs `maxLength` + a `render` prop per that library — check the source file for the exact API). Stories: `Default` (6-digit OTP input split into two groups of 3 separated by `InputOTPSeparator`).

- [ ] **Step 3: Verify types**

Run: `pnpm --filter workshop check-types`
Expected: exits 0, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add apps/workshop/stories/dialog.stories.tsx apps/workshop/stories/alert-dialog.stories.tsx apps/workshop/stories/drawer.stories.tsx apps/workshop/stories/sheet.stories.tsx apps/workshop/stories/table.stories.tsx apps/workshop/stories/input-otp.stories.tsx
git commit -m "feat: add storybook stories for modal overlays and table"
```

---

### Task 7: Menus & selects

**Files:**
- Read: `packages/shadcn-ui/components/ui/{dropdown-menu,context-menu,menubar,navigation-menu,select,native-select}.tsx`
- Create: `apps/workshop/stories/{dropdown-menu,context-menu,menubar,navigation-menu,select,native-select}.stories.tsx`

**Interfaces:**
- Consumes: nothing from other tasks. `menubar.tsx` reuses `DropdownMenu` internally per its source — read it to confirm whether the story needs to import anything beyond `@repo/shadcn-ui/components/ui/menubar`.
- Produces: the 6 files listed above.

- [ ] **Step 1: Read the 6 source files.**

- [ ] **Step 2: Write each story file** per these specs:
  - `dropdown-menu.tsx` exports `DropdownMenu`, `DropdownMenuPortal`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuGroup`, `DropdownMenuLabel`, `DropdownMenuItem`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuSeparator`, `DropdownMenuShortcut`. Stories: `Default` (trigger `Button` + content with `DropdownMenuLabel`, a few `DropdownMenuItem`s with `DropdownMenuShortcut`, a `DropdownMenuSeparator`), `WithCheckboxes` (`DropdownMenuCheckboxItem`s), `WithSubmenu` (`DropdownMenuSub`/`DropdownMenuSubTrigger`/`DropdownMenuSubContent`). Render closed by default (these are portal-based — Storybook's autodocs canvas can still show the trigger; that's acceptable per the Global Constraints rule).
  - `context-menu.tsx` mirrors dropdown-menu's shape (`ContextMenu`, `ContextMenuTrigger`, etc., plus `ContextMenuCheckboxItem`/`ContextMenuRadioGroup`/`ContextMenuRadioItem`). Stories: `Default` (a `ContextMenuTrigger` styled as a bordered box with placeholder text "Right click here", `ContextMenuContent` with a few `ContextMenuItem`s).
  - `menubar.tsx` exports `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarLabel`, `MenubarSeparator`, `MenubarShortcut`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent`. Stories: `Default` (a `Menubar` with 2-3 `MenubarMenu`s, e.g. "File" and "Edit", each with a few `MenubarItem`s).
  - `navigation-menu.tsx` exports `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuIndicator`. Stories: `Default` (a `NavigationMenu` with 2 top-level items, one with a dropdown `NavigationMenuContent` of links).
  - `select.tsx` exports `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton` (base-ui `Select` root is re-exported or imported separately — check the source file's imports for the root component name). Stories: `Default` (`SelectTrigger` with placeholder "Select a fruit", `SelectContent` with a `SelectGroup` + `SelectLabel` + 3-4 `SelectItem`s).
  - `native-select.tsx` exports `NativeSelect`, `NativeSelectOption`, `NativeSelectOptGroup` (plain `<select>` wrapper). Stories: `Default` (a few `NativeSelectOption`s), `WithGroups` (`NativeSelectOptGroup`s).

- [ ] **Step 3: Verify types**

Run: `pnpm --filter workshop check-types`
Expected: exits 0, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add apps/workshop/stories/dropdown-menu.stories.tsx apps/workshop/stories/context-menu.stories.tsx apps/workshop/stories/menubar.stories.tsx apps/workshop/stories/navigation-menu.stories.tsx apps/workshop/stories/select.stories.tsx apps/workshop/stories/native-select.stories.tsx
git commit -m "feat: add storybook stories for menu and select components"
```

---

### Task 8: Complex / data-driven components

**Files:**
- Read: `packages/shadcn-ui/components/ui/{command,combobox,calendar,carousel,chart,sidebar}.tsx`
- Create: `apps/workshop/stories/{command,combobox,calendar,carousel,chart,sidebar}.stories.tsx`

**Interfaces:**
- Consumes: nothing from other tasks. `chart.tsx` needs `recharts` and `combobox.tsx`/`command.tsx` need `cmdk` — both already declared as dependencies of `@repo/shadcn-ui` (confirmed in `packages/shadcn-ui/package.json`), so no new dependency installs are needed in `apps/workshop`.
- Produces: the 6 files listed above.

- [ ] **Step 1: Read the 6 source files.** These are the largest/most composed files in the package (up to 724 lines for `sidebar.tsx`) — read each fully before writing its story.

- [ ] **Step 2: Write each story file** per these specs:
  - `command.tsx` exports `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandSeparator`, `CommandItem`, `CommandShortcut` (wraps `cmdk`). Stories: `Default` (`Command` with `CommandInput`, `CommandList` containing a `CommandGroup` "Suggestions" with a few `CommandItem`s, a `CommandSeparator`, and a second `CommandGroup` "Settings").
  - `combobox.tsx` exports `ComboboxValue`, `ComboboxTrigger`, `ComboboxClear`, `ComboboxInput`, `ComboboxContent`, `ComboboxList`, `ComboboxItem`, `ComboboxGroup`, `ComboboxLabel`, `ComboboxCollection`, `ComboboxEmpty`, `ComboboxSeparator`, `ComboboxChips`, `ComboboxChip`, `ComboboxChipsInput` (base-ui `Combobox` root — check the source file's imports for how the root is named/re-exported). Stories: `Default` (single-select combobox over a short fruit/framework list), `Multiple` (using `ComboboxChips`/`ComboboxChip` for multi-select, if the source file's example usage supports it).
  - `calendar.tsx` exports `Calendar`, `CalendarDayButton` (wraps `react-day-picker`). Stories: `Default` (single-date selection, `mode="single"`, a `defaultMonth`/`selected` date so a date is visibly highlighted), `Range` (`mode="range"` with a `defaultMonth` and a selected range), `Multiple` (`mode="multiple"` if supported — confirm against the source file's prop types, which proxy `react-day-picker`'s `DayPicker` props).
  - `carousel.tsx` exports `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` (wraps `embla-carousel-react`). Stories: `Default` (5 `CarouselItem`s, each a numbered card, with `CarouselPrevious`/`CarouselNext`), `Vertical` (`orientation="vertical"` if the root accepts it per the source file).
  - `chart.tsx` exports `ChartContainer`, `ChartTooltipContent`, `ChartLegendContent` (wraps `recharts`). Stories: `Default` (a `ChartContainer` with a small static dataset rendering a `BarChart` from `recharts`, using `ChartTooltipContent` via `<ChartTooltip content={<ChartTooltipContent />} />` and `ChartLegendContent` via `<ChartLegend content={<ChartLegendContent />} />` — read the file's own doc/example usage if present, or recharts' own composition pattern, to wire the `ChartConfig` object and colors correctly).
  - `sidebar.tsx` exports `SidebarProvider`, `Sidebar`, `SidebarTrigger`, `SidebarRail`, `SidebarInset`, `SidebarInput`, `SidebarHeader`, `SidebarFooter`, `SidebarSeparator`, `SidebarContent`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton` (`variant: "default" | "outline"`, `size: "default" | "sm" | "lg"`), and more (read the full file — it's 724 lines with many more sub-parts than listed here). Every story MUST wrap its render in `<SidebarProvider>`. Stories: `Default` (`Sidebar` with `SidebarHeader`, a `SidebarContent` containing one `SidebarGroup` with a `SidebarMenu` of 3-4 `SidebarMenuItem`/`SidebarMenuButton`s, plus a `SidebarInset` showing a `SidebarTrigger` and placeholder page content — `defaultOpen` on the `SidebarProvider`), `Collapsed` (`SidebarProvider defaultOpen={false}`, `Sidebar collapsible="icon"`), `Floating` (`Sidebar variant="floating"`), `Inset` (`Sidebar variant="inset"`).

- [ ] **Step 3: Verify types**

Run: `pnpm --filter workshop check-types`
Expected: exits 0, no TypeScript errors.

- [ ] **Step 4: Verify runtime rendering for this batch specifically** (these are the highest-risk files for runtime-only errors that `tsc` won't catch — e.g. missing `recharts`/`embla-carousel-react` runtime wiring):

Run: `pnpm --filter workshop build-storybook`
Expected: exits 0, build succeeds with no errors for `command`, `combobox`, `calendar`, `carousel`, `chart`, or `sidebar` stories.

- [ ] **Step 5: Commit**

```bash
git add apps/workshop/stories/command.stories.tsx apps/workshop/stories/combobox.stories.tsx apps/workshop/stories/calendar.stories.tsx apps/workshop/stories/carousel.stories.tsx apps/workshop/stories/chart.stories.tsx apps/workshop/stories/sidebar.stories.tsx
git commit -m "feat: add storybook stories for complex data-driven components"
```

---

## Final Verification (after all 8 tasks)

- [ ] Run `pnpm --filter workshop check-types` once more from a clean state — expect 0 errors across all 53 new files plus the pre-existing `button.stories.tsx`.
- [ ] Run `pnpm --filter workshop build-storybook` — expect a full successful build covering all 54 story files.
- [ ] Run `pnpm --filter workshop dev` and spot-check in the browser: at minimum open `Badge` (Shape A), `Alert` (Shape B), `Dialog` or `Sheet` (overlay), `Select` or `Command` (menu/list), and `Sidebar` or `Chart` (most complex) to confirm they render without console errors.
