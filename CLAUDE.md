# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-16 22:45)

**Commit:** 1ca5ecd47b290d25b50385f5f7e8907f4672e1fe
**Author:** Your Name
**Message:** Fix hop finalization loop - add thread review before moving to next hop

- Show thread review modal after completing hop balance
- Display all threads created in the hop with their destinations
- Show Available Running Total for next hop
- Proceed to wallet classification after thread review
- Remove duplicate proceedWithHopFinalization function
- Fix circular flow by creating proper progression:
  1. Complete hop balance
  2. Review threads created
  3. Wallet classification suggestions
  4. Create next hop

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  41 ++++++------
 index.html | 209 +++++++++++++++++++++++++++++++++++++++++++++++++------------
 2 files changed, 187 insertions(+), 63 deletions(-)
```

## Recent Commits History

- 1ca5ecd Fix hop finalization loop - add thread review before moving to next hop (0 seconds ago)
- 27b4b51 Fix manual entry modal and add debugging for thread availability (15 minutes ago)
- d3c18fa Add mobile device detection and automatic redirection (6 hours ago)
- 3e9c8e6 Add mobile showcase version for browsing B.A.T.S. capabilities (6 hours ago)
- 1af5938 Implement UI/UX improvements and bug fixes (6 hours ago)
- 6a29b42 Improve victim workflow and fix hop entry timestamps (6 hours ago)
- 29e2b27 Major UI/UX improvements and token transfer fix (6 hours ago)
- c4f0890 Reorganize case setup workflow (7 hours ago)
- 260d643 Enhance welcome screen and onboarding workflow (7 hours ago)
- fdb325b Enhance hop entry wizard with manual entry and better control options (5 days ago)

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
