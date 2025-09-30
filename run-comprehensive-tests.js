#!/usr/bin/env node

const https = require('https');

console.log('========================================');
console.log('B.A.T.S. Tool - Comprehensive API Tests');
console.log('========================================');

async function testAPI(name, options) {
    return new Promise((resolve) => {
        https.get(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`\n${name}:`);
                console.log(`  Status: ${res.statusCode}`);
                if (res.statusCode === 200) {
                    console.log(`  ✅ API is accessible`);
                    try {
                        const json = JSON.parse(data);
                        if (json) {
                            console.log(`  ✅ Valid JSON response`);
                            // Show first few fields
                            const keys = Object.keys(json).slice(0, 3);
                            if (keys.length > 0) {
                                console.log(`  Fields: ${keys.join(', ')}`);
                            }
                        }
                    } catch (e) {
                        console.log(`  ℹ️ Non-JSON response`);
                    }
                } else if (res.statusCode === 429) {
                    console.log(`  ⚠️ Rate limited`);
                } else if (res.statusCode === 401 || res.statusCode === 403) {
                    console.log(`  ⚠️ Authentication required`);
                } else {
                    console.log(`  ❌ API error`);
                }
                resolve();
            });
        }).on('error', (err) => {
            console.log(`\n${name}:`);
            console.log(`  ❌ Connection failed: ${err.message}`);
            resolve();
        });
    });
}

async function testPartialTraceCalculations() {
    console.log('\n\n📊 Testing Partial Trace Calculations:\n');
    
    const tests = [
        { our: 100, total: 100, output: 1000, expected: 1000 },
        { our: 50, total: 100, output: 1000, expected: 500 },
        { our: 88.58355, total: 306.11404, output: 13680.480239, expected: 3959.570661 },
        { our: 1, total: 10, output: 100, expected: 10 },
        { our: 0.1, total: 1, output: 100, expected: 10 }
    ];

    let passed = 0;
    let failed = 0;

    tests.forEach((test, i) => {
        const percent = (test.our / test.total) * 100;
        const calculated = test.output * (test.our / test.total);
        const diff = Math.abs(calculated - test.expected);
        
        if (diff < 0.001) {
            console.log(`  ✅ Test ${i+1}: ${percent.toFixed(2)}% ownership = ${calculated.toFixed(6)}`);
            passed++;
        } else {
            console.log(`  ❌ Test ${i+1}: Expected ${test.expected}, got ${calculated.toFixed(6)}`);
            failed++;
        }
    });

    console.log(`\n  Results: ${passed} passed, ${failed} failed`);
}

async function runTests() {
    // Bitcoin
    await testAPI('Bitcoin - Mempool.space', {
        hostname: 'mempool.space',
        path: '/api/tx/15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521',
        headers: { 'Accept': 'application/json' }
    });

    // Ethereum
    await testAPI('Ethereum - Etherscan', {
        hostname: 'api.etherscan.io',
        path: '/api?module=stats&action=ethprice',
        headers: { 'Accept': 'application/json' }
    });

    // BSC
    await testAPI('BSC - BscScan', {
        hostname: 'api.bscscan.com',
        path: '/api?module=stats&action=bnbprice',
        headers: { 'Accept': 'application/json' }
    });

    // Solana
    await testAPI('Solana - Public RPC', {
        hostname: 'api.mainnet-beta.solana.com',
        path: '/',
        headers: { 'Accept': 'application/json' }
    });

    // Test calculations
    await testPartialTraceCalculations();

    console.log('\n========================================');
    console.log('✅ Test suite completed');
    console.log('========================================\n');
}

runTests().catch(console.error);
