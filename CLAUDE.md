# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-27 06:18)

**Commit:** 0bf302e033a2eb243256dff70994fddca26b4101
**Author:** Your Name
**Message:** Implement UTXO change detection for Bitcoin wallet explorer

**Critical Feature:** Proper handling of Bitcoin change outputs in UTXO model

**Problem Solved:**
Previous implementation treated ALL Bitcoin outputs as separate transactions, including change outputs that return to the sender's address. This caused:
- ❌ Change being incorrectly traced as new transactions
- ❌ Inflated transaction counts
- ❌ Thread continuity errors
- ❌ Over-allocation when change is mistakenly selected
- ❌ Confusion about which outputs to trace

**Solution: UTXO-Aware Transaction Processing**

## **1. Intelligent Change Detection**

**getBitcoinWalletHistory() - Completely Rewritten:**

**OLD Logic (WRONG):**
```javascript
// Treated all outputs as separate transactions
tx.vout.forEach(output => {
    if (output.address !== wallet) {
        // Create transaction for this output
    }
});
```

**NEW Logic (CORRECT):**
```javascript
// Separate change from payments
const ourOutputs = []; // Change (returns to us)
const otherOutputs = []; // Payments (to others)

tx.vout.forEach(output => {
    if (output.address === wallet) {
        ourOutputs.push(output); // This is change
    } else {
        otherOutputs.push(output); // This is payment
    }
});

// Only create trace entries for actual payments
// Flag change separately with isChange: true
```

## **2. Transaction Categorization**

**Three Types:**
1. **IN** - Incoming (no inputs from our address)
   - Normal incoming payment
   - Not change

2. **OUT** - Outgoing payment to another address
   - Actual payment
   - Traceable
   - Creates new thread

3. **CHANGE** - Output returning to same address
   - Funds stay in wallet
   - NOT traceable as new transaction
   - Stays in original thread
   - Visual: Gray, disabled, "🔄 CHANGE" badge

## **3. Visual Indicators**

**Change Outputs:**
```
Row Style:
- Gray gradient background
- Gray left border
- 70% opacity
- "not-allowed" cursor
- Tooltip: "UTXO Change Output - Funds returning to same address"

Type Display:
- 🔄 CHANGE (instead of 🔴 OUT)
- ↩️ Amount prefix (instead of -)
- Badge: "🔄 CHANGE (Not Traceable)"

Checkbox:
- Disabled
- Grayed out (30% opacity)
- Tooltip: "Change outputs cannot be selected"

Actions:
- No trace/write-off buttons
- Shows: "N/A - Change"
- Only explorer link available
```

**Payment Outputs:**
```
Row Style:
- Normal colors
- Selectable
- Active cursor

Type Display:
- 🔴 OUT
- - Amount prefix
- Normal styling

Actions:
- Full buttons available
- "Add to Investigation"
- "Write Off" (if applicable)
```

## **4. Selection Protection**

**ART Mode - Change Blocking:**
```javascript
function toggleARTSelection(tx) {
    if (tx.isChange || tx.type === 'CHANGE') {
        alert('⚠️ UTXO Change Output\n\n' +
              'Change outputs cannot be selected for tracing.\n\n' +
              'Change represents funds returning to the same ' +
              'address and stays within the original thread.\n\n' +
              'Only select actual payment outputs to other addresses.');
        return; // BLOCKED
    }
    // ... normal selection logic
}
```

**Checkbox Protection:**
- Change checkboxes are `disabled` in HTML
- Cannot be checked even if user tries
- Clear tooltip explains why

## **5. Info Banner for Bitcoin**

When viewing Bitcoin wallets, auto-shows:

```
💡 UTXO Change Detection Active

Bitcoin uses UTXO (Unspent Transaction Output) model.
When sending Bitcoin, "change" often returns to the same address.

🔄 Change Outputs: Marked with gray background and
disabled checkboxes - these funds stay in the original
thread (not traceable as new transactions).

🔴 Payment Outputs: Actual payments to other addresses -
these create new threads and are selectable for tracing.
```

## **6. Enhanced Transaction Data**

**UTXO Metadata Added:**
```javascript
{
    hash: "abc123...",
    type: "OUT" | "IN" | "CHANGE",
    isChange: boolean,
    isUTXO: true,
    utxoData: {
        totalSent: 0.5,      // Total BTC sent (excluding change)
        changeAmount: 0.3,    // Change returned
        outputCount: 2,       // Number of payment outputs
        hasChange: true       // Whether tx includes change
    }
}
```

## **Example Scenario:**

**Bitcoin Transaction:**
- **Inputs:** 1.0 BTC from bc1quser...
- **Outputs:**
  - 0.6 BTC → bc1qrecipient1... (Payment)
  - 0.3 BTC → bc1qrecipient2... (Payment)
  - 0.09 BTC → bc1quser... (Change)
  - 0.01 BTC → (Miner fee)

