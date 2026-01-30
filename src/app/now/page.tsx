import TemperatureCard from '@/components/TemperatureCard';
import {Alert} from '@mantine/core';

async function getTemperature() {
	const baseUrl = process.env.NEXT_PUBLIC_URL;
	const res = await fetch(`${baseUrl}/api/now`, {cache: 'no-store'});

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

/**
 * Fetches temperature data from the API endpoint and renders it.
 * This is a server-side component that fetches data on the server.
 */
export default async function NowPage() {
	try {
		const data = await getTemperature();
		const temperature = data.temperature;

		if (temperature === undefined) {
			return (
				<Alert color="yellow" title="Warning">
					Could not parse temperature data.
				</Alert>
			);
		}

		return <TemperatureCard temperature={temperature} />;
	} catch (error) {
		console.error(error);
		return (
			<Alert color="red" title="Error">
				Error fetching or parsing data.
			</Alert>
		);
	}
}
