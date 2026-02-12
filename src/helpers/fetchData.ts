/**
 * Fetches data from the specified API endpoint
 * @param {string} endpoint - The API endpoint to fetch from (e.g., 'now', 'last-week')
 * @returns {Promise<any>} The JSON response from the endpoint
 */
async function fetchData(endpoint: string) {
	const baseUrl = process.env.NEXT_PUBLIC_URL;

	if (!baseUrl) {
		throw new Error('NEXT_PUBLIC_URL environment variable is not set');
	}

	const url = `${baseUrl}/api/${endpoint}`;

	try {
		const res = await fetch(url, {
			// Remove cache: 'no-store' to allow Next.js caching to work
			// The cache duration is configured per route via environment variables
			next: {revalidate: false}, // Inherit cache from route handler
		});

		if (!res.ok) {
			// Try to get error details from response
			let errorMessage = `HTTP ${res.status}: ${res.statusText}`;
			try {
				const errorBody = await res.json();
				errorMessage = errorBody.error || errorMessage;
			} catch {
				// If response is not JSON, use status message
			}

			console.error(`Failed to fetch from ${url}: ${errorMessage}`);
			throw new Error(`Failed to fetch data from /api/${endpoint}: ${errorMessage}`);
		}

		return res.json();
	} catch (error) {
		if (error instanceof Error) {
			console.error(`fetchData error for ${endpoint}:`, error.message);
			throw error;
		}
		throw new Error(`Unknown error fetching from /api/${endpoint}`);
	}
}

export default fetchData;
