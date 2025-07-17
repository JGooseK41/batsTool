# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-17 10:24)

**Commit:** 211cbd9c7dea6f08e901de3ec199465e345c24bb
**Author:** Your Name
**Message:** Fix remaining LIFO reference to LIBR in training FAQ

Changed 'PIFO vs. LIFO' to 'PIFO vs. LIBR' in the FAQ section to maintain consistency with B.A.T.S. framework terminology.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md     | 45 ++++++++++++++++++++++++---------------------
 training.html |  2 +-
 2 files changed, 25 insertions(+), 22 deletions(-)
```

## Recent Commits History

- 211cbd9 Fix remaining LIFO reference to LIBR in training FAQ (0 seconds ago)
- ac74c4b Fix training page accuracy and add comprehensive glossary (18 minutes ago)
- 55d4bdb Implement LIBR method support and Sequential Hop Rule (30 minutes ago)
- 0f263be Implement UTC timezone compliance for all reports (3 hours ago)
- accef56 Add comprehensive validation and safety improvements (3 hours ago)
- 64c99a1 Fix critical bugs in hop completion and validation (11 hours ago)
- a3f9e29 Fix conversion tracking and UI issues (11 hours ago)
- 8a04692 Ensure thread availability updates properly after creating/editing entries (11 hours ago)
- 558ebe9 Fix JavaScript errors - add missing walletTypes global and fix orphaned code (11 hours ago)
- ebad042 Fix JavaScript errors in hop finalization (12 hours ago)

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
