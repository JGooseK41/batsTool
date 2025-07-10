# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-10 19:16)

**Commit:** a48f4a565257d4c647f1245d568c1251f8f18ea9
**Author:** Your Name
**Message:** Fix missing function and victim completion workflow

- Added missing getStartingARTForHop function to fix hop rendering error
- Fixed victim completion workflow to show Generate Root Total section
- Added close button to investigation analysis modal for better UX
- Users can now properly proceed from victims to root total to tracing

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 49 +++++++++++++++++++++----------------------------
 index.html | 16 ++++++++++++++++
 2 files changed, 37 insertions(+), 28 deletions(-)
```

## Recent Commits History

- a48f4a5 Fix missing function and victim completion workflow (0 seconds ago)
- fd803ec Add purple segment to progress bars for VASP/exchange deposits (8 minutes ago)
- b7b101f Add visual ART progress bars for fund tracking (12 minutes ago)
- ff7f197 Add entry type selection wizard for better UX (18 minutes ago)
- d4eb009 Improve hop entry workflow with wizard and better button explanations (24 minutes ago)
- 49a0636 Fix initial white screen and missing blockchain lookup functions (27 minutes ago)
- 58f3548 Fix template literal syntax errors on lines 5557 and 5592 (59 minutes ago)
- c803494 Fix template literal syntax error on line 5557 (64 minutes ago)
- ef38132 Fix template literal structure on line 5557 (2 hours ago)
- 6cd39e0 Fix missing backtick in template expression (2 hours ago)

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