**Wallet Explorer Shows:**
```
🔴 OUT    0.6 BTC  → bc1qrecipient1...  [Add to Investigation]
🔴 OUT    0.3 BTC  → bc1qrecipient2...  [Add to Investigation]
🔄 CHANGE 0.09 BTC → bc1quser...        [N/A - Change] [GRAYED OUT]
```

**Only the two payment outputs (0.6 + 0.3 BTC) are selectable for tracing.**

## **Benefits:**

**For Investigators:**
✅ **Correct thread tracking** - Change doesn't break thread continuity
✅ **Clear visual distinction** - Instantly see change vs payments
✅ **Prevented mistakes** - Can't accidentally trace change
✅ **Accurate allocation** - ART math excludes change automatically
✅ **Better understanding** - Learn UTXO model through visual feedback

**For Bitcoin Investigations:**
✅ **Proper UTXO handling** - Respects Bitcoin's transaction model
✅ **Thread integrity** - Change stays in original thread
✅ **Accurate tracing** - Only follow actual payments
✅ **No false branches** - Change doesn't create phantom threads

**For PIFO/LIBR:**
✅ **PIFO:** Change not counted in outbound allocation
✅ **LIBR:** Change correctly excluded from balance drops
✅ **Both:** Proper thread accounting maintained

## **Technical Details:**

**Change Detection Algorithm:**
1. Parse transaction inputs/outputs
2. Identify outputs to our address (change)
3. Identify outputs to other addresses (payments)
4. Calculate: sentValue = inputTotal - changeTotal
5. Create separate transaction records for each payment
6. Mark change with `isChange: true` and `type: 'CHANGE'`
7. Log: "Found X transactions (Y change outputs)"

**Backward Compatibility:**
✅ EVM chains unaffected (no UTXO model)
✅ Existing investigations continue working
✅ Only Bitcoin transactions get change detection
✅ No breaking changes to data model

## **Future Enhancements:**

Possible extensions for other UTXO chains:
- Bitcoin Cash (BCH)
- Litecoin (LTC)
- Dogecoin (DOGE)
- Cardano (ADA)
- (Same logic applies to all UTXO-based chains)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 index.html | 253 ++++++++++++++++++++++++++++++++++++++++++++++---------------
 1 file changed, 192 insertions(+), 61 deletions(-)
```

## Recent Commits History

- 0bf302e Implement UTXO change detection for Bitcoin wallet explorer (0 seconds ago)
- 780e905 Make Wallet Explorer methodology-aware: PIFO vs LIBR support (10 minutes ago)
- fb1edeb Implement ART (Adjusted Root Total) Tracking in Wallet Explorer (5 hours ago)
- f2cb229 Implement Feature 6: Batch write-offs for multiple threads (7 hours ago)
- f511400 Implement Feature 5: Quick actions from Available Threads modal (7 hours ago)
- c606314 Implement Feature 4: Entry preview before hop finalization (7 hours ago)
- 7ede838 Implement Feature 3: Duplicate transaction detection with comprehensive search (7 hours ago)
- 0788489 Implement Features 1-2: Auto-populate source thread + Smart contract detection (7 hours ago)
- 2398a4f Final sync CLAUDE.md (7 hours ago)
- 75b99c0 Update CLAUDE.md with latest features (7 hours ago)

## Key Features

- ✅ One-click add to existing hop
- ✅ Auto-detects correct hop from wallet
- ✅ Uses LIBR-calculated traced amount
- ✅ Auto-updates monitored proceeds
- ✅ Timestamped audit trail in notes
- ✅ Option to defer tracing decision
- ✅ **NEW:** Optional verification modal for transparency
- ✅ **NEW:** Prominent methodology selection with info modals
- ✅ Smooth navigation with visual feedback
- ✅ Maintains data integrity

## Integration with LIBR Methodology

**Proper LIBR workflow now complete:**

1. Run LIBR analysis → Find drops
2. Click "Follow & Trace" → Add to hop
3. Monitored amount auto-reduces
4. Re-analyze later → Uses new threshold
5. Find next drops → Add to same hop
6. Repeat until all traced or remains stable

**Hop 1 stays "open" and can receive entries anytime the monitored
wallet has new activity, maintaining proper LIBR accounting.**

## Files Modified

- index.html:
  * Line 35962: Updated displayLIBRAnalysisResults signature
  * Line 35959: Pass walletAddress, blockchain to display
  * Lines 36006-36023: Auto-detect target hop number
  * Lines 36032-36067: Add action buttons to each transaction
  * Lines 36590-36714: LIBR transaction action functions

### Changed Files:
```
 CLAUDE.md  | 273 ++++++++++++++++++++++++++++++++++++++++++++++---------------
 index.html | 176 ++++++++++++++++++++++++++++++++++++++-
 2 files changed, 381 insertions(+), 68 deletions(-)
