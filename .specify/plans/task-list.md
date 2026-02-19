# Task List: Meteo App Implementation

## Phase 1: Shared UI Components

- [x] **Task 3.1:** Create `components/Navigation` using Mantine `Tabs` or
      `SegmentedControl` to switch between `/now` and `/last-week`.
- [x] **Task 3.2:** Apply custom `.module.css` for the Navigation component
      according to the Constitution.
- [x] **Task 3.3:** Build a `SkeletonLoader` component for data-fetching states.

## Phase 4: Feature Implementation

- [x] **Task 4.0:** Update navigation to navigation bar, which will be fixed on
      top of the page and will be visible on all pages. Each item in the navigation
      bar will be a link to the corresponding page. Each item will also have an icon
      from the `@tabler/icons` package, which will be displayed next to the text.
      The icons should be relevant to the content of the page.
- [x] **Task 4.1:** Build the `/now` page:
  - Implement a `nuqs` switcher for Temp/Humidity/Wind Speed.
  - Fetch data from `api/now` and display via Mantine components.
- [ ] **Task 4.2:** Build the `/last-week` page:
  - Fetch data from `api/last-week`.
  - Render a Line Chart showing the last 7 days of data.
- [x] **Task 4.3:** Set up `/` as a fallback route that renders the content of
      `/now`.

## Phase 5: Validation

- [ ] **Task 5.1:** Verify all components use local `.module.css` files.
- [ ] **Task 5.2:** Ensure no `any` types remain in the codebase.
