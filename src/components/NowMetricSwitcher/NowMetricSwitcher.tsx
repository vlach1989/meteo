'use client';

import {Card, Group, SegmentedControl, type SegmentedControlItem, SimpleGrid, Stack, Text, Title} from '@mantine/core';
import {parseAsStringEnum, useQueryState} from 'nuqs';
import {NowData} from '@/types/api';
import classes from './NowMetricSwitcher.module.css';

type MetricKey = 'temp' | 'humidity' | 'windSpeed';

type MetricConfig = {
	label: string;
	unit: string;
};

const METRIC_CONFIG: Record<MetricKey, MetricConfig> = {
	temp: {label: 'Temperature', unit: '°C'},
	humidity: {label: 'Humidity', unit: '%'},
	windSpeed: {label: 'Wind speed', unit: 'm/s'},
};

const METRIC_OPTIONS: SegmentedControlItem[] = [
	{label: 'Temp', value: 'temp'},
	{label: 'Humidity', value: 'humidity'},
	{label: 'Wind', value: 'windSpeed'},
];

const metricParser = parseAsStringEnum(['temp', 'humidity', 'windSpeed']).withDefault('temp');

/**
 * Format a metric value with its unit.
 * @param {number | null | undefined} value - The numeric value to render.
 * @param {string} unit - Unit suffix for the value.
 * @returns {string} The formatted value or an em dash placeholder.
 */
const formatValue = (value: number | null | undefined, unit: string) =>
	Number.isFinite(value) ? `${value}${unit}` : '—';

/**
 * Type guard for metric keys.
 * @param {string} value - Candidate metric key.
 * @returns {value is MetricKey} True when the value is a supported metric key.
 */
const isMetricKey = (value: string): value is MetricKey =>
	value === 'temp' || value === 'humidity' || value === 'windSpeed';

/**
 * Switcher for current weather metrics driven by URL state.
 * @param {{data: NowData}} props - Component props.
 * @returns {JSX.Element} The rendered switcher UI.
 */
export function NowMetricSwitcher({data}: {data: NowData}) {
	const [metric, setMetric] = useQueryState('metric', metricParser);
	const selectedMetric: MetricKey = metric ?? 'temp';
	const selectedConfig = METRIC_CONFIG[selectedMetric];
	const selectedValue = data[selectedMetric];

	return (
		<Stack className={classes.NowMetricSwitcher} gap="lg">
			<SegmentedControl
				data={METRIC_OPTIONS}
				value={selectedMetric}
				onChange={(value) => setMetric(isMetricKey(value) ? value : null)}
				classNames={{
					root: classes['NowMetricSwitcher-segmented'],
					control: classes['NowMetricSwitcher-control'],
					label: classes['NowMetricSwitcher-label'],
					indicator: classes['NowMetricSwitcher-indicator'],
				}}
				withItemsBorders={false}
			/>

			<SimpleGrid cols={{base: 1, sm: 2}} spacing="md" className={classes['NowMetricSwitcher-grid']}>
				<Card className={classes['NowMetricSwitcher-card']} withBorder radius="md" padding="lg">
					<Stack gap="xs">
						<Text className={classes['NowMetricSwitcher-labelText']}>{selectedConfig.label}</Text>
						<Title order={2} className={classes['NowMetricSwitcher-value']}>
							{formatValue(selectedValue, selectedConfig.unit)}
						</Title>
						<Text size="sm" c="dimmed">
							Latest observation from Google Sheets.
						</Text>
					</Stack>
				</Card>

				<Card className={classes['NowMetricSwitcher-card']} withBorder radius="md" padding="lg">
					<Stack gap="sm">
						<Text className={classes['NowMetricSwitcher-labelText']}>All metrics</Text>
						<Stack gap="xs">
							{(Object.keys(METRIC_CONFIG) as MetricKey[]).map((key) => (
								<Group key={key} justify="space-between" gap="xs">
									<Text size="sm">{METRIC_CONFIG[key].label}</Text>
									<Text size="sm" fw={600}>
										{formatValue(data[key], METRIC_CONFIG[key].unit)}
									</Text>
								</Group>
							))}
						</Stack>
					</Stack>
				</Card>
			</SimpleGrid>
		</Stack>
	);
}
