'use client';

import {SegmentedControl, type SegmentedControlItem} from '@mantine/core';
import {parseAsStringEnum, useQueryState} from 'nuqs';
import classes from './MetricSwitcher.module.css';

type MetricSwitcherProps = {
	items: SegmentedControlItem[];
	defaultValue: string;
	queryKey?: string;
};

/**
 * A reusable segmented control for switching between metrics using URL state.
 * @param {MetricSwitcherProps} props - Component props.
 * @returns {JSX.Element} The rendered segmented control.
 */
export function MetricSwitcher({items, defaultValue, queryKey = 'metric'}: MetricSwitcherProps) {
	const validValues = items.map((item) => item.value);
	const parser = parseAsStringEnum(validValues).withDefault(defaultValue);
	const [metric, setMetric] = useQueryState(queryKey, parser);

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
