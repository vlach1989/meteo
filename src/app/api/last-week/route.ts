import {NextResponse} from 'next/server';
import Papa from 'papaparse';
import {getEndpointUrl} from '@/helpers/getEndpointUrl';

interface ParsedData {
	data: {obsTimeLocal: string; temp: number}[];
}

export async function GET() {
	const apiUrl = process.env.API_URL;
	const endpointId = process.env.API_LAST_WEEK_ID;

	if (!apiUrl || !endpointId) {
		return NextResponse.json({error: 'Missing API_URL or API_LAST_WEEK_ID environment variable.'}, {status: 500});
	}

	const csvUrl = getEndpointUrl({apiUrl, endpointId});

	try {
		const response = await fetch(csvUrl);

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

		const filteredData = parsedData.data.map((row: {obsTimeLocal: string; temp: number}) => ({
			obsTimeLocal: row.obsTimeLocal,
			temp: row.temp,
		}));

		return NextResponse.json(filteredData);
	} catch (error) {
		console.error(error);
		return NextResponse.json({error: 'Error fetching or parsing data.'}, {status: 500});
	}
}
