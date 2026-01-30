import {TemperatureChartClient} from './TemperatureChart.client';
import fetchData from '@/helpers/fetchData';
import {Alert} from '@mantine/core';

export async function TemperatureChart() {
	try {
		const data = await fetchData('last-week');
		return <TemperatureChartClient data={data} />;
	} catch (error) {
		console.error(error);
		return (
			<Alert color="red" title="Error">
				Error fetching temperature history.
			</Alert>
		);
	}
}
