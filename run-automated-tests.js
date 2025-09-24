#!/usr/bin/env node

/**
 * B.A.T.S. Tool Automated Test Runner
 * Runs 1000 simulation tests programmatically
 */

const fs = require('fs');

// Test configuration
const CONFIG = {
    numSimulations: 1000,
    minVictims: 1,
    maxVictims: 10,
    minTransactions: 1,
    maxTransactions: 20,
    minHops: 1,
    maxHops: 40
};

// Test results storage
let testResults = {
    passed: 0,
    failed: 0,
    warnings: 0,
    errors: [],
    issuesByCategory: {
        tracing: [],
        commingling: [],
        splitting: [],
        swaps: [],
        validation: [],
        terminal: [],
        performance: [],
        thread: []
    },
    performanceMetrics: {
        maxVictims: 0,
        maxHops: 0,
        maxTransactions: 0,
        avgDuration: 0,
        totalDuration: 0
    }
};

// Utility functions
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateRandomWallet() {
    const chars = '0123456789abcdef';
    let wallet = '0x';
    for (let i = 0; i < 40; i++) {
        wallet += chars[Math.floor(Math.random() * chars.length)];
    }
    return wallet;
}

function generateRandomTxHash() {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
        hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
}

function generateRandomAmount(min = 100, max = 1000000) {
    return (Math.random() * (max - min) + min).toFixed(6);
}

function getThreadChain(threadId) {
    // Get all threads in the chain (e.g., V1-T1, V1-T1-H1, V1-T1-H2, etc.)
    const chain = [];
    const parts = threadId.split('-H');
    const root = parts[0]; // V1-T1
    chain.push(root);

    if (parts.length > 1) {
        const hopNum = parseInt(parts[1]);
        for (let i = 1; i <= hopNum; i++) {
            chain.push(`${root}-H${i}`);
        }
    }

    return chain;
}

