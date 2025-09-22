// BATS Tool Test Simulation Script
// This script will test various transaction flow scenarios

console.log('Starting BATS Tool Test Simulations...\n');

// Helper function to report errors
let errorLog = [];
function logError(scenario, step, error) {
    const errorEntry = {
        scenario: scenario,
        step: step,
        error: error,
        timestamp: new Date().toISOString()
    };
    errorLog.push(errorEntry);
    console.error(`❌ ERROR in ${scenario} at ${step}:`, error);
}

// Helper function to report success
function logSuccess(scenario, step) {
    console.log(`✓ SUCCESS: ${scenario} - ${step}`);
}

// Initialize investigation object
let investigation = {
    caseId: 'TEST-' + Date.now(),
    investigator: 'Test Script',
    caseType: 'Automated Test',
    caseSynopsis: 'Testing various transaction flow scenarios',
    victims: [],
    hops: [],
    rootTotalConfirmed: false,
    confirmedRootTotal: 0,
    confirmedRootTotalsByCurrency: {},
    universalWalletIndex: [],
    redWalletIndex: [],
    availableThreads: {}
};

// ==========================================
// SCENARIO 1: Simple Linear Flow
// 1 victim -> 3 sequential hops
// ==========================================
function testScenario1() {
    console.log('\n=== SCENARIO 1: Simple Linear Flow ===\n');

    try {
        // Step 1: Add victim with single transaction
        const victim1 = {
            id: 1,
            name: 'Test Victim 1',
            isCompleted: false,
            transactions: [{
                id: 1,
                txHash: '0x1234567890abcdef',
                amount: 1000,
                currency: 'USDT',
                receivingWallet: '0xREDwallet001',
                datetime: '2025-01-01T10:00:00',
                timezone: 'UTC',
                notes: 'Initial theft'
            }]
        };
        investigation.victims.push(victim1);
        logSuccess('Scenario 1', 'Added victim');

        // Step 2: Complete victim and confirm root total
        victim1.isCompleted = true;
        investigation.rootTotalConfirmed = true;
        investigation.confirmedRootTotal = 1000;
        investigation.confirmedRootTotalsByCurrency = { 'USDT': 1000 };
        logSuccess('Scenario 1', 'Confirmed root total');

        // Step 3: Create Hop 1 - Simple transfer
        const hop1 = {
            id: 1,
            hopNumber: 1,
            isCollapsed: false,
            entries: [{
                id: 1,
                hopId: 1,
                entryType: 'trace',
                sourceThreadId: 'V1-T1',
                toWallet: '0xPURPLEwallet001',
                toWalletType: 'purple',
                amount: 1000,
                currency: 'USDT',
                txHash: '0xhop1tx001',
                notation: 'V1-T1-H1',
                timestamp: '2025-01-01T11:00:00'
            }]
        };
        investigation.hops.push(hop1);
        logSuccess('Scenario 1', 'Created Hop 1');

        // Step 4: Create Hop 2 - Another simple transfer
        const hop2 = {
            id: 2,
            hopNumber: 2,
            isCollapsed: false,
            entries: [{
                id: 1,
                hopId: 2,
                entryType: 'trace',
                sourceThreadId: 'V1-T1-H1',
                toWallet: '0xBLUEwallet001',
                toWalletType: 'blue',
                amount: 1000,
                currency: 'USDT',
                txHash: '0xhop2tx001',
                notation: 'V1-T1-H2',
                timestamp: '2025-01-01T12:00:00'
            }]
        };
        investigation.hops.push(hop2);
        logSuccess('Scenario 1', 'Created Hop 2');

        // Step 5: Create Hop 3 - Final transfer to exchange
        const hop3 = {
            id: 3,
            hopNumber: 3,
            isCollapsed: false,
            entries: [{
                id: 1,
                hopId: 3,
                entryType: 'trace',
                sourceThreadId: 'V1-T1-H2',
                toWallet: 'Binance Hot Wallet',
                toWalletType: 'green',
                amount: 1000,
                currency: 'USDT',
                txHash: '0xhop3tx001',
                notation: 'V1-T1-H3',
                timestamp: '2025-01-01T13:00:00'
            }]
        };
        investigation.hops.push(hop3);
        logSuccess('Scenario 1', 'Created Hop 3');

        console.log('✅ Scenario 1 completed successfully');

    } catch (error) {
        logError('Scenario 1', 'General', error.message);
    }
}

