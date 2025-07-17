# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-17 07:03)

**Commit:** accef566dbf59e9edb2bb8abcc5baaee963bf15a
**Author:** Your Name
**Message:** Add comprehensive validation and safety improvements

Currency Handling:
- Add getCurrencyFromTransaction/Entry helpers for safe currency extraction
- Add currency precision functions to handle floating-point accurately
- Add safe addition/subtraction functions for currency amounts
- Add proper currency amount formatting with correct decimal places

Transaction Validation:
- Add duplicate transaction hash detection across all victims
- Show alert when attempting to use duplicate transaction hash
- Add checkTransactionDuplicate function with victim/transaction info

Wallet Validation:
- Add validateWalletAddress function with regex patterns for major currencies
- Support BTC, ETH, USDT, USDC, TRX, SOL, ADA, BNB address formats
- Show warnings for invalid addresses with format hints
- Allow override for non-standard addresses

Timezone Improvements:
- Fix DST handling with automatic detection
- Add support for ET, CT, MT, PT timezone abbreviations
- Add CEST timezone support
- Improve date conversion accuracy

Data Initialization:
- Initialize victim.isCompleted property on creation
- Initialize victim.name property
- Initialize transaction.txHash property

Validation History:
- Add addValidationHistoryEntry function for audit trail
- Track validation events with timestamp, type, status, and user
- Maintain rolling history of last 100 entries

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  |  47 ++++++-------
 index.html | 235 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-
 2 files changed, 255 insertions(+), 27 deletions(-)
```

## Recent Commits History

- accef56 Add comprehensive validation and safety improvements (0 seconds ago)
- 64c99a1 Fix critical bugs in hop completion and validation (8 hours ago)
- a3f9e29 Fix conversion tracking and UI issues (8 hours ago)
- 8a04692 Ensure thread availability updates properly after creating/editing entries (8 hours ago)
- 558ebe9 Fix JavaScript errors - add missing walletTypes global and fix orphaned code (8 hours ago)
- ebad042 Fix JavaScript errors in hop finalization (8 hours ago)
- 1ca5ecd Fix hop finalization loop - add thread review before moving to next hop (8 hours ago)
- 27b4b51 Fix manual entry modal and add debugging for thread availability (9 hours ago)
- d3c18fa Add mobile device detection and automatic redirection (14 hours ago)
- 3e9c8e6 Add mobile showcase version for browsing B.A.T.S. capabilities (14 hours ago)

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
