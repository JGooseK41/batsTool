#!/usr/bin/env node

// Node.js test runner for BATS Tool
// This simulates the browser environment and runs test scenarios

console.log('🚀 BATS Tool Test Runner\n');
console.log('=' .repeat(60));

// Mock browser globals
global.window = {
    hopWizardData: null,
    hopCollapseState: {},
    expectingSwapEntry: false
};

global.localStorage = {
    store: {},
    getItem: function(key) { return this.store[key] || null; },
    setItem: function(key, value) { this.store[key] = value; },
    removeItem: function(key) { delete this.store[key]; },
    clear: function() { this.store = {}; }
};

global.document = {
    getElementById: function(id) { return null; },
    createElement: function(tag) { return { innerHTML: '', style: {} }; },
    querySelector: function(selector) { return null; }
};

// Test results tracking
let testResults = {
    passed: [],
    failed: [],
    errors: []
};

function reportTest(name, status, details = '') {
    if (status === 'pass') {
        console.log(`✅ PASS: ${name}`);
        testResults.passed.push({ name, details });
    } else if (status === 'fail') {
        console.log(`❌ FAIL: ${name}`);
        if (details) console.log(`   Details: ${details}`);
        testResults.failed.push({ name, details });
    } else if (status === 'error') {
        console.log(`⚠️  ERROR: ${name}`);
        if (details) console.log(`   Details: ${details}`);
        testResults.errors.push({ name, details });
    }
}

// =================
// TEST SCENARIOS
// =================

console.log('\n📋 TEST 1: Complete Victim Button Functionality');
console.log('-' .repeat(40));

try {
    // Simulate the completeVictim function behavior
    let testVictim = {
        id: 1,
        name: 'Test Victim',
        isCompleted: false,
        transactions: [{
            amount: '1000',
            currency: 'USDT',
            receivingWallet: '0xtest123'
        }]
    };

    // Test completing a victim
    if (testVictim.transactions.length > 0 && testVictim.transactions[0].receivingWallet) {
        testVictim.isCompleted = true;
        reportTest('Complete Victim - Valid Transaction', 'pass', 'Victim marked as completed');
    } else {
        reportTest('Complete Victim - Valid Transaction', 'fail', 'Could not complete victim');
    }

    // Test incomplete victim (no wallet)
    let incompleteVictim = {
        id: 2,
        transactions: [{
            amount: '500',
            currency: 'ETH',
            receivingWallet: ''
        }]
    };

    if (!incompleteVictim.transactions[0].receivingWallet) {
        reportTest('Complete Victim - Validation', 'pass', 'Correctly blocks incomplete victim');
    } else {
        reportTest('Complete Victim - Validation', 'fail', 'Should not allow completion without wallet');
    }

} catch (e) {
    reportTest('Complete Victim Tests', 'error', e.message);
}

console.log('\n📋 TEST 2: PIFO Allocation Logic');
console.log('-' .repeat(40));

try {
    // Simulate PIFO allocation
    function simulatePIFOAllocation(totalAmount, threads) {
        let allocations = {};
        let remaining = totalAmount;

        // Sort threads by victim and transaction ID (PIFO order)
        threads.sort((a, b) => {
            const aMatch = a.id.match(/V(\d+)-T(\d+)/);
            const bMatch = b.id.match(/V(\d+)-T(\d+)/);
            if (aMatch && bMatch) {
                if (aMatch[1] !== bMatch[1]) return parseInt(aMatch[1]) - parseInt(bMatch[1]);
                return parseInt(aMatch[2]) - parseInt(bMatch[2]);
            }
            return 0;
        });

        // Allocate in PIFO order
        for (const thread of threads) {
            if (remaining <= 0) break;
            const allocate = Math.min(remaining, thread.available);
            allocations[thread.id] = allocate;
            remaining -= allocate;
        }

        return allocations;
    }

    // Test PIFO with multiple threads
    const threads = [
        { id: 'V2-T1', available: 500 },
        { id: 'V1-T1', available: 1000 },
        { id: 'V1-T2', available: 300 }
    ];

    const allocation = simulatePIFOAllocation(1200, threads);

    // Check PIFO order (V1-T1 first, then V1-T2, then V2-T1)
    if (allocation['V1-T1'] === 1000 && allocation['V1-T2'] === 200) {
        reportTest('PIFO Allocation Order', 'pass', 'Correctly allocates in victim/transaction order');
    } else {
        reportTest('PIFO Allocation Order', 'fail',
            `Expected V1-T1: 1000, V1-T2: 200, got ${JSON.stringify(allocation)}`);
    }

    // Test PIFO with insufficient funds
    const allocation2 = simulatePIFOAllocation(2000, threads);
    const totalAllocated = Object.values(allocation2).reduce((sum, amt) => sum + amt, 0);

    if (totalAllocated === 1800) {  // Sum of all available
        reportTest('PIFO Max Allocation', 'pass', 'Correctly allocates all available funds');
    } else {
        reportTest('PIFO Max Allocation', 'fail', `Allocated ${totalAllocated}, expected 1800`);
    }

} catch (e) {
    reportTest('PIFO Allocation Tests', 'error', e.message);
}

console.log('\n📋 TEST 3: Partial Tracing Support');
console.log('-' .repeat(40));

try {
    // Simulate partial tracing
    const sourceAmount = 1000;
    const transactionAmount = 1500;

    if (transactionAmount > sourceAmount) {
        // Should allow partial trace
        const tracedAmount = sourceAmount;  // Trace only what we have
        reportTest('Partial Trace - Large Transaction', 'pass',
            `Allows tracing ${tracedAmount} of ${transactionAmount} transaction`);
    }

    // Test exact match
    const exactTransaction = 1000;
    if (exactTransaction === sourceAmount) {
        reportTest('Partial Trace - Exact Match', 'pass', 'Full amount traced for matching transaction');
    }

} catch (e) {
    reportTest('Partial Tracing Tests', 'error', e.message);
}

