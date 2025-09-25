// Test version of Arkham proxy to debug issues
exports.handler = async (event) => {
    // Always return success with debug info
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Arkham test function reached',
            method: event.httpMethod,
            path: event.path,
            queryStringParameters: event.queryStringParameters,
            headers: Object.keys(event.headers || {}),
            timestamp: new Date().toISOString()
        })
    };
};