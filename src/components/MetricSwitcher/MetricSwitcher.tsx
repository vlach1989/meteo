'use client';

import {SegmentedControl, type SegmentedControlItem} from '@mantine/core';
import {useQueryState} from 'nuqs';
import {metricParser} from '@/lib/state';
import classes from './MetricSwitcher.module.css';

type MetricSwitcherProps = {
	items: SegmentedControlItem[];
	queryKey?: string;
};

/**
 * A reusable segmented control for switching between metrics using URL state.
 * @param {MetricSwitcherProps} props - Component props.
 * @returns {JSX.Element} The rendered segmented control.
 */
export function MetricSwitcher({items, queryKey = 'metric'}: MetricSwitcherProps) {
	const [metric, setMetric] = useQueryState(queryKey, metricParser);

	return (
		<SegmentedControl
			data={items}
			value={metric}
			onChange={(value) => setMetric(value)}
			classNames={{
				root: classes.MetricSwitcher,
				control: classes['MetricSwitcher-control'],
				label: classes['MetricSwitcher-label'],
				indicator: classes['MetricSwitcher-indicator'],
			}}
			withItemsBorders={false}
		/>
	);
}