```

## Recent Commits History

- f85718c Add ability to add LIBR transactions directly to existing hops (1 second ago)
- 5064e3f Implement comprehensive LIBR Monitoring Dashboard (9 minutes ago)
- b454671 Fix LIBR modal display and implement proper iterative LIBR algorithm (9 hours ago)
- cee9bb2 Remove ALL remaining template literals from filter section - COMPLETE FIX (10 hours ago)
- e55e076 Replace all template literals with string concatenation in filter section (10 hours ago)
- cbf5661 Fix template literal syntax error - use string concatenation instead (10 hours ago)
- 65d5419 Fix critical bugs and migrate API keys to environment variables (10 hours ago)
- 96ee49a Add provenance-based visualization filtering with multi-select and saved views (11 hours ago)
- 2035a72 Update CLAUDE.md with latest commit info (25 hours ago)
- 2c960c0 Update CLAUDE.md with latest commit info (25 hours ago)

## Key Features
- **Multi-blockchain support**: Bitcoin, Ethereum, and 30+ EVM chains including Base, Arbitrum, Optimism, Polygon, BNB Chain, Avalanche, Unichain, Sonic, Abstract, Memecore, Sophon, Berachain, plus Tron, XRP, Sui, and Solana
- **4-step investigation workflow**: Setup → Victims → Hops → Analysis
- **Thread tracking system**: Uses V-T-H notation (Victim-Transaction-Hop)
- **Real-time validation**: Validates traced amounts against ART (Available Running Total)
- **Wallet entity detection**: Identifies known exchanges and services
- **Export capabilities**: Multiple formats for investigation reports
- **Undo system**: Supports up to 20 undo states
- **Auto-save functionality**: File system integration

## Current State
- Main functionality is working
- Flow diagram visualization is next priority (Phase 1 started but needs implementation)
- UI recently improved for multi-transfer handling
- Validation system fixed and operational

## Technical Notes
- Single-file application in `index.html`
- Uses vanilla JavaScript with no build process
- Includes embedded styles and scripts
- Supports file operations through browser File API

## API Integration Status

### Available APIs
- **Mempool.space** (FREE): Transaction lookups, address validation, fee estimates
  - Note: Website has excellent autocomplete, API has backend support but endpoint not fully documented
- **Blockchain.info** (FREE): Bitcoin addresses and transactions
- **BlockCypher** (FREE limited): Multi-chain support with rate limits
- **Arkham Intelligence** (API key): Best for Bitcoin attribution and entity identification
- **Etherscan** (API key): EVM chains (Ethereum, BSC, Polygon, etc.)
- **TronGrid** (API key): Tron blockchain

### Address Search Strategy
The address search tool uses multiple fallback strategies:
1. Mempool.space (experimental endpoints for prefix search)
2. Arkham Intelligence (best for attribution and partial matches)
3. Complete address validation (Mempool, Blockchain.info)
4. BlockCypher (if API key available)
5. Known address database (major exchanges)

## Next Steps
- Complete flow diagram visualization implementation
- Enhance multi-transfer selection UI
- Consider adding more blockchain support
- Investigate Mempool.space undocumented search endpoints

## Implementation Plan - Core Behavior Fixes

### Phase 1: Thread Management & Allocation
1. ✅ Implement PIFO (Proceeds In First Out) allocation
   - Auto-allocate using V1-T1 before V2-T1, etc.
   - Document allocation in entry notes
   - Allow manual override for matching specific transactions

2. ⬜ Fix change address handling
   - Funds returning to sender address stay in original thread
   - Don't create new hop for change outputs
   - Properly detect change vs. payment outputs

3. ⬜ Implement allocation validation
   - Hard block if total allocation exceeds available threads
   - Allow partial tracing (trace portion of larger transaction)
   - Validate before entry creation

### Phase 2: Notation & Display
4. ⬜ Update commingling notation format
   - Use parentheses: `(V1-T1) (V2-T1) H2`
   - Multiple transactions: `(V1-T2,3) (V2-T1,2,4) H3`
   - Keep notation unchanged through swaps

5. ⬜ Make thread review modal optional
   - Add setting to disable/enable
   - Only show if warnings/issues detected
   - Remove automatic popup on hop completion

### Phase 3: Validation & Constraints
6. ⬜ Enforce victim completion workflow
   - Require completion before adding new victim
   - Allow reopening before root total generation
   - Maintain green summary view for completed victims

7. ⬜ Update write-off behavior
   - Reduce ART (Adjusted Root Total) on hop close
   - Not immediately on entry
   - Track write-offs separately in totals

### Phase 4: Transaction Handling
8. ⬜ Fix ERC-20/gas fee handling
   - Ignore ETH gas unless ETH is source thread
   - Filter by tracked currency only
   - No multi-output selection for single token transfers

9. ⬜ Manual entry flexibility
   - Don't require transaction hash for off-chain
   - Allow CEX internal transfers
   - Support incomplete transaction data

### Testing Scenarios
- Simple linear flow (1 victim → 3 hops)
- Commingling (multiple victims → merged hop)
- Split threads (one thread → multiple outputs)
- DEX swaps (currency conversion)
- Complex combination flows