// ==========================================
// SCENARIO 2: Commingling
// 2 victims -> funds merge in Hop 2
// ==========================================
function testScenario2() {
    console.log('\n=== SCENARIO 2: Commingling Flow ===\n');

    try {
        // Reset investigation
        investigation.victims = [];
        investigation.hops = [];

        // Add Victim 1
        const victim1 = {
            id: 1,
            name: 'Victim A',
            isCompleted: true,
            transactions: [{
                id: 1,
                txHash: '0xvictimA001',
                amount: 500,
                currency: 'USDT',
                receivingWallet: '0xREDwalletA',
                datetime: '2025-01-01T10:00:00'
            }]
        };
        investigation.victims.push(victim1);

        // Add Victim 2
        const victim2 = {
            id: 2,
            name: 'Victim B',
            isCompleted: true,
            transactions: [{
                id: 1,
                txHash: '0xvictimB001',
                amount: 750,
                currency: 'USDT',
                receivingWallet: '0xREDwalletB',
                datetime: '2025-01-01T10:30:00'
            }]
        };
        investigation.victims.push(victim2);

        investigation.rootTotalConfirmed = true;
        investigation.confirmedRootTotal = 1250;
        investigation.confirmedRootTotalsByCurrency = { 'USDT': 1250 };
        logSuccess('Scenario 2', 'Added 2 victims');

        // Hop 1: Separate movements
        const hop1 = {
            id: 1,
            hopNumber: 1,
            entries: [
                {
                    id: 1,
                    entryType: 'trace',
                    sourceThreadId: 'V1-T1',
                    toWallet: '0xPURPLE001',
                    amount: 500,
                    currency: 'USDT',
                    notation: 'V1-T1-H1'
                },
                {
                    id: 2,
                    entryType: 'trace',
                    sourceThreadId: 'V2-T1',
                    toWallet: '0xPURPLE002',
                    amount: 750,
                    currency: 'USDT',
                    notation: 'V2-T1-H1'
                }
            ]
        };
        investigation.hops.push(hop1);
        logSuccess('Scenario 2', 'Created separate Hop 1 movements');

        // Hop 2: Commingling - both threads go to same wallet
        const hop2 = {
            id: 2,
            hopNumber: 2,
            entries: [{
                id: 1,
                entryType: 'trace',
                multipleSourceThreads: ['V1-T1-H1', 'V2-T1-H1'],
                sourceThreadId: '', // Empty when multiple sources
                toWallet: '0xCOMMINGLED001',
                toWalletType: 'purple',
                amount: 1250,
                currency: 'USDT',
                notation: 'V1+V2-T1-H2',
                notes: 'Funds commingled from both victims'
            }]
        };
        investigation.hops.push(hop2);
        logSuccess('Scenario 2', 'Created commingling Hop 2');

        // Hop 3: Continue with commingled funds
        const hop3 = {
            id: 3,
            hopNumber: 3,
            entries: [{
                id: 1,
                entryType: 'trace',
                sourceThreadId: 'V1+V2-T1-H2',
                toWallet: '0xFINAL001',
                amount: 1250,
                currency: 'USDT',
                notation: 'V1+V2-T1-H3'
            }]
        };
        investigation.hops.push(hop3);
        logSuccess('Scenario 2', 'Created Hop 3 with commingled funds');

        console.log('✅ Scenario 2 completed successfully');

    } catch (error) {
        logError('Scenario 2', 'Commingling', error.message);
    }
}

