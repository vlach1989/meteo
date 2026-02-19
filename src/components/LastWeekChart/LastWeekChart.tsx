import {Suspense} from 'react';
import fetchData from '@/helpers/fetchData';
import {LastWeekData} from '@/types/api';
import {MetricSwitcher} from '../MetricSwitcher';
import {SkeletonLoader} from '../SkeletonLoader';
import {LastWeekChartRenderer} from './LastWeekChartRenderer';

const METRIC_OPTIONS = [
	{label: 'Temp', value: 'temp'},
	{label: 'Humidity', value: 'humidity'},
	{label: 'Wind', value: 'windSpeed'},
];

/**
 * Server component to fetch data and render the LastWeekChart.
 * @returns {Promise<JSX.Element>} The rendered chart component.
 */
export async function LastWeekChart() {
	const data = await fetchData<LastWeekData>('last-week');

	return (
		<>
			<MetricSwitcher items={METRIC_OPTIONS} />
			<Suspense fallback={<SkeletonLoader showHeader={false} />}>
				<LastWeekChartRenderer data={data} />
			</Suspense>
		</>
	);
}
