import Papa from 'papaparse';
import TemperatureCard from '@/components/TemperatureCard';

interface ParsedData {
	data: {temp: number}[];
}

/**
 * Fetches CSV data from the API endpoint and renders the current temperature.
 * This is a server-side component that fetches data on the server.
 */
export default async function NowPage() {
	const csvUrl = process.env.API_NOW;

	if (!csvUrl) {
		console.error('API_NOW environment variable is not set.');
		return <p>Could not fetch data. Configuration error.</p>;
	}

	try {
		const response = await fetch(csvUrl);
		if (!response.ok) {
			throw new Error(`Failed to fetch CSV: ${response.statusText}`);
		}
		const csvText = await response.text();

		const parsedData: ParsedData = Papa.parse(csvText, {
			header: true,
			dynamicTyping: true,
			delimiter: ',',
		});

		const temperature = parsedData?.data[0]?.temp;

		if (temperature === undefined) {
			return <p>Could not parse temperature data.</p>;
		}

		return <TemperatureCard temperature={temperature} />;
	} catch (error) {
		console.error(error);
		return <p>Error fetching or parsing data.</p>;
	}
}
