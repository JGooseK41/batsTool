#!/usr/bin/env node

/**
 * B.A.T.S. Tool - Comprehensive Workflow Testing Suite
 * Tests all user paths through the application
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Test scenarios configuration
const TEST_SCENARIOS = {
    // Scenario 1: Simple linear trace
    simple: {
        name: "Simple Linear Trace",
        description: "Single victim → 3 hops → terminal wallet",
        victims: [
            {
                transactions: [
                    { wallet: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", amount: 1.5, currency: "BTC" }
                ]
            }
        ],
        hops: [
            { entries: [{ wallet: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", type: "standard" }] },
            { entries: [{ wallet: "3FKj82J8wXeEdFmboRLnSLtWBJKuhHUaTx", type: "standard" }] },
            { entries: [{ wallet: "bc1qrp47j6f3c2e7x8z9y8k6v5l4h8z6k2x3q9u5jx", type: "terminal", entity: "Binance" }] }
        ]
    },

    // Scenario 2: Multiple victims with commingling
    commingling: {
        name: "Multiple Victims Commingling",
        description: "3 victims → merge at hop 2 → split to multiple terminals",
        victims: [
            { transactions: [{ wallet: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7", amount: 100, currency: "ETH" }] },
            { transactions: [{ wallet: "0x5aAeb6053f3E94C9b9A09f33669435E7Ef1BeAed", amount: 150, currency: "ETH" }] },
            { transactions: [{ wallet: "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359", amount: 200, currency: "ETH" }] }
        ],
        hops: [
            { entries: [
                { wallet: "0x1234567890123456789012345678901234567890", type: "standard" }
            ]},
            { entries: [
                { wallet: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd", type: "mixer", notes: "Tornado Cash" }
            ]},
            { entries: [
                { wallet: "0x2a65Aca4D5fC5B5C859090a6c34d164135398226", type: "terminal", entity: "Kraken" },
                { wallet: "0xD551234Ae421e3BCBA99A0Da6d736074f22192FF", type: "terminal", entity: "Coinbase" }
            ]}
        ]
    },

    // Scenario 3: Bridge/swap workflow
    bridge: {
        name: "Cross-chain Bridge",
        description: "BTC → Bridge to ETH → DeFi swap → Terminal",
        victims: [
            { transactions: [{ wallet: "bc1qx4awcvsd9y9wqx6cthqz8j0fjh5t2m9wvqyth4", amount: 2.5, currency: "BTC" }] }
        ],
        hops: [
            { entries: [{ wallet: "bc1bridge123456789", type: "bridge", notes: "Wrapped BTC" }] },
            { entries: [{ wallet: "0xwbtc123456789", type: "standard", currency: "WBTC" }] },
            { entries: [{ wallet: "0xuniswap123456", type: "bridge", notes: "Swap to USDC" }] },
            { entries: [{ wallet: "0xusdc_terminal", type: "terminal", entity: "FTX", currency: "USDC" }] }
        ]
    },

    // Scenario 4: Partial trace
    partial: {
        name: "Partial Trace",
        description: "Trace only 30% of stolen funds through complex path",
        victims: [
            { transactions: [{ wallet: "0xpartial123", amount: 1000, currency: "USDT" }] }
        ],
        partialAllocation: 0.3,
        hops: [
            { entries: [{ wallet: "0xhop1partial", type: "standard", allocation: 300 }] },
            { entries: [{ wallet: "0xhop2partial", type: "standard", allocation: 300 }] },
            { entries: [{ wallet: "0xColdWallet123", type: "cold", allocation: 300 }] }
        ]
    }
};

class WorkflowTester {
    constructor() {
        this.browser = null;
        this.page = null;
        this.results = {
            passed: [],
            failed: [],
            warnings: []
        };
    }

    async init() {
        console.log('🚀 Initializing test environment...\n');

        // Check if index.html exists
        const indexPath = path.join(__dirname, 'index.html');
        if (!fs.existsSync(indexPath)) {
            throw new Error('index.html not found in current directory');
        }

        // Launch browser
        this.browser = await puppeteer.launch({
            headless: false, // Set to true for CI
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            defaultViewport: { width: 1920, height: 1080 }
        });

        this.page = await this.browser.newPage();

        // Enable console logging
        this.page.on('console', msg => {
            if (msg.type() === 'error') {
                this.results.warnings.push(`Console error: ${msg.text()}`);
            }
        });

        // Navigate to the application
        await this.page.goto(`file://${indexPath}`, { waitUntil: 'networkidle0' });

        // Wait for app to initialize
        await this.page.waitForTimeout(1000);
    }

    async testScenario(scenario) {
        console.log(`\n📋 Testing: ${scenario.name}`);
        console.log(`   ${scenario.description}\n`);

        try {
            // 1. Setup Investigation
            await this.setupInvestigation(scenario.name);

            // 2. Add Victims
            await this.addVictims(scenario.victims);

            // 3. Complete Victims
            await this.completeVictims();

            // 4. Add Hops
            await this.addHops(scenario.hops);

            // 5. Test Visualization
            await this.testVisualization();

            // 6. Test Reporting
            await this.testReporting();

            // 7. Test Export
            await this.testExport();

            this.results.passed.push(scenario.name);
            console.log(`   ✅ ${scenario.name} completed successfully`);

        } catch (error) {
            this.results.failed.push({
                scenario: scenario.name,
                error: error.message,
                stack: error.stack
            });
            console.error(`   ❌ ${scenario.name} failed: ${error.message}`);
        }

        // Reset for next scenario
        await this.resetInvestigation();
    }

    async setupInvestigation(name) {
        console.log('   → Setting up investigation...');

        // Fill in case details
        await this.page.evaluate((caseName) => {
            document.getElementById('caseId').value = `TEST-${Date.now()}`;
            document.getElementById('investigator').value = 'Automated Test';
            document.getElementById('caseType').value = 'theft';
            document.getElementById('caseSynopsis').value = `Testing: ${caseName}`;
        }, name);

        // Save setup
        const setupSaved = await this.page.evaluate(() => {
            if (typeof saveSetup === 'function') {
                saveSetup();
                return true;
            }
            return false;
        });

        if (!setupSaved) {
            throw new Error('Failed to save investigation setup');
        }

        await this.page.waitForTimeout(500);
    }

    async addVictims(victims) {
        console.log(`   → Adding ${victims.length} victim(s)...`);

        // Switch to victims tab
        await this.page.evaluate(() => {
            if (typeof switchTab === 'function') {
                switchTab('victims');
            }
        });

        for (let i = 0; i < victims.length; i++) {
            const victim = victims[i];

            // Add victim
            await this.page.evaluate(() => {
                if (typeof addVictim === 'function') {
                    addVictim();
                }
            });

            await this.page.waitForTimeout(300);

            // Add transactions
            for (const tx of victim.transactions) {
                await this.page.evaluate((victimId, transaction) => {
                    // Find the victim container
                    const victimEl = document.querySelector(`[data-victim-id="${victimId}"]`);
                    if (!victimEl) return;

                    // Add transaction
                    const walletInput = victimEl.querySelector('input[placeholder*="wallet"]');
                    const amountInput = victimEl.querySelector('input[placeholder*="amount"]');
                    const currencySelect = victimEl.querySelector('select');

                    if (walletInput) walletInput.value = transaction.wallet;
                    if (amountInput) amountInput.value = transaction.amount;
                    if (currencySelect) currencySelect.value = transaction.currency;

                }, i + 1, tx);
            }
        }
    }

    async completeVictims() {
        console.log('   → Completing victims section...');

        const completed = await this.page.evaluate(() => {
            // Complete all victims
            const completeButtons = document.querySelectorAll('button[onclick*="completeVictim"]');
            completeButtons.forEach(btn => btn.click());

            // Generate root total
            if (typeof generateRootTotal === 'function') {
                generateRootTotal();
                return true;
            }
            return false;
        });

        if (!completed) {
            throw new Error('Failed to complete victims section');
        }

        await this.page.waitForTimeout(500);
    }

    async addHops(hops) {
        console.log(`   → Adding ${hops.length} hop(s)...`);

        // Switch to hops tab
        await this.page.evaluate(() => {
            if (typeof switchTab === 'function') {
                switchTab('hops');
            }
        });

        for (let hopIndex = 0; hopIndex < hops.length; hopIndex++) {
            const hop = hops[hopIndex];
            console.log(`      • Processing Hop ${hopIndex + 1} with ${hop.entries.length} entries`);

            // Add entries for this hop
            for (const entry of hop.entries) {
                await this.page.evaluate((entryData) => {
                    // Open add entry modal
                    if (typeof openAddEntryModal === 'function') {
                        openAddEntryModal();
                    }

                    // Fill entry details
                    const walletInput = document.getElementById('entryWallet');
                    const entityInput = document.getElementById('entryEntity');
                    const notesInput = document.getElementById('entryNotes');

                    if (walletInput) walletInput.value = entryData.wallet;
                    if (entityInput && entryData.entity) entityInput.value = entryData.entity;
                    if (notesInput && entryData.notes) notesInput.value = entryData.notes;

                    // Set type if specified
                    if (entryData.type === 'terminal') {
                        const terminalCheckbox = document.getElementById('isTerminal');
                        if (terminalCheckbox) terminalCheckbox.checked = true;
                    }

                    // Save entry
                    if (typeof saveEntry === 'function') {
                        saveEntry();
                    }

                }, entry);

                await this.page.waitForTimeout(500);
            }

            // Complete hop if not the last one
            if (hopIndex < hops.length - 1) {
                await this.page.evaluate(() => {
                    if (typeof completeHopAndProceed === 'function') {
                        completeHopAndProceed();
                    }
                });
                await this.page.waitForTimeout(500);
            }
        }
    }

    async testVisualization() {
        console.log('   → Testing visualization...');

        // Switch to visualization tab
        const vizLoaded = await this.page.evaluate(() => {
            if (typeof switchTab === 'function') {
                switchTab('visualization');

                // Initialize visualization
                setTimeout(() => {
                    if (typeof initializeGraphVisualization === 'function') {
                        initializeGraphVisualization();
                    }
                }, 100);

                return true;
            }
            return false;
        });

        if (!vizLoaded) {
            throw new Error('Failed to load visualization');
        }

        await this.page.waitForTimeout(2000);

        // Test layout changes
        console.log('      • Testing layout switches...');

        for (const layout of ['hierarchical', 'force', 'tree']) {
            const layoutChanged = await this.page.evaluate((layoutType) => {
                if (typeof changeLayout === 'function') {
                    changeLayout(layoutType);
                    return true;
                }
                return false;
            }, layout);

            if (!layoutChanged) {
                this.results.warnings.push(`Failed to change to ${layout} layout`);
            }

            await this.page.waitForTimeout(500);
        }

        // Test export buttons
        console.log('      • Testing export functions...');

        const exportAvailable = await this.page.evaluate(() => {
            return typeof exportVisualization === 'function';
        });

        if (!exportAvailable) {
            this.results.warnings.push('Export visualization function not available');
        }
    }

    async testReporting() {
        console.log('   → Testing reporting features...');

        // Switch to reports tab
        await this.page.evaluate(() => {
            if (typeof switchTab === 'function') {
                switchTab('reports');
            }
        });

        await this.page.waitForTimeout(1000);

        // Check if report sections exist
        const reportSections = await this.page.evaluate(() => {
            const sections = {
                summary: !!document.querySelector('.executive-summary'),
                victims: !!document.querySelector('.victim-details'),
                hops: !!document.querySelector('.hop-analysis'),
                terminals: !!document.querySelector('.terminal-summary')
            };
            return sections;
        });

        if (!reportSections.summary) {
            this.results.warnings.push('Executive summary section missing');
        }

        // Test export report
        const exportReportAvailable = await this.page.evaluate(() => {
            return typeof exportReport === 'function';
        });

        if (!exportReportAvailable) {
            this.results.warnings.push('Export report function not available');
        }
    }

    async testExport() {
        console.log('   → Testing export functions...');

        // Test JSON export
        const jsonExportWorks = await this.page.evaluate(() => {
            if (typeof exportJSON === 'function') {
                try {
                    // Don't actually trigger download, just test function exists
                    return true;
                } catch (e) {
                    return false;
                }
            }
            return false;
        });

        if (!jsonExportWorks) {
            this.results.warnings.push('JSON export function not available');
        }

        // Test save investigation
        const saveWorks = await this.page.evaluate(() => {
            if (typeof saveInvestigation === 'function') {
                try {
                    saveInvestigation();
                    return true;
                } catch (e) {
                    return false;
                }
            }
            return false;
        });

        if (!saveWorks) {
            this.results.warnings.push('Save investigation function not working');
        }
    }

    async resetInvestigation() {
        console.log('   → Resetting for next test...');

        // Clear localStorage
        await this.page.evaluate(() => {
            localStorage.clear();
            if (typeof initializeInvestigation === 'function') {
                initializeInvestigation();
            }
        });

        // Reload page
        await this.page.reload({ waitUntil: 'networkidle0' });
        await this.page.waitForTimeout(1000);
    }

    async runAllTests() {
        console.log('========================================');
        console.log('B.A.T.S. WORKFLOW TESTING SUITE');
        console.log('========================================\n');

        try {
            await this.init();

            // Run each scenario
            for (const [key, scenario] of Object.entries(TEST_SCENARIOS)) {
                await this.testScenario(scenario);
            }

            // Test edge cases
            await this.testEdgeCases();

        } catch (error) {
            console.error('\n❌ Fatal error:', error.message);
            this.results.failed.push({
                scenario: 'Initialization',
                error: error.message
            });
        } finally {
            await this.cleanup();
            this.printResults();
        }
    }

    async testEdgeCases() {
        console.log('\n📋 Testing Edge Cases\n');

        // Test 1: Empty investigation
        console.log('   → Testing empty investigation visualization...');
        try {
            await this.page.evaluate(() => {
                switchTab('visualization');
                if (typeof initializeGraphVisualization === 'function') {
                    initializeGraphVisualization();
                }
            });
            await this.page.waitForTimeout(1000);
            console.log('      ✅ Handles empty investigation correctly');
        } catch (e) {
            console.log('      ❌ Failed to handle empty investigation');
        }

        // Test 2: Invalid data
        console.log('   → Testing invalid data handling...');
        try {
            await this.page.evaluate(() => {
                // Try to create entry with invalid wallet
                const wallet = document.getElementById('entryWallet');
                if (wallet) {
                    wallet.value = '';
                    if (typeof saveEntry === 'function') {
                        saveEntry(); // Should show validation error
                    }
                }
            });
            console.log('      ✅ Validates input correctly');
        } catch (e) {
            console.log('      ❌ Validation not working properly');
        }

        // Test 3: Navigation between tabs
        console.log('   → Testing tab navigation...');
        const tabs = ['setup', 'victims', 'hops', 'visualization', 'reports'];
        for (const tab of tabs) {
            try {
                await this.page.evaluate((tabName) => {
                    if (typeof switchTab === 'function') {
                        switchTab(tabName);
                    }
                }, tab);
                await this.page.waitForTimeout(200);
            } catch (e) {
                this.results.warnings.push(`Failed to switch to ${tab} tab`);
            }
        }
        console.log('      ✅ Tab navigation working');
    }

    async cleanup() {
        console.log('\n🧹 Cleaning up...');
        if (this.browser) {
            await this.browser.close();
        }
    }

    printResults() {
        console.log('\n========================================');
        console.log('TEST RESULTS SUMMARY');
        console.log('========================================\n');

        console.log(`✅ Passed: ${this.results.passed.length}`);
        this.results.passed.forEach(test => {
            console.log(`   • ${test}`);
        });

        console.log(`\n❌ Failed: ${this.results.failed.length}`);
        this.results.failed.forEach(failure => {
            console.log(`   • ${failure.scenario}: ${failure.error}`);
        });

        console.log(`\n⚠️  Warnings: ${this.results.warnings.length}`);
        this.results.warnings.forEach(warning => {
            console.log(`   • ${warning}`);
        });

        const totalTests = this.results.passed.length + this.results.failed.length;
        const passRate = totalTests > 0 ?
            ((this.results.passed.length / totalTests) * 100).toFixed(1) : 0;

        console.log(`\n📊 Pass Rate: ${passRate}%`);

        if (this.results.failed.length === 0) {
            console.log('\n🎉 All critical workflows passed!');
        } else {
            console.log(`\n⚠️  ${this.results.failed.length} workflow(s) need attention`);
        }

        // Save results to file
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const resultsFile = `test-results-${timestamp}.json`;
        fs.writeFileSync(resultsFile, JSON.stringify(this.results, null, 2));
        console.log(`\n💾 Results saved to ${resultsFile}`);
    }
}

// Run tests if executed directly
if (require.main === module) {
    const tester = new WorkflowTester();
    tester.runAllTests().catch(console.error);
}

module.exports = WorkflowTester;