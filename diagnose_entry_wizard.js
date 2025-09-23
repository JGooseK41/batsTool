// Diagnostic script for the hop entry wizard button issue
// Targets the correct wizard element based on console logs

function diagnoseEntryWizard() {
    console.clear();
    console.log('%c🔍 DIAGNOSING HOP ENTRY WIZARD BUTTON', 'color: red; font-size: 18px; font-weight: bold');
    console.log('='.repeat(60));

    // 1. Check if entry wizard is open
    const modal = document.getElementById('hopEntryWizard');
    if (!modal || modal.style.display === 'none') {
        console.log('❌ Entry wizard not open. Please:');
        console.log('   1. Open the hop entry wizard');
        console.log('   2. Navigate to step 3');
        console.log('   3. Run this diagnostic again');
        return;
    }

    console.log('✅ Entry wizard is open\n');

    // 2. Check wizard data structure
    console.log('📊 WIZARD DATA STRUCTURE:');
    console.log('-'.repeat(40));

    // Check for entry wizard data
    if (!window.currentEntryWizardData) {
        console.log('⚠️ window.currentEntryWizardData not found');
        console.log('Checking for alternative data structures...');
        
        // Check for other possible data locations
        if (window.hopWizardData) {
            console.log('Found window.hopWizardData');
            console.log('Properties:', Object.keys(window.hopWizardData));
        }
        
        if (window.entryWizardData) {
            console.log('Found window.entryWizardData');
            console.log('Properties:', Object.keys(window.entryWizardData));
        }
    } else {
        console.log('window.currentEntryWizardData exists');
        console.log('Properties:', Object.keys(window.currentEntryWizardData));
    }

    // 3. Check form inputs
    console.log('\n📋 FORM INPUTS:');
    console.log('-'.repeat(40));

    const txHashInput = document.getElementById('entryTxHash');
    if (txHashInput) {
        console.log('TX Hash input found');
        console.log('  Value:', txHashInput.value || '(empty)');
        console.log('  Length:', txHashInput.value ? txHashInput.value.length : 0);
    } else {
        console.log('TX Hash input not found');
    }

    const notesInput = document.getElementById('entryNotes');
    if (notesInput) {
        console.log('Notes input found');
        console.log('  Value:', notesInput.value || '(empty)');
    }

    // 4. Check button element
    console.log('\n🔘 BUTTON ELEMENT:');
    console.log('-'.repeat(40));

    // Try multiple possible button IDs
    const buttonIds = ['logEntryBtn', 'wizardLogBtn', 'entryWizardLogBtn', 'saveEntryBtn'];
    let foundButton = null;
    
    for (const id of buttonIds) {
        const btn = document.getElementById(id);
        if (btn) {
            foundButton = btn;
            console.log(`Button found with ID: ${id}`);
            console.log('  Text:', btn.textContent);
            console.log('  Disabled:', btn.disabled);
            console.log('  Display:', btn.style.display || 'visible');
            console.log('  Onclick:', btn.onclick ? 'Set' : 'Not set');
            break;
        }
    }

    if (!foundButton) {
        console.log('❌ No button found. Searching for buttons by text...');
        const allButtons = document.querySelectorAll('#hopEntryWizard button');
        allButtons.forEach(btn => {
            if (btn.textContent.includes('Log') || btn.textContent.includes('Entry')) {
                console.log(`Found button: "${btn.textContent}"`);
                console.log('  ID:', btn.id || '(no id)');
                console.log('  Disabled:', btn.disabled);
                foundButton = btn;
            }
        });
    }

    // 5. Check step indicators
    console.log('\n📍 WIZARD STEPS:');
    console.log('-'.repeat(40));

    const steps = document.querySelectorAll('#hopEntryWizard .wizard-step, #hopEntryWizard .step');
    if (steps.length > 0) {
        console.log(`Found ${steps.length} steps`);
        steps.forEach((step, index) => {
            const isActive = step.classList.contains('active') || step.style.display !== 'none';
            console.log(`  Step ${index + 1}: ${isActive ? '✓ Active' : 'Inactive'}`);
        });
    }

    // 6. Check for validation functions
    console.log('\n🔧 VALIDATION FUNCTIONS:');
    console.log('-'.repeat(40));
    console.log('validateEntryForm exists?', typeof validateEntryForm === 'function');
    console.log('checkEntryButtonState exists?', typeof checkEntryButtonState === 'function');
    console.log('saveHopEntry exists?', typeof saveHopEntry === 'function');
    console.log('logHopEntry exists?', typeof logHopEntry === 'function');

    // 7. Test button enabling
    console.log('\n🧪 TESTING BUTTON STATE:');
    console.log('-'.repeat(40));

    if (foundButton && txHashInput) {
        console.log('Current state:');
        console.log('  TX Hash:', txHashInput.value || '(empty)');
        console.log('  Button disabled:', foundButton.disabled);

        if (!txHashInput.value) {
            console.log('\nTrying to set TX hash...');
            txHashInput.value = 'test_hash_' + Date.now();
            
            // Trigger change event
            const event = new Event('input', { bubbles: true });
            txHashInput.dispatchEvent(event);
            
            console.log('After setting TX hash:');
            console.log('  TX Hash:', txHashInput.value);
            console.log('  Button disabled:', foundButton.disabled);
            
            if (foundButton.disabled) {
                console.log('  ⚠️ Button still disabled after setting TX hash');
            } else {
                console.log('  ✅ Button enabled after setting TX hash');
            }
        }
    }

    // 8. Manual fixes
    console.log('\n💡 MANUAL FIXES:');
    console.log('-'.repeat(40));
    console.log('1. Enable button manually:');
    if (foundButton) {
        console.log(`   document.getElementById('${foundButton.id}').disabled = false`);
    } else {
        console.log('   (Find button first)');
    }
    console.log('2. Set TX hash:');
    if (txHashInput) {
        console.log(`   document.getElementById('${txHashInput.id}').value = "your_tx_hash"`);
    }
    console.log('3. Trigger save directly:');
    console.log('   saveHopEntry() or logHopEntry()');

    // 9. Summary
    console.log('\n' + '='.repeat(60));
    console.log('%c📊 DIAGNOSIS SUMMARY', 'color: blue; font-size: 16px; font-weight: bold');
    console.log('='.repeat(60));

    const issues = [];
    
    if (!txHashInput || !txHashInput.value) {
        issues.push('Transaction hash input is empty');
    }
    
    if (foundButton && foundButton.disabled && txHashInput && txHashInput.value) {
        issues.push('Button is disabled despite having TX hash');
    }
    
    if (!foundButton) {
        issues.push('Could not locate the Log Entry button');
    }

    if (issues.length > 0) {
        console.log('🔴 Issues Found:');
        issues.forEach((issue, i) => {
            console.log(`  ${i + 1}. ${issue}`);
        });
    } else {
        console.log('✅ No obvious issues found');
    }

    return {
        wizardOpen: !!modal,
        txHashPresent: !!(txHashInput && txHashInput.value),
        buttonFound: !!foundButton,
        buttonDisabled: foundButton ? foundButton.disabled : null
    };
}

// Helper function to force enable
window.forceEnableEntryButton = function() {
    const buttons = document.querySelectorAll('#hopEntryWizard button');
    let enabled = false;
    
    buttons.forEach(btn => {
        if (btn.textContent.includes('Log') || btn.textContent.includes('Entry')) {
            btn.disabled = false;
            console.log(`✅ Enabled button: "${btn.textContent}"`);
            enabled = true;
        }
    });
    
    if (!enabled) {
        console.log('❌ Could not find Log Entry button');
    }
};

// Run the diagnostic
diagnoseEntryWizard();

console.log('\n📌 Available commands:');
console.log('- diagnoseEntryWizard() - Run diagnostic again');
console.log('- forceEnableEntryButton() - Force enable the button');