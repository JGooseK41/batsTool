// Arkham proxy v4 - try different API approaches
const https = require('https');

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '{}' };
    }

    const params = event.queryStringParameters || {};

    // Test different Arkham endpoints
    if (!params.endpoint) {
        // Try a basic test to see if API key works
        const testEndpoints = [
            '/v1/test',
            '/intelligence/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', // Genesis address
            '/addresses/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
        ];

        const results = [];
        for (const endpoint of testEndpoints) {
            const result = await testArkhamEndpoint(endpoint, 'd377a526-c9ea-4cb6-a647-775559583ff6');
            results.push({
                endpoint,
                status: result.status,
                response: result.data ? result.data.substring(0, 100) : 'No data'
            });
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                message: 'Testing various Arkham endpoints',
                results
            })
        };
    }

    // Try the requested endpoint
    const { endpoint, ...queryParams } = params;
    const queryString = new URLSearchParams(queryParams).toString();
    const arkhamPath = `${endpoint}${queryString ? '?' + queryString : ''}`;

    const apiKey = event.headers['x-arkham-api-key'] ||
                   event.headers['X-Arkham-API-Key'] ||
                   'd377a526-c9ea-4cb6-a647-775559583ff6';

    const result = await testArkhamEndpoint(arkhamPath, apiKey);

    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            arkhamStatus: result.status,
            arkhamResponse: result.data,
            arkhamHeaders: result.headers,
            debug: {
                requestedPath: arkhamPath,
                apiKeyUsed: apiKey.substring(0, 8) + '...'
            }
        })
    };
};

async function testArkhamEndpoint(path, apiKey) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'api.arkhamintelligence.com',
            path: path,
            method: 'GET',
            headers: {
                'API-Key': apiKey,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    data: data
                });
            });
        });

        req.on('error', (err) => {
            resolve({
                status: 0,
                error: err.message
            });
        });

        req.end();
    });
}