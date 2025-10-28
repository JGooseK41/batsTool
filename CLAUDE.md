# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-28 06:22)

**Commit:** 0638d637e36e25f57627dceeb3a218b902fccb6a
**Author:** Your Name
**Message:** Feature: Court-ready clustering documentation with justification and source/destination tracking

Implements comprehensive documentation requirements for Bitcoin address clustering with user-provided justification and detailed transaction flow tracking.

## PROBLEM IDENTIFIED:

Clustering lacked proper documentation for court admissibility:
❌ No documented reason WHY addresses were clustered
❌ No recorded heuristic or behavioral evidence
❌ No investigator justification for clustering decision
❌ Hop entry notes didn't specify which cluster addresses were involved in traced transaction
❌ Missing audit trail for input/output addresses within cluster

## IMPLEMENTATION:

### 1. CLUSTERING JUSTIFICATION MODAL (lines 50602-50678)
✅ **Modal UI with Court-Ready Fields:**
- Shows addresses being clustered (original + new)
- **Heuristic Dropdown** with standard clustering methods:
  - UTXO-Based: Change outputs, common input ownership, peeling chains, round numbers
  - Behavioral: Temporal correlation, address reuse, dust consolidation, multi-hop patterns
  - External Evidence: Blockchain analysis services, entity attribution, wallet fingerprinting
  - Custom option for investigator-defined heuristics
- **Detailed Justification Text Area** (required, min 20 characters)
  - Placeholder with example documentation
  - Best practices guidance
  - Validation before submission

### 2. CLUSTERING WORKFLOW ENHANCEMENT (lines 18851-18959)
✅ **Updated handleClusterDecision():**
- Shows justification modal instead of immediately clustering
- Closes change address decision modal
- Passes context to justification modal

✅ **NEW: showClusteringJustificationModal():**
- Stores clustering context (txHash, addresses, threadId, amount)
- Populates modal with address information
- Clears previous inputs

✅ **NEW: submitClusteringJustification():**
- Validates heuristic selection (required)
- Validates justification text (min 20 chars)
- Gets heuristic display name for documentation
- Calls createAddressCluster with justification parameters
- Shows confirmation with heuristic name

✅ **NEW: closeClusteringJustificationModal():**
- Cleans up modal and context

### 3. ENHANCED createAddressCluster() (line 18965)
✅ **New Function Signature:**
```javascript
function createAddressCluster(
    originalAddress,
    newAddress,
    threadId,
    amount,
    txHash,              // NEW: Transaction hash
    heuristic,           // NEW: Heuristic code
    heuristicName,       // NEW: Heuristic display name
    justification        // NEW: Investigator's detailed explanation
)
```

✅ **Enhanced Cluster Documentation (Existing Cluster - lines 18995-19020):**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 CLUSTER UPDATE: [timestamp]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTION: Address added to existing cluster
WALLET ID: [id]
THREAD: [thread]
NEW ADDRESS: [address]
AMOUNT: [amount]
TRANSACTION: [hash]           ← NEW
METHODOLOGY: PIFO/LIBR
TOTAL ADDRESSES IN CLUSTER: [count]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLUSTERING JUSTIFICATION:      ← NEW SECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 HEURISTIC: [heuristic name]

📝 INVESTIGATOR NOTES:
[detailed justification from investigator]
```

✅ **Enhanced Cluster Documentation (New Cluster - lines 19058-19074):**
```
NEW ADDRESS (UTXO Change):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[address]
Monitored Amount: [amount]
Transaction: [hash]            ← NEW

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLUSTERING JUSTIFICATION:      ← ENHANCED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 HEURISTIC: [heuristic name]

📝 INVESTIGATOR NOTES:
[detailed justification from investigator]
```

### 4. HOP ENTRY CLUSTER DOCUMENTATION (lines 35937-35991)
✅ **MASSIVELY Enhanced Cluster-Sourced Transaction Notes:**

**Before:**
```
🔗 CLUSTER SOURCE NOTATION:
Thread V1-T1 sources from Cluster cluster-123 (Wallet: Red-1)
  - Cluster contains 3 addresses
  - Methodology: PIFO (cluster acts as single entity)
```

**After:**
```
🔗 CLUSTER-SOURCED TRANSACTION DOCUMENTATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This entry traces funds from a clustered wallet containing multiple addresses.

📊 THREAD: V1-T1
🔗 CLUSTER: cluster-123 (Wallet: Red-1)
   Cluster contains 3 addresses:
   🏠 bc1qxy2kgdygjrsqtz...abc123def
   🔄 bc1qz34p5ab7cdefg...ghi456jkl
   🔄 bc1qa78mnb9opqrst...mno789pqr

📍 SPECIFIC TRANSACTION FLOW:        ← NEW SECTION
   INPUT: Funds received by cluster address:
   → bc1qz34p5ab7cdefg...ghi456jkl  ← Shows WHICH address got the UTXO

   OUTPUT: Funds sent from cluster address:
   → bc1qa78mnb9opqrst...mno789pqr  ← Shows WHICH address sent the UTXO

   Transaction Hash: abc123...def456

📋 METHODOLOGY: PIFO
   The cluster acts as a single entity - whichever address
   moved funds first was traced (PIFO compliance).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

✅ **Source/Destination Detection Logic:**
- Checks `txData.sourceAddress` and `txData.fromAddress` for input address
- Checks `txData.counterparty` for output address
- Matches against all cluster addresses
- Only documents if address is actually in the cluster
- Includes transaction hash for verification

