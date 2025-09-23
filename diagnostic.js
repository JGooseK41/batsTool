// Diagnostic script to check Complete Victim button issue

console.log('=== Complete Victim Button Diagnostic ===\n');

// 1. Check if victims exist
console.log('1. Current victims:', investigation.victims);

// 2. Check if completeVictim function is accessible
console.log('2. completeVictim function exists?', typeof window.completeVictim === 'function');

// 3. Find all Complete Victim buttons on the page
const buttons = Array.from(document.querySelectorAll('button')).filter(b =>
    b.textContent.includes('Complete Victim') ||
    b.onclick?.toString().includes('completeVictim')
);

console.log('3. Found Complete Victim buttons:', buttons.length);

// 4. Check each button's onclick
buttons.forEach((btn, index) => {
    console.log(`   Button ${index + 1}:`);
    console.log('   - Text:', btn.textContent.trim());
    console.log('   - Onclick attribute:', btn.getAttribute('onclick'));
    console.log('   - Onclick property:', btn.onclick);
    console.log('   - Disabled?', btn.disabled);
});

// 5. Try to get victim IDs from buttons
console.log('\n4. Extracting victim IDs from buttons:');
buttons.forEach((btn, index) => {
    const onclickStr = btn.getAttribute('onclick');
    if (onclickStr) {
        const match = onclickStr.match(/completeVictim\((\d+)\)/);
        if (match) {
            const victimId = parseInt(match[1]);
            console.log(`   Button ${index + 1} -> Victim ID: ${victimId}`);

            // Check if this victim exists
            const victim = investigation.victims.find(v => v.id === victimId);
            if (victim) {
                console.log(`   ✓ Victim ${victimId} exists:`, victim.name);
            } else {
                console.log(`   ✗ Victim ${victimId} NOT FOUND in investigation.victims`);
            }
        }
    }
});

// 6. Test manual completion
if (investigation.victims.length > 0) {
    const testVictimId = investigation.victims[0].id;
    console.log(`\n5. Testing manual completion for victim ${testVictimId}:`);
    console.log('   Run this command to test:');
    console.log(`   completeVictim(${testVictimId})`);
}

console.log('\n=== End Diagnostic ===');
console.log('Please share the output above to help troubleshoot the issue.');