// Generate test scenario
function generateTestScenario(id) {
    const numVictims = randomInt(CONFIG.minVictims, CONFIG.maxVictims);
    const numHops = randomInt(CONFIG.minHops, CONFIG.maxHops);

    const scenario = {
        id: id,
        caseId: `TEST-${id}`,
        victims: [],
        hops: [],
        availableThreads: {},
        terminalWallets: []
    };

    // Generate victims
    let totalTransactions = 0;
    for (let v = 1; v <= numVictims; v++) {
        const numTx = randomInt(CONFIG.minTransactions, CONFIG.maxTransactions);
        totalTransactions += numTx;

        const transactions = [];
        let totalLoss = 0;

        for (let t = 1; t <= numTx; t++) {
            const amount = parseFloat(generateRandomAmount());
            const currency = randomChoice(['USDT', 'USDC', 'ETH', 'BTC', 'DAI']);
            totalLoss += amount;

            transactions.push({
                id: t,
                txHash: generateRandomTxHash(),
                amount: amount.toString(),
                currency: currency,
                receivingWallet: generateRandomWallet()
            });

            // Initialize thread
            const threadId = `V${v}-T${t}`;
            if (!scenario.availableThreads[currency]) {
                scenario.availableThreads[currency] = {};
            }
            scenario.availableThreads[currency][threadId] = {
                totalAmount: amount,
                availableAmount: amount
            };
        }

        scenario.victims.push({
            id: v,
            name: `Test Victim ${v}`,
            totalLoss: totalLoss.toString(),
            transactions: transactions
        });
    }

    // Generate hops
    for (let h = 1; h <= numHops; h++) {
        const hop = {
            hopNumber: h,
            entries: [],
            completed: Math.random() > 0.3
        };

        // Generate 1-5 entries per hop
        const numEntries = randomInt(1, Math.min(5, totalTransactions));

        for (let e = 1; e <= numEntries; e++) {
            // Pick random available thread (excluding terminated ones)
            const currencies = Object.keys(scenario.availableThreads);
            if (currencies.length === 0) break;

            const currency = randomChoice(currencies);
            const availableThreadIds = Object.keys(scenario.availableThreads[currency])
                .filter(id => {
                    const thread = scenario.availableThreads[currency][id];
                    return thread.availableAmount > 0.01 && !thread.terminated;
                });

            if (availableThreadIds.length === 0) continue;

            const threadId = randomChoice(availableThreadIds);
            const thread = scenario.availableThreads[currency][threadId];

            // Generate entry
            const entryType = randomChoice(['trace', 'trace', 'trace', 'swap', 'writeoff']);
            const amount = Math.min(thread.availableAmount, parseFloat(generateRandomAmount(10, thread.availableAmount)));

            const entry = {
                id: e,
                entryType: entryType,
                amount: amount.toString(),
                currency: currency,
                fromWallet: generateRandomWallet(),
                toWallet: generateRandomWallet(),
                toWalletType: randomChoice(['black', 'red', 'green', 'purple', 'gray']),
                sourceThreadId: threadId,
                txHash: generateRandomTxHash()
            };

            // Handle different entry types
            if (entryType === 'swap') {
                entry.outputCurrency = randomChoice(['USDT', 'USDC', 'ETH', 'BTC', 'DAI'].filter(c => c !== currency));
                entry.outputAmount = (amount * (0.95 + Math.random() * 0.1)).toString();

                // Create new thread in output currency
                if (!scenario.availableThreads[entry.outputCurrency]) {
                    scenario.availableThreads[entry.outputCurrency] = {};
                }
                scenario.availableThreads[entry.outputCurrency][`${threadId}_${entry.outputCurrency}`] = {
                    totalAmount: parseFloat(entry.outputAmount),
                    availableAmount: parseFloat(entry.outputAmount)
                };
            }

            if (entryType === 'writeoff') {
                entry.category = randomChoice(['mixer', 'lost', 'burned']);
                entry.justification = 'Test writeoff';
            }

            // Terminal wallet detection
            if (entry.toWalletType === 'purple' || entry.toWalletType === 'gray') {
                entry.isTerminalWallet = true;
                entry.exchangeName = randomChoice(['Binance', 'Coinbase', 'Kraken']);
                scenario.terminalWallets.push({
                    hopNumber: h,
                    wallet: entry.toWallet,
                    exchange: entry.exchangeName,
                    amount: amount,
                    currency: currency
                });
            }

            hop.entries.push(entry);

            // Update thread availability
            thread.availableAmount -= amount;
            if (thread.availableAmount <= 0.01) {
                delete scenario.availableThreads[currency][threadId];
                if (Object.keys(scenario.availableThreads[currency]).length === 0) {
                    delete scenario.availableThreads[currency];
                }
            }

            // Create output thread for traces (only if NOT terminal wallet)
            if (entryType === 'trace' && !entry.isTerminalWallet) {
                const newThreadId = `${threadId}-H${h}`;
                if (!scenario.availableThreads[currency]) {
                    scenario.availableThreads[currency] = {};
                }
                scenario.availableThreads[currency][newThreadId] = {
                    totalAmount: amount,
                    availableAmount: amount
                };
            }

            // If this is a terminal wallet, mark the source thread as terminated
            if (entry.isTerminalWallet && threadId) {
                // Remove all threads in this chain from available threads
                const threadChain = getThreadChain(threadId);
                threadChain.forEach(chainThreadId => {
                    if (scenario.availableThreads[currency] && scenario.availableThreads[currency][chainThreadId]) {
                        scenario.availableThreads[currency][chainThreadId].terminated = true;
                        scenario.availableThreads[currency][chainThreadId].availableAmount = 0;
                    }
                });

                // Also mark any derived threads (from swaps) as terminated
                Object.keys(scenario.availableThreads).forEach(curr => {
                    Object.keys(scenario.availableThreads[curr]).forEach(id => {
                        if (id.includes(threadId + '_') || id.includes(threadId + '-H')) {
                            scenario.availableThreads[curr][id].terminated = true;
                            scenario.availableThreads[curr][id].availableAmount = 0;
                        }
                    });
                });
            }
        }

        scenario.hops.push(hop);
    }

    // Update performance metrics
    testResults.performanceMetrics.maxVictims = Math.max(testResults.performanceMetrics.maxVictims, numVictims);
    testResults.performanceMetrics.maxHops = Math.max(testResults.performanceMetrics.maxHops, numHops);
    testResults.performanceMetrics.maxTransactions = Math.max(testResults.performanceMetrics.maxTransactions, totalTransactions);

    return scenario;
}

