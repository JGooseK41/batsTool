# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 17:31)

**Commit:** 1db32cfdb9cf916db3075e481b0d02c623e8f1cc
**Author:** Your Name
**Message:** Enhanced investigation summary dashboard on file load

Implemented comprehensive investigation summary that appears when loading a saved .bats file:

## Dashboard Features
- **Clear Position Indicator**: Shows exactly where user left off (e.g., "Working on Hop 2")
- **Detailed Summary**: Displays investigation progress with victim count, transaction totals, and completion status
- **Available Threads Display**: Shows remaining funds to trace with amounts and currencies
- **Terminal Wallet Summary**: Groups terminal arrivals by exchange for quick overview

## Status Information
- Enhanced analyzeCaseStatus() with descriptive messages
- Added "whereYouAre" field showing current investigation phase
- Added "whatToDoNext" field with clear action instructions
- Calculates and displays remaining amounts per currency
- Shows thread availability for next hop

## Action Buttons
- **Smart Continue Button**: Takes user directly to where they left off
- Dynamic button text based on current state (e.g., "Continue Working on Hop 2")
- "What to do next" section with clear instructions
- Quick access to Analysis tab when investigation is complete
- View Full Investigation option for overall review

## User Experience
- Modal overlay with professional styling
- Gradient backgrounds for visual hierarchy
- Clear visual indicators for complete vs in-progress items
- Automatic focus on relevant section when continuing
- Click-outside to close for quick dismissal

Users now get a complete picture of their investigation status immediately upon loading, with one-click access to continue exactly where they left off.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  59 +++++++++++----------
 index.html | 171 ++++++++++++++++++++++++++++++++++++++++++++++++-------------
 2 files changed, 166 insertions(+), 64 deletions(-)
```

## Recent Commits History

- 1db32cf Enhanced investigation summary dashboard on file load (0 seconds ago)
- eed83c3 Fix saved file loading and thread availability issues (13 minutes ago)
- cb65a32 Fix investigation completion detection to prevent premature display (22 minutes ago)
- deb6362 Implement hop-centric DAG visualization for investigation traces (31 minutes ago)
- 313d765 Show investigation complete view when all threads reach terminal wallets (2 hours ago)
- 4c78dca Fix missing closing brace in template expression (3 hours ago)
- fcc2596 Add multi-currency progress bars for swapped assets (3 hours ago)
- 97cb71d Fix terminal wallet thread creation and display issues (3 hours ago)
- 9f06495 Fix terminal wallet allocation and thread tracking issues (4 hours ago)
- 0479806 Add comprehensive terminal wallet tracking and reporting system (4 hours ago)

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

## Next Steps
- Complete flow diagram visualization implementation
- Enhance multi-transfer selection UI
- Consider adding more blockchain support

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
