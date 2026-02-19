'use client';

import {LineChart} from '@mantine/charts';
import {SegmentedControl, type SegmentedControlItem, Stack} from '@mantine/core';
import {parseAsStringEnum, useQueryState} from 'nuqs';
import {LastWeekData} from '@/types/api';
import classes from './LastWeekChart.module.css';

type MetricKey = 'temp' | 'humidity' | 'windSpeed';

type MetricConfig = {
	label: string;
	unit: string;
	color: string;
};

const METRIC_CONFIG: Record<MetricKey, MetricConfig> = {
	temp: {label: 'Temperature', unit: '°C', color: 'blue.6'},
	humidity: {label: 'Humidity', unit: '%', color: 'green.6'},
	windSpeed: {label: 'Wind Speed', unit: 'm/s', color: 'cyan.6'},
};

const METRIC_OPTIONS: SegmentedControlItem[] = [
	{label: 'Temp', value: 'temp'},
	{label: 'Humidity', value: 'humidity'},
	{label: 'Wind', value: 'windSpeed'},
];

const metricParser = parseAsStringEnum(['temp', 'humidity', 'windSpeed']).withDefault('temp');

const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'});

/**
 * Chart component for displaying last week's weather data.
 * @param {{data: LastWeekData}} props - Component props.
 * @returns {JSX.Element} The rendered chart and controls.
 */
export function LastWeekChart({data}: {data: LastWeekData}) {
	const [metric, setMetric] = useQueryState('metric', metricParser);
	const selectedMetric: MetricKey = metric ?? 'temp';
	const selectedConfig = METRIC_CONFIG[selectedMetric];

	const chartData = data.map((item) => ({
		date: formatDate(item.date),
		[selectedMetric]: item[selectedMetric],
	}));

	return (
		<Stack className={classes.LastWeekChart} gap="lg">
			<SegmentedControl
				data={METRIC_OPTIONS}
				value={selectedMetric}
				onChange={(value) => setMetric(value as MetricKey)}
				fullWidth
			/>
			<div className={classes['LastWeekChart-chart']}>
				<LineChart
					data={chartData}
					dataKey="date"
					series={[{name: selectedMetric, color: selectedConfig.color, label: selectedConfig.label}]}
					curveType="natural"
					withLegend
					withYAxis
					withXAxis
					xAxisProps={{
						tickLine: false,
						axisLine: false,
						padding: {left: 20, right: 20},
					}}
					yAxisProps={{
						tickLine: false,
						axisLine: false,
						domain: ['auto', 'auto'],
						width: 35,
					}}
					dotProps={{
						r: 3,
						strokeWidth: 1.5,
						stroke: 'var(--mantine-color-body)',
					}}
					activeDotProps={{
						r: 5,
						strokeWidth: 1.5,
					}}
					h={320}
				/>
			</div>
		</Stack>
	);
}