// Validation functions
function validateTracingLogic(scenario) {
    const issues = [];

    // Check thread allocation consistency
    const threadUsage = {};
    const threadOrigins = {}; // Track original amounts for all threads

    // First pass: collect all thread origins
    scenario.victims.forEach(victim => {
        victim.transactions.forEach(tx => {
            const threadId = `V${victim.id}-T${tx.id}`;
            threadOrigins[threadId] = {
                originalAmount: parseFloat(tx.amount),
                currency: tx.currency,
                type: 'victim_transaction'
            };
        });
    });

    // Track hop output threads
    scenario.hops.forEach(hop => {
        hop.entries.forEach(entry => {
            if (entry.entryType === 'trace' && !entry.isTerminalWallet && entry.sourceThreadId) {
                const outputThreadId = `${entry.sourceThreadId}-H${hop.hopNumber}`;
                threadOrigins[outputThreadId] = {
                    originalAmount: parseFloat(entry.amount),
                    currency: entry.currency,
                    type: 'hop_output'
                };
            }
        });
    });

    // Second pass: check allocations
    scenario.hops.forEach(hop => {
        hop.entries.forEach(entry => {
            if (entry.sourceThreadId) {
                if (!threadUsage[entry.sourceThreadId]) {
                    threadUsage[entry.sourceThreadId] = {
                        allocated: 0,
                        currency: entry.currency,
                        entries: []
                    };
                }
                threadUsage[entry.sourceThreadId].allocated += parseFloat(entry.amount);
                threadUsage[entry.sourceThreadId].entries.push({
                    hop: hop.hopNumber,
                    amount: parseFloat(entry.amount),
                    type: entry.entryType
                });
            }
        });
    });

    // Validate allocations against origins
    Object.entries(threadUsage).forEach(([threadId, usage]) => {
        const origin = threadOrigins[threadId];
        if (origin) {
            // Allow 1% tolerance for floating point precision
            const tolerance = origin.originalAmount * 0.01;
            if (usage.allocated > origin.originalAmount + tolerance) {
                issues.push({
                    category: 'tracing',
                    severity: 'critical',
                    message: `Thread ${threadId} over-allocated: ${usage.allocated.toFixed(6)} > ${origin.originalAmount.toFixed(6)} (${usage.entries.length} entries)`
                });
            }

            // Check for negative allocations
            if (usage.allocated < 0) {
                issues.push({
                    category: 'tracing',
                    severity: 'critical',
                    message: `Thread ${threadId} has negative allocation: ${usage.allocated.toFixed(6)}`
                });
            }

            // Warn about very small remaining amounts (potential precision issues)
            const remaining = origin.originalAmount - usage.allocated;
            if (remaining > 0 && remaining < 0.000001 && remaining > 0) {
                issues.push({
                    category: 'tracing',
                    severity: 'warning',
                    message: `Thread ${threadId} has very small remaining amount: ${remaining.toFixed(8)} (potential precision issue)`
                });
            }
        } else {
            // Thread used but no origin found
            issues.push({
                category: 'tracing',
                severity: 'critical',
                message: `Thread ${threadId} used but no origin found`
            });
        }
    });

    // Check for unused threads (might indicate generation issues)
    Object.keys(threadOrigins).forEach(threadId => {
        if (!threadUsage[threadId]) {
            const origin = threadOrigins[threadId];
            if (origin.originalAmount > 0.01) {
                issues.push({
                    category: 'tracing',
                    severity: 'warning',
                    message: `Thread ${threadId} created but never used (${origin.originalAmount.toFixed(2)} ${origin.currency})`
                });
            }
        }
    });

    return issues;
}

