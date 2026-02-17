import Papa from 'papaparse';

/**
 * Parameters for building a public Google Sheets CSV export URL.
 */
export interface GetSheetCsvUrlParams {
	/** Base Google Sheets export URL. */
	apiUrl: string;
	/** Sheet tab ID (gid). */
	endpointId: string;
}

/**
 * Options for fetching CSV data with Next.js revalidation.
 */
export interface FetchCsvOptions {
	/** ISR revalidate period in seconds. */
	revalidate: number;
	/** Cache tags for selective revalidation. */
	tags?: string[];
}

/**
 * Build a public CSV export URL for a Google Sheet.
 */
export const getSheetCsvUrl = (params: GetSheetCsvUrlParams): string => {
	const {apiUrl, endpointId} = params;
	return `${apiUrl}?gid=${endpointId}&single=true&output=csv`;
};

/**
 * Fetch CSV data from a URL and parse it into typed rows.
 */
export const fetchCsvRows = async <TRow>(csvUrl: string, options: FetchCsvOptions): Promise<TRow[]> => {
	const response = await fetch(csvUrl, {
		next: {
			revalidate: options.revalidate,
			tags: options.tags ?? [],
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch CSV data from ${csvUrl}. Status: ${response.status} ${response.statusText}`);
	}

	const csvText = await response.text();
	const result = Papa.parse<TRow>(csvText, {
		header: true,
		dynamicTyping: true,
		skipEmptyLines: true,
	});

	if (result.errors.length > 0) {
		const message = result.errors.map((error) => error.message).join('; ');
		throw new Error(`Failed to parse CSV data: ${message}`);
	}

	return result.data;
};
