# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-10-25 08:23)

**Commit:** 910e90408086a0c76008eff3cf88cf9cba6b10e8
**Author:** Your Name
**Message:** Add LIBR verification modal for transparency and user control

Provides optional feature to view complete transaction history of
LIBR-analyzed wallets, allowing investigators to verify the analysis
against block explorer data for audit trails and quality assurance.

Features:
- Full transaction history display (Date, Type, Credit, Debit, Balance, TX Hash)
- Color-coded highlights:
  * Green: Source thread deposits (criminal proceeds)
  * Yellow: LIBR-identified outbound transactions (new threads)
- Clickable transaction hashes linking to block explorers
- 1000 transaction safety limit with warning banner
- Suggests block explorer for wallets with extensive history

Implementation:
- showLIBRVerificationModal() - Main verification display function
  * Filters to show transactions from source deposit onwards
  * Identifies and highlights source deposits and LIBR-detected TXs
  * Truncates to 1000 transactions if necessary
  * Generates block explorer links (Etherscan/Blockchain.com)

- openLIBRVerificationFromModal() - Helper to launch modal
  * Retrieves data from window.librVerificationData
  * Opens verification modal with stored analysis data

- Updated displayLIBRAnalysisResults() to:
  * Show "View Verification Details" button
  * Store analysis data in window.librVerificationData
  * Make verification optional (user control)

- Updated LIBR modal button layout:
  * Added verification button on left side
  * Maintains existing Close and Apply buttons on right

Verification Table Shows:
- Date/Time in local format
- Type (Inbound/Outbound) with icons
- Credit amounts (green text)
- Debit amounts (red text)
- Running balance (bold)
- TX hash (abbreviated with link)

Safety Features:
- If > 1000 transactions: shows warning, truncates to last 1000
- Advises user to get full records from block explorer
- Provides direct links to Etherscan and Blockchain.com

Use Cases:
- Audit trail documentation for court proceedings
- Cross-check LIBR analysis with manual review
- Training demonstrations of LIBR methodology
- Quality assurance before creating threads
- Identify when full block explorer export needed

User Control:
Optional feature - investigators choose when to view.
Does not interfere with normal LIBR workflow.
Accessed via button in LIBR analysis results.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 425 ++++++++++++++++++-------------------------------------------
 index.html | 189 ++++++++++++++++++++++++++-
 2 files changed, 314 insertions(+), 300 deletions(-)
```

## Recent Commits History

- 910e904 Add LIBR verification modal for transparency and user control (1 second ago)
- 44cc303 Implement multi-thread LIBR with PIFO ordering (9 minutes ago)
- f85718c Add ability to add LIBR transactions directly to existing hops (30 minutes ago)
- 5064e3f Implement comprehensive LIBR Monitoring Dashboard (39 minutes ago)
- b454671 Fix LIBR modal display and implement proper iterative LIBR algorithm (10 hours ago)
- cee9bb2 Remove ALL remaining template literals from filter section - COMPLETE FIX (10 hours ago)
- e55e076 Replace all template literals with string concatenation in filter section (11 hours ago)
- cbf5661 Fix template literal syntax error - use string concatenation instead (11 hours ago)
- 65d5419 Fix critical bugs and migrate API keys to environment variables (11 hours ago)
- 96ee49a Add provenance-based visualization filtering with multi-select and saved views (12 hours ago)

## Enhanced Methodology Selection UI (New Feature - Session 3)

### Overview

Made the PIFO vs LIBR methodology selection more prominent in the case creation page and added comprehensive information modals to help investigators choose the right approach for their investigation.

### Visual Enhancements

**Prominent Display:**
- Blue gradient background with border and shadow
- Centered heading: "⚖️ Select Tracing Methodology"
- Side-by-side card layout with hover effects
- Color-coded: PIFO (Blue) and LIBR (Orange)
- Cards lift and glow on hover for better interactivity

**Each Method Card Shows:**
- Radio button with larger size (20px)
- Method name and full terminology
- Brief one-line description
- Color-coded "Best for" callout box
- Info button (ℹ️) for detailed explanation

### Information Modals (lines 29408-29479)

**Click ℹ️ button to see:**

**PIFO Modal:**
- **Overview**: Full paragraph explaining PIFO methodology, immediate movement assumption, rapid tracing through multiple hops
- **Common Use Cases**: Romance scams, investment fraud, ransomware, theft, BEC
- **Workflow**: Step-by-step process flow
- **When To Use**: 90%+ of investigations, rapid movement, clear chain of custody
- **Example Scenario**: 10 BTC split into two 5 BTC payments, both traced

**LIBR Modal:**
- **Overview**: Balance monitoring approach, arrests asset flow, fewer wallets, stablecoin focus
- **Common Use Cases**: Stablecoin cases, wallet seizure scenarios, private key recovery, long-term monitoring
- **Workflow**: Balance drop detection process
- **When To Use**: Stablecoins (freeze/burn), wallet access potential, strategic concentration
- **Example Scenario**: 50K USDT in 150K wallet, balance drops tracked, LIBR triggers

### Implementation

**`showMethodologyInfo(method)` (lines 29408-29474)**
- Creates modal with method-specific content
- Color-coded headers and sections
- Comprehensive explanation in digestible sections
- Link to documentation
- Close button

**UI Updates (lines 1893-1952)**
- Gradient background (#e3f2fd to #bbdefb)
- 3px blue border with shadow
- Grid layout for cards
- Hover effects (transform, shadow, border color)
- Info buttons positioned in top-right of each card
- Warning banner about consistency

### Benefits

✅ **Clear Decision Making** - Investigators understand which method to use
✅ **Comprehensive Guidance** - Detailed explanations with examples
✅ **Visual Hierarchy** - Prominent placement ensures it's not overlooked
✅ **Interactive Learning** - Optional info modals don't overwhelm
✅ **Professional Appearance** - Polished UI increases user confidence

---

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
- **Multi-blockchain support**: Bitcoin, Ethereum, ERC-20 tokens
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