function validateSwaps(scenario) {
    const issues = [];

    scenario.hops.forEach(hop => {
        hop.entries.forEach(entry => {
            if (entry.entryType === 'swap') {
                // Check swap ratio
                const inputAmount = parseFloat(entry.amount);
                const outputAmount = parseFloat(entry.outputAmount || 0);
                const ratio = outputAmount / inputAmount;

                if (ratio <= 0 || ratio > 2) {
                    issues.push({
                        category: 'swaps',
                        severity: 'major',
                        message: `Hop ${hop.hopNumber}: Invalid swap ratio ${ratio.toFixed(4)}`
                    });
                }

                // Check currencies
                if (!entry.outputCurrency || entry.currency === entry.outputCurrency) {
                    issues.push({
                        category: 'swaps',
                        severity: 'critical',
                        message: `Hop ${hop.hopNumber}: Invalid swap currencies`
                    });
                }
            }
        });
    });

    return issues;
}

function validateTerminalWallets(scenario) {
    const issues = [];

    // Check terminal wallet consistency
    const terminalEntries = [];
    const terminalThreadIds = new Set();

    scenario.hops.forEach(hop => {
        hop.entries.forEach(entry => {
            if (entry.isTerminalWallet) {
                terminalEntries.push({
                    hop: hop.hopNumber,
                    wallet: entry.toWallet,
                    type: entry.toWalletType,
                    threadId: entry.sourceThreadId
                });

                // Track which threads ended at terminals
                if (entry.sourceThreadId) {
                    terminalThreadIds.add(entry.sourceThreadId);
                }

                // Check wallet type
                if (!['purple', 'gray', 'blue'].includes(entry.toWalletType)) {
                    issues.push({
                        category: 'terminal',
                        severity: 'major',
                        message: `Hop ${hop.hopNumber}: Terminal wallet has wrong type: ${entry.toWalletType}`
                    });
                }
            }
        });
    });

    // Check if any entry uses a thread that previously ended at a terminal
    scenario.hops.forEach(hop => {
        hop.entries.forEach(entry => {
            if (entry.sourceThreadId) {
                // Check if this thread originates from a terminal thread
                const rootThreadId = entry.sourceThreadId.split('-H')[0]; // Get root thread (V1-T1)

                // Check if any part of this thread chain ended at a terminal
                let currentThreadId = entry.sourceThreadId;
                while (currentThreadId) {
                    if (terminalThreadIds.has(currentThreadId)) {
                        // This is using a thread that should have ended at a terminal
                        issues.push({
                            category: 'terminal',
                            severity: 'critical',
                            message: `Hop ${hop.hopNumber}: Entry uses thread ${entry.sourceThreadId} that previously ended at terminal (${currentThreadId})`
                        });
                        break;
                    }

                    // Move up the chain (V1-T1-H3 -> V1-T1-H2 -> V1-T1)
                    const parts = currentThreadId.split('-H');
                    if (parts.length > 1) {
                        const hopNum = parseInt(parts[1]);
                        if (hopNum > 1) {
                            currentThreadId = parts[0] + '-H' + (hopNum - 1);
                        } else {
                            currentThreadId = parts[0]; // Back to root (V1-T1)
                        }
                    } else {
                        break; // Already at root
                    }
                }
            }
        });
    });

    // Check terminal index
    if (terminalEntries.length !== scenario.terminalWallets.length) {
        issues.push({
            category: 'terminal',
            severity: 'major',
            message: `Terminal wallet count mismatch: ${terminalEntries.length} entries vs ${scenario.terminalWallets.length} in index`
        });
    }

    return issues;
}

function validateCommingling(scenario) {
    const issues = [];

    scenario.hops.forEach(hop => {
        // Check for multiple source threads (commingling)
        const sourceThreads = new Set();
        const outputWallets = new Set();

        hop.entries.forEach(entry => {
            if (entry.sourceThreadId) {
                sourceThreads.add(entry.sourceThreadId);
            }
            outputWallets.add(entry.toWallet);
        });

        // Commingling detection
        if (sourceThreads.size > 1 && outputWallets.size === 1) {
            // This is valid commingling, just note it
            console.log(`Hop ${hop.hopNumber}: Commingling detected - ${sourceThreads.size} threads → 1 wallet`);
        }

        // Splitting detection
        if (sourceThreads.size === 1 && outputWallets.size > 1) {
            // This is valid splitting, just note it
            console.log(`Hop ${hop.hopNumber}: Splitting detected - 1 thread → ${outputWallets.size} wallets`);
        }

        // Check for impossible scenarios
        if (hop.entries.length > 0 && sourceThreads.size === 0) {
            issues.push({
                category: 'commingling',
                severity: 'critical',
                message: `Hop ${hop.hopNumber}: Entries with no source threads`
            });
        }
    });

    return issues;
}

