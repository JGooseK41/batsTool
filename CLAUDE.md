# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-21 06:46)

**Commit:** 486affca175e1ad30daf2a4e4263f6a0aa17423b
**Author:** Your Name
**Message:** Add comprehensive DEX swap documentation system

New Swap Entry Type:
- Added 'swap' as a new entry type for DEX/asset conversions
- Swap entries don't increment hop count (stays at same hop level)
- Documents the conversion without breaking the investigation flow

Swap Detection and Creation:
- Wizard automatically detects when input currency differs from output
- Creates dedicated swap entry with full details
- Shows clear warning/info about what will be created
- DEX contract properly marked as BROWN wallet

Thread Currency Conversion:
- Swap entries automatically convert thread currency
- LINK threads become ETH threads after swap
- Maintains same notation base (e.g., V1-T1-H2)
- Available threads update to reflect new currency

User Experience:
- Clear visual indication when swap is detected
- Detailed explanation of swap handling in wizard
- Shows input/output amounts and currencies
- Confirms DEX will be marked as BROWN wallet

Thread Management:
- updateThreadsAfterSwap() converts threads to new currency
- Removes old currency threads from available pool
- Adds new currency threads with swap metadata
- Maintains investigation continuity through currency changes

This allows proper documentation of DEX swaps without disrupting the hop flow,
while maintaining accurate thread tracking across currency conversions.

### Changed Files:
```
 CLAUDE.md  |  42 ++++++----------
 index.html | 166 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++--
 2 files changed, 177 insertions(+), 31 deletions(-)
```

## Recent Commits History

- 486affc Add comprehensive DEX swap documentation system (0 seconds ago)
- 87758d9 Use BROWN wallet classification for DEX swaps (11 minutes ago)
- 45b3b16 Major improvements to wizard transaction handling and DEX swap support (15 minutes ago)
- d510574 Fix wizard transaction lookup and add close button (10 hours ago)
- 3d7c67d Remove premature visualization prompts - only show when investigation is complete (12 hours ago)
- e10954c Strengthen currency separation to ensure proper scaling (13 hours ago)
- d3a73d8 Fix critical currency mixing bug in victim transaction totals (13 hours ago)
- 62bc539 Fix CSP issues by removing CORS proxy usage (16 hours ago)
- 1558665 Auto-update CLAUDE.md (16 hours ago)
- 28311c6 Improve visual contrast for work area and input fields (16 hours ago)

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
