'use client';

import {LineChart} from '@mantine/charts';
import {Alert, Box} from '@mantine/core';

interface TemperatureData {
	obsTimeLocal: string;
	temp: number;
}

interface TemperatureChartClientProps {
	data: TemperatureData[];
}

const TICK_FORMAT: Intl.DateTimeFormatOptions = {
	weekday: 'short',
	month: 'short',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit',
};

const formatLabel = (value: string) => new Date(value).toLocaleString(undefined, TICK_FORMAT);

export function TemperatureChartClient({data}: TemperatureChartClientProps) {
	if (!data || data.length === 0) {
		return (
			<Alert color="blue" title="Info">
				No data available for the selected period.
			</Alert>
		);
	}

	return (
		<Box style={{width: '100%', height: '100%'}}>
			<LineChart
				h="100%"
				w="100%"
				data={data}
				dataKey="obsTimeLocal"
				series={[{name: 'temp', color: 'indigo.6', label: 'Temperature'}]}
				curveType="natural"
				withDots={false}
				xAxisLabel="Observation time"
				yAxisLabel="Temperature (°C)"
				xAxisProps={{tickFormatter: formatLabel}}
				tooltipProps={{
					labelFormatter: (value) => formatLabel(String(value)),
					formatter: (value: number) => [`${value.toFixed(1)} °C`, 'Temperature'],
				}}
			/>
		</Box>
	);
}
