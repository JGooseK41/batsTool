# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-17 10:31)

**Commit:** ce8dd9fa39f82cf91eb7b4790c5e5ee380df14e6
**Author:** Your Name
**Message:** Fix LIBR method definition and usage description

- Remove incorrect description that LIBR is used 'when PIFO cannot apply'
- Update to accurate definition: LIBR arrests asset flow and maintains funds in fewer wallets closer to RED wallet
- Add proper use cases:
  - When stablecoin burn and reissue is the goal
  - When investigators may obtain private keys or wallet access through suspect cooperation or compelled assistance
- Remove 'rare exception' label - LIBR is a valid methodological choice
- Change warning notification to info level when selecting LIBR
- Update both training materials and main application

LIBR is not about PIFO failure, but a strategic choice to keep assets concentrated near the victim-facing wallets for specific investigative goals.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md     | 42 +++++++++++++++++++++++++++++++-----------
 index.html    | 10 +++++-----
 training.html | 10 +++++-----
 3 files changed, 41 insertions(+), 21 deletions(-)
```

## Recent Commits History

- ce8dd9f Fix LIBR method definition and usage description (0 seconds ago)
- cc32af8 Remove deployment section and update glossary to match official B.A.T.S. document (2 minutes ago)
- 211cbd9 Fix remaining LIFO reference to LIBR in training FAQ (7 minutes ago)
- ac74c4b Fix training page accuracy and add comprehensive glossary (25 minutes ago)
- 55d4bdb Implement LIBR method support and Sequential Hop Rule (37 minutes ago)
- 0f263be Implement UTC timezone compliance for all reports (3 hours ago)
- accef56 Add comprehensive validation and safety improvements (3 hours ago)
- 64c99a1 Fix critical bugs in hop completion and validation (11 hours ago)
- a3f9e29 Fix conversion tracking and UI issues (11 hours ago)
- 8a04692 Ensure thread availability updates properly after creating/editing entries (11 hours ago)

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