// ==========================================
// SCENARIO 3: Split Threads
// 1 source -> splits into 3 outputs
// ==========================================
function testScenario3() {
    console.log('\n=== SCENARIO 3: Split Thread Flow ===\n');

    try {
        investigation.victims = [];
        investigation.hops = [];

        // Single victim
        const victim = {
            id: 1,
            isCompleted: true,
            transactions: [{
                id: 1,
                amount: 1000,
                currency: 'ETH',
                receivingWallet: '0xREDwallet',
                txHash: '0xsplit001'
            }]
        };
        investigation.victims.push(victim);
        investigation.confirmedRootTotalsByCurrency = { 'ETH': 1000 };
        logSuccess('Scenario 3', 'Added victim with 1000 ETH');

        // Hop 1: Single movement
        const hop1 = {
            id: 1,
            hopNumber: 1,
            entries: [{
                id: 1,
                entryType: 'trace',
                sourceThreadId: 'V1-T1',
                toWallet: '0xSPLITTER',
                amount: 1000,
                currency: 'ETH',
                notation: 'V1-T1-H1'
            }]
        };
        investigation.hops.push(hop1);
        logSuccess('Scenario 3', 'Created Hop 1');

        // Hop 2: Split into 3 outputs (with change)
        const hop2 = {
            id: 2,
            hopNumber: 2,
            entries: [
                {
                    id: 1,
                    entryType: 'trace',
                    sourceThreadId: 'V1-T1-H1',
                    toWallet: '0xOUTPUT1',
                    amount: 400,
                    currency: 'ETH',
                    notation: 'V1-T1-H2a',
                    notes: 'Split payment 1'
                },
                {
                    id: 2,
                    entryType: 'trace',
                    sourceThreadId: 'V1-T1-H1',
                    toWallet: '0xOUTPUT2',
                    amount: 300,
                    currency: 'ETH',
                    notation: 'V1-T1-H2b',
                    notes: 'Split payment 2'
                },
                {
                    id: 3,
                    entryType: 'trace',
                    sourceThreadId: 'V1-T1-H1',
                    toWallet: '0xSPLITTER',  // Change back to sender
                    toWalletType: 'orange',
                    amount: 300,
                    currency: 'ETH',
                    notation: 'V1-T1-H2c',
                    notes: 'Change address (same custody)'
                }
            ]
        };
        investigation.hops.push(hop2);
        logSuccess('Scenario 3', 'Created split Hop 2 with 3 outputs');

        // Hop 3: Continue with one of the splits
        const hop3 = {
            id: 3,
            hopNumber: 3,
            entries: [{
                id: 1,
                entryType: 'trace',
                sourceThreadId: 'V1-T1-H2a',
                toWallet: '0xFINAL',
                amount: 400,
                currency: 'ETH',
                notation: 'V1-T1-H3'
            }]
        };
        investigation.hops.push(hop3);
        logSuccess('Scenario 3', 'Created Hop 3 following one split');

        console.log('✅ Scenario 3 completed successfully');

    } catch (error) {
        logError('Scenario 3', 'Split threads', error.message);
    }
}

