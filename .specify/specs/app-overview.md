# Spec: App Overview - [Meteo]

## 1. Executive Summary

A high-performance, read-only web application built with Next.js 16, using
Google Sheets as a headless CMS via CSV export. The app is in fact a dashboard
of current temperature values. The UI is built with Mantine UI components,
styled with CSS Modules.

## 2. Core User Journeys

User lands on the home page and immediately sees a navigation between "Current
data" and "Historical Data".
On the "Current data" there will be switcher between current temperature,
humidity and wind speed (using `api/now` endpoint). On the historical data page
there will be data for the last 7 days in form
of a line chart.

## 3. Data Architecture (The "Schema")

Our "Database" are two Google Sheets. We already have two routes: `api/now`,
respecting types from `types/api` and `api/last-week` which returns data for the
last 7 days. Both endpoints fetch data from Google Sheets CSV export, parse it,
and return it in a structured format.

## 4. App Structure (Sitemap)

- `/` (Home): fallback page that render same content as `/now`.
- `/now`: The page displaying current values of temperature, humidity and wind
  speed. Data is fetched from `api/now` endpoint.
- `/last-week`: The page displaying historical data for the last 7 days. Data is
  fetched from `api/last-week` endpoint.

## 5. Global Requirements

- **Real-time-ish:** Data must revalidate every 60 seconds (ISR).
- **Design System:** Must use **Mantine UI** components styled with **CSS
  Modules**.
- **Loading States:** All data-fetching pages must have a Mantine `Skeleton`
  loader.
