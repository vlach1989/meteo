import {Suspense} from 'react';
import fetchData from '@/helpers/fetchData';
import {NowData} from '@/types/api';
import {NowMetricsRenderer} from './NowMetricsRenderer';

/**
 * Server component to fetch data and render the NowMetrics component.
 * @returns {Promise<JSX.Element>} The rendered metrics component.
 */
export async function NowMetrics() {
	const data = await fetchData<NowData>('now');

	return (
		<Suspense fallback={<div>Loading metrics...</div>}>
			<NowMetricsRenderer data={data} />
		</Suspense>
	);
}
