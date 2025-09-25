// Arkham API proxy - renamed to arkham2 to avoid cache issues
const https = require('https');

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, X-Arkham-API-Key',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle OPTIONS
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Allow all methods for testing
    try {
        const params = event.queryStringParameters || {};
        const { endpoint, ...otherParams } = params;

        if (!endpoint) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    error: 'Missing endpoint',
                    debug: {
                        method: event.httpMethod,
                        params: params,
                        path: event.path
                    }
                })
            };
        }

        const apiKey = event.headers['x-arkham-api-key'] ||
                      event.headers['X-Arkham-API-Key'] ||
                      'd377a526-c9ea-4cb6-a647-775559583ff6';

        const queryString = new URLSearchParams(otherParams).toString();
        const arkhamPath = `${endpoint}${queryString ? '?' + queryString : ''}`;

        // Make HTTPS request
        const result = await new Promise((resolve) => {
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
                res.on('end', () => resolve({
                    status: res.statusCode,
                    data: data
                }));
            }).on('error', (err) => {
                resolve({
                    status: 500,
                    data: JSON.stringify({ error: err.message })
                });
            });
        });

        return {
            statusCode: result.status,
            headers,
            body: result.data
        };

    } catch (error) {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                error: 'Exception caught',
                message: error.message,
                method: event.httpMethod
            })
        };
    }
};