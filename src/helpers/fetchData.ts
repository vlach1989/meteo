async function fetchData(endpoint: string) {
	const baseUrl = process.env.NEXT_PUBLIC_URL;
	const res = await fetch(`${baseUrl}/api/${endpoint}`, {cache: 'no-store'});

	if (!res.ok) {
		throw new Error(`Failed to fetch data from /api/${endpoint}`);
	}

	return res.json();
}

export default fetchData;
