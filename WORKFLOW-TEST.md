# B.A.T.S. Workflow Test - Simulated Investigation

## Test Case: DEX Hack with Multi-Currency Conversion
**Case ID:** TEST-2025-001
**Total Stolen:** 1,800 HYPE
**Victims:** Alice (800 HYPE), Bob (1,000 HYPE)

---

## ✅ WORKFLOW VALIDATION CHECKLIST

### Phase 1: Case Setup & Victim Entry
- [ ] 1.1 Load index.html - landing page displays
- [ ] 1.2 Click "Start New Investigation"
- [ ] 1.3 Fill in case details (Case ID: TEST-2025-001)
- [ ] 1.4 Navigate to "Victims & Transactions" tab
- [ ] 1.5 Add Victim 1 (Alice) with 2 transactions
  - TX1: 500 HYPE
  - TX2: 300 HYPE
- [ ] 1.6 Mark Victim 1 as complete (green checkmark appears)
- [ ] 1.7 Add Victim 2 (Bob) with 1 transaction
  - TX1: 1,000 HYPE
- [ ] 1.8 Mark Victim 2 as complete
- [ ] 1.9 Click "Generate Root Total" button
- [ ] 1.10 Verify root total modal shows: **1,800 HYPE**
- [ ] 1.11 Click "Confirm Root Total & Start Tracing"
- [ ] 1.12 **VERIFY:** Page switches to Victims tab and scrolls to Trace Documentation section
- [ ] 1.13 **VERIFY:** "Create Hop 1" button is visible and enabled
- [ ] 1.14 **VERIFY:** Alert shows next steps clearly

### Phase 2: Hop 1 - Initial Dispersion
**ART at Start:** 1,800 HYPE

- [ ] 2.1 Click "Create Hop 1"
- [ ] 2.2 Add Entry 1: V1-T1 (500 HYPE) → Swap to USDC
  - Source: V1-T1
  - Amount: 500 HYPE
  - Destination: Mixer A (0x987...)
  - Type: Brown (Conversion)
  - Swap: 500 HYPE → 1,000 USDC
- [ ] 2.3 **VERIFY:** Entry shows swap notation correctly
- [ ] 2.4 Add Entry 2: V1-T2 (300 HYPE) → Swap to USDC
  - Source: V1-T2
  - Amount: 300 HYPE
  - Destination: Mixer A (same address as Entry 1)
  - Type: Brown (Conversion)
  - Swap: 300 HYPE → 600 USDC
- [ ] 2.5 **VERIFY:** Same brown wallet (Br-1) is used for both entries
- [ ] 2.6 Add Entry 3: V2-T1 (1,000 HYPE) → Black wallet
  - Source: V2-T1
  - Amount: 1,000 HYPE
  - Destination: Intermediate Wallet
  - Type: Black
- [ ] 2.7 Click "Close Hop 1"
- [ ] 2.8 **VERIFY:** Thread review modal appears
- [ ] 2.9 **VERIFY:** ART now shows: 1,600 USDC + 1,000 HYPE

### Phase 3: Hop 2 - Terminal & Bridge Activity
**ART at Start:** 1,600 USDC + 1,000 HYPE

- [ ] 3.1 Click "Create Hop 2"
- [ ] 3.2 Add Entry 1: (V1-T1) H1 → Terminal (Binance)
  - Source: (V1-T1) H1
  - Amount: 1,000 USDC
  - Destination: Binance Hot Wallet
  - Type: Purple (Terminal)
- [ ] 3.3 **VERIFY:** Entry marked as terminal
- [ ] 3.4 Add Entry 2: (V1-T2) H1 → Split (400 USDC)
  - Source: (V1-T2) H1
  - Amount: 400 USDC
  - Destination: Splitter Wallet
  - Type: Black
- [ ] 3.5 Add Entry 3: (V1-T2) H1 → Terminal (Kraken)
  - Source: (V1-T2) H1
  - Amount: 200 USDC
  - Destination: Kraken Deposit
  - Type: Purple (Terminal)
- [ ] 3.6 Add Entry 4: (V2-T1) H1 → Bridge to ETH
  - Source: (V2-T1) H1
  - Amount: 1,000 HYPE
  - Destination: Bridge Contract
  - Type: Brown (Bridge)
  - Swap: 1,000 HYPE → 0.5 ETH
- [ ] 3.7 Click "Close Hop 2"
- [ ] 3.8 **VERIFY:** ART now shows: 400 USDC + 0.5 ETH
- [ ] 3.9 **VERIFY:** Terminal threads are removed from available threads

### Phase 4: Hop 3 - Final Destinations
**ART at Start:** 400 USDC + 0.5 ETH

- [ ] 4.1 Click "Create Hop 3"
- [ ] 4.2 Add Entry 1: Split thread (200 USDC)
  - Source: (V1-T2) H1 H2
  - Amount: 200 USDC
  - Destination: Final EOA
  - Type: Black
