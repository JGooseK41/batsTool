// Simplified Arkham proxy - version 3
const https = require('https');

exports.handler = async (event) => {
    // Always return 200 with CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
    };

    // Handle OPTIONS
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '{}' };
    }

    // Get parameters
    const params = event.queryStringParameters || {};

    // Debug: return what we received if no endpoint
    if (!params.endpoint) {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                status: 'debug',
                message: 'No endpoint provided',
                received: {
                    method: event.httpMethod,
                    queryParams: params,
                    path: event.path,
                    headers: Object.keys(event.headers || {})
                }
            })
        };
    }

    try {
        // Extract endpoint and other params
        const { endpoint, ...queryParams } = params;
        const queryString = new URLSearchParams(queryParams).toString();
        const arkhamPath = `${endpoint}${queryString ? '?' + queryString : ''}`;

        // Get API key
        const apiKey = event.headers['x-arkham-api-key'] ||
                      event.headers['X-Arkham-API-Key'] ||
                      'd377a526-c9ea-4cb6-a647-775559583ff6';

        // Make HTTPS request to Arkham
        const arkhamResult = await new Promise((resolve) => {
            const options = {
                hostname: 'api.arkhamintelligence.com',
                path: arkhamPath,
                method: 'GET',
                headers: {
                    'API-Key': apiKey,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'BATS-Tool/1.0'
                }
            };

            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    resolve({
                        success: true,
                        status: res.statusCode,
                        headers: res.headers,
                        data: data || '{}'
                    });
                });
            });

            req.on('error', (err) => {
                resolve({
                    success: false,
                    error: err.message
                });
            });

            req.end();
        });

        // Return the result
        if (arkhamResult.success) {
            // Parse the response if it's JSON
            let parsedResponse;
            try {
                parsedResponse = JSON.parse(arkhamResult.data);
            } catch {
                parsedResponse = arkhamResult.data;
            }

            // If successful (200), return the data directly
            if (arkhamResult.status === 200) {
                return {
                    statusCode: 200,
                    headers,
                    body: typeof parsedResponse === 'object' ?
                           JSON.stringify(parsedResponse) :
                           arkhamResult.data
                };
            } else {
                return {
                    statusCode: arkhamResult.status,
                    headers,
                    body: arkhamResult.data
                };
            }
        } else {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    error: 'Request failed',
                    message: arkhamResult.error,
                    debug: {
                        requestedPath: arkhamPath
                    }
                })
            };
        }

    } catch (error) {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                error: 'Exception in proxy',
                message: error.message,
                stack: error.stack
            })
        };
    }
};