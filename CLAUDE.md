# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-23 19:10)

**Commit:** a771d15ce03f46ddb25de9857cd238806e52644f
**Author:** Your Name
**Message:** Implement auto-save after hop completion

Added automatic saving functionality when hops are completed to prevent data loss:

## Auto-Save Features
- Automatically saves investigation after each hop completion
- Uses existing file handle if available (seamless save)
- Falls back to download for first save
- Shows save notification after successful auto-save

## Metadata Tracking
- Records hop completion timestamps in investigation.hopCompletions
- Adds lastModified timestamp
- Tracks lastCompletedHop number
- Includes all thread indices in save

## Save Behavior
1. **With File Handle**: Seamlessly saves to existing file
   - Shows "✅ Auto-saved after Hop X completion"
   - No user interaction needed

2. **First Save**: Triggers download with descriptive filename
   - Format: "CaseID_hopX_YYYY-MM-DD.bats"
   - Shows "📥 Investigation saved as filename"

3. **Subsequent Saves**: Reminder notification
   - Shows "💾 Hop X complete - Remember to save your progress"

## User Experience
- Notification in hop completion modal: "Investigation will auto-save after hop completion"
- Removed redundant "Save Progress" button (since it auto-saves)
- Non-intrusive 3-second notifications
- Clear save status feedback

## Data Preservation
- Prevents loss of work between hops
- Maintains complete audit trail
- Preserves thread availability indices
- Captures completion timestamps

This ensures investigators never lose progress and maintains a complete record of the investigation timeline.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 86 +++++++++++++++++++++++++++++++++++---------------------------
 index.html | 62 +++++++++++++++++++++++++++++++++++++++++---
 2 files changed, 107 insertions(+), 41 deletions(-)
```

## Recent Commits History

- a771d15 Implement auto-save after hop completion (0 seconds ago)
- 10cf459 Add comprehensive trace completion ceremony (8 minutes ago)
- c9f7c5b CRITICAL FIX: Use validated swap handling in hop finalization (13 minutes ago)
- 39e5b12 Fix terminal wallet detection in hop completion (49 minutes ago)
- 05e95d3 Fix swap currency tracking in hop validation (87 minutes ago)
- 1db32cf Enhanced investigation summary dashboard on file load (2 hours ago)
- eed83c3 Fix saved file loading and thread availability issues (2 hours ago)
- cb65a32 Fix investigation completion detection to prevent premature display (2 hours ago)
- deb6362 Implement hop-centric DAG visualization for investigation traces (2 hours ago)
- 313d765 Show investigation complete view when all threads reach terminal wallets (4 hours ago)

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
