import {Suspense} from 'react';
import fetchData from '@/helpers/fetchData';
import {NowData} from '@/types/api';
import {MetricSwitcher} from '../MetricSwitcher';
import {SkeletonLoader} from '../SkeletonLoader';
import {NowMetricsRenderer} from './NowMetricsRenderer';

const METRIC_OPTIONS = [
	{label: 'Temp', value: 'temp'},
	{label: 'Humidity', value: 'humidity'},
	{label: 'Wind', value: 'windSpeed'},
];

/**
 * Server component to fetch data and render the NowMetrics component.
 * @returns {Promise<JSX.Element>} The rendered metrics component.
 */
export async function NowMetrics() {
	const data = await fetchData<NowData>('now');

	return (
		<>
			<MetricSwitcher items={METRIC_OPTIONS} defaultValue="temp" />
			<Suspense fallback={<SkeletonLoader showHeader={false} showChart={false} />}>
				<NowMetricsRenderer data={data} />
			</Suspense>
		</>
	);
}
