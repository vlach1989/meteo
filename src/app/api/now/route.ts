import {NextResponse} from 'next/server';
import {parse} from 'csv-parse/sync';
import {getEndpointUrl} from '@/helpers/getEndpointUrl';
import {NowData} from '@/types/api';

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

		const [record] = parse(csvText, {
			columns: true,
			skip_empty_lines: true,
			cast: true,
		}) as NowData[];

		const nowConditions: NowData = {
			temp: record.temp,
			humidity: record.humidity,
			windSpeed: record.windSpeed,
		};

		return NextResponse.json(nowConditions, {
			headers: {
				'Cache-Control': `public, s-maxage=${revalidateTime}, stale-while-revalidate=${revalidateTime * 2}`,
			},
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({error: 'Error fetching or parsing data.'}, {status: 500});
	}
}
