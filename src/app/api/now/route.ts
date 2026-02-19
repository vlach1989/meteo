import {NextResponse} from 'next/server';
import {fetchCsvRows, getSheetCsvUrl} from '@/lib/sheets';
import {NowCsvRow, NowData} from '@/types/api';

/**
 * GET endpoint for current weather data.
 * Cached based on REVALIDATE_NOW environment variable (default: 60 seconds).
 * @returns {Promise<NextResponse>} The JSON response with current conditions.
 */
export async function GET() {
	const apiUrl = process.env.API_URL;
	const endpointId = process.env.API_NOW_ID;
	const revalidateTime = parseInt(process.env.REVALIDATE_NOW || '60', 10);

	if (!apiUrl || !endpointId) {
		return NextResponse.json({error: 'Missing API_URL or API_NOW environment variable.'}, {status: 500});
	}

	const csvUrl = getSheetCsvUrl({apiUrl, endpointId});

	try {
		const [record] = await fetchCsvRows<NowCsvRow>(csvUrl, {
			revalidate: revalidateTime,
			tags: ['weather-now'],
		});

		if (!record) {
			return NextResponse.json({error: 'No data available.'}, {status: 404});
		}

		const requiredKeys: Array<keyof NowData> = ['temp', 'humidity', 'windSpeed'];
		const missingKeys = requiredKeys.filter((key) => !Number.isFinite(record[key]));

		if (missingKeys.length > 0) {
			return NextResponse.json(
				{
					error: 'Missing or invalid columns in CSV response.',
					missingKeys,
					availableKeys: Object.keys(record ?? {}),
				},
				{status: 500}
			);
		}

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
