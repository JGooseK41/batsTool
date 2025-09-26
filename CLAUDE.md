# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-25 19:33)

**Commit:** 5d4d4c964812d55d6ccccd3ba04656a6fa07e077
**Author:** Your Name
**Message:** Fix write-off wizard flow issues

Fixed multiple issues with the write-off wizard process:

1. Removed automatic wizard reopening after write-off:
   - Added flag to prevent showAddEntryWizard from reopening after write-off
   - Removed showRemainingThreadsSummary call for write-offs
   - The wizard was automatically reopening after write-off completion

2. Improved entry collapse after write-off:
   - Entry is now collapsed before showing confirmation alert
   - Collapse state is set immediately, not after timeout
   - Entry displays correctly as collapsed in the UI

3. Streamlined the write-off flow:
   - After confirming write-off, it creates entry and closes wizard
   - No manual form appears after wizard completion
   - Entry is properly collapsed and displayed

The write-off process now completes cleanly without reopening wizards or showing manual forms.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 45 ++++++++++++++++++---------------------------
 index.html | 39 +++++++++++++++++++++++++++++----------
 2 files changed, 47 insertions(+), 37 deletions(-)
```

## Recent Commits History

- 5d4d4c9 Fix write-off wizard flow issues (0 seconds ago)
- 99db1b3 Fix write-off confirmation modal removing wrong modal (10 minutes ago)
- 1f08065 Fix write-off process to use actual transaction amount (14 minutes ago)
- 67ed03d Fix hop wizard buttons not responding to clicks (30 minutes ago)
- c783a6f Fix hop wizard buttons not working - enable after transaction lookup (2 hours ago)
- 25c4fc0 Debug Step 3 buttons with addEventListener and console logging (2 hours ago)
- ed27959 Fix wizard buttons and styling issues (2 hours ago)
- 5b7a40e Fix non-working buttons in hop wizard Step 3 (2 hours ago)
- 0d8e8b5 Fix hop wizard not finding hop - string/number conversion issue (2 hours ago)
- d14dc14 Add detailed debug logging for wizard creation issue (2 hours ago)

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
