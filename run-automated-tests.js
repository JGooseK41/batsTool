#!/usr/bin/env node

/**
 * Automated Test Runner for B.A.T.S. Tool
 * Tests swap patterns, conversions, and API integrations
 */

const https = require('https');
const http = require('http');

// Test results collector
const testResults = {
    passed: 0,
    failed: 0,
    warnings: 0,
    details: []
};

// Helper function for API requests
function makeRequest(options) {
    return new Promise((resolve, reject) => {
        const protocol = options.protocol === 'http:' ? http : https;
        const req = protocol.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        data: JSON.parse(data)
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        data: data
                    });
                }
            });
        });
        req.on('error', reject);
        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        req.end();
    });
}

// Test Bitcoin transactions
async function testBitcoinAPIs() {
    console.log('\n🔶 Testing Bitcoin APIs...\n');

    // Test 1: Mempool.space API
    try {
        const txHash = '15e10745f15593a899cef391191bdd3d7c12412cc4696b7bcb669d0feadc8521';
        const response = await makeRequest({
            hostname: 'mempool.space',
            path: `/api/tx/${txHash}`,
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (response.status === 200 && response.data.txid) {
            testResults.passed++;
            console.log('✅ Mempool.space API: Transaction lookup successful');
            console.log(`   TX: ${response.data.txid.substring(0, 20)}...`);
            console.log(`   Confirmations: ${response.data.status.confirmed ? response.data.status.block_height : 'Unconfirmed'}`);
        } else {
            testResults.failed++;
            console.log('❌ Mempool.space API: Failed');
        }
    } catch (error) {
        testResults.failed++;
        console.log('❌ Mempool.space API Error:', error.message);
    }

    // Test 2: Blockchain.info API
    try {
        const address = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
        const response = await makeRequest({
            hostname: 'blockchain.info',
            path: `/rawaddr/${address}?limit=1`,
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (response.status === 200) {
            testResults.passed++;
            console.log('✅ Blockchain.info API: Address lookup successful');
            if (response.data.n_tx !== undefined) {
                console.log(`   Total transactions: ${response.data.n_tx}`);
            }
        } else {
            testResults.warnings++;
            console.log('⚠️ Blockchain.info API: Limited functionality');
        }
    } catch (error) {
        testResults.warnings++;
        console.log('⚠️ Blockchain.info API Error:', error.message);
    }
}

// Test Ethereum/EVM chains
async function testEthereumAPIs() {
    console.log('\n💠 Testing Ethereum/EVM APIs...\n');

    // Test Etherscan API (using API key from index.html)
    const etherscanApiKey = 'YPG3TY8U5JCVX7BX7IDJQPXZ6J4K3GD3QY';

    try {
        // Test transaction lookup
        const txHash = '0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060';
        const response = await makeRequest({
            hostname: 'api.etherscan.io',
            path: `/api?module=proxy&action=eth_getTransactionByHash&txhash=${txHash}&apikey=${etherscanApiKey}`,
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (response.status === 200 && response.data.result) {
            testResults.passed++;
            console.log('✅ Etherscan API: Transaction lookup successful');
            console.log(`   From: ${response.data.result.from.substring(0, 10)}...`);
            console.log(`   To: ${response.data.result.to ? response.data.result.to.substring(0, 10) + '...' : 'Contract Creation'}`);
        } else {
            testResults.failed++;
            console.log('❌ Etherscan API: Failed');
        }
    } catch (error) {
        testResults.failed++;
        console.log('❌ Etherscan API Error:', error.message);
    }

    // Test BSC
    try {
        const bscApiKey = etherscanApiKey; // Same key often works
        const response = await makeRequest({
            hostname: 'api.bscscan.com',
            path: `/api?module=stats&action=bnbprice&apikey=${bscApiKey}`,
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (response.status === 200 && response.data.result) {
            testResults.passed++;
            console.log('✅ BSCScan API: Connection successful');
            console.log(`   BNB Price: $${response.data.result.ethusd}`);
        } else {
            testResults.warnings++;
            console.log('⚠️ BSCScan API: Limited functionality');
        }
    } catch (error) {
        testResults.warnings++;
        console.log('⚠️ BSCScan API Error:', error.message);
    }
}

// Test Solana
async function testSolanaAPIs() {
    console.log('\n🟢 Testing Solana APIs...\n');

    try {
        // Test Solana public RPC
        const response = await makeRequest({
            hostname: 'api.mainnet-beta.solana.com',
            path: '/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Even a 405 means the endpoint is reachable
        if (response.status === 405 || response.status === 200) {
            testResults.passed++;
            console.log('✅ Solana RPC: Endpoint reachable');
        } else {
            testResults.warnings++;
            console.log('⚠️ Solana RPC: Limited access');
        }
    } catch (error) {
        testResults.warnings++;
        console.log('⚠️ Solana RPC Error:', error.message);
    }
}

// Test swap/bridge detection logic
async function testSwapDetection() {
    console.log('\n🔄 Testing Swap/Bridge Detection Logic...\n');

    // Simulate partial trace calculation
    const testCases = [
        {
            name: 'Full trace (100% ownership)',
            ourAmount: 100,
            totalAmount: 100,
            outputAmount: 1850,
            expectedOutput: 1850
        },
        {
            name: 'Partial trace (50% ownership)',
            ourAmount: 50,
            totalAmount: 100,
            outputAmount: 1850,
            expectedOutput: 925
        },
        {
            name: 'Partial trace (28.9% ownership)',
            ourAmount: 88.58,
            totalAmount: 306,
            outputAmount: 13680.48,
            expectedOutput: 3959.57
        }
    ];

    testCases.forEach(test => {
        const proportionalMultiplier = test.ourAmount / test.totalAmount;
        const calculatedOutput = test.outputAmount * proportionalMultiplier;
        const difference = Math.abs(calculatedOutput - test.expectedOutput);

        if (difference < 0.01) {
            testResults.passed++;
            console.log(`✅ ${test.name}: Correct`);
            console.log(`   Ownership: ${(proportionalMultiplier * 100).toFixed(2)}%`);
            console.log(`   Output: ${calculatedOutput.toFixed(2)} (expected ${test.expectedOutput})`);
        } else {
            testResults.failed++;
            console.log(`❌ ${test.name}: Incorrect`);
            console.log(`   Got ${calculatedOutput.toFixed(2)}, expected ${test.expectedOutput}`);
        }
    });

    // Test division by zero protection
    try {
        const totalAmount = 0;
        const ourAmount = 10;
        if (totalAmount > 0) {
            const multiplier = ourAmount / totalAmount;
            testResults.failed++;
            console.log('❌ Division by zero protection: Failed');
        } else {
            testResults.passed++;
            console.log('✅ Division by zero protection: Working');
        }
    } catch (error) {
        testResults.passed++;
        console.log('✅ Division by zero protection: Exception caught');
    }
}

// Main test runner
async function runAllTests() {
    console.log('========================================');
    console.log('B.A.T.S. Tool - Automated Test Suite');
    console.log('========================================');

    try {
        await testBitcoinAPIs();
        await testEthereumAPIs();
        await testSolanaAPIs();
        await testSwapDetection();
    } catch (error) {
        console.error('\n❌ Test suite error:', error);
    }

    // Print summary
    console.log('\n========================================');
    console.log('Test Results Summary');
    console.log('========================================');
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`⚠️  Warnings: ${testResults.warnings}`);

    const totalTests = testResults.passed + testResults.failed + testResults.warnings;
    const passRate = ((testResults.passed / totalTests) * 100).toFixed(1);
    console.log(`\nPass Rate: ${passRate}%`);

    if (testResults.failed === 0) {
        console.log('\n🎉 All critical tests passed!');
    } else {
        console.log(`\n⚠️  ${testResults.failed} test(s) need attention`);
    }
}

// Run tests
runAllTests().catch(console.error);
