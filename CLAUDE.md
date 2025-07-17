# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-16 23:22)

**Commit:** a3f9e2918d831ad30210d32febef8505cbf5f59c
**Author:** Your Name
**Message:** Fix conversion tracking and UI issues

- Add copy amount button to brown wallet conversion modal
- Auto-populate converted amount field for stablecoin swaps
- Fix orphaned code causing 'hop is not defined' error
- Add missing openHopEntryWizard function
- Track conversions properly with multi-currency ART support
- Rebuild thread index after conversions
- Add conversion tracking to hop data

This ensures:
1. Easy stablecoin swaps with copy button
2. Proper multi-currency tracking after conversions
3. Fixed JavaScript errors for wizard functionality

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  35 +++++++------
 index.html | 172 +++++++++++++++++++++++++++++++++++++++++++++++--------------
 2 files changed, 152 insertions(+), 55 deletions(-)
```

## Recent Commits History

- a3f9e29 Fix conversion tracking and UI issues (0 seconds ago)
- 8a04692 Ensure thread availability updates properly after creating/editing entries (19 minutes ago)
- 558ebe9 Fix JavaScript errors - add missing walletTypes global and fix orphaned code (22 minutes ago)
- ebad042 Fix JavaScript errors in hop finalization (30 minutes ago)
- 1ca5ecd Fix hop finalization loop - add thread review before moving to next hop (37 minutes ago)
- 27b4b51 Fix manual entry modal and add debugging for thread availability (52 minutes ago)
- d3c18fa Add mobile device detection and automatic redirection (6 hours ago)
- 3e9c8e6 Add mobile showcase version for browsing B.A.T.S. capabilities (6 hours ago)
- 1af5938 Implement UI/UX improvements and bug fixes (6 hours ago)
- 6a29b42 Improve victim workflow and fix hop entry timestamps (7 hours ago)

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
