// Netlify Function for Arkham API proxy
exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, X-Arkham-API-Key',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Log for debugging
    console.log('Function called:', event.httpMethod, event.path);

    try {
        const params = event.queryStringParameters || {};
        const { endpoint, ...otherParams } = params;

        if (!endpoint) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing endpoint parameter' })
            };
        }

        const apiKey = event.headers['x-arkham-api-key'] || 'd377a526-c9ea-4cb6-a647-775559583ff6';

        // Build URL
        const queryString = new URLSearchParams(otherParams).toString();
        const url = `https://api.arkhamintelligence.com${endpoint}${queryString ? '?' + queryString : ''}`;

        console.log('Fetching:', url);

        // Make request
        const response = await fetch(url, {
            headers: {
                'API-Key': apiKey,
                'Accept': 'application/json'
            }
        });

        const data = await response.text();

        return {
            statusCode: response.status,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: data
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};