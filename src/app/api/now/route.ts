import Papa from 'papaparse';
import {NextResponse} from 'next/server';

interface ParsedData {
	data: {temp: number}[];
}

export async function GET() {
	const csvUrl = process.env.API_NOW;

	if (!csvUrl) {
		return NextResponse.json({error: 'Could not fetch data. Configuration error.'}, {status: 500});
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
			return NextResponse.json({error: 'Could not parse temperature data.'}, {status: 500});
		}

		return NextResponse.json({temperature});
	} catch (error) {
		console.error(error);
		return NextResponse.json({error: 'Error fetching or parsing data.'}, {status: 500});
	}
}