## BENEFITS:

### Court Admissibility:
✅ **Documented Heuristic**: Every cluster has recorded reasoning method
✅ **Investigator Justification**: Detailed explanation of behavioral evidence
✅ **Transaction Hash**: Verifiable blockchain evidence
✅ **Specific Addresses**: Clear audit trail showing WHICH addresses were involved
✅ **Input/Output Tracking**: Documents money flow within cluster
✅ **Methodology Compliance**: Explains PIFO/LIBR implications

### Investigator Workflow:
✅ **Standard Heuristics**: Dropdown with 13 common clustering methods
✅ **Custom Option**: Allows investigator-defined heuristics
✅ **Validation**: Prevents clustering without justification
✅ **Audit Trail**: Every clustering decision is documented
✅ **Report Integration**: Justifications appear in final B.A.T.S. reports

### Transaction Tracing:
✅ **Clear Source**: Shows which cluster address received the UTXO
✅ **Clear Destination**: Shows which cluster address sent the traced UTXO
✅ **Complete Context**: Lists all cluster addresses for reference
✅ **Verification**: Transaction hash allows blockchain verification
✅ **Methodology Notes**: Explains how cluster was treated (PIFO vs LIBR)

## WORKFLOW:

**Clustering an Address:**
1. User clicks "Cluster" on change address decision
2. Justification modal appears
3. User selects heuristic from dropdown (required)
4. User provides detailed explanation (min 20 chars, required)
5. Addresses and reasoning are stored in cluster notes
6. Cluster appears in final reports with full documentation

**Tracing from Cluster:**
1. User opens Wallet Explorer for clustered address
2. Views unified transaction history from all cluster addresses
3. Selects outgoing transaction to trace
4. Creates hop entry
5. Entry notes automatically include:
   - All cluster addresses
   - Which address received the UTXO (input)
   - Which address sent the UTXO (output)
   - Transaction hash
   - Methodology implications

## EXAMPLE DOCUMENTATION:

**Cluster Creation:**
```
CLUSTERING JUSTIFICATION:
📊 HEURISTIC: UTXO Change to New Address

📝 INVESTIGATOR NOTES:
Address bc1q...xyz received change output in transaction
abc123...def456. The transaction spent 2 UTXOs from the original
address, sent 0.5 BTC to a third party, and sent 1.3 BTC to this
new address. The new address had no prior transaction history and
received funds in the same transaction as the identified payment.
Based on UTXO analysis and timing, this appears to be change
controlled by the same entity.
```

**Hop Entry from Cluster:**
```
🔗 CLUSTER-SOURCED TRANSACTION DOCUMENTATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 THREAD: V1-T1
🔗 CLUSTER: cluster-1234567890 (Wallet: Red-1)
   Cluster contains 2 addresses:
   🏠 bc1qxy2kgdygjrsqtz...
   🔄 bc1qz34p5ab7cdefg...

📍 SPECIFIC TRANSACTION FLOW:
   INPUT: Funds received by cluster address:
   → bc1qxy2kgdygjrsqtz... (original address)

   OUTPUT: Funds sent from cluster address:
   → bc1qz34p5ab7cdefg... (change address)

   Transaction Hash: abc123...def456

📋 METHODOLOGY: PIFO
   The cluster acts as a single entity - whichever address
   moved funds first was traced (PIFO compliance).
```

## FILES MODIFIED:

- index.html:
  * Lines 50602-50678: NEW clustering justification modal
  * Lines 18851-18959: Enhanced clustering workflow functions
  * Line 18965: Updated createAddressCluster signature
  * Lines 18995-19020: Enhanced existing cluster update notes
  * Lines 19058-19074: Enhanced new cluster creation notes
  * Lines 35937-35991: Massively enhanced hop entry cluster documentation

## IMPACT:

🎯 **Court-Ready**: Complete audit trail for every clustering decision
🎯 **Defensible**: Documented heuristics and investigator reasoning
🎯 **Traceable**: Clear source/destination addresses in hop entries
🎯 **Verifiable**: Transaction hashes for blockchain verification
🎯 **Professional**: Standard heuristic terminology
🎯 **Comprehensive**: Complete documentation from clustering to final report

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 index.html | 270 +++++++++++++++++++++++++++++++++++++++++++++++++++++++------
 1 file changed, 244 insertions(+), 26 deletions(-)
```

## Recent Commits History

- 0638d63 Feature: Court-ready clustering documentation with justification and source/destination tracking (0 seconds ago)
- 0d51afe Critical: Apply Ethereum-level data validity across ALL blockchains (24 minutes ago)
- a78a36e Feature: Comprehensive blockchain integration across all 35+ chains (35 minutes ago)
- 4cee3c6 Complete: Full XRP integration across all B.A.T.S. features (44 minutes ago)
- c36bcf7 Update XRPScan API origin parameter to Batstool.com (56 minutes ago)
- 3ec3b68 Feature: Complete XRPScan API integration with origin parameter (58 minutes ago)
- 7e89d3f Feature: Multi-thread allocation in Wallet Explorer entry confirmation (64 minutes ago)
- f219cd1 Fix: Commingling detection for victim transaction threads (9 hours ago)
- e378163 Fix: ART tracking panel thread lookup using notation instead of internal ID (9 hours ago)
- f48d691 Feature: Batch entry logging workflow in Wallet Explorer (10 hours ago)

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
