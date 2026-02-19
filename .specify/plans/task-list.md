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

## Phase 6: New feature: Map

- [x] **Task 6.1:** Add a new page `/map` that displays a map using the
      `deck.gl` library. Current zoom and position of the map will be stored in
      URL (same way like other components in the app) and will be updated when user
      interacts with the map. Use the OpenStreetMap as base layer. Do not use map
      tiles from Mapbox or other providers that require an API key, use open
      resources for base map. Keep the component as simple as possible, without any
      additional features like markers, popups, etc. The main goal of this task is
      to implement the map and synchronize its state with the URL, so that the
      position and zoom can be shared via URL and will be preserved when user
      refreshes the page or navigates back and forth between pages. The map should
      also be responsive and work well on different screen sizes.
- [x] **Task 6.2:** Add a CurrentPosition component to the /now page, which will
      display the position & zoom which was set in the map on the `/map` page. This
      component will be updated when user interacts with the map on the `/map` page.
      The position and zoom will be displayed in a human-readable format (e.g., "
      Latitude: 40.7128, Longitude: -74.0060, Zoom: 12").

## Phase 7: State Management

- [x] **Task 7.1:** Since we are using `nuqs` for state management, we need to
      ensure that all components are properly
      subscribed to the relevant state slices and that the state updates are
      handled correctly. This includes ensuring that the state is updated when
      the user interacts with the components (e.g., toggling the metric switcher,
      interacting with the map) and that the components re-render accordingly.
      Check, if this is correctly set.
- [x] **Task 7.2:** The current implementation of `nuqs` is scattered across
      multiple components. This should be refactored into a more organized and
      centralized state management solution. This includes creating a single source
      of truth for the state and ensuring that all components are using the same
      state management logic. This will make the state management more
      maintainable and easier to debug.
- [x] **Task 7.3:** Implement a mechanism to persist the state in the URL, so
      that
      the state can be shared via URL and will be preserved when user refreshes
      the page or navigates back and forth between pages. Even if the user is on the
      `/map` page and sets a specific position and zoom, when they navigate to the
      `/now` page, the CurrentPosition component should reflect the same position
      and zoom that was set on the map. This will ensure a consistent user
      experience across different pages of the app.
- [x] **Task 7.4:** I do not want to save map state as primitive values in the
      URL, but rather as a JSON string. This will allow us to easily extend the map
      state in the future if needed (e.g., adding more properties like map style,
      layers, etc.) without having to change the URL structure. The JSON string
      should be properly encoded and decoded when saving and retrieving the state
      from the URL. This will ensure that the state is correctly preserved and can
      be easily shared via URL. Explore https://nuqs.dev/docs for more details on
      how to implement this.
