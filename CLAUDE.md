# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-17 10:35)

**Commit:** a0065ccd57fb2f3871e449a28c80b25301360065
**Author:** Your Name
**Message:** Expand wallet color section with complete breakdown of all 10 colors

- Replace 'Additional Colors' section with individual cards for each wallet type
- Add comprehensive details for all 10 wallet colors:
  - RED: Victim-facing (starting point for hop counting)
  - PINK: Dividend/Deception (proves criminal intent)
  - YELLOW: Hub/Convergence (proves common criminal control)
  - ORANGE: Bitcoin change addresses (UTXO tracing)
  - BROWN: Asset conversion services (DEX, swaps)
  - BLACK: Default intermediary (no direct victim exposure)
  - BLUE: Cold storage (criminal savings)
  - PURPLE: Exchange deposits (requires legal process)
  - GRAY: Obfuscated/Diluted (privacy services)
  - GREEN: Victim-owned recovery
- Add 'Significance' field to explain investigative importance
- Include more detailed examples for each wallet type
- Use proper color styling for each card

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md     | 54 ++++++++++++++++-----------------------
 training.html | 82 ++++++++++++++++++++++++++++++++++++++++++-----------------
 2 files changed, 81 insertions(+), 55 deletions(-)
```

## Recent Commits History

- a0065cc Expand wallet color section with complete breakdown of all 10 colors (0 seconds ago)
- ce8dd9f Fix LIBR method definition and usage description (5 minutes ago)
- cc32af8 Remove deployment section and update glossary to match official B.A.T.S. document (7 minutes ago)
- 211cbd9 Fix remaining LIFO reference to LIBR in training FAQ (12 minutes ago)
- ac74c4b Fix training page accuracy and add comprehensive glossary (30 minutes ago)
- 55d4bdb Implement LIBR method support and Sequential Hop Rule (42 minutes ago)
- 0f263be Implement UTC timezone compliance for all reports (3 hours ago)
- accef56 Add comprehensive validation and safety improvements (4 hours ago)
- 64c99a1 Fix critical bugs in hop completion and validation (11 hours ago)
- a3f9e29 Fix conversion tracking and UI issues (11 hours ago)

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
