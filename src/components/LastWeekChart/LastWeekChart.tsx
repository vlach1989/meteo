import {Suspense} from 'react';
import fetchData from '@/helpers/fetchData';
import {LastWeekData} from '@/types/api';
import {LastWeekChartRenderer} from './LastWeekChartRenderer';

/**
 * Server component to fetch data and render the LastWeekChart.
 * @returns {Promise<JSX.Element>} The rendered chart component.
 */
export async function LastWeekChart() {
	const data = await fetchData<LastWeekData>('last-week');

	return (
		<Suspense fallback={<div>Loading chart...</div>}>
			<LastWeekChartRenderer data={data} />
		</Suspense>
	);
}
