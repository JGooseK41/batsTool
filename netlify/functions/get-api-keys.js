// Netlify Function to securely serve API keys from environment variables
// This keeps keys out of source code while maintaining seamless UX

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Only allow GET
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Return API keys from Netlify environment variables
        // If not set, will return null and client falls back to hardcoded defaults
        const apiKeys = {
            etherscan: process.env.ETHERSCAN_API_KEY || null,
            arkham: process.env.ARKHAM_API_KEY || null,
            blockchain: process.env.BLOCKCHAIN_API_KEY || null,
            trongrid: process.env.TRONGRID_API_KEY || null,
            solana: process.env.SOLANA_RPC_URL || null
        };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                keys: apiKeys
            })
        };

    } catch (error) {
        console.error('Error loading API keys:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: 'Internal server error'
            })
        };
    }
};