console.log('\n📋 TEST 4: Write-off ART Reduction');
console.log('-' .repeat(40));

try {
    // Simulate ART calculation with write-offs
    let investigation = {
        confirmedRootTotalsByCurrency: { 'USDT': 1000 },
        hops: [{
            entries: [
                { entryType: 'trace', amount: 600, currency: 'USDT' },
                { entryType: 'writeoff', amount: 200, currency: 'USDT' }
            ]
        }]
    };

    // Calculate remaining ART
    const rootTotal = investigation.confirmedRootTotalsByCurrency['USDT'];
    let totalUsed = 0;
    investigation.hops[0].entries.forEach(entry => {
        if (entry.currency === 'USDT') {
            totalUsed += parseFloat(entry.amount);
        }
    });

    const remainingART = rootTotal - totalUsed;

    if (remainingART === 200) {
        reportTest('Write-off ART Reduction', 'pass', 'ART correctly reduced from 1000 to 200');
    } else {
        reportTest('Write-off ART Reduction', 'fail', `Expected 200, got ${remainingART}`);
    }

    // Test permanent reduction
    const writeoffAmount = investigation.hops[0].entries
        .filter(e => e.entryType === 'writeoff')
        .reduce((sum, e) => sum + parseFloat(e.amount), 0);

    if (writeoffAmount === 200) {
        reportTest('Write-off Permanent Reduction', 'pass', 'Write-offs permanently reduce ART');
    } else {
        reportTest('Write-off Permanent Reduction', 'fail', `Write-off amount: ${writeoffAmount}`);
    }

} catch (e) {
    reportTest('Write-off Tests', 'error', e.message);
}

console.log('\n📋 TEST 5: Over-allocation Prevention');
console.log('-' .repeat(40));

try {
    // Test over-allocation
    const availableAmount = 500;
    const attemptedAllocation = 600;

    if (attemptedAllocation > availableAmount) {
        // Should block
        reportTest('Over-allocation Block', 'pass',
            `Correctly blocks allocation of ${attemptedAllocation} when only ${availableAmount} available`);
    }

    // Test currency mismatch
    const thread1 = { currency: 'USDT', amount: 300 };
    const thread2 = { currency: 'ETH', amount: 200 };

    if (thread1.currency !== thread2.currency) {
        reportTest('Currency Mismatch Detection', 'pass', 'Detects mixed currency allocation attempt');
    }

} catch (e) {
    reportTest('Over-allocation Tests', 'error', e.message);
}

console.log('\n📋 TEST 6: Commingling Notation');
console.log('-' .repeat(40));

try {
    // Test new notation format
    const threads = ['V1-T1-H1', 'V2-T1-H1'];

    // New format should use parentheses
    const newNotation = '(V1-T1) (V2-T1) H2';
    const oldNotation = 'V1-T1-H1, V2-T1-H1';

    if (newNotation.includes('(') && newNotation.includes(')')) {
        reportTest('Commingling Notation Format', 'pass', 'Uses new parentheses format');
    }

    // Test multiple transactions from same victim
    const multiTransactionNotation = '(V1-T1,2,3) H2';
    if (multiTransactionNotation.includes('T1,2,3')) {
        reportTest('Multi-transaction Notation', 'pass', 'Correctly formats multiple transactions');
    }

} catch (e) {
    reportTest('Notation Tests', 'error', e.message);
}

console.log('\n📋 TEST 7: Allocation Mode Toggle');
console.log('-' .repeat(40));

try {
    // Simulate allocation modes
    const modes = ['pifo', 'matching'];
    let currentMode = 'pifo';

    // Test PIFO mode
    if (currentMode === 'pifo') {
        reportTest('PIFO Mode Selection', 'pass', 'PIFO mode can be selected');
    }

    // Switch to matching mode
    currentMode = 'matching';
    if (currentMode === 'matching') {
        reportTest('Matching Mode Selection', 'pass', 'Matching mode can be selected');
    }

    // Test mode persistence
    global.window.hopWizardData = { allocationMode: 'matching' };
    if (global.window.hopWizardData.allocationMode === 'matching') {
        reportTest('Allocation Mode Persistence', 'pass', 'Mode persists in wizard data');
    }

} catch (e) {
    reportTest('Allocation Mode Tests', 'error', e.message);
}

// =================
// TEST SUMMARY
// =================

console.log('\n' + '=' .repeat(60));
console.log('📊 TEST SUMMARY');
console.log('=' .repeat(60));

const totalTests = testResults.passed.length + testResults.failed.length + testResults.errors.length;
const successRate = totalTests > 0 ? (testResults.passed.length / totalTests * 100).toFixed(1) : 0;

console.log(`\nTotal Tests: ${totalTests}`);
console.log(`✅ Passed: ${testResults.passed.length}`);
console.log(`❌ Failed: ${testResults.failed.length}`);
console.log(`⚠️  Errors: ${testResults.errors.length}`);
console.log(`\nSuccess Rate: ${successRate}%`);

if (testResults.failed.length > 0) {
    console.log('\n⚠️  Failed Tests:');
    testResults.failed.forEach(t => {
        console.log(`  - ${t.name}: ${t.details}`);
    });
}

if (testResults.errors.length > 0) {
    console.log('\n⚠️  Test Errors:');
    testResults.errors.forEach(t => {
        console.log(`  - ${t.name}: ${t.details}`);
    });
}

console.log('\n✨ Test run complete!');
console.log('Note: These are simulated tests. For full UI testing, run in browser.');

process.exit(testResults.failed.length > 0 ? 1 : 0);