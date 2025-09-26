// Solana RPC proxy to handle CORS issues
const https = require('https');

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle OPTIONS
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const body = JSON.parse(event.body);
        const postData = JSON.stringify(body);

        // Try multiple Solana RPC endpoints in order
        const endpoints = [
            { hostname: 'api.mainnet-beta.solana.com', path: '/', port: 443 },
            { hostname: 'solana-api.projectserum.com', path: '/', port: 443 }
        ];

        let lastError = null;
        let successResult = null;

        // Try each endpoint until one works
        for (const endpoint of endpoints) {
            try {
                const result = await new Promise((resolve, reject) => {
                    const options = {
                        hostname: endpoint.hostname,
                        port: endpoint.port,
                        path: endpoint.path,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': Buffer.byteLength(postData)
                        },
                        timeout: 10000 // 10 second timeout
                    };

                    const req = https.request(options, (res) => {
                        let data = '';

                        res.on('data', chunk => {
                            data += chunk;
                        });

                        res.on('end', () => {
                            if (res.statusCode >= 200 && res.statusCode < 300) {
                                resolve({
                                    success: true,
                                    status: res.statusCode,
                                    data: data
                                });
                            } else {
                                reject(new Error(`HTTP ${res.statusCode}`));
                            }
                        });
                    });

                    req.on('error', (error) => {
                        reject(error);
                    });

                    req.on('timeout', () => {
                        req.destroy();
                        reject(new Error('Request timeout'));
                    });

                    req.write(postData);
                    req.end();
                });

                // If we got a successful result, use it
                if (result.success) {
                    successResult = result;
                    break;
                }
            } catch (error) {
                console.error(`Endpoint ${endpoint.hostname} failed:`, error.message);
                lastError = error;
                // Continue to next endpoint
            }
        }

        // Return the successful result if we got one
        if (successResult) {
            return {
                statusCode: successResult.status,
                headers,
                body: successResult.data
            };
        }

        // All endpoints failed
        return {
            statusCode: 503,
            headers,
            body: JSON.stringify({
                error: 'All Solana RPC endpoints failed',
                message: lastError ? lastError.message : 'Unknown error'
            })
        };

    } catch (error) {
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