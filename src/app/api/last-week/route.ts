import {NextResponse} from 'next/server';
import {fetchCsvRows, getSheetCsvUrl} from '@/lib/sheets';
import {LastWeekCsvRow, LastWeekData} from '@/types/api';

/**
 * GET endpoint for weather data from the last week.
 * Cached based on REVALIDATE_LAST_WEEK environment variable (default: 60 seconds).
 * @returns {Promise<NextResponse>} The JSON response with last-week data.
 */
export async function GET() {
	const apiUrl = process.env.API_URL;
	const endpointId = process.env.API_LAST_WEEK_ID;
	const revalidateTime = parseInt(process.env.REVALIDATE_LAST_WEEK || '60', 10);

	if (!apiUrl || !endpointId) {
		return NextResponse.json({error: 'Missing API_URL or API_LAST_WEEK_ID environment variable.'}, {status: 500});
	}

	const csvUrl = getSheetCsvUrl({apiUrl, endpointId});

	try {
		const records = await fetchCsvRows<LastWeekCsvRow>(csvUrl, {
			revalidate: revalidateTime,
			tags: ['weather-last-week'],
		});

		const filteredData: LastWeekData = records.map((row) => ({
			date: row.obsTimeLocal,
			temp: row.temp,
			humidity: row.humidity,
			windSpeed: row.windSpeed,
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
