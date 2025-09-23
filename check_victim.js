// Check the victim's transaction details
const victim = investigation.victims[0];
console.log('=== Victim Transaction Check ===\n');
console.log('Victim ID:', victim.id);
console.log('Victim Name:', victim.name);
console.log('Is Completed?', victim.isCompleted);
console.log('Number of transactions:', victim.transactions.length);

// Check each transaction's required fields
console.log('\nTransaction Details:');
victim.transactions.forEach((t, i) => {
    console.log(`\nTransaction ${i + 1} (ID: ${t.id}):`);
    console.log('  - Amount:', t.amount, `(type: ${typeof t.amount})`);
    console.log('  - Currency:', t.currency);
    console.log('  - Receiving Wallet:', t.receivingWallet);
    console.log('  - TX Hash:', t.txHash);
    console.log('  - Datetime:', t.datetime);

    // Validation checks
    const hasAmount = parseFloat(t.amount) > 0;
    const hasWallet = t.receivingWallet && t.receivingWallet.trim() !== '';

    console.log('\n  Validation:');
    console.log('  - Has valid amount?', hasAmount, `(parsed: ${parseFloat(t.amount)})`);
    console.log('  - Has receiving wallet?', hasWallet);
    console.log('  - Is valid transaction?', hasAmount && hasWallet);

    if (!hasAmount) {
        console.log('  ❌ ISSUE: Amount is missing or zero');
    }
    if (!hasWallet) {
        console.log('  ❌ ISSUE: Receiving wallet is missing');
    }
});

// Check why button is disabled
const validTransactions = victim.transactions.filter(t =>
    parseFloat(t.amount) > 0 && t.receivingWallet && t.receivingWallet.trim() !== ''
);

console.log('\n=== Summary ===');
console.log('Valid transactions:', validTransactions.length);
console.log('Button should be enabled?', validTransactions.length > 0);

if (validTransactions.length === 0) {
    console.log('\n⚠️ The Complete Victim button is disabled because there are no valid transactions.');
    console.log('A valid transaction needs:');
    console.log('  1. Amount > 0');
    console.log('  2. Receiving wallet address');

    // Try to fix if we have the data
    if (victim.transactions.length > 0) {
        const t = victim.transactions[0];
        console.log('\n🔧 Attempting to fix transaction...');

        // Check what needs fixing
        if (!t.receivingWallet || t.receivingWallet.trim() === '') {
            console.log('Missing receiving wallet. You applied transfer but wallet might not have been set.');
            console.log('The transfer went to:', '0x9c140293fc32c92f6c4e5a58bc7c3cab49080030');
            console.log('\nTry running: updateTransaction(1, 1, "receivingWallet", "0x9c140293fc32c92f6c4e5a58bc7c3cab49080030")');
        }

        if (!parseFloat(t.amount) > 0) {
            console.log('Missing or invalid amount.');
            console.log('The transfer amount was:', 79999.359956);
            console.log('\nTry running: updateTransaction(1, 1, "amount", "79999.359956")');
        }
    }
}