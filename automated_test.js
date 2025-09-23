// Automated Test Suite for BATS Tool Core Fixes
// Run this in the browser console on the BATS tool page

async function runAutomatedTests() {
    console.log('🚀 Starting BATS Tool Automated Tests...\n');

    const results = {
        passed: 0,
        failed: 0,
        tests: []
    };

    // Helper function to log test results
    function logTest(name, passed, details = '') {
        const status = passed ? '✅ PASS' : '❌ FAIL';
        console.log(`${status}: ${name}`);
        if (details) console.log(`   Details: ${details}`);
        results.tests.push({ name, passed, details });
        if (passed) results.passed++;
        else results.failed++;
    }

    // Test 1: Check global function accessibility
    console.log('\n📋 Test 1: Global Function Accessibility');
    const requiredFunctions = [
        'addVictim', 'completeVictim', 'removeVictim', 'addTransaction',
        'applyPIFOAllocation', 'setAllocationMode', 'getCurrentART'
    ];

    let allFunctionsAvailable = true;
    requiredFunctions.forEach(func => {
        if (typeof window[func] !== 'function') {
            logTest(`Function ${func}`, false, 'Not globally accessible');
            allFunctionsAvailable = false;
        }
    });

    if (allFunctionsAvailable) {
        logTest('All required functions accessible', true);
    }

    // Test 2: PIFO Allocation Logic
    console.log('\n📋 Test 2: PIFO Allocation Logic');
    if (typeof window.applyPIFOAllocation === 'function') {
        // Create mock thread data
        window.getAvailableSourcesForHop = function() {
            return [
                { threadId: 'V1-T1', availableAmount: 1000, currency: 'USDT' },
                { threadId: 'V2-T1', availableAmount: 500, currency: 'USDT' }
            ];
        };

        const allocation = window.applyPIFOAllocation(1200, ['V1-T1', 'V2-T1']);

        // Check PIFO order (V1 should be allocated first)
        const v1Amount = allocation['V1-T1'] || 0;
        const v2Amount = allocation['V2-T1'] || 0;

        if (v1Amount === 1000 && v2Amount === 200) {
            logTest('PIFO allocation order', true, 'V1 allocated first (1000), then V2 (200)');
        } else {
            logTest('PIFO allocation order', false, `Got V1: ${v1Amount}, V2: ${v2Amount}`);
        }
    } else {
        logTest('PIFO allocation function', false, 'Function not found');
    }

    // Test 3: Create and Complete Victim
    console.log('\n📋 Test 3: Victim Management');
    try {
        // Reset investigation
        window.investigation = {
            victims: [],
            hops: [],
            caseId: 'AUTO-TEST-' + Date.now(),
            investigator: 'Automated Test',
            rootTotalConfirmed: false,
            confirmedRootTotal: 0,
            confirmedRootTotalsByCurrency: {}
        };

        // Add test victim
        const testVictim = {
            id: Date.now(),
            name: 'Auto Test Victim',
            transactions: [{
                id: Date.now() + 1,
                amount: '1000',
                currency: 'USDT',
                datetime: new Date().toISOString(),
                receivingWallet: '0xautotest123',
                txHash: 'auto_test_tx_' + Date.now(),
                notes: 'Automated test transaction'
            }],
            isCompleted: false
        };

        window.investigation.victims.push(testVictim);

        // Try to complete the victim
        if (typeof window.completeVictim === 'function') {
            // Mock the necessary functions
            window.saveToStorage = () => {};
            window.renderVictims = () => {};
            window.updateWorkflowSteps = () => {};
            window.updateGenerateRootSection = () => {};
            window.buildUniversalWalletIndex = () => {};
            window.buildRedWalletIndex = () => {};

            // Mock confirm to auto-accept
            const originalConfirm = window.confirm;
            window.confirm = () => true;

            window.completeVictim(testVictim.id);

            // Check if victim was marked as completed
            if (testVictim.isCompleted === true) {
                logTest('Complete victim functionality', true, 'Victim marked as completed');
            } else {
                logTest('Complete victim functionality', false, 'Victim not marked as completed');
            }

            // Restore confirm
            window.confirm = originalConfirm;
        } else {
            logTest('Complete victim functionality', false, 'Function not available');
        }
    } catch (e) {
        logTest('Victim management', false, e.message);
    }

    // Test 4: ART Calculation with Write-offs
    console.log('\n📋 Test 4: ART Calculation with Write-offs');
    try {
        // Setup test data with write-offs
        window.investigation.victims = [{
            id: 1,
            name: 'Test',
            transactions: [{
                amount: '1000',
                currency: 'USDT'
            }]
        }];

        window.investigation.hops = [{
            id: 1,
            hopNumber: 1,
            entries: [
                { entryType: 'trace', amount: '700', currency: 'USDT' },
                { entryType: 'writeoff', amount: '200', currency: 'USDT' }
            ],
            artAtStartByCurrency: { 'USDT': 1000 }
        }];

        if (typeof window.getCurrentART === 'function') {
            const art = window.getCurrentART();

            // ART should be reduced by both trace (700) and writeoff (200)
            // Leaving 100 USDT
            if (art['USDT'] === 100) {
                logTest('ART reduction by write-offs', true, 'ART correctly reduced from 1000 to 100');
            } else {
                logTest('ART reduction by write-offs', false, `Expected 100, got ${art['USDT']}`);
            }
        } else {
            logTest('ART calculation', false, 'getCurrentART function not found');
        }
    } catch (e) {
        logTest('ART calculation', false, e.message);
    }

    // Test 5: Allocation Mode Toggle
    console.log('\n📋 Test 5: Allocation Mode Toggle');
    try {
        if (typeof window.setAllocationMode === 'function') {
            // Initialize wizard data
            window.hopWizardData = {
                selectedThreads: ['V1-T1'],
                allocations: {},
                txData: { amount: 500, currency: 'USDT' }
            };

            // Mock required functions
            window.applyPIFOToWizard = () => { window.hopWizardData.allocationMode = 'pifo'; };
            window.applyMatchingAllocation = () => { window.hopWizardData.allocationMode = 'matching'; };
            window.hopWizardNextStep = () => {};
            window.hopWizardPrevStep = () => {};

            // Test setting PIFO mode
            window.setAllocationMode('pifo');
            if (window.hopWizardData.allocationMode === 'pifo') {
                logTest('Set PIFO allocation mode', true);
            } else {
                logTest('Set PIFO allocation mode', false, 'Mode not set correctly');
            }

            // Test setting matching mode
            window.setAllocationMode('matching');
            if (window.hopWizardData.allocationMode === 'matching') {
                logTest('Set matching allocation mode', true);
            } else {
                logTest('Set matching allocation mode', false, 'Mode not set correctly');
            }
        } else {
            logTest('Allocation mode toggle', false, 'setAllocationMode function not found');
        }
    } catch (e) {
        logTest('Allocation mode toggle', false, e.message);
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`Total Tests: ${results.passed + results.failed}`);
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);

    if (results.failed > 0) {
        console.log('\n⚠️ Failed Tests:');
        results.tests.filter(t => !t.passed).forEach(t => {
            console.log(`  - ${t.name}: ${t.details}`);
        });
    }

    return results;
}

// Run the tests
console.clear();
runAutomatedTests().then(results => {
    console.log('\n✨ Automated tests complete!');
    console.log('Now perform manual UI tests to verify visual elements and user interactions.');
});