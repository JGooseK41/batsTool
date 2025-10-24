# LIBR Implementation Plan for B.A.T.S. Tool

## Executive Summary
The current codebase has hard-coded constraints that prevent proper LIBR (Lowest Intermediate Balance Rule) application. This document outlines the specific blockers and recommended implementation strategy.

## Current State Analysis

### Constraint 1: Chronological Transaction Enforcement
**Location:** `index.html:10685-10741`
**Status:** ALWAYS ENFORCED (doesn't check tracing method)

```javascript
// Current code - runs regardless of method
function renderVictims() {
    sortTransactionsChronologically(); // Line 10685
    const chronologyError = validateTransactionChronology(victim); // Line 10692

    // Error message mentions PIFO but doesn't check if PIFO is selected!
    if (chronologyErrors.length > 0) {
        alert(`Transactions must be in chronological order for PIFO compliance...`);
    }
}
```

**Impact:** Prevents selecting non-chronological transactions for LIBR

### Constraint 2: Mandatory Thread Consumption
**Location:** `index.html:15404-15407`
**Status:** HARD BLOCK

```javascript
// Hop cannot be completed with unallocated threads
const totalRemaining = Object.values(remainingByCurrency).reduce((sum, amt) => sum + Math.abs(amt), 0);
const isBalanced = totalRemaining < 0.01;

if (!isBalanced) {
    alert(`Cannot finalize Hop - you have unallocated threads!`);
    return; // BLOCKS
}
```

**Impact:** Forces consumption of all threads, preventing LIBR's "wait until balance drops" approach

### Constraint 3: No Balance Tracking
**Location:** `index.html:28647-28659`
**Status:** PLACEHOLDER ONLY

```javascript
function applyLIBRMethod(walletAddress, startTime, endTime) {
    console.log(`LIBR method would analyze wallet ${walletAddress}...`);
    showNotification('LIBR method requires manual balance analysis...', 'warning');
    return null;
}
```

**Impact:** No mechanism to track wallet balance history or calculate lowest intermediate balance

---

## Implementation Plan

### Phase 1: Conditional Constraint Enforcement

#### 1.1 Update Transaction Chronology Validation
**File:** `index.html` around line 10685

```javascript
function renderVictims() {
    const container = document.getElementById('victimsList');
    container.innerHTML = '';

    // Only enforce chronological sorting for PIFO
    if (investigation.tracingMethod === 'PIFO') {
        sortTransactionsChronologically();
    }

    // Check chronological order ONLY for PIFO
    const chronologyErrors = [];
    if (investigation.tracingMethod === 'PIFO') {
        investigation.victims.forEach(victim => {
            const error = validateTransactionChronology(victim);
            if (error) {
                chronologyErrors.push(error);
            }
        });

        if (chronologyErrors.length > 0) {
            const shouldFix = confirm(`❌ Transaction chronology errors detected!\n\n${chronologyErrors.join('\n\n')}\n\nTransactions must be in chronological order for PIFO compliance.\n\nWould you like to automatically fix the order?`);
            if (shouldFix) {
                sortTransactionsChronologically();
            }
        }
    }

    // Continue with rendering...
}
```

**Benefits:**
- PIFO maintains strict chronological enforcement
- LIBR allows non-chronological transaction selection

---

#### 1.2 Update Hop Finalization for LIBR
**File:** `index.html` around line 15404

```javascript
function finalizeHop(hopNumber) {
    // ... existing validation code ...

    const validation = validateHopCompletion(hopNumber);
    const remainingByCurrency = validation.remainingByCurrency || {};
    const totalRemaining = Object.values(remainingByCurrency).reduce((sum, amt) => sum + Math.abs(amt), 0);
    const isBalanced = totalRemaining < 0.01;

    console.log(`Finalizing Hop ${hopNumber}: Total remaining = ${totalRemaining}, Is balanced = ${isBalanced}`);
    console.log(`Remaining by currency:`, remainingByCurrency);

    if (isBalanced) {
        // Hop is balanced - proceed to completion
        console.log(`✅ Hop ${hopNumber} is balanced - proceeding to completion`);
        completeHopAndProceed(hop);
    } else {
        // Different behavior based on tracing method
        if (investigation.tracingMethod === 'PIFO') {
            // PIFO: Must be balanced before finalization
            console.log(`⚠️ PIFO method: Hop ${hopNumber} has unbalanced amounts - showing finalization options`);
            const walletsWithRemainingFunds = analyzeUntracedBalances(hop);
            showHopFinalizationSummary(hop, remainingByCurrency, walletsWithRemainingFunds);
        } else if (investigation.tracingMethod === 'LIBR') {
            // LIBR: Allow finalization with remaining funds (they stay in the wallet)
            console.log(`ℹ️ LIBR method: Hop ${hopNumber} has remaining funds - this is expected per LIBR methodology`);

            const remainingList = Object.entries(remainingByCurrency)
                .map(([curr, amt]) => `  • ${amt.toLocaleString()} ${curr}`)
                .join('\n');

            const confirmLIBR = confirm(
                `⚠️ LIBR Method: Remaining Funds in Hop ${hopNumber}\n\n` +
                `The following funds remain untraced:\n\n${remainingList}\n\n` +
                `Per LIBR methodology, these funds remain in their current wallets ` +
                `until the wallet balance drops below the deposited criminal proceeds.\n\n` +
                `Document in notes: "LIBR applied - balance never dropped below proceeds amount"\n\n` +
                `Proceed with finalization?`
            );

            if (confirmLIBR) {
                // Add LIBR note to hop
                if (!hop.librNotes) hop.librNotes = [];
                hop.librNotes.push({
                    timestamp: new Date().toISOString(),
                    note: `LIBR applied: ${Object.entries(remainingByCurrency).map(([c, a]) => `${a.toLocaleString()} ${c}`).join(', ')} remains in wallet(s) - balance never dropped below criminal proceeds.`
                });

                completeHopAndProceed(hop);
            }
        }
    }
}
```

**Benefits:**
- PIFO: Maintains current strict balancing requirement
- LIBR: Allows hop completion with unallocated threads (with documentation)

---

### Phase 2: LIBR Wallet Balance Tracking

#### 2.1 Add Balance History Data Structure
**File:** `index.html` in investigation initialization

```javascript
const investigation = {
    // ... existing fields ...
    tracingMethod: 'PIFO',

    // NEW: LIBR wallet balance tracking
    walletBalanceHistory: {
        // Structure:
        // 'wallet_address_hash': {
        //     address: 'full_address',
        //     currency: 'BTC',
        //     transactions: [
        //         { datetime: '2024-01-01T12:00:00Z', type: 'inbound', amount: 5.0, balance: 13.0 },
        //         { datetime: '2024-01-02T10:30:00Z', type: 'outbound', amount: 2.0, balance: 11.0 }
        //     ],
        //     criminalProceeds: 3.5,  // Amount of traced funds that entered this wallet
        //     lowestBalance: 8.5,     // Lowest balance during monitoring period
        //     balanceDroppedBelow: false  // Did balance ever drop below criminalProceeds?
        // }
    }
};
```

#### 2.2 Implement Balance Tracker UI
**Location:** New function in index.html

```javascript
function showLIBRBalanceTracker(walletAddress, criminalProceeds, currency) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'librBalanceModal';

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2>📊 LIBR Balance Tracker</h2>
                <button onclick="closeLIBRBalanceModal()" class="btn-close">✕</button>
            </div>

            <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4>Wallet: ${walletAddress.substring(0, 20)}...</h4>
                <p><strong>Criminal Proceeds Deposited:</strong> ${criminalProceeds.toLocaleString()} ${currency}</p>
                <p style="margin-bottom: 0;">
                    <strong>LIBR Rule:</strong> Only follow outbound transactions when wallet balance
                    drops below ${criminalProceeds.toLocaleString()} ${currency}
                </p>
            </div>

            <div style="margin-bottom: 20px;">
                <h4>Transaction History & Balance Tracking</h4>
                <p style="color: #666; margin-bottom: 15px;">
                    Add transactions chronologically to track the wallet balance over time.
                    Mark which transaction(s) to follow based on when balance drops below proceeds.
                </p>

                <div id="librTransactionList" style="max-height: 400px; overflow-y: auto;">
                    <!-- Transaction list will be populated here -->
                </div>

                <button onclick="addLIBRTransaction()" class="btn btn-secondary" style="margin-top: 10px;">
                    ➕ Add Transaction
                </button>
            </div>

            <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; margin-bottom: 20px;">
                <h4 style="margin-top: 0;">📈 Balance Analysis</h4>
                <div id="librBalanceAnalysis">
                    <p><strong>Current Balance:</strong> <span id="librCurrentBalance">-</span></p>
                    <p><strong>Lowest Balance:</strong> <span id="librLowestBalance">-</span></p>
                    <p><strong>Balance Dropped Below Proceeds?</strong> <span id="librDroppedBelow">-</span></p>
                </div>
            </div>

            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button onclick="closeLIBRBalanceModal()" class="btn btn-secondary">Cancel</button>
                <button onclick="applyLIBRSelection()" class="btn btn-primary">Apply LIBR Selection</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    loadLIBRWalletData(walletAddress);
}
```

---

### Phase 3: Enhanced LIBR Entry Creation

#### 3.1 Add LIBR Mode to Hop Wizard
**File:** `index.html` around line 22000 (Step 1 of wizard)

```javascript
// In hopWizardNextStep, Step 1: Thread Selection
if (step === 1) {
    // ... existing thread selection code ...

    // Add LIBR-specific options
    if (investigation.tracingMethod === 'LIBR') {
        content.innerHTML += `
            <div style="background: #fff8e1; border: 2px solid #ffc107; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <h4 style="color: #f57c00; margin-top: 0;">⚖️ LIBR Method Selected</h4>
                <p style="margin-bottom: 10px;">
                    Lowest Intermediate Balance Rule is active. You may:
                </p>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Skip earlier transactions if wallet balance never dropped below criminal proceeds</li>
                    <li>Select specific transactions where balance dropped</li>
                    <li>Leave threads unallocated if funds remain above traced amount</li>
                </ul>
                <button onclick="showLIBRBalanceTracker('${lastWallet}', ${threadAmount}, '${currency}')"
                        class="btn btn-secondary" style="margin-top: 10px;">
                    📊 Open Balance Tracker
                </button>
            </div>
        `;
    }
}
```

---

## Testing Scenarios

### PIFO Test (Should work exactly as before)
1. Create investigation with PIFO method
2. Add victim with 3 chronological transactions
3. Trace through hops
4. Verify chronological enforcement
5. Verify all threads must be consumed
6. ✅ No behavioral changes

### LIBR Test (New functionality)
1. Create investigation with LIBR method
2. Add victim: 5 BTC stolen, deposited to Wallet A
3. Wallet A has 10 BTC existing balance (total: 15 BTC)
4. Transaction sequence:
   - T1: 3 BTC outbound (balance: 12 BTC) → DON'T FOLLOW (balance > 5 BTC)
   - T2: 4 BTC outbound (balance: 8 BTC) → DON'T FOLLOW (balance > 5 BTC)
   - T3: 2 BTC outbound (balance: 6 BTC) → DON'T FOLLOW (balance > 5 BTC)
   - T4: 2 BTC outbound (balance: 4 BTC) → FOLLOW THIS (balance < 5 BTC)
5. Verify:
   - ✅ Can skip T1, T2, T3
   - ✅ Can select T4 without chronology errors
   - ✅ Can finalize hop with unallocated threads
   - ✅ LIBR notes added to documentation

---

## Implementation Priority

### High Priority (Core LIBR Functionality)
1. ✅ Conditional chronology enforcement
2. ✅ Conditional hop completion validation
3. ✅ LIBR documentation in entry notes

### Medium Priority (Enhanced LIBR Support)
4. ⬜ Balance history data structure
5. ⬜ Balance tracker UI
6. ⬜ LIBR wizard enhancements

### Low Priority (Nice-to-Have)
7. ⬜ Visual balance timeline
8. ⬜ Automated balance calculation from blockchain APIs
9. ⬜ LIBR-specific reports and summaries

---

## Code Locations Reference

| Component | File | Line Range | Status |
|-----------|------|------------|--------|
| Chronology Validation | index.html | 10685-10741 | ⚠️ Needs Update |
| Hop Finalization | index.html | 15404-15420 | ⚠️ Needs Update |
| LIBR Placeholder | index.html | 28647-28659 | ⚠️ Needs Implementation |
| Sequential Hop Rule | index.html | 18929, 25917 | ✅ Already conditional |
| Tracing Method Selection | index.html | 1876-1884 | ✅ Working |
| Method Storage | index.html | 4053 | ✅ Working |

---

## Notes

- **Backward Compatibility:** All changes are conditional on `investigation.tracingMethod`
- **PIFO Unchanged:** Zero impact on existing PIFO functionality
- **Documentation:** LIBR selections must be heavily documented in entry notes
- **Legal Defensibility:** LIBR notes should reference case law and methodology

