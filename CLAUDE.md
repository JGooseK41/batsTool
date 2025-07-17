# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-17 10:05)

**Commit:** ac74c4bb7e573a57e49524adc19f3959e93559ed
**Author:** Your Name
**Message:** Fix training page accuracy and add comprehensive glossary

- Update wallet color definitions to match official B.A.T.S. framework
  - BLACK: Emphasize 'no direct victim exposure'
  - PINK: Add critical function of implicating intervening wallets
  - ORANGE: Mention 'essential for UTXO tracing'
- Fix PIFO description to clarify it's NOT FIFO inventory accounting
- Change LIFO references to LIBR (Lowest Intermediate Balance Rule)
- Add investigation level distinctions (V-T for Level 3, V-T-H for Level 4)
- Add Advanced Concepts section with:
  - LIBR method explanation
  - Sequential Hop Rule
  - Dirty Wallet Principle (terminal points only)
  - UTXO tracing considerations
- Add comprehensive Glossary section with all key B.A.T.S. terms
- Update navigation to include Advanced and Glossary tabs

All content now accurately reflects the official B.A.T.S. Desk Reference

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md     |  53 ++++++++--------
 training.html | 196 ++++++++++++++++++++++++++++++++++++++++++++++++++++------
 2 files changed, 204 insertions(+), 45 deletions(-)
```

## Recent Commits History

- ac74c4b Fix training page accuracy and add comprehensive glossary (0 seconds ago)
- 55d4bdb Implement LIBR method support and Sequential Hop Rule (12 minutes ago)
- 0f263be Implement UTC timezone compliance for all reports (3 hours ago)
- accef56 Add comprehensive validation and safety improvements (3 hours ago)
- 64c99a1 Fix critical bugs in hop completion and validation (11 hours ago)
- a3f9e29 Fix conversion tracking and UI issues (11 hours ago)
- 8a04692 Ensure thread availability updates properly after creating/editing entries (11 hours ago)
- 558ebe9 Fix JavaScript errors - add missing walletTypes global and fix orphaned code (11 hours ago)
- ebad042 Fix JavaScript errors in hop finalization (11 hours ago)
- 1ca5ecd Fix hop finalization loop - add thread review before moving to next hop (11 hours ago)

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
