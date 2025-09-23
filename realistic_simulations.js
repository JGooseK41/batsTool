// Realistic Investigation Simulations for BATS Tool
// Simulates 50 different real-world investigation scenarios

async function runRealisticSimulations() {
    console.clear();
    console.log('%c🔍 BATS Tool Realistic Investigation Simulations', 'color: blue; font-size: 18px; font-weight: bold');
    console.log('=' .repeat(60));

    const bugs = [];
    const performance = {
        times: [],
        errors: []
    };

    // Helper to wait
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    // Simulation scenarios
    const scenarios = [
        // Simple cases (1-10)
        {
            name: 'Simple Bitcoin theft',
            victims: 1,
            transactions: 1,
            hops: 3,
            currency: 'BTC',
            complexity: 'simple'
        },
        {
            name: 'Ethereum phishing',
            victims: 5,
            transactions: 1,
            hops: 2,
            currency: 'ETH',
            complexity: 'simple'
        },
        {
            name: 'USDT exit scam',
            victims: 20,
            transactions: 1,
            hops: 4,
            currency: 'USDT',
            complexity: 'simple'
        },
        {
            name: 'Single DeFi hack',
            victims: 1,
            transactions: 5,
            hops: 3,
            currency: 'USDC',
            complexity: 'simple'
        },
        {
            name: 'Exchange hack - BTC',
            victims: 10,
            transactions: 2,
            hops: 5,
            currency: 'BTC',
            complexity: 'simple'
        },
        {
            name: 'Ransomware payment',
            victims: 3,
            transactions: 1,
            hops: 6,
            currency: 'BTC',
            complexity: 'simple'
        },
        {
            name: 'NFT rug pull',
            victims: 50,
            transactions: 1,
            hops: 2,
            currency: 'ETH',
            complexity: 'simple'
        },
        {
            name: 'Wallet drainer',
            victims: 15,
            transactions: 3,
            hops: 3,
            currency: 'ETH',
            complexity: 'simple'
        },
        {
            name: 'Mining pool theft',
            victims: 1,
            transactions: 10,
            hops: 4,
            currency: 'BTC',
            complexity: 'simple'
        },
        {
            name: 'SIM swap attack',
            victims: 2,
            transactions: 4,
            hops: 3,
            currency: 'USDT',
            complexity: 'simple'
        },

        // Medium complexity (11-30)
        {
            name: 'Multi-chain bridge exploit',
            victims: 5,
            transactions: 3,
            hops: 8,
            currencies: ['ETH', 'BNB', 'MATIC'],
            hasSwaps: true,
            complexity: 'medium'
        },
        {
            name: 'DeFi protocol drain',
            victims: 25,
            transactions: 2,
            hops: 6,
            currencies: ['USDT', 'USDC', 'DAI'],
            hasCommingling: true,
            complexity: 'medium'
        },
        {
            name: 'Mixer laundering',
            victims: 10,
            transactions: 5,
            hops: 10,
            currency: 'BTC',
            hasWriteoffs: true,
            complexity: 'medium'
        },
        {
            name: 'Flash loan attack',
            victims: 1,
            transactions: 20,
            hops: 5,
            currencies: ['ETH', 'WETH', 'USDC'],
            hasSwaps: true,
            complexity: 'medium'
        },
        {
            name: 'CEX insider theft',
            victims: 100,
            transactions: 1,
            hops: 7,
            currency: 'USDT',
            hasColdStorage: true,
            complexity: 'medium'
        },
        {
            name: 'Smart contract exploit',
            victims: 30,
            transactions: 2,
            hops: 9,
            currencies: ['ETH', 'USDT'],
            hasPartialTraces: true,
            complexity: 'medium'
        },
        {
            name: 'Ponzi scheme collapse',
            victims: 200,
            transactions: 1,
            hops: 12,
            currency: 'USDT',
            hasWriteoffs: true,
            complexity: 'medium'
        },
        {
            name: 'DEX liquidity drain',
            victims: 15,
            transactions: 4,
            hops: 8,
            currencies: ['ETH', 'USDT', 'WBTC'],
            hasSwaps: true,
            hasCommingling: true,
            complexity: 'medium'
        },
        {
            name: 'Cross-chain arbitrage exploit',
            victims: 5,
            transactions: 10,
            hops: 15,
            currencies: ['ETH', 'BNB', 'AVAX', 'FTM'],
            hasSwaps: true,
            complexity: 'medium'
        },
        {
            name: 'Governance attack',
            victims: 40,
            transactions: 1,
            hops: 6,
            currency: 'USDC',
            hasPartialTraces: true,
            complexity: 'medium'
        },
        {
            name: 'MEV bot hijack',
            victims: 8,
            transactions: 15,
            hops: 7,
            currency: 'ETH',
            hasCommingling: true,
            complexity: 'medium'
        },
        {
            name: 'Stablecoin depeg exploit',
            victims: 60,
            transactions: 2,
            hops: 10,
            currencies: ['USDT', 'USDC', 'BUSD'],
            hasSwaps: true,
            complexity: 'medium'
        },
        {
            name: 'Yield farm rug',
            victims: 150,
            transactions: 1,
            hops: 5,
            currency: 'USDT',
            hasColdStorage: true,
            complexity: 'medium'
        },
        {
            name: 'Oracle manipulation',
            victims: 20,
            transactions: 3,
            hops: 8,
            currencies: ['ETH', 'LINK'],
            hasPartialTraces: true,
            complexity: 'medium'
        },
        {
            name: 'Private key compromise',
            victims: 3,
            transactions: 8,
            hops: 11,
            currency: 'BTC',
            hasWriteoffs: true,
            hasCommingling: true,
            complexity: 'medium'
        },
        {
            name: 'Re-entrancy attack',
            victims: 12,
            transactions: 5,
            hops: 9,
            currency: 'ETH',
            hasSwaps: true,
            complexity: 'medium'
        },
        {
            name: 'Sandwich attack profits',
            victims: 100,
            transactions: 1,
            hops: 4,
            currency: 'ETH',
            hasCommingling: true,
            complexity: 'medium'
        },
        {
            name: 'Fake token scam',
            victims: 500,
            transactions: 1,
            hops: 3,
            currency: 'BNB',
            hasColdStorage: true,
            complexity: 'medium'
        },
        {
            name: 'Liquidity sniping',
            victims: 25,
            transactions: 2,
            hops: 6,
            currency: 'ETH',
            hasPartialTraces: true,
            complexity: 'medium'
        },
        {
            name: 'Vault drainage',
            victims: 10,
            transactions: 6,
            hops: 13,
            currencies: ['WBTC', 'WETH', 'USDT'],
            hasSwaps: true,
            hasWriteoffs: true,
            complexity: 'medium'
        },

        // Complex cases (31-50)
        {
            name: 'Nation-state crypto heist',
            victims: 500,
            transactions: 5,
            hops: 20,
            currencies: ['BTC', 'ETH', 'XMR', 'USDT', 'USDC'],
            hasSwaps: true,
            hasWriteoffs: true,
            hasCommingling: true,
            hasColdStorage: true,
            complexity: 'complex'
        },
        {
            name: 'Global exchange hack cascade',
            victims: 10000,
            transactions: 1,
            hops: 25,
            currencies: ['BTC', 'ETH', 'USDT', 'BNB', 'SOL'],
            hasSwaps: true,
            hasPartialTraces: true,
            hasCommingling: true,
            complexity: 'complex'
        },
        {
            name: 'DeFi ecosystem collapse',
            victims: 5000,
            transactions: 3,
            hops: 30,
            currencies: ['ETH', 'USDC', 'DAI', 'USDT', 'WBTC', 'AAVE'],
            hasSwaps: true,
            hasWriteoffs: true,
            hasPartialTraces: true,
            complexity: 'complex'
        },
        {
            name: 'Cross-chain bridge apocalypse',
            victims: 2000,
            transactions: 4,
            hops: 35,
            currencies: ['ETH', 'BNB', 'MATIC', 'AVAX', 'FTM', 'ONE'],
            hasSwaps: true,
            hasCommingling: true,
            hasColdStorage: true,
            complexity: 'complex'
        },
        {
            name: 'Coordinated MEV attack',
            victims: 300,
            transactions: 10,
            hops: 18,
            currencies: ['ETH', 'USDC', 'WETH'],
            hasSwaps: true,
            hasPartialTraces: true,
            complexity: 'complex'
        },
        {
            name: 'Systemic stablecoin failure',
            victims: 20000,
            transactions: 2,
            hops: 22,
            currencies: ['USDT', 'USDC', 'BUSD', 'DAI', 'FRAX'],
            hasSwaps: true,
            hasWriteoffs: true,
            complexity: 'complex'
        },
        {
            name: 'Layer-2 sequencer attack',
            victims: 800,
            transactions: 6,
            hops: 16,
            currencies: ['ETH', 'MATIC', 'OP', 'ARB'],
            hasCommingling: true,
            hasPartialTraces: true,
            complexity: 'complex'
        },
        {
            name: 'Quantum computing theft simulation',
            victims: 100,
            transactions: 20,
            hops: 40,
            currencies: ['BTC', 'ETH', 'LTC', 'BCH'],
            hasSwaps: true,
            hasWriteoffs: true,
            hasCommingling: true,
            complexity: 'complex'
        },
        {
            name: 'DAO governance hijack',
            victims: 1500,
            transactions: 1,
            hops: 14,
            currencies: ['ETH', 'MKR', 'UNI', 'COMP'],
            hasSwaps: true,
            hasColdStorage: true,
            complexity: 'complex'
        },
        {
            name: 'Zero-day protocol exploit chain',
            victims: 400,
            transactions: 8,
            hops: 28,
            currencies: ['ETH', 'USDT', 'USDC', 'WBTC', 'LINK', 'UNI'],
            hasSwaps: true,
            hasWriteoffs: true,
            hasPartialTraces: true,
            hasCommingling: true,
            complexity: 'complex'
        },
        {
            name: 'Institutional custody breach',
            victims: 50,
            transactions: 15,
            hops: 19,
            currencies: ['BTC', 'ETH', 'XRP', 'ADA'],
            hasColdStorage: true,
            hasPartialTraces: true,
            complexity: 'complex'
        },
        {
            name: 'Algorithmic trading bot exploit',
            victims: 200,
            transactions: 25,
            hops: 21,
            currencies: ['ETH', 'USDT', 'WETH', 'USDC'],
            hasSwaps: true,
            hasCommingling: true,
            complexity: 'complex'
        },
        {
            name: 'Privacy coin mixing cascade',
            victims: 75,
            transactions: 12,
            hops: 33,
            currencies: ['XMR', 'ZEC', 'DASH', 'BTC'],
            hasWriteoffs: true,
            hasCommingling: true,
            complexity: 'complex'
        },
        {
            name: 'NFT marketplace exploit',
            victims: 3000,
            transactions: 2,
            hops: 15,
            currencies: ['ETH', 'WETH', 'USDC'],
            hasSwaps: true,
            hasPartialTraces: true,
            complexity: 'complex'
        },
        {
            name: 'Sybil attack proceeds',
            victims: 600,
            transactions: 5,
            hops: 24,
            currencies: ['ETH', 'BNB', 'MATIC'],
            hasCommingling: true,
            hasColdStorage: true,
            complexity: 'complex'
        },
        {
            name: 'Interoperability protocol hack',
            victims: 250,
            transactions: 7,
            hops: 27,
            currencies: ['DOT', 'ATOM', 'ETH', 'BNB'],
            hasSwaps: true,
            hasWriteoffs: true,
            complexity: 'complex'
        },
        {
            name: 'Recursive lending exploit',
            victims: 120,
            transactions: 18,
            hops: 31,
            currencies: ['AAVE', 'COMP', 'ETH', 'USDC'],
            hasSwaps: true,
            hasPartialTraces: true,
            hasCommingling: true,
            complexity: 'complex'
        },
        {
            name: 'Time-locked vault breach',
            victims: 30,
            transactions: 30,
            hops: 26,
            currencies: ['BTC', 'ETH', 'USDT'],
            hasColdStorage: true,
            hasWriteoffs: true,
            complexity: 'complex'
        },
        {
            name: 'Consensus mechanism attack',
            victims: 1000,
            transactions: 4,
            hops: 29,
            currencies: ['ETH', 'BNB', 'SOL', 'AVAX', 'FTM'],
            hasSwaps: true,
            hasCommingling: true,
            hasPartialTraces: true,
            complexity: 'complex'
        },
        {
            name: 'Ultimate crypto heist simulation',
            victims: 50000,
            transactions: 10,
            hops: 50,
            currencies: ['BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'XRP', 'ADA', 'SOL', 'AVAX', 'DOT'],
            hasSwaps: true,
            hasWriteoffs: true,
            hasCommingling: true,
            hasColdStorage: true,
            hasPartialTraces: true,
            complexity: 'complex'
        }
    ];

    console.log(`\n%cRunning ${scenarios.length} simulations...`, 'color: orange; font-weight: bold');
    console.log('-'.repeat(40));

    // Run each simulation
    for (let i = 0; i < scenarios.length; i++) {
        const scenario = scenarios[i];
        const simNum = i + 1;

        try {
            const startTime = Date.now();

            // Reset investigation
            window.investigation = {
                victims: [],
                hops: [],
                caseId: `SIM-${simNum}-${Date.now()}`,
                investigator: `Simulation ${simNum}`,
                rootTotalConfirmed: false,
                confirmedRootTotal: 0,
                confirmedRootTotalsByCurrency: {}
            };

            // Create victims
            const currencies = scenario.currencies || [scenario.currency];
            const mainCurrency = currencies[0];

            for (let v = 0; v < scenario.victims; v++) {
                const victim = {
                    id: v + 1,
                    name: `${scenario.name} - Victim ${v + 1}`,
                    isCompleted: false,
                    transactions: []
                };

                // Add transactions
                const txCount = scenario.transactions || 1;
                for (let t = 0; t < txCount; t++) {
                    const currency = currencies[Math.floor(Math.random() * currencies.length)];
                    victim.transactions.push({
                        id: Date.now() + Math.random(),
                        amount: String(Math.floor(Math.random() * 10000) + 100),
                        currency: currency,
                        receivingWallet: `0x${Math.random().toString(36).substring(2, 15)}`,
                        txHash: `${scenario.name.replace(/\s/g, '_')}_tx_${v}_${t}`,
                        datetime: new Date().toISOString()
                    });
                }

                victim.isCompleted = true;
                investigation.victims.push(victim);
            }

            // Calculate root total
            investigation.confirmedRootTotalsByCurrency = {};
            investigation.victims.forEach(v => {
                v.transactions.forEach(t => {
                    if (!investigation.confirmedRootTotalsByCurrency[t.currency]) {
                        investigation.confirmedRootTotalsByCurrency[t.currency] = 0;
                    }
                    investigation.confirmedRootTotalsByCurrency[t.currency] += parseFloat(t.amount);
                });
            });
            investigation.rootTotalConfirmed = true;

            // Create hops
            for (let h = 1; h <= scenario.hops; h++) {
                const hop = {
                    hopNumber: h,
                    entries: []
                };

                // Determine entry types for this hop
                const entryTypes = [];

                if (h === scenario.hops && scenario.hasColdStorage) {
                    entryTypes.push('cold_storage');
                } else if (scenario.hasSwaps && h % 3 === 0) {
                    entryTypes.push('swap');
                } else if (scenario.hasWriteoffs && h === scenario.hops - 1) {
                    entryTypes.push('writeoff');
                } else {
                    entryTypes.push('trace');
                }

                // Add entries
                entryTypes.forEach(entryType => {
                    const entry = {
                        id: Date.now() + Math.random(),
                        entryType: entryType,
                        amount: String(Math.floor(Math.random() * 5000) + 100),
                        currency: mainCurrency
                    };

                    if (entryType === 'trace') {
                        entry.txHash = `hop_${h}_tx_${Date.now()}`;
                        entry.fromWallet = `0xfrom${h}`;
                        entry.toWallet = `0xto${h}`;

                        if (scenario.hasCommingling && h > 1 && Math.random() > 0.5) {
                            // Commingled entry
                            entry.multipleSourceThreads = [];
                            const numSources = Math.min(3, Math.floor(Math.random() * 5) + 2);
                            for (let s = 0; s < numSources; s++) {
                                const vNum = Math.floor(Math.random() * Math.min(5, scenario.victims)) + 1;
                                const tNum = Math.floor(Math.random() * scenario.transactions) + 1;
                                entry.multipleSourceThreads.push(`V${vNum}-T${tNum}-H${h - 1}`);
                            }
                            entry.notation = entry.multipleSourceThreads.map(t => `(${t.split('-').slice(0, 2).join('-')})`).join(' ') + ` H${h}`;
                        } else {
                            // Single source
                            const vNum = Math.floor(Math.random() * Math.min(5, scenario.victims)) + 1;
                            const tNum = Math.floor(Math.random() * scenario.transactions) + 1;
                            entry.sourceThreadId = `V${vNum}-T${tNum}-H${h - 1}`;
                            entry.notation = `V${vNum}-T${tNum}-H${h}`;
                        }

                        if (scenario.hasPartialTraces && Math.random() > 0.7) {
                            entry.notes = 'Partial trace - full transaction was larger';
                        }
                    } else if (entryType === 'swap') {
                        entry.swapToCurrency = currencies[Math.floor(Math.random() * currencies.length)];
                        entry.swapToAmount = String(Math.floor(Math.random() * 1000) + 10);
                        entry.swapService = ['Uniswap', 'Sushiswap', '1inch', 'Curve'][Math.floor(Math.random() * 4)];
                        entry.txHash = `swap_${h}_${Date.now()}`;
                    } else if (entryType === 'writeoff') {
                        entry.reason = 'Lost in mixer/untraceable';
                    } else if (entryType === 'cold_storage') {
                        entry.toWallet = `cold_storage_${Date.now()}`;
                    }

                    hop.entries.push(entry);
                });

                investigation.hops.push(hop);
            }

            const elapsed = Date.now() - startTime;
            performance.times.push(elapsed);

            // Check for issues
            const issues = [];

            // Check victim completion
            const incompleteVictims = investigation.victims.filter(v => !v.isCompleted);
            if (incompleteVictims.length > 0) {
                issues.push(`${incompleteVictims.length} victims not completed`);
            }

            // Check hop consistency
            investigation.hops.forEach(hop => {
                if (hop.id !== undefined) {
                    issues.push(`Hop ${hop.hopNumber} still has .id property`);
                }
                if (hop.hopNumber === undefined) {
                    issues.push('Hop missing hopNumber');
                }
            });

            // Check for negative amounts
            investigation.hops.forEach(hop => {
                hop.entries.forEach(entry => {
                    if (parseFloat(entry.amount) < 0) {
                        issues.push(`Negative amount in hop ${hop.hopNumber}`);
                    }
                });
            });

            // Report results
            if (issues.length === 0) {
                console.log(`✅ Sim ${simNum}: ${scenario.name} (${elapsed}ms)`);
            } else {
                console.log(`%c❌ Sim ${simNum}: ${scenario.name}`, 'color: red');
                issues.forEach(issue => {
                    console.log(`   → ${issue}`);
                    bugs.push({ simulation: simNum, name: scenario.name, issue });
                });
            }

            // Memory check every 10 simulations
            if (i % 10 === 9 && performance.memory) {
                const memUsed = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
                console.log(`   💾 Memory at sim ${simNum}: ${memUsed} MB`);
            }

        } catch (error) {
            console.log(`%c⚠️  Sim ${simNum}: ${scenario.name} - ERROR`, 'color: red');
            console.log(`   → ${error.message}`);
            performance.errors.push({ simulation: simNum, name: scenario.name, error: error.message });
        }

        // Small delay between simulations
        await wait(10);
    }

    // ====================
    // FINAL REPORT
    // ====================

    console.log('\n' + '='.repeat(60));
    console.log('%c📊 SIMULATION SUMMARY', 'color: blue; font-size: 16px; font-weight: bold');
    console.log('='.repeat(60));

    const avgTime = (performance.times.reduce((a, b) => a + b, 0) / performance.times.length).toFixed(2);
    const maxTime = Math.max(...performance.times);
    const minTime = Math.min(...performance.times);

    console.log(`\nSimulations run: ${scenarios.length}`);
    console.log(`Successful: ${scenarios.length - performance.errors.length}`);
    console.log(`Failed: ${performance.errors.length}`);
    console.log(`Bugs found: ${bugs.length}`);

    console.log('\n⏱️  Performance Metrics:');
    console.log(`Average time: ${avgTime}ms`);
    console.log(`Fastest: ${minTime}ms`);
    console.log(`Slowest: ${maxTime}ms`);

    if (performance.memory) {
        console.log(`Final memory usage: ${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB`);
    }

    if (bugs.length > 0) {
        console.log('\n%c🐛 BUGS FOUND:', 'color: red; font-weight: bold');
        console.log('-'.repeat(40));

        // Group bugs by type
        const bugTypes = {};
        bugs.forEach(bug => {
            if (!bugTypes[bug.issue]) {
                bugTypes[bug.issue] = [];
            }
            bugTypes[bug.issue].push(bug.simulation);
        });

        Object.keys(bugTypes).forEach(issue => {
            console.log(`\n${issue}:`);
            console.log(`  Affected simulations: ${bugTypes[issue].join(', ')}`);
        });
    } else {
        console.log('\n%c✅ No bugs found!', 'color: green; font-weight: bold');
    }

    if (performance.errors.length > 0) {
        console.log('\n%c⚠️  ERRORS:', 'color: orange; font-weight: bold');
        console.log('-'.repeat(40));
        performance.errors.forEach(err => {
            console.log(`Sim ${err.simulation} (${err.name}): ${err.error}`);
        });
    }

    // Identify patterns
    console.log('\n%c🔍 PATTERN ANALYSIS:', 'color: blue; font-weight: bold');
    console.log('-'.repeat(40));

    const complexFailed = performance.errors.filter(e =>
        scenarios[e.simulation - 1].complexity === 'complex'
    ).length;

    const simpleFailed = performance.errors.filter(e =>
        scenarios[e.simulation - 1].complexity === 'simple'
    ).length;

    console.log(`Simple scenarios failed: ${simpleFailed}/10`);
    console.log(`Medium scenarios failed: ${performance.errors.filter(e =>
        scenarios[e.simulation - 1].complexity === 'medium'
    ).length}/20`);
    console.log(`Complex scenarios failed: ${complexFailed}/20`);

    if (complexFailed > simpleFailed * 2) {
        console.log('⚠️  Complex scenarios failing disproportionately - may indicate scaling issues');
    }

    // Performance degradation check
    const firstHalf = performance.times.slice(0, 25);
    const secondHalf = performance.times.slice(25);
    const firstHalfAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondHalfAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;

    if (secondHalfAvg > firstHalfAvg * 1.5) {
        console.log('⚠️  Performance degradation detected - later simulations running slower');
    }

    console.log('\n✨ Simulation suite complete!');
    console.log('Review the results above for optimization opportunities.');

    return { bugs, performance };
}

// Run simulations
console.log('Starting realistic simulations...');
runRealisticSimulations().then(results => {
    window.simulationResults = results;
    console.log('\nResults stored in window.simulationResults');
});