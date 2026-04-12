Tailwind Design System — Gerenciador de Contas

Purpose
- Provide mobile-first, consistent Tailwind patterns for spacing, typography, cards, grids, and containers.

Spacing Scale Usage
- Use the Tailwind 4-step scale: 1 (p-1), 2 (p-2), 4 (p-4), 6 (p-6), 8 (p-8).
- Prefer: `p-4`, `px-4`, `py-3`, `gap-4`, `space-y-4` as defaults for card content and component spacing.
- Compact mobile spacing: `p-2`, `py-2`, `text-sm`.
- Use `md:` modifiers to scale up paddings: `md:px-6`, `md:py-4`.
- Avoid arbitrary pixel values; prefer scale tokens (e.g., `p-3` is allowed when needed).

Typography Patterns
- Base (mobile): `text-sm` for labels, `text-base` for main content, `text-lg` for prominent headings.
- Scale up at `md`: `md:text-base`, `md:text-lg`, `md:text-xl` where needed.
- Headings: `font-semibold` + uppercase for small labels, `font-bold` for amounts or primary numbers.
- Utility classes: `truncate` for long text in table cells, `leading-tight` for compact lines.

Card Layouts
- Card root: `w-full rounded-xl border border-border bg-card flex flex-col`.
- CardHeader: `px-4 py-3 md:px-6 md:py-4` and use `flex items-center justify-between`.
- CardContent: `px-4 py-2 md:px-6 md:py-4`, use `flex flex-col md:flex-row gap-3 md:gap-4` for internal layout.
- Skeleton/fallbacks use the same outer paddings for visual stability.

Responsive Grid Behavior
- Component groups: use `grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3`.
- Tables/cards: `min-w-0` on cell containers to allow truncation.
- For side-by-side cards use `w-full` on children; parent controls columns.

Common Container Widths
- Small container (narrow): `max-w-[20rem]` for compact widgets.
- Default container: `max-w-3xl` for central content blocks.
- Page container: use layout wrapper with `mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl`.

Utilities & Patterns
- Colors: keep semantic color for value cells (`text-emerald-600`, `text-red-500`) with `font-bold`.
- Heights: limit lists with `max-h-40 md:max-h-56` and `overflow-y-auto`.
- Sticky headers: `sticky top-0 z-10 bg-card border-b border-border`.
- Accessibility: ensure `aria-label` or visible labels; use `text-muted-foreground` for secondary info.

Migration Rules
- When refactoring: do not change logic, only replace inline spacing/typography with the tokens above.
- Prefer `truncate` and `min-w-0` instead of overflow clipping.

Examples
- Card header: `className="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between"`
- Table cell: `className="py-3 px-4 md:py-4 md:px-6 text-sm md:text-base truncate"`

Notes
- This is intentionally minimal to keep classes readable and consistent. Add exceptions only when necessary and document them in this file.
