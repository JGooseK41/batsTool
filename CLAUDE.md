# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 19:08)

**Commit:** fd803ec64e7b657c38caa82b668028e797cb009b
**Author:** Your Name
**Message:** Add purple segment to progress bars for VASP/exchange deposits

- Added purple color (#9b59b6) for funds sent to exchanges/VASPs
- Updated progress bar logic to detect purple wallet destinations
- Added VASP tracking to breakdown calculations
- Updated legends to show Exchange/VASP category
- Funds traced to purple wallets now show separately from regular traces

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 47 +++++++++++++++++++++++++++--------------------
 index.html | 33 +++++++++++++++++++++++++++++----
 2 files changed, 56 insertions(+), 24 deletions(-)
```

## Recent Commits History

- fd803ec Add purple segment to progress bars for VASP/exchange deposits (0 seconds ago)
- b7b101f Add visual ART progress bars for fund tracking (3 minutes ago)
- ff7f197 Add entry type selection wizard for better UX (9 minutes ago)
- d4eb009 Improve hop entry workflow with wizard and better button explanations (15 minutes ago)
- 49a0636 Fix initial white screen and missing blockchain lookup functions (19 minutes ago)
- 58f3548 Fix template literal syntax errors on lines 5557 and 5592 (51 minutes ago)
- c803494 Fix template literal syntax error on line 5557 (56 minutes ago)
- ef38132 Fix template literal structure on line 5557 (82 minutes ago)
- 6cd39e0 Fix missing backtick in template expression (84 minutes ago)
- 4782757 Fix template literal syntax - swap backtick and brace position (88 minutes ago)

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
