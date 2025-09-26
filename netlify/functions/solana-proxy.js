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

        // Forward the RPC request to Solana mainnet
        const solanaResult = await new Promise((resolve) => {
            const postData = JSON.stringify(body);

            const options = {
                hostname: 'api.mainnet-beta.solana.com',
                path: '/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                }
            };

            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    resolve({
                        success: true,
                        status: res.statusCode,
                        data: data
                    });
                });
            });

            req.on('error', (err) => {
                resolve({
                    success: false,
                    error: err.message
                });
            });

            req.write(postData);
            req.end();
        });

        if (solanaResult.success) {
            return {
                statusCode: solanaResult.status,
                headers,
                body: solanaResult.data
            };
        } else {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    error: 'Request failed',
                    message: solanaResult.error
                })
            };
        }

    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Exception in proxy',
                message: error.message
            })
        };
    }
};