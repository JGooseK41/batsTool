# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-17 10:49)

**Commit:** 5acd9186818b83c3833981b7b8cf4e90e862aaaa
**Author:** Your Name
**Message:** Complete wallet classification hierarchy system implementation

- Wallets can now progress UP the criminal hierarchy but never down
- BLACK wallets can change to PINK, YELLOW, or higher levels
- Automatic classification respects hierarchy rules with canChangeWalletClassification()
- Manual classification requires justification and checks hierarchy
- Classification history tracking for audit trail
- Retroactive updates across all entries when classification changes
- Training materials updated to reflect hierarchy progression rules

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md     |  35 ++++++------
 index.html    | 169 +++++++++++++++++++++++++++++++++++++++++++++++++---------
 training.html |  16 +++++-
 3 files changed, 175 insertions(+), 45 deletions(-)
```

## Recent Commits History

- 5acd918 Complete wallet classification hierarchy system implementation (0 seconds ago)
- 2de6ec0 Revert PINK wallet to flower emoji - no pink circle exists (10 minutes ago)
- 6408417 Change PINK wallet icon from flower to pink circle for consistency (11 minutes ago)
- a0065cc Expand wallet color section with complete breakdown of all 10 colors (13 minutes ago)
- ce8dd9f Fix LIBR method definition and usage description (18 minutes ago)
- cc32af8 Remove deployment section and update glossary to match official B.A.T.S. document (20 minutes ago)
- 211cbd9 Fix remaining LIFO reference to LIBR in training FAQ (25 minutes ago)
- ac74c4b Fix training page accuracy and add comprehensive glossary (43 minutes ago)
- 55d4bdb Implement LIBR method support and Sequential Hop Rule (55 minutes ago)
- 0f263be Implement UTC timezone compliance for all reports (4 hours ago)

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
