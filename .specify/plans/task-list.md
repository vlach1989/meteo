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
- [x] **Task 4.2:** Build the `/last-week` page:
  - Fetch data from `api/last-week`.
  - Render a Line Chart from Mantine (@mantine/charts) showing the last 7 days
    of data.
  - The chart should have a legend, tooltips, and appropriate axes labels. The
    x-axis should represent the dates, and the y-axis should represent the
    values of Temp/Humidity/Wind Speed. The points should be invisible by
    default, but should become visible when hovered over. The chart should also
    have a title that indicates which metric is being displayed (e.g., "
    Temperature Over the Last Week").
  - Implement a `nuqs` switcher for Temp/Humidity/Wind Speed, which will update
    the chart
    accordingly when toggled.
- [x] **Task 4.3:** Set up `/` as a fallback route that renders the content of
      `/now`.
- [x] **Task 4.4:** There is a metric switcher on both pages, which should be
      reusable. Refactor it into a separate component that can be used on both pages
      without code duplication. It should look like NowMetricSwitcher, but should be
      more generic and reusable. The component should also have appropriate styling
      to match the overall design of the app.
- [x] **Task 4.5:** The data from 'api/last-week' are too big, filter every 1
      hour to reduce the number of data points. This will make the chart more
      readable and improve performance.

## Phase 5: Validation

- [x] **Task 5.1:** Verify all components use local `.module.css` files.
- [x] **Task 5.2:** Ensure no `any` types remain in the codebase.
