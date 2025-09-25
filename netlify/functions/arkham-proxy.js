// Netlify Function to proxy Arkham Intelligence API requests
// This avoids CORS issues when calling from the browser

exports.handler = async (event, context) => {
    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Get the endpoint and query parameters from the request
    const { endpoint, ...queryParams } = event.queryStringParameters || {};

    if (!endpoint) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing endpoint parameter' })
        };
    }

    // Get API key from header or use default
    const apiKey = event.headers['x-arkham-api-key'] ||
                   event.headers['X-Arkham-API-Key'] ||
                   'd377a526-c9ea-4cb6-a647-775559583ff6';

    try {
        // Build the Arkham API URL
        const baseUrl = 'https://api.arkhamintelligence.com';
        const queryString = new URLSearchParams(queryParams).toString();
        const arkhamUrl = `${baseUrl}${endpoint}${queryString ? '?' + queryString : ''}`;

        console.log('Proxying request to:', arkhamUrl);

        // Make the request to Arkham API
        const response = await fetch(arkhamUrl, {
            method: 'GET',
            headers: {
                'API-Key': apiKey,
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        // Return the response with CORS headers
        return {
            statusCode: response.status,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, X-Arkham-API-Key',
                'Access-Control-Allow-Methods': 'GET, OPTIONS'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        console.error('Arkham proxy error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Failed to proxy request to Arkham API',
                details: error.message
            })
        };
    }
};