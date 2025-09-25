// Netlify Function for Arkham API proxy
const https = require('https');

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, X-Arkham-API-Key',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const params = event.queryStringParameters || {};
        const { endpoint, ...otherParams } = params;

        if (!endpoint) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: 'Missing endpoint parameter',
                    method: event.httpMethod,
                    params: params
                })
            };
        }

        const apiKey = event.headers['x-arkham-api-key'] ||
                      event.headers['X-Arkham-API-Key'] ||
                      'd377a526-c9ea-4cb6-a647-775559583ff6';

        // Build URL
        const queryString = new URLSearchParams(otherParams).toString();
        const arkhamPath = `${endpoint}${queryString ? '?' + queryString : ''}`;

        console.log('Proxying to Arkham:', arkhamPath);

        // Make request using https module
        const arkhamData = await new Promise((resolve, reject) => {
            const options = {
                hostname: 'api.arkhamintelligence.com',
                path: arkhamPath,
                method: 'GET',
                headers: {
                    'API-Key': apiKey,
                    'Accept': 'application/json'
                }
            };

            https.get(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve({ status: res.statusCode, data }));
            }).on('error', reject);
        });

        return {
            statusCode: arkhamData.status,
            headers,
            body: arkhamData.data
        };

    } catch (error) {
        console.error('Arkham proxy error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Proxy failed',
                message: error.message
            })
        };
    }
};