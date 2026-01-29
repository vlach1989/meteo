import TemperatureCard from '@/components/TemperatureCard';

async function getTemperature() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/now`, {cache: 'no-store'});

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
			return <p>Could not parse temperature data.</p>;
		}

		return <TemperatureCard temperature={temperature} />;
	} catch (error) {
		console.error(error);
		return <p>Error fetching or parsing data.</p>;
	}
}
