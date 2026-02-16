# Plan 001: Initial Architecture & API Routes

## 1. Objective

Setup the project foundation, including the Mantine provider, the CSV fetching
utility, and the internal API routes that will serve as the data proxy for
Google Sheets.

## 2. Proposed Changes

### Configuration & Types

- **Types:** Create `types/api.ts` to define interfaces for `WeatherData` (
  current) and `HistoricalData` (7-day array).
- **Environment:** Add `SHEET_NOW_URL` and `SHEET_HISTORY_URL` to `.env.local`.

### Core Data Layer (`lib/sheets.ts`)

- Implement `fetchAndParseCSV<T>(url: string)`:
  - Uses native `fetch` with `{ next: { revalidate: 60 } }`.
  - Uses `papaparse` to convert CSV string to typed Objects.

### API Routes (Proxy Layer)

- **File:** `app/api/now/route.ts`: Fetches from the "Now" sheet, returns JSON.
- **File:** `app/api/last-week/route.ts`: Fetches from the "History" sheet,
  returns JSON.

### Global Layout & State

- **File:** `app/layout.tsx`:
  - Wrap children in `MantineProvider`.
  - Setup `nuqs` (Query State Provider) for persistent state management (
    sharing URLs).
- **File:** `components/Navigation/Navigation.tsx`: Main tabs/links for `/now`
  and `/last-week`.

## 3. Component Breakdown

- **NowCard**: A component for Temperature/Humidity/Wind Speed display.
- **HistoryChart**: A line chart component (using a Mantine-compatible library
  like `recharts`).

## 4. Dependencies to Install

- `papaparse`, `nuqs`, `@mantine/core`, `@mantine/hooks`, `lucide-react`.
