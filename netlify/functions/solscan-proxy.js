// Solscan API proxy to handle CORS issues
const https = require('https');

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle OPTIONS
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Extract parameters
    const params = event.queryStringParameters || {};
    const address = params.address;
    const apiKey = params.apiKey;

    if (!address) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Address parameter required' })
        };
    }

    try {
        let hostname, path, requestHeaders;

        if (apiKey) {
            // Use Pro API with API key
            hostname = 'pro-api.solscan.io';
            path = `/v2.0/account/info/${address}`;
            requestHeaders = {
                'Accept': 'application/json',
                'token': apiKey
            };
            console.log('Using Solscan Pro API for address:', address);
        } else {
            // Use public API
            hostname = 'public-api.solscan.io';
            path = `/account/${address}`;
            requestHeaders = {
                'Accept': 'application/json'
            };
            console.log('Using Solscan Public API for address:', address);
        }

        const result = await new Promise((resolve, reject) => {
            const options = {
                hostname: hostname,
                port: 443,
                path: path,
                method: 'GET',
                headers: requestHeaders,
                timeout: 10000
            };

            const req = https.request(options, (res) => {
                let data = '';

                res.on('data', chunk => {
                    data += chunk;
                });

                res.on('end', () => {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: data
                    });
                });
            });

            req.on('error', (error) => {
                console.error('Request error:', error);
                reject(error);
            });

            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });

            req.end();
        });

        return {
            statusCode: result.statusCode,
            headers,
            body: result.body
        };

    } catch (error) {
        console.error('Solscan proxy error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Proxy error',
                message: error.message
            })
        };
    }
};