- create chart component displaying temperature data over the last week
- use a line chart to visualize the temperature trend from mantine charts
- the data for component should be fetched from the /api/last-week route
- split the component to client and server parts
- the server part should fetch the data from the API route same way as other
  components and pass it to the client part
- the client part should receive the data as props and render the line chart
- the chart should have the following features:
  - the chart should have 100% height and width of its container
  - the x-axis should represent the obsTimeLocal values and should be
    formatted
  - the y-axis should represent the temp values
  - the chart should have appropriate labels and a legend
  - the chart should be responsive and visually appealing
  - the data should be visualized as a smooth line (use some smoothing
    technique) chart (not points)
  - the values should be accessible through tooltips on hover, the tooltip
    should be formatted to show obsTimeLocal and temp values
- add the same error handling as in other components
- ensure the component is fully typed with TypeScript
