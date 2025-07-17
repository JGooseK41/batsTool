# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-17 10:38)

**Commit:** 6408417b32bfdceabcdd50d1c4bd241f4d38bbcf
**Author:** Your Name
**Message:** Change PINK wallet icon from flower to pink circle for consistency

- Replace flower emoji (🌸) with pink circle (🩷)
- Update in training.html wallet color section
- Update in index.html walletTypes definition
- Update in hop wizard wallet type selector
- Now all wallet colors use consistent circle emoji style

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md     | 52 ++++++++++++++++++++++++++++------------------------
 index.html    |  4 ++--
 training.html |  2 +-
 3 files changed, 31 insertions(+), 27 deletions(-)
```

## Recent Commits History

- 6408417 Change PINK wallet icon from flower to pink circle for consistency (0 seconds ago)
- a0065cc Expand wallet color section with complete breakdown of all 10 colors (2 minutes ago)
- ce8dd9f Fix LIBR method definition and usage description (7 minutes ago)
- cc32af8 Remove deployment section and update glossary to match official B.A.T.S. document (9 minutes ago)
- 211cbd9 Fix remaining LIFO reference to LIBR in training FAQ (14 minutes ago)
- ac74c4b Fix training page accuracy and add comprehensive glossary (32 minutes ago)
- 55d4bdb Implement LIBR method support and Sequential Hop Rule (44 minutes ago)
- 0f263be Implement UTC timezone compliance for all reports (3 hours ago)
- accef56 Add comprehensive validation and safety improvements (4 hours ago)
- 64c99a1 Fix critical bugs in hop completion and validation (11 hours ago)

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
