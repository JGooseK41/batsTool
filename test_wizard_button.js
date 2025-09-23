// Console test to verify the hop wizard step 3 button issue is fixed
// Paste this into your browser console while on the BATS tool page

function testWizardButton() {
    console.log('%c🧪 Testing Hop Wizard Step 3 Button', 'color: blue; font-size: 16px; font-weight: bold');
    console.log('=' .repeat(50));

    // Check if wizard is currently open
    const wizardModal = document.getElementById('hopWizardModal');
    if (wizardModal && wizardModal.style.display !== 'none') {
        console.log('✅ Wizard is currently open');

        // Check current wizard state
        if (window.hopWizardData) {
            console.log('\n📋 Current Wizard State:');
            console.log('  Step:', window.hopWizardData.step);
            console.log('  Entry Mode:', window.hopWizardData.entryMode || 'lookup');
            console.log('  TX Hash:', window.hopWizardData.txHash || 'NOT SET');
            console.log('  TX Data:', window.hopWizardData.txData ? 'EXISTS' : 'NOT SET');

            if (window.hopWizardData.entryMode === 'manual') {
                console.log('  Manual Data:', window.hopWizardData.manualData || 'NOT SET');
                if (window.hopWizardData.manualData?.toWallet) {
                    console.log('  To Wallet:', window.hopWizardData.manualData.toWallet);
                }
            }

            // Check button state
            const nextBtn = document.getElementById('wizardNextBtn');
            if (nextBtn) {
                console.log('\n🔘 Button Status:');
                console.log('  Text:', nextBtn.textContent);
                console.log('  Disabled:', nextBtn.disabled);
                console.log('  Should be disabled:', shouldButtonBeDisabled());
            }

            // Test the fix
            console.log('\n🔧 Testing Fix:');
            if (window.hopWizardData.step === 3) {
                console.log('  You are on Step 3 - Transaction Details');

                // Check if checkWizardButtonState function exists
                if (typeof checkWizardButtonState === 'function') {
                    console.log('  ✅ checkWizardButtonState function exists (FIX APPLIED)');
                } else {
                    console.log('  ❌ checkWizardButtonState function missing (FIX NOT APPLIED)');
                }

                // Simulate entering a transaction hash
                console.log('\n  Simulating transaction hash entry...');
                const testHash = 'test_' + Date.now();
                window.hopWizardData.txHash = testHash;

                // Call the check function if it exists
                if (typeof checkWizardButtonState === 'function') {
                    checkWizardButtonState();
                    console.log('  Called checkWizardButtonState()');
                }

                // Check button state after
                const btnAfter = document.getElementById('wizardNextBtn');
                if (btnAfter) {
                    console.log('  Button disabled after test:', btnAfter.disabled);

                    if (window.hopWizardData.entryMode === 'manual') {
                        if (!window.hopWizardData.manualData?.toWallet) {
                            console.log('  ℹ️ Button still disabled because manual mode needs toWallet');
                        }
                    } else {
                        if (!btnAfter.disabled) {
                            console.log('  ✅ Button enabled with just txHash (FIXED!)');
                        } else {
                            console.log('  ❌ Button still disabled (ISSUE REMAINS)');
                        }
                    }
                }

                // Clean up test
                window.hopWizardData.txHash = '';
            } else {
                console.log(`  You are on Step ${window.hopWizardData.step}`);
                console.log('  Navigate to Step 3 to test the button');
            }
        }
    } else {
        console.log('❌ Wizard is not open');
        console.log('\nTo test, open the wizard:');
        console.log('1. Create a hop if needed');
        console.log('2. Click "+ Add Entry" button');
        console.log('3. Select some threads and proceed to step 3');
        console.log('4. Run this test again');
    }

    function shouldButtonBeDisabled() {
        const data = window.hopWizardData;
        if (!data) return true;

        if (data.step !== 3) return false; // Only check for step 3

        if (data.entryMode === 'manual') {
            return !data.txHash || !data.manualData?.toWallet;
        } else {
            // In lookup mode, should only need txHash
            return !data.txHash;
        }
    }

    console.log('\n' + '=' .repeat(50));
    console.log('Test complete. See results above.');
}

// Also create a function to manually open wizard at step 3 for testing
function openWizardAtStep3() {
    console.log('Opening wizard at step 3 for testing...');

    // Ensure we have a hop
    if (!investigation.hops || investigation.hops.length === 0) {
        console.log('Creating test hop first...');
        investigation.hops.push({
            hopNumber: 1,
            entries: [],
            artAtStartByCurrency: { 'USDT': 1000 }
        });
    }

    const hop = investigation.hops[0];

    // Initialize wizard data
    window.hopWizardData = {
        hopNumber: hop.hopNumber,
        hopId: hop.hopNumber, // For compatibility
        step: 3,
        entryMode: 'lookup',
        selectedThreads: ['V1-T1'],
        allocations: { 'V1-T1': 100 },
        txHash: '', // Empty to test button enabling
        txData: null,
        manualData: {}
    };

    // Open wizard
    if (typeof openHopWizard === 'function') {
        openHopWizard(hop.hopNumber);

        // Force to step 3
        setTimeout(() => {
            if (typeof showHopWizardStep === 'function') {
                showHopWizardStep(3);
                console.log('Wizard opened at Step 3');
                console.log('Now try entering a transaction hash to see if button enables');
            }
        }, 100);
    } else {
        console.log('openHopWizard function not found');
    }
}

// Run the test
testWizardButton();

// Instructions
console.log('\n💡 Additional Commands:');
console.log('- testWizardButton() - Run this test again');
console.log('- openWizardAtStep3() - Open wizard directly at step 3 for testing');
console.log('- window.hopWizardData - View current wizard data');
console.log('- checkWizardButtonState() - Manually trigger button state check');