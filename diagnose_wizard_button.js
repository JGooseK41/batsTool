// Diagnostic script to identify the real cause of the disabled Log Entry button
// Run this in console while the wizard is open at step 3

function diagnoseWizardButton() {
    console.clear();
    console.log('%c🔍 DIAGNOSING WIZARD BUTTON ISSUE', 'color: red; font-size: 18px; font-weight: bold');
    console.log('=' .repeat(60));

    // 1. Check if wizard is open
    const modal = document.getElementById('hopWizardModal');
    if (!modal || modal.style.display === 'none') {
        console.log('❌ Wizard not open. Please:');
        console.log('   1. Open the hop wizard');
        console.log('   2. Navigate to step 3');
        console.log('   3. Run this diagnostic again');
        return;
    }

    console.log('✅ Wizard is open\n');

    // 2. Check wizard data structure
    console.log('📊 WIZARD DATA STRUCTURE:');
    console.log('-'.repeat(40));

    if (!window.hopWizardData) {
        console.log('❌ CRITICAL: window.hopWizardData is undefined!');
        return;
    }

    console.log('window.hopWizardData exists');
    console.log('Current step:', window.hopWizardData.step);
    console.log('All properties:', Object.keys(window.hopWizardData));

    // 3. Detailed data inspection
    console.log('\n📋 DATA VALUES:');
    console.log('-'.repeat(40));
    console.log('step:', window.hopWizardData.step);
    console.log('entryMode:', window.hopWizardData.entryMode);
    console.log('txHash:', window.hopWizardData.txHash);
    console.log('txHash type:', typeof window.hopWizardData.txHash);
    console.log('txHash truthy?:', !!window.hopWizardData.txHash);
    console.log('txData:', window.hopWizardData.txData);
    console.log('txData type:', typeof window.hopWizardData.txData);
    console.log('manualData:', window.hopWizardData.manualData);

    if (window.hopWizardData.manualData) {
        console.log('manualData.toWallet:', window.hopWizardData.manualData.toWallet);
    }

    // 4. Check button element
    console.log('\n🔘 BUTTON ELEMENT:');
    console.log('-'.repeat(40));

    const nextBtn = document.getElementById('wizardNextBtn');
    if (!nextBtn) {
        console.log('❌ Button element not found!');
        return;
    }

    console.log('Button found');
    console.log('Button text:', nextBtn.textContent);
    console.log('Button disabled:', nextBtn.disabled);
    console.log('Button onclick:', nextBtn.onclick ? 'Set' : 'Not set');

    // 5. Check the actual condition logic
    console.log('\n🧮 CONDITION CHECKS:');
    console.log('-'.repeat(40));

    const wizardData = window.hopWizardData;

    if (wizardData.step === 3) {
        console.log('On step 3 - checking conditions...\n');

        if (wizardData.entryMode === 'manual') {
            console.log('MODE: Manual Entry');
            console.log('Checking: !wizardData.txHash || !wizardData.manualData?.toWallet');
            console.log('  !wizardData.txHash =', !wizardData.txHash);
            console.log('  !wizardData.manualData?.toWallet =', !wizardData.manualData?.toWallet);

            const shouldDisable = !wizardData.txHash || !wizardData.manualData?.toWallet;
            console.log('  Result: Button should be disabled =', shouldDisable);

            if (nextBtn.disabled !== shouldDisable) {
                console.log('  ⚠️ MISMATCH: Button disabled =', nextBtn.disabled, 'but should be', shouldDisable);
            }
        } else {
            console.log('MODE: API Lookup (or default)');
            console.log('Checking: !wizardData.txHash || !wizardData.txData');
            console.log('  !wizardData.txHash =', !wizardData.txHash);
            console.log('  !wizardData.txData =', !wizardData.txData);

            const shouldDisable = !wizardData.txHash || !wizardData.txData;
            console.log('  Result: Button should be disabled =', shouldDisable);

            if (nextBtn.disabled !== shouldDisable) {
                console.log('  ⚠️ MISMATCH: Button disabled =', nextBtn.disabled, 'but should be', shouldDisable);
            }
        }
    }

    // 6. Test what happens when we set values
    console.log('\n🧪 TESTING VALUE CHANGES:');
    console.log('-'.repeat(40));

    // Save current state
    const originalTxHash = wizardData.txHash;
    const originalTxData = wizardData.txData;

    // Test 1: Set txHash
    console.log('Test 1: Setting txHash to "test_hash_123"');
    wizardData.txHash = 'test_hash_123';
    console.log('  Button disabled after setting txHash:', nextBtn.disabled);

    // Test 2: Set txData
    console.log('Test 2: Setting txData to mock object');
    wizardData.txData = { test: true };
    console.log('  Button disabled after setting txData:', nextBtn.disabled);

    // Test 3: Clear txData
    console.log('Test 3: Clearing txData');
    wizardData.txData = null;
    console.log('  Button disabled after clearing txData:', nextBtn.disabled);

    // Restore original state
    wizardData.txHash = originalTxHash;
    wizardData.txData = originalTxData;
    console.log('\nRestored original state');

    // 7. Check for any event handlers
    console.log('\n⚡ EVENT HANDLERS:');
    console.log('-'.repeat(40));

    const txHashInput = document.getElementById('wizardTxHash');
    if (txHashInput) {
        console.log('TX Hash input found');
        console.log('  onchange:', txHashInput.onchange ? 'Set' : 'Not set');
        console.log('  oninput:', txHashInput.oninput ? 'Set' : 'Not set');
        console.log('  onkeyup:', txHashInput.onkeyup ? 'Set' : 'Not set');
        console.log('  value:', txHashInput.value);
    } else {
        console.log('TX Hash input not found');
    }

    // 8. Check function availability
    console.log('\n🔧 FUNCTION CHECKS:');
    console.log('-'.repeat(40));
    console.log('checkWizardButtonState exists?', typeof checkWizardButtonState === 'function');
    console.log('showHopWizardStep exists?', typeof showHopWizardStep === 'function');
    console.log('hopWizardNext exists?', typeof hopWizardNext === 'function');
    console.log('createHopEntryFromWizard exists?', typeof createHopEntryFromWizard === 'function');

    // 9. Final diagnosis
    console.log('\n' + '='.repeat(60));
    console.log('%c📊 DIAGNOSIS SUMMARY', 'color: blue; font-size: 16px; font-weight: bold');
    console.log('='.repeat(60));

    const issues = [];

    if (wizardData.step === 3) {
        if (!wizardData.txHash) {
            issues.push('Transaction hash is not set');
        }

        if (wizardData.entryMode !== 'manual' && !wizardData.txData) {
            issues.push('In lookup mode but txData is not set (lookup may not have been clicked)');
        }

        if (wizardData.entryMode === 'manual' && !wizardData.manualData?.toWallet) {
            issues.push('In manual mode but toWallet is not set');
        }

        if (nextBtn.disabled && wizardData.txHash) {
            if (wizardData.entryMode !== 'manual') {
                issues.push('Button requires txData even though txHash is present');
            }
        }
    }

    if (issues.length > 0) {
        console.log('🔴 Issues Found:');
        issues.forEach((issue, i) => {
            console.log(`  ${i + 1}. ${issue}`);
        });

        console.log('\n💡 LIKELY CAUSE:');
        if (wizardData.entryMode !== 'manual' && !wizardData.txData && wizardData.txHash) {
            console.log('  The button is disabled because it requires txData (from lookup)');
            console.log('  even when you have entered a txHash.');
            console.log('  This is the bug - it should enable with just txHash.');
        }
    } else {
        console.log('✅ No obvious issues found');
    }

    console.log('\n💡 MANUAL FIXES TO TRY:');
    console.log('1. Enable button manually:');
    console.log('   document.getElementById("wizardNextBtn").disabled = false');
    console.log('2. Set txData manually:');
    console.log('   window.hopWizardData.txData = {}');
    console.log('3. Bypass and create entry directly:');
    console.log('   createHopEntryFromWizard()');
}

// Run the diagnostic
diagnoseWizardButton();

// Provide manual override function
window.enableWizardButton = function() {
    const btn = document.getElementById('wizardNextBtn');
    if (btn) {
        btn.disabled = false;
        console.log('✅ Button manually enabled');
    } else {
        console.log('❌ Button not found');
    }
};

console.log('\n📌 Commands available:');
console.log('- diagnoseWizardButton() - Run diagnostic again');
console.log('- enableWizardButton() - Force enable the button');
console.log('- window.hopWizardData - View wizard data');
console.log('- window.hopWizardData.txData = {} - Manually set txData');