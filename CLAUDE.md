# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-17 14:03)

**Commit:** 564e24771e97ce7f8ea59dc9b76dbda1be073515
**Author:** Your Name
**Message:** Fix duplicate entryTypes declaration error

Remove the first entryTypes object declaration that was causing
"Identifier 'entryTypes' has already been declared" error.
Keep the more detailed declaration that appears later in the code.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 40 ++++++++++++++++++++++++----------------
 index.html | 10 +---------
 2 files changed, 25 insertions(+), 25 deletions(-)
```

## Recent Commits History

- 564e247 Fix duplicate entryTypes declaration error (0 seconds ago)
- 7a3113c Fix JavaScript errors preventing page from loading (4 minutes ago)
- 428cb65 Update CLAUDE.md with latest commit info (3 hours ago)
- 5acd918 Complete wallet classification hierarchy system implementation (3 hours ago)
- 2de6ec0 Revert PINK wallet to flower emoji - no pink circle exists (3 hours ago)
- 6408417 Change PINK wallet icon from flower to pink circle for consistency (3 hours ago)
- a0065cc Expand wallet color section with complete breakdown of all 10 colors (3 hours ago)
- ce8dd9f Fix LIBR method definition and usage description (4 hours ago)
- cc32af8 Remove deployment section and update glossary to match official B.A.T.S. document (4 hours ago)
- 211cbd9 Fix remaining LIFO reference to LIBR in training FAQ (4 hours ago)

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
