# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-09-09 18:34)

**Commit:** 2861c834462b24b6672c40cb080010d6c1cac326
**Author:** Your Name
**Message:** Add multi-output selection and change address tracking

Major Enhancement: Multi-Output Transaction Support
- Wizard now handles transactions with multiple outputs (splits)
- Each output can be individually selected and classified
- Supports tracking both payment paths from single transaction

Change Address Detection & Classification:
- Auto-detects likely change outputs (decimal amounts, back to sender)
- Three classification options: Payment, Change, Ignore
- Change outputs marked as ORANGE wallet type (same custody)
- Change threads use special notation suffix "-C" (e.g., V1-T1-H1-C)

UI Improvements:
- Visual selection interface for all outputs
- Smart change detection with visual indicators
- Classification radio buttons for each output
- Summary showing selected payments vs change
- Helpful tips about change address identification

Implementation Details:
- createSingleHopEntry() handles individual outputs
- Proportional amount allocation across outputs
- Maintains custody chain through change addresses
- Proper thread notation for change vs payments

This solves the critical issue of tracking funds through split transactions while maintaining the distinction between actual custody changes and simple address changes.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 index.html | 321 +++++++++++++++++++++++++++++++++++++++++++++++++++++--------
 1 file changed, 279 insertions(+), 42 deletions(-)
```

## Recent Commits History

- 2861c83 Add multi-output selection and change address tracking (1 second ago)
- 4d20525 Fix hop completion and thread status visualization issues (35 hours ago)
- 7f4018d Improve transition from victims to Hop 1 with clearer guidance (2 days ago)
- 68b8964 Fix blockchain.info API field naming issue (2 days ago)
- 86b9ea0 Fix Bitcoin timestamp retrieval bug (2 days ago)
- ab704ec Fix Bitcoin timestamp handling and improve debugging (2 days ago)
- 1a139f1 Improve Bitcoin output selection for all multi-output transactions (2 days ago)
- 8c7bb6d Fix multi-thread handling and Bitcoin UTXO selection (2 days ago)
- 91d5bed Fix terminology and improve hop progression flow (3 weeks ago)
- 25b8200 Add Arkham & Etherscan attribution API integration (3 weeks ago)

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