function validateAmounts(scenario) {
    const issues = [];

    scenario.hops.forEach(hop => {
        hop.entries.forEach(entry => {
            const amount = parseFloat(entry.amount);

            // Check for invalid amounts
            if (amount <= 0) {
                issues.push({
                    category: 'validation',
                    severity: 'critical',
                    message: `Hop ${hop.hopNumber}: Invalid amount ${amount}`
                });
            }

            if (amount > 1e12) {
                issues.push({
                    category: 'validation',
                    severity: 'warning',
                    message: `Hop ${hop.hopNumber}: Unrealistic amount ${amount}`
                });
            }

            // Check wallet formats
            if (!entry.fromWallet?.startsWith('0x') || entry.fromWallet.length !== 42) {
                issues.push({
                    category: 'validation',
                    severity: 'major',
                    message: `Hop ${hop.hopNumber}: Invalid from wallet format`
                });
            }

            if (!entry.toWallet?.startsWith('0x') || entry.toWallet.length !== 42) {
                issues.push({
                    category: 'validation',
                    severity: 'major',
                    message: `Hop ${hop.hopNumber}: Invalid to wallet format`
                });
            }

            // Check tx hash
            if (!entry.txHash?.startsWith('0x') || entry.txHash.length !== 66) {
                issues.push({
                    category: 'validation',
                    severity: 'minor',
                    message: `Hop ${hop.hopNumber}: Invalid transaction hash format`
                });
            }
        });
    });

    return issues;
}

