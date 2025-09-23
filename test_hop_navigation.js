// Test script to verify hop navigation issues beyond hop 3
// Run this in the browser console to test hop creation and navigation

async function testHopNavigation() {
    console.clear();
    console.log('%c🧪 Testing Hop Navigation (Hop 3+)', 'color: blue; font-size: 18px; font-weight: bold');
    console.log('=' .repeat(60));

    // Reset investigation
    window.investigation = {
        victims: [],
        hops: [],
        caseId: 'HOP-NAV-TEST',
        investigator: 'Hop Navigation Test',
        rootTotalConfirmed: false,
        confirmedRootTotal: 0,
        confirmedRootTotalsByCurrency: {}
    };

    // Create test victim
    const victim = {
        id: 1,
        name: 'Test Victim for Hop Navigation',
        isCompleted: true,
        transactions: [{
            id: 1,
            amount: '10000',
            currency: 'USDT',
            receivingWallet: '0xvictim_wallet',
            txHash: 'victim_tx_123'
        }]
    };
    investigation.victims.push(victim);

    // Set root total
    investigation.rootTotalConfirmed = true;
    investigation.confirmedRootTotalsByCurrency = { 'USDT': 10000 };

    console.log('✅ Created victim with 10,000 USDT');

    // Create Hop 1
    const hop1 = {
        hopNumber: 1,
        entries: [{
            id: 101,
            entryType: 'trace',
            amount: '10000',
            currency: 'USDT',
            notation: 'V1-T1-H1',
            sourceThreadId: 'V1-T1',
            txHash: 'hop1_tx',
            fromWallet: '0xvictim_wallet',
            toWallet: '0xhop1_wallet'
        }],
        artAtStartByCurrency: { 'USDT': 10000 }
    };
    investigation.hops.push(hop1);
    console.log('✅ Created Hop 1');

    // Check thread ID for hop 1
    buildAvailableThreadsIndex();
    const hop1Sources = getAvailableSourcesForHop(2, 'USDT');
    console.log('\n📋 Available sources for Hop 2:', hop1Sources);

    // Check thread IDs
    hop1Sources.forEach(source => {
        console.log(`  Thread ID: ${source.threadId}`);
        console.log(`  Pattern check: ${source.threadId.match(/H\d+/g)}`);
    });

    // Create Hop 2
    const hop2 = {
        hopNumber: 2,
        entries: [{
            id: 201,
            entryType: 'trace',
            amount: '5000',
            currency: 'USDT',
            notation: 'V1-T1-H2',  // What should this be?
            sourceThreadId: hop1Sources[0]?.threadId || 'V1-T1-H1',
            txHash: 'hop2_tx',
            fromWallet: '0xhop1_wallet',
            toWallet: '0xhop2_wallet'
        }],
        artAtStartByCurrency: { 'USDT': 10000 }
    };
    investigation.hops.push(hop2);
    console.log('✅ Created Hop 2');

    // Check thread ID for hop 2
    buildAvailableThreadsIndex();
    const hop2Sources = getAvailableSourcesForHop(3, 'USDT');
    console.log('\n📋 Available sources for Hop 3:', hop2Sources);

    // Check for pattern issues
    hop2Sources.forEach(source => {
        console.log(`  Thread ID: ${source.threadId}`);
        const hMatches = source.threadId.match(/H\d+/g);
        console.log(`  H-patterns found: ${hMatches ? hMatches.join(', ') : 'none'}`);

        if (hMatches && hMatches.length > 1) {
            console.log(`  %c⚠️  ISSUE: Multiple H-patterns detected!`, 'color: red');
        }
    });

    // Create Hop 3
    const hop3 = {
        hopNumber: 3,
        entries: [{
            id: 301,
            entryType: 'trace',
            amount: '2500',
            currency: 'USDT',
            notation: 'V1-T1-H3',
            sourceThreadId: hop2Sources[0]?.threadId || 'V1-T1-H2',
            txHash: 'hop3_tx',
            fromWallet: '0xhop2_wallet',
            toWallet: '0xhop3_wallet'
        }],
        artAtStartByCurrency: { 'USDT': 5000 }
    };
    investigation.hops.push(hop3);
    console.log('✅ Created Hop 3');

    // Check thread ID for hop 3
    buildAvailableThreadsIndex();
    const hop3Sources = getAvailableSourcesForHop(4, 'USDT');
    console.log('\n📋 Available sources for Hop 4:', hop3Sources);

    hop3Sources.forEach(source => {
        console.log(`  Thread ID: ${source.threadId}`);
        const hMatches = source.threadId.match(/H\d+/g);
        console.log(`  H-patterns found: ${hMatches ? hMatches.join(', ') : 'none'}`);

        if (hMatches && hMatches.length > 2) {
            console.log(`  %c⚠️  CRITICAL: Thread ID getting too long!`, 'color: red');
        }
    });

    // Test thread availability calculation
    console.log('\n📊 Thread Availability Analysis:');
    console.log('-'.repeat(40));

    const testThreads = [
        'V1-T1',
        'V1-T1-H1',
        'V1-T1-H1-H1',  // Potential duplicate
        'V1-T1-H2',
        'V1-T1-H2-H2',  // Potential duplicate
        'V1-T1-H3',
        'V1-T1-H3-H3'   // Potential duplicate
    ];

    testThreads.forEach(threadId => {
        try {
            const available = getMaxAssignableAmount(threadId, 'USDT');
            if (available > 0) {
                console.log(`✅ ${threadId}: ${available} USDT available`);
            } else {
                console.log(`  ${threadId}: No availability`);
            }
        } catch (e) {
            console.log(`❌ ${threadId}: Error - ${e.message}`);
        }
    });

    // Check for navigation issues
    console.log('\n🧭 Navigation Check:');
    console.log('-'.repeat(40));

    // Try to navigate between hops
    investigation.hops.forEach(hop => {
        const prevHop = investigation.hops.find(h => h.hopNumber === hop.hopNumber - 1);
        const nextHop = investigation.hops.find(h => h.hopNumber === hop.hopNumber + 1);

        console.log(`Hop ${hop.hopNumber}:`);
        console.log(`  Previous: ${prevHop ? `Hop ${prevHop.hopNumber}` : 'None'}`);
        console.log(`  Next: ${nextHop ? `Hop ${nextHop.hopNumber}` : 'None'}`);

        // Check if DOM elements would be found
        const domId = `hopContent_${hop.hopNumber}`;
        console.log(`  DOM ID: ${domId}`);
    });

    // Test ART calculation
    console.log('\n💰 ART Calculation:');
    console.log('-'.repeat(40));

    investigation.hops.forEach(hop => {
        const art = hop.artAtStartByCurrency?.USDT || 0;
        const used = hop.entries.reduce((sum, e) => {
            if (e.currency === 'USDT') {
                return sum + parseFloat(e.amount || 0);
            }
            return sum;
        }, 0);
        const remaining = art - used;

        console.log(`Hop ${hop.hopNumber}: Start=${art}, Used=${used}, Remaining=${remaining}`);

        if (remaining < 0) {
            console.log(`  %c⚠️  ISSUE: Negative ART!`, 'color: red');
        }
    });

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('%c📊 SUMMARY', 'color: blue; font-size: 16px; font-weight: bold');
    console.log('='.repeat(60));

    const issues = [];

    // Check for duplicate H patterns
    investigation.hops.forEach(hop => {
        hop.entries.forEach(entry => {
            if (entry.notation) {
                const threadId = `${entry.notation}-H${hop.hopNumber}`;
                const hMatches = threadId.match(/H\d+/g);
                if (hMatches && hMatches.length > 1) {
                    issues.push(`Hop ${hop.hopNumber}: Thread ID has duplicate H patterns: ${threadId}`);
                }
            }
        });
    });

    // Check for notation inconsistencies
    investigation.hops.forEach(hop => {
        hop.entries.forEach(entry => {
            if (entry.notation && !entry.notation.includes(`H${hop.hopNumber}`)) {
                issues.push(`Hop ${hop.hopNumber}: Notation doesn't match hop number: ${entry.notation}`);
            }
        });
    });

    if (issues.length > 0) {
        console.log('%c🐛 ISSUES FOUND:', 'color: red; font-weight: bold');
        issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
        console.log('%c✅ No issues detected', 'color: green; font-weight: bold');
    }

    console.log('\n💡 Recommendations:');
    console.log('1. Notation should not duplicate hop numbers');
    console.log('2. Thread IDs should be consistent: V{n}-T{n}-H{n}');
    console.log('3. Source thread lookup should handle complex patterns');

    return { hops: investigation.hops, issues };
}

// Run the test
console.log('Starting hop navigation test...');
testHopNavigation().then(results => {
    window.hopTestResults = results;
    console.log('\nTest results stored in window.hopTestResults');
});