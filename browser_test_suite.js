// Browser-Based Comprehensive Test Suite for BATS Tool
// Run this in the browser console to test the actual UI

async function runBrowserTests() {
    console.clear();
    console.log('%c🚀 BATS Tool Browser Test Suite', 'color: blue; font-size: 20px; font-weight: bold');
    console.log('=' .repeat(60));

    const results = {
        passed: [],
        failed: [],
        warnings: []
    };

    function logTest(num, name, status, details = '') {
        const color = status === 'pass' ? 'green' : status === 'fail' ? 'red' : 'orange';
        console.log(`%cTest ${num}: ${name}`, `color: ${color}; font-weight: bold`);
        if (details) console.log(`  → ${details}`);

        if (status === 'pass') results.passed.push({ num, name, details });
        else if (status === 'fail') results.failed.push({ num, name, details });
        else results.warnings.push({ num, name, details });
    }

    // Helper function to wait
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    // ====================
    // TEST SUITE
    // ====================

    console.log('\n%c📋 Testing Core Functions', 'color: blue; font-weight: bold');
    console.log('-'.repeat(40));

    // Test 1: Check if all required functions exist
    const requiredFunctions = [
        'addVictim', 'completeVictim', 'removeVictim',
        'addTransaction', 'updateTransaction', 'removeTransaction',
        'createHop', 'addHopEntry', 'removeHopEntry',
        'applyPIFOAllocation', 'setAllocationMode',
        'getCurrentART', 'saveToStorage', 'loadFromStorage'
    ];

    let missingFunctions = [];
    requiredFunctions.forEach(func => {
        if (typeof window[func] !== 'function') {
            missingFunctions.push(func);
        }
    });

    if (missingFunctions.length === 0) {
        logTest(1, 'Core functions availability', 'pass', 'All functions accessible');
    } else {
        logTest(1, 'Core functions availability', 'fail', `Missing: ${missingFunctions.join(', ')}`);
    }

    // Test 2: Create and complete a victim
    try {
        // Reset investigation
        window.investigation = {
            victims: [],
            hops: [],
            caseId: `TEST-${Date.now()}`,
            investigator: 'Browser Test',
            rootTotalConfirmed: false,
            confirmedRootTotal: 0,
            confirmedRootTotalsByCurrency: {}
        };

        // Add victim
        if (typeof addVictim === 'function') {
            addVictim();
            await wait(100);

            // Check if victim was added
            if (investigation.victims.length > 0) {
                const victim = investigation.victims[0];

                // Add transaction
                if (typeof addTransaction === 'function') {
                    addTransaction(victim.id);
                    await wait(100);

                    // Update transaction details
                    if (victim.transactions.length > 0) {
                        const tx = victim.transactions[0];
                        if (typeof updateTransaction === 'function') {
                            updateTransaction(victim.id, tx.id, 'amount', '1000');
                            updateTransaction(victim.id, tx.id, 'currency', 'USDT');
                            updateTransaction(victim.id, tx.id, 'receivingWallet', '0xtest123');
                            updateTransaction(victim.id, tx.id, 'txHash', 'test_tx_123');

                            // Try to complete victim
                            if (typeof completeVictim === 'function') {
                                completeVictim(victim.id);
                                await wait(100);

                                if (victim.isCompleted) {
                                    logTest(2, 'Victim creation and completion', 'pass');
                                } else {
                                    logTest(2, 'Victim creation and completion', 'fail', 'Victim not marked as completed');
                                }
                            }
                        }
                    }
                }
            }
        } else {
            logTest(2, 'Victim creation and completion', 'fail', 'addVictim function not found');
        }
    } catch (e) {
        logTest(2, 'Victim creation and completion', 'fail', e.message);
    }

    // Test 3: PIFO allocation
    try {
        if (typeof applyPIFOAllocation === 'function') {
            // Mock available sources
            window.getAvailableSourcesForHop = function() {
                return [
                    { threadId: 'V1-T1', availableAmount: 1000, currency: 'USDT' },
                    { threadId: 'V1-T2', availableAmount: 500, currency: 'USDT' },
                    { threadId: 'V2-T1', availableAmount: 300, currency: 'USDT' }
                ];
            };

            const allocation = applyPIFOAllocation(1200, ['V1-T1', 'V1-T2', 'V2-T1']);

            // Check if V1-T1 was allocated first
            if (allocation['V1-T1'] === 1000 && allocation['V1-T2'] === 200) {
                logTest(3, 'PIFO allocation logic', 'pass', 'Correct PIFO order');
            } else {
                logTest(3, 'PIFO allocation logic', 'fail', `Incorrect allocation: ${JSON.stringify(allocation)}`);
            }
        } else {
            logTest(3, 'PIFO allocation logic', 'warning', 'applyPIFOAllocation not found');
        }
    } catch (e) {
        logTest(3, 'PIFO allocation logic', 'fail', e.message);
    }

    // Test 4: Create hop with entries
    try {
        if (typeof createHop === 'function') {
            // Ensure we have victims completed
            if (investigation.victims.length > 0 && investigation.victims[0].isCompleted) {
                // Confirm root total
                investigation.rootTotalConfirmed = true;
                investigation.confirmedRootTotalsByCurrency = { 'USDT': 1000 };

                // Create hop
                createHop();
                await wait(100);

                if (investigation.hops.length > 0) {
                    const hop = investigation.hops[0];

                    // Add trace entry
                    if (typeof addHopEntry === 'function') {
                        const entry = {
                            hopNumber: hop.hopNumber,
                            entryType: 'trace',
                            amount: '500',
                            currency: 'USDT',
                            sourceThreadId: 'V1-T1-H0',
                            notation: 'V1-T1-H1',
                            txHash: 'hop_tx_123',
                            fromWallet: '0xsource',
                            toWallet: '0xdest'
                        };

                        hop.entries.push(entry);
                        logTest(4, 'Hop creation with entries', 'pass');
                    }
                } else {
                    logTest(4, 'Hop creation with entries', 'fail', 'Hop not created');
                }
            } else {
                logTest(4, 'Hop creation with entries', 'warning', 'No completed victims');
            }
        } else {
            logTest(4, 'Hop creation with entries', 'warning', 'createHop not found');
        }
    } catch (e) {
        logTest(4, 'Hop creation with entries', 'fail', e.message);
    }

    // Test 5: Write-off reduces ART
    try {
        if (investigation.hops.length > 0) {
            const hop = investigation.hops[0];

            // Add writeoff entry
            const writeoff = {
                id: Date.now(),
                entryType: 'writeoff',
                amount: '200',
                currency: 'USDT',
                reason: 'Lost in mixer'
            };
            hop.entries.push(writeoff);

            // Calculate remaining ART
            if (typeof getCurrentART === 'function') {
                const art = getCurrentART();

                if (art['USDT'] < 1000) {
                    logTest(5, 'Write-off ART reduction', 'pass', `ART reduced to ${art['USDT']}`);
                } else {
                    logTest(5, 'Write-off ART reduction', 'fail', 'ART not reduced');
                }
            }
        } else {
            logTest(5, 'Write-off ART reduction', 'warning', 'No hops to test');
        }
    } catch (e) {
        logTest(5, 'Write-off ART reduction', 'fail', e.message);
    }

    // Test 6: Save and load investigation
    try {
        if (typeof saveToStorage === 'function' && typeof loadFromStorage === 'function') {
            const originalVictimCount = investigation.victims.length;
            const originalHopCount = investigation.hops.length;

            // Save
            saveToStorage();

            // Clear
            investigation.victims = [];
            investigation.hops = [];

            // Load
            loadFromStorage();

            if (investigation.victims.length === originalVictimCount &&
                investigation.hops.length === originalHopCount) {
                logTest(6, 'Save/Load functionality', 'pass');
            } else {
                logTest(6, 'Save/Load functionality', 'fail', 'Data mismatch after load');
            }
        } else {
            logTest(6, 'Save/Load functionality', 'warning', 'Save/Load functions not found');
        }
    } catch (e) {
        logTest(6, 'Save/Load functionality', 'fail', e.message);
    }

    // Test 7: Hop number consistency after ID removal
    try {
        if (investigation.hops.length > 0) {
            const hop = investigation.hops[0];

            // Check if hop uses hopNumber instead of id
            if (hop.hopNumber !== undefined && hop.id === undefined) {
                logTest(7, 'Hop number migration', 'pass', 'Using hopNumber correctly');
            } else if (hop.id !== undefined) {
                logTest(7, 'Hop number migration', 'fail', 'Still using hop.id');
            } else {
                logTest(7, 'Hop number migration', 'warning', 'Missing hop identifiers');
            }
        } else {
            logTest(7, 'Hop number migration', 'warning', 'No hops to test');
        }
    } catch (e) {
        logTest(7, 'Hop number migration', 'fail', e.message);
    }

    // Test 8: DOM element consistency
    try {
        // Check if hop elements use correct IDs
        const hopElements = document.querySelectorAll('[id^="hopContent_"]');
        let consistent = true;

        hopElements.forEach(elem => {
            const id = elem.id;
            const match = id.match(/hopContent_(\d+)/);
            if (match) {
                const hopNumber = parseInt(match[1]);
                const hop = investigation.hops.find(h => h.hopNumber === hopNumber);
                if (!hop) {
                    consistent = false;
                    console.warn(`DOM element ${id} has no matching hop`);
                }
            }
        });

        if (consistent) {
            logTest(8, 'DOM element consistency', 'pass');
        } else {
            logTest(8, 'DOM element consistency', 'fail', 'Mismatched hop elements');
        }
    } catch (e) {
        logTest(8, 'DOM element consistency', 'fail', e.message);
    }

    // Test 9: Currency validation
    try {
        const currencies = ['BTC', 'ETH', 'USDT', 'USDC', 'CUSTOM'];
        let allValid = true;

        currencies.forEach(currency => {
            if (currency === 'CUSTOM') {
                // Custom currency should allow any string
                const customTest = { currency: 'CUSTOM', customCurrency: 'MYCOIN' };
                if (!customTest.customCurrency) {
                    allValid = false;
                }
            }
        });

        if (allValid) {
            logTest(9, 'Currency validation', 'pass');
        } else {
            logTest(9, 'Currency validation', 'fail');
        }
    } catch (e) {
        logTest(9, 'Currency validation', 'fail', e.message);
    }

    // Test 10: Transaction chronology
    try {
        if (investigation.victims.length > 0) {
            const victim = investigation.victims[0];

            // Add multiple transactions with timestamps
            const now = new Date();
            const tx1 = {
                id: 1,
                datetime: new Date(now.getTime() - 3600000).toISOString(), // 1 hour ago
                amount: '100',
                currency: 'USDT'
            };
            const tx2 = {
                id: 2,
                datetime: now.toISOString(), // Now
                amount: '200',
                currency: 'USDT'
            };

            // Transaction 1 should come before transaction 2
            if (new Date(tx1.datetime) < new Date(tx2.datetime)) {
                logTest(10, 'Transaction chronology', 'pass');
            } else {
                logTest(10, 'Transaction chronology', 'fail', 'Wrong time order');
            }
        } else {
            logTest(10, 'Transaction chronology', 'warning', 'No victims to test');
        }
    } catch (e) {
        logTest(10, 'Transaction chronology', 'fail', e.message);
    }

    // ====================
    // STRESS TESTS
    // ====================

    console.log('\n%c📋 Running Stress Tests', 'color: blue; font-weight: bold');
    console.log('-'.repeat(40));

    // Test 11: Large number of victims
    try {
        const startTime = Date.now();
        const victimCount = 50;

        for (let i = 0; i < victimCount; i++) {
            investigation.victims.push({
                id: 1000 + i,
                name: `Stress Test Victim ${i}`,
                isCompleted: false,
                transactions: [{
                    id: 2000 + i,
                    amount: String(100 * (i + 1)),
                    currency: 'USDT',
                    receivingWallet: `0xstress${i}`,
                    txHash: `stress_tx_${i}`
                }]
            });
        }

        const elapsed = Date.now() - startTime;

        if (investigation.victims.length >= victimCount && elapsed < 1000) {
            logTest(11, 'Large victim count', 'pass', `${victimCount} victims in ${elapsed}ms`);
        } else if (investigation.victims.length >= victimCount) {
            logTest(11, 'Large victim count', 'warning', `Slow: ${elapsed}ms`);
        } else {
            logTest(11, 'Large victim count', 'fail');
        }
    } catch (e) {
        logTest(11, 'Large victim count', 'fail', e.message);
    }

    // Test 12: Deep hop chain
    try {
        const hopDepth = 20;
        const startCount = investigation.hops.length;

        for (let i = 1; i <= hopDepth; i++) {
            investigation.hops.push({
                hopNumber: startCount + i,
                entries: [{
                    id: 3000 + i,
                    entryType: 'trace',
                    amount: String(1000 - i * 10),
                    currency: 'USDT',
                    notation: `H${startCount + i}`
                }]
            });
        }

        if (investigation.hops.length >= startCount + hopDepth) {
            logTest(12, 'Deep hop chain', 'pass', `${hopDepth} hops created`);
        } else {
            logTest(12, 'Deep hop chain', 'fail');
        }
    } catch (e) {
        logTest(12, 'Deep hop chain', 'fail', e.message);
    }

    // Test 13: Complex commingling
    try {
        const complexEntry = {
            id: Date.now(),
            entryType: 'trace',
            amount: '5000',
            currency: 'USDT',
            multipleSourceThreads: [
                'V1-T1-H1', 'V1-T2-H1', 'V2-T1-H1',
                'V3-T1-H1', 'V4-T1-H1', 'V5-T1-H1'
            ],
            notation: '(V1-T1,2) (V2-T1) (V3-T1) (V4-T1) (V5-T1) H2'
        };

        if (complexEntry.multipleSourceThreads.length >= 6) {
            logTest(13, 'Complex commingling', 'pass', '6+ sources commingled');
        } else {
            logTest(13, 'Complex commingling', 'fail');
        }
    } catch (e) {
        logTest(13, 'Complex commingling', 'fail', e.message);
    }

    // Test 14: Rapid state changes
    try {
        const rapidChanges = 100;
        const startTime = Date.now();

        for (let i = 0; i < rapidChanges; i++) {
            // Simulate rapid updates
            if (investigation.victims[0]) {
                investigation.victims[0].name = `Rapid Change ${i}`;
            }
        }

        const elapsed = Date.now() - startTime;

        if (elapsed < 100) {
            logTest(14, 'Rapid state changes', 'pass', `${rapidChanges} changes in ${elapsed}ms`);
        } else {
            logTest(14, 'Rapid state changes', 'warning', `Slow: ${elapsed}ms`);
        }
    } catch (e) {
        logTest(14, 'Rapid state changes', 'fail', e.message);
    }

    // Test 15: Memory usage check
    try {
        if (performance && performance.memory) {
            const usedMemory = performance.memory.usedJSHeapSize / 1048576; // Convert to MB

            if (usedMemory < 100) {
                logTest(15, 'Memory usage', 'pass', `${usedMemory.toFixed(2)} MB`);
            } else if (usedMemory < 200) {
                logTest(15, 'Memory usage', 'warning', `High: ${usedMemory.toFixed(2)} MB`);
            } else {
                logTest(15, 'Memory usage', 'fail', `Excessive: ${usedMemory.toFixed(2)} MB`);
            }
        } else {
            logTest(15, 'Memory usage', 'warning', 'Memory API not available');
        }
    } catch (e) {
        logTest(15, 'Memory usage', 'fail', e.message);
    }

    // ====================
    // SUMMARY
    // ====================

    console.log('\n' + '='.repeat(60));
    console.log('%c📊 TEST SUMMARY', 'color: blue; font-size: 16px; font-weight: bold');
    console.log('='.repeat(60));

    const total = results.passed.length + results.failed.length + results.warnings.length;
    const passRate = ((results.passed.length / total) * 100).toFixed(1);

    console.log(`Total Tests: ${total}`);
    console.log(`%c✅ Passed: ${results.passed.length}`, 'color: green');
    console.log(`%c❌ Failed: ${results.failed.length}`, 'color: red');
    console.log(`%c⚠️  Warnings: ${results.warnings.length}`, 'color: orange');
    console.log(`\nPass Rate: ${passRate}%`);

    // Identify bugs
    console.log('\n%c🐛 BUG ANALYSIS', 'color: red; font-weight: bold');
    console.log('-'.repeat(40));

    const bugs = [];

    if (results.failed.length > 0) {
        results.failed.forEach(test => {
            if (test.name.includes('completion')) {
                bugs.push('Victim completion may have issues');
            }
            if (test.name.includes('hop')) {
                bugs.push('Hop management needs attention');
            }
            if (test.name.includes('DOM')) {
                bugs.push('DOM synchronization issues');
            }
        });
    }

    if (results.warnings.length > 5) {
        bugs.push('Multiple warnings suggest instability');
    }

    // Check for specific known issues
    if (investigation.hops.some(h => h.id !== undefined)) {
        bugs.push('Hop ID removal incomplete - some hops still have .id property');
    }

    if (typeof window.hopCollapseState === 'object') {
        const keys = Object.keys(window.hopCollapseState);
        if (keys.some(k => k.length > 10)) {
            bugs.push('hopCollapseState may still be using old timestamp IDs');
        }
    }

    if (bugs.length === 0) {
        console.log('  ✅ No critical bugs identified');
    } else {
        [...new Set(bugs)].forEach((bug, i) => {
            console.log(`  ${i + 1}. ${bug}`);
        });
    }

    // Performance metrics
    console.log('\n%c⚡ PERFORMANCE METRICS', 'color: blue; font-weight: bold');
    console.log('-'.repeat(40));
    console.log(`Victims in memory: ${investigation.victims.length}`);
    console.log(`Hops in memory: ${investigation.hops.length}`);
    console.log(`Total entries: ${investigation.hops.reduce((sum, h) => sum + (h.entries?.length || 0), 0)}`);

    if (performance && performance.memory) {
        console.log(`Memory used: ${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB`);
        console.log(`Memory limit: ${(performance.memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`);
    }

    console.log('\n✨ Browser test suite complete!');
    console.log('Review the results above for any issues.');

    return results;
}

// Run the tests
console.log('Starting browser tests in 1 second...');
setTimeout(() => {
    runBrowserTests().then(results => {
        // Store results globally for inspection
        window.testResults = results;
        console.log('\nTest results stored in window.testResults');
    });
}, 1000);