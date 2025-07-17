# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-17 10:29)

**Commit:** cc32af8870f1ceed74c9838bd7f5e637aa1a542b
**Author:** Your Name
**Message:** Remove deployment section and update glossary to match official B.A.T.S. document

- Remove entire deployment & security section from training materials
- Remove deployment link from table of contents
- Remove unnecessary context/usage column from glossary
- Add missing glossary terms from official B.A.T.S. document:
  - Back Tracing
  - Cluster Analysis
  - Exchange Deposit Addresses
  - High-Risk Customer
  - Hub Wallets
  - Matching Transactions Principle (MTP)
  - Off-Ramping
  - On-Ramping
  - Red Wallet Index
  - Root
  - Thread Exposure
  - Travel Rule
  - Universal Wallet Index (UWI)
  - Victim Facing Wallets
- Update existing definitions to match official document exactly
- Fix LIBR definition to include 'has the effect of holding traceable assets to fewer hops'
- Update PIFO definition with full explanation about case law vs inventory methods

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md     |  37 ++++-------
 training.html | 195 +++++++++++++++++++---------------------------------------
 2 files changed, 73 insertions(+), 159 deletions(-)
```

## Recent Commits History

- cc32af8 Remove deployment section and update glossary to match official B.A.T.S. document (0 seconds ago)
- 211cbd9 Fix remaining LIFO reference to LIBR in training FAQ (5 minutes ago)
- ac74c4b Fix training page accuracy and add comprehensive glossary (23 minutes ago)
- 55d4bdb Implement LIBR method support and Sequential Hop Rule (35 minutes ago)
- 0f263be Implement UTC timezone compliance for all reports (3 hours ago)
- accef56 Add comprehensive validation and safety improvements (3 hours ago)
- 64c99a1 Fix critical bugs in hop completion and validation (11 hours ago)
- a3f9e29 Fix conversion tracking and UI issues (11 hours ago)
- 8a04692 Ensure thread availability updates properly after creating/editing entries (11 hours ago)
- 558ebe9 Fix JavaScript errors - add missing walletTypes global and fix orphaned code (11 hours ago)

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
