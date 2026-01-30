/**
 * Interface representing the parameters required to construct an endpoint URL.
 */
interface GetEndpointUrlParams {
	/** The base API URL. */
	apiUrl: string;
	/** The unique identifier for the endpoint. */
	endpointId: string;
}

/**
 * Constructs a full endpoint URL using the provided parameters.
 *
 * @param {GetEndpointUrlParams} params - The parameters required to build the URL.
 * @param {string} params.apiUrl - The base API URL.
 * @param {string} params.endpointId - The unique identifier for the endpoint.
 * @returns {string} The constructed endpoint URL.
 *
 * @example
 * const url = getEndpointUrl({ apiUrl: 'https://example.com', endpointId: '12345' });
 * console.log(url); // Outputs: 'https://example.com?gid=12345&single=true&output=csv'
 */
export const getEndpointUrl = (params: GetEndpointUrlParams): string => {
	const {apiUrl, endpointId} = params;
	return `${apiUrl}?gid=${endpointId}&single=true&output=csv`;
};
