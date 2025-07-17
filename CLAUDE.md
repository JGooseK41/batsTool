# B.A.T.S. Tool - Project Context for Claude

## Project Overview
B.A.T.S. (Block Audit Tracing Standard) is a blockchain investigation tool for tracing cryptocurrency transactions across multiple chains. It helps investigators track stolen or illicit funds using a standardized notation system.

## Latest Commit (Auto-updated: 2025-07-17 07:13)

**Commit:** 0f263befbb2ea269f46ff0e6b5991b330489cfc2
**Author:** Your Name
**Message:** Implement UTC timezone compliance for all reports

- Convert all report timestamps to UTC format for consistency
- Add formatDateTimeForReport function for UTC conversion
- Update HTML report generation to display all times in UTC
- Update CSV export to use UTC timestamps
- Add UTC conversion for wallet "First Seen" dates
- Add UTC compliance note to report header
- Ensure all depositDate, timestamp fields show UTC time

All timestamps in reports now display as "YYYY-MM-DD HH:MM:SS UTC"
for regulatory compliance and consistency across timezones.

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

### Changed Files:
```
 CLAUDE.md  | 73 ++++++++++++++++++++++++++++++++++-------------------
 index.html | 85 ++++++++++++++++++++++++++++++++++++++++++++++++++++++--------
 2 files changed, 122 insertions(+), 36 deletions(-)
```

## Recent Commits History

- 0f263be Implement UTC timezone compliance for all reports (0 seconds ago)
- accef56 Add comprehensive validation and safety improvements (10 minutes ago)
- 64c99a1 Fix critical bugs in hop completion and validation (8 hours ago)
- a3f9e29 Fix conversion tracking and UI issues (8 hours ago)
- 8a04692 Ensure thread availability updates properly after creating/editing entries (8 hours ago)
- 558ebe9 Fix JavaScript errors - add missing walletTypes global and fix orphaned code (8 hours ago)
- ebad042 Fix JavaScript errors in hop finalization (8 hours ago)
- 1ca5ecd Fix hop finalization loop - add thread review before moving to next hop (8 hours ago)
- 27b4b51 Fix manual entry modal and add debugging for thread availability (9 hours ago)
- d3c18fa Add mobile device detection and automatic redirection (14 hours ago)

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
