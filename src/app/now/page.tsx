import Papa from 'papaparse';

interface ParsedData {
	data: { [key: string]: number }[];
}

export default async function FetchCSVData() {
	const csvUrl = process.env.API_NOW;
	const response = await fetch(csvUrl);
	const csvText = await response.text();

	const parsedData: ParsedData = Papa.parse(csvText, {
		header: true,
		dynamicTyping: true,
		delimiter: ',',
	});
	return <>{parsedData?.data[0].temp}</>;
}