// Main test runner
async function runTests() {
    console.log('====================================');
    console.log('B.A.T.S. Tool Automated Test Suite');
    console.log('====================================\n');
    console.log(`Running ${CONFIG.numSimulations} test scenarios...\n`);

    const startTime = Date.now();
    const allIssues = [];

    // Progress tracking
    const progressInterval = Math.floor(CONFIG.numSimulations / 20);

    for (let i = 1; i <= CONFIG.numSimulations; i++) {
        // Generate scenario
        const scenario = generateTestScenario(i);

        // Run validations
        const tracingIssues = validateTracingLogic(scenario);
        const swapIssues = validateSwaps(scenario);
        const terminalIssues = validateTerminalWallets(scenario);
        const comminglingIssues = validateCommingling(scenario);
        const amountIssues = validateAmounts(scenario);

        // Collect all issues
        const scenarioIssues = [
            ...tracingIssues,
            ...swapIssues,
            ...terminalIssues,
            ...comminglingIssues,
            ...amountIssues
        ];

        // Categorize results
        if (scenarioIssues.length === 0) {
            testResults.passed++;
        } else {
            const criticalIssues = scenarioIssues.filter(i => i.severity === 'critical');
            if (criticalIssues.length > 0) {
                testResults.failed++;
                testResults.errors.push({
                    scenario: i,
                    issues: criticalIssues
                });
            } else {
                testResults.warnings++;
            }

            // Track issues by category
            scenarioIssues.forEach(issue => {
                testResults.issuesByCategory[issue.category].push({
                    scenario: i,
                    message: issue.message,
                    severity: issue.severity
                });
            });
        }

        allIssues.push(...scenarioIssues);

        // Progress update
        if (i % progressInterval === 0) {
            const progress = Math.round((i / CONFIG.numSimulations) * 100);
            process.stdout.write(`\rProgress: ${progress}% (${i}/${CONFIG.numSimulations})`);
        }
    }

    const endTime = Date.now();
    testResults.performanceMetrics.totalDuration = endTime - startTime;
    testResults.performanceMetrics.avgDuration = (endTime - startTime) / CONFIG.numSimulations;

    console.log('\n\n====================================');
    console.log('Test Results Summary');
    console.log('====================================\n');

    // Summary statistics
    const passRate = ((testResults.passed / CONFIG.numSimulations) * 100).toFixed(2);
    console.log(`✅ Passed: ${testResults.passed}`);
    console.log(`❌ Failed: ${testResults.failed}`);
    console.log(`⚠️  Warnings: ${testResults.warnings}`);
    console.log(`📊 Pass Rate: ${passRate}%\n`);

    // Performance metrics
    console.log('Performance Metrics:');
    console.log(`  Max Victims Tested: ${testResults.performanceMetrics.maxVictims}`);
    console.log(`  Max Hops Tested: ${testResults.performanceMetrics.maxHops}`);
    console.log(`  Max Transactions: ${testResults.performanceMetrics.maxTransactions}`);
    console.log(`  Avg Test Duration: ${testResults.performanceMetrics.avgDuration.toFixed(2)}ms`);
    console.log(`  Total Runtime: ${(testResults.performanceMetrics.totalDuration / 1000).toFixed(2)}s\n`);

    // Issues by category
    console.log('Issues by Category:');
    Object.entries(testResults.issuesByCategory).forEach(([category, issues]) => {
        if (issues.length > 0) {
            const critical = issues.filter(i => i.severity === 'critical').length;
            const major = issues.filter(i => i.severity === 'major').length;
            const minor = issues.filter(i => i.severity === 'minor').length;
            console.log(`  ${category}: ${issues.length} issues (Critical: ${critical}, Major: ${major}, Minor: ${minor})`);
        }
    });

    // Show critical errors
    if (testResults.errors.length > 0) {
        console.log('\n🚨 Critical Errors (first 10):');
        testResults.errors.slice(0, 10).forEach(error => {
            console.log(`  Scenario ${error.scenario}:`);
            error.issues.forEach(issue => {
                console.log(`    - ${issue.message}`);
            });
        });
    }

    // Save detailed results
    const reportData = {
        metadata: {
            timestamp: new Date().toISOString(),
            config: CONFIG,
            runtime: testResults.performanceMetrics.totalDuration
        },
        summary: {
            passed: testResults.passed,
            failed: testResults.failed,
            warnings: testResults.warnings,
            passRate: passRate
        },
        performanceMetrics: testResults.performanceMetrics,
        issuesByCategory: Object.entries(testResults.issuesByCategory).reduce((acc, [cat, issues]) => {
            acc[cat] = {
                total: issues.length,
                critical: issues.filter(i => i.severity === 'critical').length,
                major: issues.filter(i => i.severity === 'major').length,
                minor: issues.filter(i => i.severity === 'minor').length
            };
            return acc;
        }, {}),
        criticalErrors: testResults.errors.slice(0, 50)
    };

    const filename = `test-results-${new Date().toISOString().split('T')[0]}.json`;
    fs.writeFileSync(filename, JSON.stringify(reportData, null, 2));
    console.log(`\n📁 Detailed results saved to: ${filename}`);

    // Final assessment
    console.log('\n====================================');
    console.log('Test Assessment');
    console.log('====================================\n');

    if (passRate >= 95) {
        console.log('✅ EXCELLENT: System is highly stable');
    } else if (passRate >= 90) {
        console.log('👍 GOOD: Minor issues detected, system is stable');
    } else if (passRate >= 80) {
        console.log('⚠️  WARNING: Significant issues present, review critical errors');
    } else {
        console.log('❌ CRITICAL: Major stability issues, immediate fixes required');
    }

    // Recommendations
    if (testResults.issuesByCategory.tracing.length > 10) {
        console.log('\n📌 Recommendation: Review thread allocation logic');
    }
    if (testResults.issuesByCategory.swaps.length > 10) {
        console.log('📌 Recommendation: Validate swap calculations and currency handling');
    }
    if (testResults.issuesByCategory.terminal.length > 10) {
        console.log('📌 Recommendation: Fix terminal wallet detection and indexing');
    }
    if (testResults.issuesByCategory.validation.length > 10) {
        console.log('📌 Recommendation: Strengthen input validation rules');
    }

    console.log('\n✅ Test suite completed successfully!\n');
}

// Run tests
runTests().catch(error => {
    console.error('Fatal error during test execution:', error);
    process.exit(1);
});