// ==========================================
// SCENARIO 4: DEX Swap
// USDT -> ETH via DEX
// ==========================================
function testScenario4() {
    console.log('\n=== SCENARIO 4: DEX Swap Flow ===\n');

    try {
        investigation.victims = [];
        investigation.hops = [];

        // Victim with USDT
        const victim = {
            id: 1,
            isCompleted: true,
            transactions: [{
                id: 1,
                amount: 10000,
                currency: 'USDT',
                receivingWallet: '0xREDwalletUSDT',
                txHash: '0xswap001'
            }]
        };
        investigation.victims.push(victim);
        investigation.confirmedRootTotalsByCurrency = { 'USDT': 10000 };
        logSuccess('Scenario 4', 'Added victim with 10000 USDT');

        // Hop 1: Move to preparation wallet
        const hop1 = {
            id: 1,
            hopNumber: 1,
            entries: [{
                id: 1,
                entryType: 'trace',
                sourceThreadId: 'V1-T1',
                toWallet: '0xPREPwallet',
                amount: 10000,
                currency: 'USDT',
                notation: 'V1-T1-H1'
            }]
        };
        investigation.hops.push(hop1);
        logSuccess('Scenario 4', 'Created Hop 1 pre-swap');

        // Hop 2: DEX Swap - USDT to ETH
        const hop2 = {
            id: 2,
            hopNumber: 2,
            entries: [
                {
                    id: 1,
                    entryType: 'swap',
                    sourceThreadId: 'V1-T1-H1',
                    inputAmount: 10000,
                    inputCurrency: 'USDT',
                    outputAmount: 3.5,
                    outputCurrency: 'ETH',
                    toWallet: 'Uniswap V3 Router',
                    toWalletType: 'brown',
                    notation: 'V1-T1-H1 [SWAP: USDT → ETH]',
                    swapService: '0xUniswapRouter',
                    swapType: 'dex',
                    notes: 'Swapped 10000 USDT for 3.5 ETH'
                },
                {
                    id: 2,
                    entryType: 'trace',
                    sourceThreadId: 'V1-T1-H1',
                    toWallet: '0xPREPwallet',  // ETH comes back to sender
                    amount: 3.5,
                    currency: 'ETH',
                    notation: 'V1-T1-H2',
                    notes: 'Received ETH from swap'
                }
            ]
        };
        investigation.hops.push(hop2);
        logSuccess('Scenario 4', 'Created DEX swap in Hop 2');

        // Hop 3: Continue with ETH
        const hop3 = {
            id: 3,
            hopNumber: 3,
            entries: [{
                id: 1,
                entryType: 'trace',
                sourceThreadId: 'V1-T1-H2',
                toWallet: '0xETHfinal',
                amount: 3.5,
                currency: 'ETH',
                notation: 'V1-T1-H3',
                notes: 'Moving swapped ETH'
            }]
        };
        investigation.hops.push(hop3);
        logSuccess('Scenario 4', 'Created Hop 3 with swapped currency');

        console.log('✅ Scenario 4 completed successfully');

    } catch (error) {
        logError('Scenario 4', 'DEX Swap', error.message);
    }
}

