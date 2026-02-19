'use client';

import {LineChart} from '@mantine/charts';
import {Stack} from '@mantine/core';
import {useQueryState} from 'nuqs';
import {LastWeekData} from '@/types/api';
import {MetricSwitcher} from '../MetricSwitcher';
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

const METRIC_OPTIONS = [
	{label: 'Temp', value: 'temp'},
	{label: 'Humidity', value: 'humidity'},
	{label: 'Wind', value: 'windSpeed'},
];

const formatDate = (date: string | number | Date) =>
	new Date(date).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'});

/**
 * Client-side renderer for the LastWeekChart.
 * @param {{data: LastWeekData}} props - Component props.
 * @returns {JSX.Element} The rendered chart and controls.
 */
export function LastWeekChartRenderer({data}: {data: LastWeekData}) {
	const [metric] = useQueryState('metric');
	const selectedMetric: MetricKey = (metric as MetricKey) ?? 'temp';
	const selectedConfig = METRIC_CONFIG[selectedMetric];

	const chartData = data.map((item) => ({
		...item,
		date: new Date(item.date).getTime(),
		[selectedMetric]: item[selectedMetric],
	}));

	const uniqueDayTicks = Array.from(new Set(data.map((item) => new Date(item.date).setHours(0, 0, 0, 0)))).slice(-7);

	return (
		<Stack className={classes.LastWeekChart} gap="lg">
			<MetricSwitcher items={METRIC_OPTIONS} defaultValue="temp" />
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
						type: 'number',
						domain: ['dataMin', 'dataMax'],
						ticks: uniqueDayTicks,
						tickFormatter: formatDate,
						tickCount: 7,
						padding: {left: 20, right: 20},
					}}
					yAxisProps={{
						tickLine: false,
						axisLine: false,
						domain: ['auto', 'auto'],
						width: 35,
					}}
					dotProps={{r: 0}}
					activeDotProps={{r: 0}}
					h={320}
				/>
			</div>
		</Stack>
	);
}
