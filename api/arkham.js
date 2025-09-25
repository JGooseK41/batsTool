// Vercel Serverless Function for Arkham API proxy
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Arkham-API-Key');

    // Handle OPTIONS request for CORS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { endpoint, ...queryParams } = req.query;

        if (!endpoint) {
            return res.status(400).json({
                error: 'Missing endpoint parameter'
            });
        }

        // Get API key from header or use default
        const apiKey = req.headers['x-arkham-api-key'] || 'd377a526-c9ea-4cb6-a647-775559583ff6';

        // Build Arkham URL
        const baseUrl = 'https://api.arkhamintelligence.com';
        const queryString = new URLSearchParams(queryParams).toString();
        const arkhamUrl = `${baseUrl}${endpoint}${queryString ? '?' + queryString : ''}`;

        console.log('Proxying to:', arkhamUrl);

        // Make request to Arkham
        const arkhamResponse = await fetch(arkhamUrl, {
            method: 'GET',
            headers: {
                'API-Key': apiKey,
                'Accept': 'application/json'
            }
        });

        const data = await arkhamResponse.json();

        return res.status(arkhamResponse.status).json(data);

    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({
            error: 'Failed to proxy request',
            details: error.message
        });
    }
}