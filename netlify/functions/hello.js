// Simple test function to verify Netlify Functions are working
exports.handler = async (event) => {
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Netlify Functions are working!',
            method: event.httpMethod,
            path: event.path,
            timestamp: new Date().toISOString()
        })
    };
};