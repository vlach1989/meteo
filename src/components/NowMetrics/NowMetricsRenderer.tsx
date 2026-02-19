'use client';

import {Card, Group, SimpleGrid, Stack, Text, Title} from '@mantine/core';
import {useQueryState} from 'nuqs';
import {metricParser} from '@/lib/state';
import {NowData} from '@/types/api';
import classes from './NowMetrics.module.css';

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

/**
 * Format a metric value with its unit.
 * @param {number | null | undefined} value - The numeric value to render.
 * @param {string} unit - Unit suffix for the value.
 * @returns {string} The formatted value or an em dash placeholder.
 */
const formatValue = (value: number | null | undefined, unit: string) =>
	Number.isFinite(value) ? `${value}${unit}` : '—';

/**
 * Client-side renderer for the NowMetrics component.
 * @param {{data: NowData}} props - Component props.
 * @returns {JSX.Element} The rendered metrics UI.
 */
export function NowMetricsRenderer({data}: {data: NowData}) {
	const [metric] = useQueryState('metric', metricParser);
	const selectedMetric: MetricKey = (metric as MetricKey) ?? 'temp';
	const selectedConfig = METRIC_CONFIG[selectedMetric];
	const selectedValue = data[selectedMetric];

	return (
		<Stack className={classes.NowMetrics} gap="lg">
			<SimpleGrid cols={{base: 1, sm: 2}} spacing="md" className={classes['NowMetrics-grid']}>
				<Card className={classes['NowMetrics-card']} withBorder radius="md" padding="lg">
					<Stack gap="xs">
						<Text className={classes['NowMetrics-labelText']}>{selectedConfig.label}</Text>
						<Title order={2} className={classes['NowMetrics-value']}>
							{formatValue(selectedValue, selectedConfig.unit)}
						</Title>
						<Text size="sm" c="dimmed">
							Latest observation from Google Sheets.
						</Text>
					</Stack>
				</Card>

				<Card className={classes['NowMetrics-card']} withBorder radius="md" padding="lg">
					<Stack gap="sm">
						<Text className={classes['NowMetrics-labelText']}>All metrics</Text>
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
