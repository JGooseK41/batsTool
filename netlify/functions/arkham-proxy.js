// Netlify Function to proxy Arkham Intelligence API requests
// This avoids CORS issues when calling from the browser

const https = require('https');

exports.handler = async (event, context) => {
    // CORS headers for all responses
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, X-Arkham-API-Key',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // Parse query parameters
        const { endpoint, ...queryParams } = event.queryStringParameters || {};

        console.log('Netlify Function called:', {
            method: event.httpMethod,
            endpoint: endpoint,
            params: queryParams
        });

        if (!endpoint) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: 'Missing endpoint parameter',
                    received: event.queryStringParameters
                })
            };
        }

        // Get API key from header or use default
        const apiKey = event.headers['x-arkham-api-key'] ||
                       event.headers['X-Arkham-API-Key'] ||
                       'd377a526-c9ea-4cb6-a647-775559583ff6';

        // Build the Arkham API URL
        const baseUrl = 'https://api.arkhamintelligence.com';
        const queryString = new URLSearchParams(queryParams).toString();
        const arkhamUrl = `${baseUrl}${endpoint}${queryString ? '?' + queryString : ''}`;

        console.log('Proxying to Arkham:', arkhamUrl);

        // Make the request using native https module
        const arkhamResponse = await new Promise((resolve, reject) => {
            const url = new URL(arkhamUrl);
            const options = {
                hostname: url.hostname,
                path: url.pathname + url.search,
                method: 'GET',
                headers: {
                    'API-Key': apiKey,
                    'Accept': 'application/json'
                }
            };

            https.get(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    resolve({
                        statusCode: res.statusCode,
                        data: data
                    });
                });
            }).on('error', reject);
        });

        return {
            statusCode: arkhamResponse.statusCode || 200,
            headers,
            body: arkhamResponse.data
        };

    } catch (error) {
        console.error('Arkham proxy error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to proxy request',
                details: error.message,
                method: event.httpMethod,
                endpoint: event.queryStringParameters?.endpoint
            })
        };
    }
};