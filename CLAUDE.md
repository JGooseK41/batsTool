# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-17 10:39)

**Commit:** 2de6ec0372d1e85026b5adb02f474798dad66203
**Author:** Your Name
**Message:** Revert PINK wallet to flower emoji - no pink circle exists

- Change back from pink heart (🩷) to flower (🌸)
- The flower emoji is actually meaningful for 'Dividend/Deception' wallets
- No standard pink circle emoji exists in Unicode
- Flower represents the deceptive 'blooming returns' in investment scams

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md     | 47 +++++++++++++++++++----------------------------
 index.html    |  4 ++--
 training.html |  2 +-
 3 files changed, 22 insertions(+), 31 deletions(-)
```

## Recent Commits History

- 2de6ec0 Revert PINK wallet to flower emoji - no pink circle exists (0 seconds ago)
- 6408417 Change PINK wallet icon from flower to pink circle for consistency (75 seconds ago)
- a0065cc Expand wallet color section with complete breakdown of all 10 colors (4 minutes ago)
- ce8dd9f Fix LIBR method definition and usage description (8 minutes ago)
- cc32af8 Remove deployment section and update glossary to match official B.A.T.S. document (10 minutes ago)
- 211cbd9 Fix remaining LIFO reference to LIBR in training FAQ (15 minutes ago)
- ac74c4b Fix training page accuracy and add comprehensive glossary (33 minutes ago)
- 55d4bdb Implement LIBR method support and Sequential Hop Rule (45 minutes ago)
- 0f263be Implement UTC timezone compliance for all reports (3 hours ago)
- accef56 Add comprehensive validation and safety improvements (4 hours ago)

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
