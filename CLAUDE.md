# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-17 10:55)

**Commit:** 428cb650489d769c69160cc1ae9b7c390b11950a
**Author:** Your Name
**Message:** Update CLAUDE.md with latest commit info

Auto-updated project context after completing wallet classification hierarchy

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md | 45 ++++++++++++++++++++++++---------------------
 1 file changed, 24 insertions(+), 21 deletions(-)
```

## Recent Commits History

- 428cb65 Update CLAUDE.md with latest commit info (0 seconds ago)
- 5acd918 Complete wallet classification hierarchy system implementation (7 minutes ago)
- 2de6ec0 Revert PINK wallet to flower emoji - no pink circle exists (17 minutes ago)
- 6408417 Change PINK wallet icon from flower to pink circle for consistency (18 minutes ago)
- a0065cc Expand wallet color section with complete breakdown of all 10 colors (20 minutes ago)
- ce8dd9f Fix LIBR method definition and usage description (25 minutes ago)
- cc32af8 Remove deployment section and update glossary to match official B.A.T.S. document (27 minutes ago)
- 211cbd9 Fix remaining LIFO reference to LIBR in training FAQ (32 minutes ago)
- ac74c4b Fix training page accuracy and add comprehensive glossary (50 minutes ago)
- 55d4bdb Implement LIBR method support and Sequential Hop Rule (62 minutes ago)

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
