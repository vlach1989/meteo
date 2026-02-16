# Project Constitution: Meteo App

## 1. Core Principles

- **Source of Truth:** The Specification (`spec.md`) is the primary authority.
  Code must reflect the spec.
- **Simplicity First:** Leverage Google Sheets for data management to avoid
  complex backend infrastructure.
- **Type Safety:** Strict TypeScript usage is mandatory to ensure data from CSVs
  is handled predictably.

## 2. Tech Stack Constraints

- **Framework:** Next.js 16 (App Router)
  - Use **Server Components** by default for data fetching.
  - Adhere strictly to `page.tsx` and `layout.tsx` conventions.
- **Styling:** \* **Mantine UI** for core components (Buttons, Modals, Inputs).
  - **Custom CSS Modules:** Each component must have its own `.module.css`
    file. No global CSS or utility-first frameworks (like Tailwind) unless
    explicitly specified.
- **Data Layer:** \* **Source:** Google Sheets via Public CSV URL export.
  - **Fetching:** Use `fetch` with appropriate revalidation tags (ISR) to keep
    sheet data fresh.
  - **Parsing:** Use a lightweight parsing strategy (e.g., `papaparse`) to map
    CSV rows to TypeScript Interfaces.

## 3. Architecture Rules

- **Component Structure:**
  Each component must follow this folder pattern:
  ```text
  components/
    MyComponent/
      MyComponent.tsx
      MyComponent.module.css
      index.ts
  ```
- **Data Integration:** Create a dedicated utility `lib/sheets.ts` to handle the
  logic for CSV fetching and data transformation.
- **State Management:** Use `nuqs` library for global state management. We want
  a persistent state management solution which can be used for sharing app state
  across users.
- **Docs & Types:** All components and utilities must be well-documented with
  JSDoc
  comments. TypeScript interfaces must be defined for all data structures, and
  no `any` types are allowed.
- **Imports:** Imports should be sorted from external libraries to internal
  modules, and should be grouped by type (e.g., React imports, then third-party
  libraries, then local components/utilities).

## 4. Definition of Done (DoD)

- The implementation matches the requirements in `spec.md`.
- TypeScript compiles without errors; avoid using the `any` type.
- Components are responsive and utilize Mantine’s grid/breakpoint system.
- CSV data from Google Sheets is correctly typed and rendered in the UI.
- Check completed tasks in the Task List (`plans/task-list.md`) to ensure all
  features are implemented.