- [ ] 4.3 Add Entry 2: Split thread → Terminal (OKX)
  - Source: (V1-T2) H1 H2
  - Amount: 200 USDC
  - Destination: OKX Deposit
  - Type: Purple (Terminal)
- [ ] 4.4 Add Entry 3: Bridge output → Mixer
  - Source: (V2-T1) H1 H2
  - Amount: 0.5 ETH
  - Destination: Tornado Cash
  - Type: Brown
- [ ] 4.5 Click "Close Hop 3"
- [ ] 4.6 **VERIFY:** Case shows as complete (all funds accounted for)

### Phase 5: Visualization & Reports
- [ ] 5.1 Click "Open Visualization" button
- [ ] 5.2 **VERIFY:** New window opens with D3 graph
- [ ] 5.3 **VERIFY:** Graph shows all hops in columns
- [ ] 5.4 **VERIFY:** Brown wallets (Br-1) are reused correctly (not Br-1, Br-2, Br-3)
- [ ] 5.5 **VERIFY:** Swap nodes show currency conversion
- [ ] 5.6 Test drag wallet nodes vertically (only vertical movement allowed)
- [ ] 5.7 **VERIFY:** Columns stay fixed during drag
- [ ] 5.8 Test zoom in/out
- [ ] 5.9 **VERIFY:** Columns and wallets zoom together
- [ ] 5.10 **VERIFY:** T-account reconciliation boxes visible at bottom of each hop
- [ ] 5.11 Switch to Sankey diagram view
- [ ] 5.12 **VERIFY:** Sankey shows flow from HYPE → USDC → ETH seamlessly
- [ ] 5.13 Test orientation toggle (horizontal ↔ vertical)
- [ ] 5.14 Click Export dropdown
- [ ] 5.15 Export as PNG
- [ ] 5.16 Export as Standalone HTML
- [ ] 5.17 Open standalone HTML and verify it works independently

### Phase 6: Technical Audit Trail
- [ ] 6.1 Return to main app (index.html)
- [ ] 6.2 Navigate to Reports section
- [ ] 6.3 **VERIFY:** Technical Audit Trail displays correctly
- [ ] 6.4 **VERIFY:** Shows hierarchical structure:
  - Initial stolen funds (1,800 HYPE)
  - Hop 1 with all entries
  - Hop 2 with conversions and terminals
  - Hop 3 with final destinations
- [ ] 6.5 **VERIFY:** Thread allocations are correct (V-T-H notation)
- [ ] 6.6 **VERIFY:** Swap details show input/output currencies
- [ ] 6.7 **VERIFY:** Terminal wallets are clearly marked

### Phase 7: File Operations
- [ ] 7.1 Click "Save Investigation"
- [ ] 7.2 Download JSON file
- [ ] 7.3 Start new investigation
- [ ] 7.4 Click "Load Investigation"
- [ ] 7.5 Load the saved JSON
- [ ] 7.6 **VERIFY:** All data restored correctly
- [ ] 7.7 **VERIFY:** Can continue tracing from loaded state
- [ ] 7.8 Open visualization from loaded investigation
- [ ] 7.9 **VERIFY:** Visualization renders correctly from loaded data

---

## Expected Results Summary

### Navigation Flow
1. **Landing** → Case Details → Victims & Transactions
2. **After Root Total:** Auto-scroll to Trace Documentation section
3. **Trace Documentation:** Hop creation with entries
4. **Visualization:** Opens in new window, independent controls
5. **Reports:** Technical Audit Trail in main app

### Key Features to Verify
- ✅ Brown wallet ID reuse (same address = same ID)
- ✅ Multi-currency tracking (HYPE, USDC, ETH)
- ✅ Swap/conversion handling (visual flow continuation)
- ✅ Terminal wallet detection
- ✅ Thread notation (V-T-H format)
- ✅ ART validation throughout
- ✅ T-account reconciliation boxes
- ✅ Drag constraints (vertical only)
- ✅ Zoom sync (columns + wallets together)
- ✅ Export functionality (PNG, SVG, HTML, PDF)
- ✅ File save/load preservation

### Common Issues to Watch For
- ❌ Blank page after root total (should go to victims tab)
- ❌ Brown wallet ID incrementing unnecessarily
- ❌ Columns moving during wallet drag
- ❌ Zoom affecting only wallets, not columns
- ❌ Sankey not showing converted currencies
- ❌ Missing T-account reconciliation boxes

---

## Test Data File
Load `test-investigation.json` to start with a complete investigation for visualization/reporting testing.

## Manual Testing Instructions
1. Start fresh - clear browser cache
2. Open index.html
3. Follow checklist from Phase 1
4. Document any deviations or errors
5. Test visualization separately with test JSON
6. Verify all export formats work
