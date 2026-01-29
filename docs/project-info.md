# Project Documentation

This document provides a more detailed explanation of the Meteo project.

## Architecture

The application is built with Next.js and React. It follows a simple
component-based architecture.

- `src/app/page.tsx`: The main entry point of the application.
- `src/app/now/page.tsx`: A server-side component that fetches and displays the
  current temperature.
- `src/components/TemperatureCard`: A reusable component to display the
  temperature.

## Data Fetching

The application fetches data from a CSV file specified by the `API_NOW`
environment variable. The data is parsed on the server-side using the
`papaparse` library.

## Styling

The application uses plain CSS for styling. The global styles are defined in
`src/global.css`, and component-specific styles are located alongside the
component files.
