# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-11 18:52)

**Commit:** 2ccef07bbbff89a85ae0eab8e9f36e52a219393a
**Author:** Your Name
**Message:** Improve hop progression clarity and finalization UX

- Add comprehensive hop finalization summary showing balance status and threads created
- Show clear "Hop is Balanced" or "Unaccounted Amounts" status with visual indicators
- Display threads created in current hop that will be available for next hop
- Improve "Add New Hop" button to show next hop number and available ART amounts
- Fix button states to clearly indicate when hops must be completed first
- Make finalization modal always appear, even when balanced, for better user understanding
- Add explanatory text that wallet classification options are only for balancing unaccounted funds

These changes address user confusion about hop progression and make it clear when balancing is needed vs optional.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  41 ++++++-----
 index.html | 237 ++++++++++++++++++++++++++++++++++++++++++++++++-------------
 2 files changed, 209 insertions(+), 69 deletions(-)
```

## Recent Commits History

- 2ccef07 Improve hop progression clarity and finalization UX (0 seconds ago)
- 9e8eb55 Fix persistent JavaScript errors in hop creation and wallet index (8 hours ago)
- 2c6ef9f Fix critical JavaScript errors in hop creation (9 hours ago)
- 85941f5 Remove inaccurate graph from training page (13 hours ago)
- 17741d5 Fix training visualization layout - clean structured flow (20 hours ago)
- 9fbbc33 Add dynamic BATS training visualization to training page (20 hours ago)
- 1cfb83b Add comprehensive BATS training example visualization (20 hours ago)
- cf80a17 Redesign flow diagram with ledger-style layout (20 hours ago)
- f1304c8 Add auto-fix option to chronological order errors (21 hours ago)
- b2528cf Fix blockTimestamp scope error for multi-chain support (21 hours ago)

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
