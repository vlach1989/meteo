# Project Constitution: Meteo App

## 1. Core Principles

- **Specification Authority:** The Specification (`spec.md`) is the final
  authority. Any code deviating from the spec without an updated spec file is
  considered a bug.
- **Simplicity First:** Leverage Google Sheets (CSV) as the exclusive data
  source to avoid complex backend infrastructure.
- **Type Safety:** 100% TypeScript coverage is mandatory; interfaces must
  exactly mirror CSV column headers to ensure predictable data handling.

## 2. Tech Stack Constraints

- **Framework:** Next.js 16 (App Router).
  - **Server-First:** Use Server Components by default for data fetching.
  - **Routing:** Adhere strictly to `page.tsx`, `layout.tsx`, `loading.tsx`, and
    `error.tsx` conventions.
- **Styling (Mantine UI + CSS Modules):**
  - **Architecture:** Use Mantine for core components and CSS Modules for custom
    styling.
  - **No Utilities:** Strictly no Tailwind CSS, global CSS, or utility-first
    frameworks.
  - **Naming Convention:** Use **SUIT CSS** (e.g., `.ComponentName`,
    `.ComponentName--modifier`, `.ComponentName-descendant`) for clarity and
    maintainability.
- **Data Layer:**
  - **Source:** Google Sheets via Public CSV URL export.
  - **Strategy:** Use native `fetch` with appropriate revalidation tags (ISR)
    for 60s freshness.
  - **Parsing:** Use `papaparse` for mapping CSV rows to strict TypeScript
    Interfaces.

## 3. Architecture Rules

- **Strict Component Pattern:**
  Each component must follow this folder pattern:
  ```text
  components/
    [ComponentName]/
      [ComponentName].tsx
      [ComponentName].module.css
      index.ts
  ```
- **Data Integration:** Centralize logic in `lib/sheets.ts` for CSV fetching and
  transformation.
- **State Management:** Use `nuqs` for persistent, sharable global state via URL
  parameters.
- **Imports:** Sort imports from external libraries to internal modules; group
  by type (React, third-party, local components, styles).
- **Modularization:** Split code into reusable pieces; avoid monolithic files.
  Decouple helpers in separate files. Common or shared helpers should be placed
  in `lib/`, specific next to the component if only used there.
- **Docs:** Document all functions and components with JSDoc comments, including
  parameter
  types and return values.

## 4. Definition of Done (DoD)

- The implementation matches the requirements in `spec.md`.
- TypeScript compiles without errors; avoid using the `any` type.
- Components are responsive and utilize Mantine’s grid/breakpoint system.
- CSV data from Google Sheets is correctly typed and rendered in the UI.
- Check completed tasks in the Task List (`plans/task-list.md`) to ensure all
  features are implemented.
- Do the linting and formatting checks pass without errors