// ==========================================
// SCENARIO 5: Complex Combination
// Multiple victims, commingling, splits, and swap
// ==========================================
function testScenario5() {
    console.log('\n=== SCENARIO 5: Complex Combination Flow ===\n');

    try {
        investigation.victims = [];
        investigation.hops = [];

        // Multiple victims with different currencies
        investigation.victims = [
            {
                id: 1,
                isCompleted: true,
                transactions: [
                    {
                        id: 1,
                        amount: 5000,
                        currency: 'USDT',
                        receivingWallet: '0xRED001'
                    },
                    {
                        id: 2,
                        amount: 3000,
                        currency: 'USDC',
                        receivingWallet: '0xRED002'
                    }
                ]
            },
            {
                id: 2,
                isCompleted: true,
                transactions: [{
                    id: 1,
                    amount: 2,
                    currency: 'ETH',
                    receivingWallet: '0xRED003'
                }]
            }
        ];
        investigation.confirmedRootTotalsByCurrency = {
            'USDT': 5000,
            'USDC': 3000,
            'ETH': 2
        };
        logSuccess('Scenario 5', 'Added complex multi-victim setup');

        // Hop 1: Initial movements
        const hop1 = {
            id: 1,
            hopNumber: 1,
            entries: [
                {
                    id: 1,
                    entryType: 'trace',
                    sourceThreadId: 'V1-T1',
                    toWallet: '0xMIXER001',
                    amount: 5000,
                    currency: 'USDT',
                    notation: 'V1-T1-H1'
                },
                {
                    id: 2,
                    entryType: 'trace',
                    sourceThreadId: 'V1-T2',
                    toWallet: '0xMIXER001',  // Same wallet - commingling
                    amount: 3000,
                    currency: 'USDC',
                    notation: 'V1-T2-H1'
                },
                {
                    id: 3,
                    entryType: 'trace',
                    sourceThreadId: 'V2-T1',
                    toWallet: '0xDIFFERENT',
                    amount: 2,
                    currency: 'ETH',
                    notation: 'V2-T1-H1'
                }
            ]
        };
        investigation.hops.push(hop1);
        logSuccess('Scenario 5', 'Created complex Hop 1');

        // Hop 2: Swap USDT to ETH, keep USDC, split ETH
        const hop2 = {
            id: 2,
            hopNumber: 2,
            entries: [
                // USDT Swap
                {
                    id: 1,
                    entryType: 'swap',
                    sourceThreadId: 'V1-T1-H1',
                    inputAmount: 5000,
                    inputCurrency: 'USDT',
                    outputAmount: 1.8,
                    outputCurrency: 'ETH',
                    toWallet: '1inch Router',
                    toWalletType: 'brown',
                    notation: 'V1-T1-H1 [SWAP: USDT → ETH]'
                },
                // USDC continues
                {
                    id: 2,
                    entryType: 'trace',
                    sourceThreadId: 'V1-T2-H1',
                    toWallet: '0xNEXT001',
                    amount: 3000,
                    currency: 'USDC',
                    notation: 'V1-T2-H2'
                },
                // ETH from V2 splits
                {
                    id: 3,
                    entryType: 'trace',
                    sourceThreadId: 'V2-T1-H1',
                    toWallet: '0xSPLIT001',
                    amount: 1.2,
                    currency: 'ETH',
                    notation: 'V2-T1-H2a'
                },
                {
                    id: 4,
                    entryType: 'trace',
                    sourceThreadId: 'V2-T1-H1',
                    toWallet: '0xSPLIT002',
                    amount: 0.8,
                    currency: 'ETH',
                    notation: 'V2-T1-H2b'
                }
            ]
        };
        investigation.hops.push(hop2);
        logSuccess('Scenario 5', 'Created complex Hop 2 with swap and splits');

        // Hop 3: Final convergence
        const hop3 = {
            id: 3,
            hopNumber: 3,
            entries: [
                {
                    id: 1,
                    entryType: 'trace',
                    multipleSourceThreads: ['V1-T2-H2', 'V2-T1-H2a'],
                    toWallet: 'Kraken Deposit',
                    toWalletType: 'green',
                    amount: 3000,
                    currency: 'USDC',
                    notation: 'CONVERGED-H3',
                    notes: 'Multiple currencies converged at exchange'
                }
            ]
        };
        investigation.hops.push(hop3);
        logSuccess('Scenario 5', 'Created final convergence');

        console.log('✅ Scenario 5 completed successfully');

    } catch (error) {
        logError('Scenario 5', 'Complex flow', error.message);
    }
}

// ==========================================
// Run All Tests
// ==========================================
function runAllTests() {
    testScenario1();
    testScenario2();
    testScenario3();
    testScenario4();
    testScenario5();

    console.log('\n' + '='.repeat(50));
    console.log('TEST SUMMARY');
    console.log('='.repeat(50));

    if (errorLog.length === 0) {
        console.log('\n✅ ALL TESTS PASSED SUCCESSFULLY!\n');
    } else {
        console.log(`\n❌ ${errorLog.length} ERRORS FOUND:\n`);
        errorLog.forEach((err, idx) => {
            console.log(`${idx + 1}. ${err.scenario} - ${err.step}`);
            console.log(`   Error: ${err.error}`);
        });
    }

    // Return results for analysis
    return {
        success: errorLog.length === 0,
        errors: errorLog,
        investigation: investigation
    };
}

// Execute tests
const results = runAllTests();

// Export for browser console access
if (typeof window !== 'undefined') {
    window.testResults = results;
    window.testInvestigation = investigation;
    console.log('\nTest results available in: window.testResults');
    console.log('Final investigation state in: window.testInvestigation');
}