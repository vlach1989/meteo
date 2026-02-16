import {NextResponse} from 'next/server';
import {parse} from 'csv-parse/sync';
import {getEndpointUrl} from '@/helpers/getEndpointUrl';
import {LastWeekData} from '@/types/api';

/**
 * GET endpoint for weather data from the last week
 * Cached based on REVALIDATE_LAST_WEEK environment variable (default: 3600 seconds)
 */
export async function GET() {
	const apiUrl = process.env.API_URL;
	const endpointId = process.env.API_LAST_WEEK_ID;
	const revalidateTime = parseInt(process.env.REVALIDATE_LAST_WEEK || '3600', 10);

	if (!apiUrl || !endpointId) {
		return NextResponse.json({error: 'Missing API_URL or API_LAST_WEEK_ID environment variable.'}, {status: 500});
	}

	const csvUrl = getEndpointUrl({apiUrl, endpointId});

	try {
		const response = await fetch(csvUrl, {
			next: {
				revalidate: revalidateTime,
				tags: ['weather-last-week'],
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

		const records = parse(csvText, {
			columns: true,
			skip_empty_lines: true,
			cast: true,
		}) as {obsTimeLocal: string; temp: number}[];

		const filteredData: LastWeekData = records.map((row: {obsTimeLocal: string; temp: number}) => ({
			date: row.obsTimeLocal,
			temp: row.temp,
		}));

		return NextResponse.json(filteredData, {
			headers: {
				'Cache-Control': `public, s-maxage=${revalidateTime}, stale-while-revalidate=${revalidateTime * 2}`,
			},
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({error: 'Error fetching or parsing data.'}, {status: 500});
	}
}
