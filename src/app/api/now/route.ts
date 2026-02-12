import Papa from 'papaparse';
import {NextResponse} from 'next/server';
import {getEndpointUrl} from '@/helpers/getEndpointUrl';

interface ParsedData {
	data: {temp: number}[];
}

/**
 * GET endpoint for current weather data
 * Cached based on REVALIDATE_NOW environment variable (default: 300 seconds)
 */
export async function GET() {
	const apiUrl = process.env.API_URL;
	const endpointId = process.env.API_NOW_ID;
	const revalidateTime = parseInt(process.env.REVALIDATE_NOW || '300', 10);

	if (!apiUrl || !endpointId) {
		return NextResponse.json({error: 'Missing API_URL or API_NOW environment variable.'}, {status: 500});
	}

	const csvUrl = getEndpointUrl({apiUrl, endpointId});

	try {
		const response = await fetch(csvUrl, {
			// Enable caching for the upstream fetch
			next: {
				revalidate: revalidateTime,
				tags: ['weather-now'],
			},
		});

		if (!response.ok) {
			console.error(`Failed to fetch CSV data from ${csvUrl}. Status: ${response.status} ${response.statusText}`);
			return NextResponse.json(
				{error: 'Failed to fetch data from upstream service.'},
				{status: response.status || 500}
			);
		}
		const csvText = await response.text();

		const parsedData: ParsedData = Papa.parse(csvText, {
			header: true,
			dynamicTyping: true,
			delimiter: ',',
		});

		const temperature = parsedData?.data[0]?.temp;

		if (temperature === undefined) {
			return NextResponse.json({error: 'Could not parse temperature data.'}, {status: 500});
		}

		return NextResponse.json(
			{temperature},
			{
				headers: {
					// Set cache headers for browser and CDN
					'Cache-Control': `public, s-maxage=${revalidateTime}, stale-while-revalidate=${revalidateTime * 2}`,
				},
			}
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json({error: 'Error fetching or parsing data.'}, {status: 500});
	}
}
