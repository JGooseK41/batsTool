# UTXO Multi-Output Implementation Plan

## Overview
Enable proper Bitcoin UTXO transaction handling in wallet explorer by grouping outputs by transaction hash and allowing independent selection/classification of each output.

---

## Current State Analysis

### ✅ What We Have
1. **Bitcoin data is already parsed correctly** (Lines 19433-19600 in `getBitcoinWalletHistory()`)
   - Each output creates separate transaction record
   - `outputIndex` stored in `utxoData.outputIndex`
   - `utxoData.allOutputs[]` contains all outputs from the transaction
   - Change detection heuristics implemented

2. **Thread allocation logic exists** (ART tracker)
   - Can allocate multiple threads to single transaction
   - Handles partial allocation
   - PIFO auto-allocation

3. **Entry creation supports multi-threading**
   - `multipleSourceThreads[]` array
   - Commingling notation system

### ❌ What's Broken
1. **Flat display** - Each output shown as independent transaction
2. **No grouping** - Can't see outputs belong to same tx hash
3. **Duplicate blocking** - Same tx hash blocks multiple selections
4. **Missing output-level selection** - Can't independently classify each output

---

## User Workflow (Target State)

### Scenario 1: Small Transaction (≤4 outputs)

```
Wallet Explorer - bc1wallet...

Transaction List:
┌──────────────────────────────────────────────────────┐
│ 📤 Transaction 0xABC123...def (10 BTC sent)         │
│    Jan 15, 2024 14:30 UTC                            │
│    3 outputs                            [▼ Expand]   │
└──────────────────────────────────────────────────────┘

User clicks "Expand":

┌──────────────────────────────────────────────────────┐
│ 📤 Transaction 0xABC123...def (10 BTC sent)         │
│    Jan 15, 2024 14:30 UTC                            │
│    3 outputs                            [▲ Collapse] │
├──────────────────────────────────────────────────────┤
│                                                      │
│ Select outputs to trace:                            │
│                                                      │
│ ☐ Output 1: 6.00 BTC → bc1new1...abc               │
│   [Unknown address]                                  │
│   [Allocate Threads]                                 │
│                                                      │
│ ☐ Output 2: 3.00 BTC → bc1new2...def               │
│   🔄 Uniswap Router (DEX detected)                  │
│   [Allocate Threads]                                 │
│                                                      │
│ ☐ Output 3: 0.99 BTC → bc1wallet...same            │
│   🔗 CHANGE (same wallet) - Kept in active thread   │
│   [Cluster Address]                                  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Scenario 2: Large Transaction (>4 outputs)

```
┌──────────────────────────────────────────────────────┐
│ 📤 Transaction 0xCONSOL...123 (500 BTC sent)        │
│    Jan 15, 2024 14:30 UTC                            │
│    127 outputs                          [▼ Expand]   │
└──────────────────────────────────────────────────────┘

User clicks "Expand":

┌──────────────────────────────────────────────────────┐
│ 📤 Transaction 0xCONSOL...123 (500 BTC sent)        │
│    Jan 15, 2024 14:30 UTC                            │
│    127 outputs                          [▲ Collapse] │
├──────────────────────────────────────────────────────┤
│                                                      │
│ ⚠️ This transaction has 127 outputs                 │
│                                                      │
│ Too many to display inline.                         │
│                                                      │
│ [🔍 Analyze Transaction in Detail]                  │
│                                                      │
└──────────────────────────────────────────────────────┘

Clicking "Analyze" opens Transaction Analysis Modal (see below)
```

### Scenario 3: Thread Allocation Per Output

User clicks "Allocate Threads" on Output 1:

```
┌─ Allocate Threads to Output 1 ───────────────────────┐
│                                                       │
│ Transaction: 0xABC123...                             │
│ Output 1: 6.00 BTC → bc1new1...abc                  │
│                                                       │
│ ───────────────────────────────────────────────────  │
│                                                       │
│ Available Threads in bc1wallet...:                   │
│                                                       │
│ ☑ V1-T1: 1.00 BTC available                         │
│   Allocate: [1.00] BTC                               │
│                                                       │
│ ☑ V2-T1: 2.00 BTC available                         │
│   Allocate: [2.00] BTC                               │
│                                                       │
│ ☑ V3-T1: 5.00 BTC available                         │
│   Allocate: [3.00] BTC (partial)                     │
│                                                       │
│ ───────────────────────────────────────────────────  │
│                                                       │
│ Total Allocated: 6.00 / 6.00 BTC ✓                  │
│                                                       │
│ Remaining threads after allocation:                  │
│ • V3-T1: 2.00 BTC (will stay in wallet)             │
│                                                       │
│ [Auto-Allocate (PIFO)] [Clear] [Commit]             │
│                                                       │
└───────────────────────────────────────────────────────┘
```

Result: Creates entry with `multipleSourceThreads: ['V1-T1', 'V2-T1', 'V3-T1']`

---

## Implementation Phases

### Phase 1: Data Grouping (Foundation)

**File:** `index.html`
**Function:** New `groupBitcoinTransactionsByHash()`
**Location:** After `getBitcoinWalletHistory()` ~Line 19600

**Purpose:** Group flat output records by transaction hash

```javascript
function groupBitcoinTransactionsByHash(transactions) {
    // Input: Flat array of output records
    // Output: Map of txHash → transaction group

    const groups = new Map();

    transactions.forEach(tx => {
        const hash = tx.hash.toLowerCase();

        if (!groups.has(hash)) {
            groups.set(hash, {
                txHash: hash,
                timestamp: tx.timestamp,
                type: tx.type, // 'IN' or 'OUT'
                asset: tx.asset,
                explorerUrl: tx.explorerUrl,
                isUTXO: true,

                // For outgoing: sum all outputs
                totalSent: 0,
                outputs: [],
                outputCount: 0,

                // For incoming: single amount
                totalReceived: tx.type === 'IN' ? tx.amount : 0,
                sender: tx.counterparty
            });
        }

        const group = groups.get(hash);

        if (tx.type === 'OUT') {
            // Add to outputs array
            group.outputs.push({
                index: tx.utxoData?.outputIndex ?? group.outputs.length,
                amount: tx.amount,
                address: tx.counterparty,
                isChange: tx.isChange || false,
                potentialNewAddressChange: tx.potentialNewAddressChange || false,
                originalTx: tx // Keep reference to full transaction object
            });
            group.totalSent += tx.amount;
            group.outputCount = group.outputs.length;
        }
    });

    return Array.from(groups.values());
}
```

**Integration Point:** Call in `processWalletData()` ~Line 15357

```javascript
function processWalletData(transactions) {
    // ... existing code ...

    // Group Bitcoin transactions by hash
    if (walletExplorerState.blockchain === 'bitcoin') {
        walletExplorerState.transactionGroups = groupBitcoinTransactionsByHash(transactions);
    } else {
        // Account-based: one transaction = one group
        walletExplorerState.transactionGroups = transactions.map(tx => ({
            txHash: tx.hash,
            type: tx.type,
            outputs: [{ index: 0, amount: tx.amount, address: tx.counterparty, originalTx: tx }],
            ...tx
        }));
    }
}
```

---

### Phase 2: UI Structure Changes

**File:** `index.html`
**Function:** `renderTransactionTable()`
**Location:** ~Line 16728

**Changes Required:**

1. **Check blockchain type** at start of function:
```javascript
const isBitcoin = walletExplorerState.blockchain === 'bitcoin';
const displayData = isBitcoin ? walletExplorerState.transactionGroups : transactions;
```

2. **Render transaction groups** instead of flat transactions:
```javascript
displayData.forEach(group => {
    if (isBitcoin && group.type === 'OUT') {
        renderBitcoinTransactionGroup(group, tbody);
    } else {
        // Existing rendering for IN transactions and account-based
        renderStandardTransaction(group, tbody);
    }
});
```

3. **New function:** `renderBitcoinTransactionGroup()`

```javascript
function renderBitcoinTransactionGroup(group, tbody) {
    // Create header row (always visible)
    const headerRow = createTransactionHeaderRow(group);
    tbody.appendChild(headerRow);

    // Create expandable content row (hidden by default)
    const contentRow = createTransactionContentRow(group);
    tbody.appendChild(contentRow);

    // Track expansion state
    if (!walletExplorerState.expandedTransactions) {
        walletExplorerState.expandedTransactions = new Set();
    }
}
```

---

### Phase 3: Expandable Transaction Header

**New Function:** `createTransactionHeaderRow(group)`

```javascript
function createTransactionHeaderRow(group) {
    const row = document.createElement('tr');
    row.className = 'utxo-transaction-header';
    row.style.cursor = 'pointer';
    row.style.background = '#f8f9fa';
    row.style.borderBottom = '2px solid #dee2e6';

    const isExpanded = walletExplorerState.expandedTransactions.has(group.txHash);
    const expandIcon = isExpanded ? '▼' : '▶';

    row.innerHTML = `
        <td colspan="6" style="padding: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1;">
                    <span style="font-size: 18px; margin-right: 10px;">${expandIcon}</span>
                    <span style="font-weight: bold;">📤 Transaction ${group.txHash.substring(0, 10)}...</span>
                    <span style="margin-left: 15px; color: #666;">
                        ${group.totalSent.toFixed(8)} BTC sent
                    </span>
                    <span style="margin-left: 15px; color: #999; font-size: 12px;">
                        ${group.outputCount} output${group.outputCount > 1 ? 's' : ''}
                    </span>
                </div>
                <div>
                    <span style="color: #666; font-size: 14px;">
                        ${new Date(group.timestamp).toLocaleDateString()}
                    </span>
                </div>
            </div>
        </td>
    `;

    row.onclick = () => toggleTransactionExpansion(group.txHash);

    return row;
}
```

**New Function:** `toggleTransactionExpansion(txHash)`

```javascript
function toggleTransactionExpansion(txHash) {
    if (walletExplorerState.expandedTransactions.has(txHash)) {
        walletExplorerState.expandedTransactions.delete(txHash);
    } else {
        walletExplorerState.expandedTransactions.add(txHash);
    }

    renderTransactionTable(); // Re-render to show/hide content
}
```

---

### Phase 4: Expandable Content (Small Transactions ≤4)

**New Function:** `createTransactionContentRow(group)`

```javascript
function createTransactionContentRow(group) {
    const row = document.createElement('tr');
    row.className = 'utxo-transaction-content';

    const isExpanded = walletExplorerState.expandedTransactions.has(group.txHash);
    row.style.display = isExpanded ? '' : 'none';

    // Check output count
    if (group.outputCount > 4) {
        // Show "Analyze Transaction" button
        row.innerHTML = `
            <td colspan="6" style="padding: 20px; background: #fff3cd;">
                <div style="text-align: center;">
                    <p style="margin: 0 0 15px 0; color: #856404;">
                        ⚠️ This transaction has ${group.outputCount} outputs
                    </p>
                    <p style="margin: 0 0 20px 0; color: #666; font-size: 14px;">
                        Too many to display inline.
                    </p>
                    <button class="btn btn-primary" onclick="openTransactionAnalysisModal('${group.txHash}')">
                        🔍 Analyze Transaction in Detail
                    </button>
                </div>
            </td>
        `;
    } else {
        // Show inline output selection
        row.innerHTML = `
            <td colspan="6" style="padding: 20px; background: #f8f9fa;">
                ${renderInlineOutputs(group)}
            </td>
        `;
    }

    return row;
}
```

**New Function:** `renderInlineOutputs(group)`

```javascript
function renderInlineOutputs(group) {
    let html = '<div style="padding: 10px;">';
    html += '<h4 style="margin: 0 0 15px 0;">Select outputs to trace:</h4>';

    group.outputs.forEach((output, idx) => {
        const outputNum = output.index + 1; // Display as 1-indexed

        // Detect change
        const isChange = output.isChange ||
                        output.address === walletExplorerState.address;

        // Check if already allocated
        const allocationStatus = getOutputAllocationStatus(group.txHash, output.index);

        html += `
            <div style="border: 2px solid ${isChange ? '#28a745' : '#dee2e6'};
                        border-radius: 8px;
                        padding: 15px;
                        margin-bottom: 15px;
                        background: ${isChange ? '#d4edda' : 'white'};">

                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">
                        <div style="margin-bottom: 8px;">
                            <strong>Output ${outputNum}:</strong>
                            <span style="margin-left: 10px; font-size: 18px; font-weight: bold;">
                                ${output.amount.toFixed(8)} BTC
                            </span>
                        </div>

                        <div style="color: #666; font-family: monospace; font-size: 13px;">
                            → ${output.address.substring(0, 20)}...${output.address.substring(output.address.length - 10)}
                        </div>

                        ${isChange ? `
                            <div style="margin-top: 8px;">
                                <span style="background: #28a745; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                                    🔗 CHANGE (same wallet) - Kept in active thread
                                </span>
                            </div>
                        ` : ''}

                        ${allocationStatus.isAllocated ? `
                            <div style="margin-top: 8px;">
                                <span style="background: #6c757d; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                                    ✓ ${allocationStatus.fullyAllocated ? 'FULLY' : 'PARTIALLY'} ALLOCATED (${allocationStatus.entries.map(e => e.location).join(', ')})
                                </span>
                            </div>
                        ` : ''}
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${!isChange && !allocationStatus.fullyAllocated ? `
                            <button class="btn btn-primary btn-sm"
                                    onclick="openOutputThreadAllocation('${group.txHash}', ${output.index})"
                                    style="width: 140px;">
                                📊 Allocate Threads
                            </button>
                        ` : ''}

                        ${isChange ? `
                            <button class="btn btn-secondary btn-sm"
                                    onclick="clusterOutputAddress('${output.address}')"
                                    style="width: 140px;">
                                🔗 Cluster Address
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    return html;
}
```

---

### Phase 5: Output Allocation Status Tracking

**New Function:** `getOutputAllocationStatus(txHash, outputIndex)`

```javascript
function getOutputAllocationStatus(txHash, outputIndex) {
    // Check if this specific output has been allocated in any entry

    if (!investigation || !investigation.hops) {
        return {
            isAllocated: false,
            fullyAllocated: false,
            allocatedAmount: 0,
            remainingAmount: 0,
            entries: []
        };
    }

    const hashLower = txHash.toLowerCase();
    let totalAllocated = 0;
    const allocatedEntries = [];
    let outputAmount = 0;

    // Find the output amount from transaction groups
    const group = walletExplorerState.transactionGroups?.find(g =>
        g.txHash.toLowerCase() === hashLower
    );
    if (group) {
        const output = group.outputs.find(o => o.index === outputIndex);
        if (output) {
            outputAmount = output.amount;
        }
    }

    // Search all hop entries for this tx hash + output index
    for (const hop of investigation.hops) {
        if (!hop.entries) continue;

        for (const entry of hop.entries) {
            if (entry.transactionHash &&
                entry.transactionHash.toLowerCase() === hashLower &&
                entry.utxoOutputIndex === outputIndex) {

                const allocatedAmt = parseFloat(entry.amount) || 0;
                totalAllocated += allocatedAmt;
                allocatedEntries.push({
                    location: `H${hop.hopNumber}-E${entry.id}`,
                    amount: allocatedAmt,
                    currency: entry.currency,
                    notation: entry.notation
                });
            }
        }
    }

    const remaining = outputAmount - totalAllocated;
    const fullyAllocated = outputAmount && Math.abs(remaining) < 0.00000001;

    return {
        isAllocated: totalAllocated > 0,
        fullyAllocated: fullyAllocated,
        allocatedAmount: totalAllocated,
        remainingAmount: Math.max(0, remaining),
        entries: allocatedEntries
    };
}
```

---

### Phase 6: Thread Allocation Modal (Per Output)

**New Function:** `openOutputThreadAllocation(txHash, outputIndex)`

```javascript
function openOutputThreadAllocation(txHash, outputIndex) {
    // Find the transaction group and output
    const group = walletExplorerState.transactionGroups.find(g =>
        g.txHash.toLowerCase() === txHash.toLowerCase()
    );

    if (!group) {
        alert('Transaction not found');
        return;
    }

    const output = group.outputs.find(o => o.index === outputIndex);
    if (!output) {
        alert('Output not found');
        return;
    }

    // Store context for modal
    window.currentOutputAllocation = {
        txHash: txHash,
        outputIndex: outputIndex,
        output: output,
        group: group
    };

    // Open modal (reuse ART tracker modal pattern)
    showOutputAllocationModal();
}
```

**New Function:** `showOutputAllocationModal()`

```javascript
function showOutputAllocationModal() {
    const ctx = window.currentOutputAllocation;
    const output = ctx.output;

    // Get available threads in this wallet
    const availableThreads = getAvailableThreadsForWallet(walletExplorerState.address);

    // Check current allocation status
    const allocationStatus = getOutputAllocationStatus(ctx.txHash, ctx.outputIndex);
    const remainingToAllocate = allocationStatus.remainingAmount || output.amount;

    const modal = document.createElement('div');
    modal.id = 'outputAllocationModal';
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px; padding: 30px;">
            <h2 style="margin-bottom: 20px;">📊 Allocate Threads to Output</h2>

            <div style="background: #e3f2fd; border: 2px solid #2196f3; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <h3 style="margin-top: 0; color: #0d47a1; font-size: 16px;">Output Details</h3>

                <div style="margin-bottom: 10px;">
                    <strong>Transaction:</strong> ${ctx.txHash.substring(0, 20)}...
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Output ${ctx.outputIndex + 1}:</strong> ${output.amount.toFixed(8)} BTC
                </div>
                <div style="margin-bottom: 10px;">
                    <strong>Destination:</strong>
                    <div style="font-family: monospace; font-size: 12px; margin-top: 5px;">
                        ${output.address}
                    </div>
                </div>

                ${allocationStatus.isAllocated ? `
                    <div style="margin-top: 15px; padding: 10px; background: #fff3cd; border-radius: 4px;">
                        <strong>Already Allocated:</strong> ${allocationStatus.allocatedAmount.toFixed(8)} BTC
                        <br>
                        <strong>Remaining:</strong> ${remainingToAllocate.toFixed(8)} BTC
                    </div>
                ` : ''}
            </div>

            <div style="margin-bottom: 20px;">
                <h3 style="font-size: 16px; margin-bottom: 15px;">Available Threads in Wallet</h3>

                <div id="threadAllocationList">
                    ${availableThreads.length === 0 ? `
                        <p style="color: #dc3545;">No available threads in this wallet</p>
                    ` : availableThreads.map((thread, idx) => `
                        <div style="border: 1px solid #dee2e6; border-radius: 6px; padding: 12px; margin-bottom: 10px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <label style="margin: 0; display: flex; align-items: center;">
                                    <input type="checkbox"
                                           id="thread_${idx}"
                                           onchange="updateAllocationTotal()"
                                           style="margin-right: 10px;">
                                    <strong>${thread.threadId}</strong>
                                </label>
                                <span style="color: #666;">
                                    ${thread.available.toFixed(8)} BTC available
                                </span>
                            </div>

                            <div style="display: flex; align-items: center; gap: 10px;">
                                <label style="flex: 0 0 80px;">Allocate:</label>
                                <input type="number"
                                       id="amount_${idx}"
                                       step="0.00000001"
                                       min="0"
                                       max="${thread.available}"
                                       value="0"
                                       onchange="updateAllocationTotal()"
                                       style="flex: 1; padding: 6px;">
                                <span style="flex: 0 0 40px;">BTC</span>
                            </div>
                        </div>
                    `).join('')}
                </div>

                ${availableThreads.length > 0 ? `
                    <div style="margin-top: 15px; text-align: right;">
                        <button class="btn btn-secondary btn-sm" onclick="autoAllocatePIFO()">
                            Auto-Allocate (PIFO)
                        </button>
                    </div>
                ` : ''}
            </div>

            <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <strong>Output Amount:</strong>
                    <span id="outputAmount">${output.amount.toFixed(8)} BTC</span>
                </div>
                ${allocationStatus.isAllocated ? `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #6c757d;">
                        <span>Previously Allocated:</span>
                        <span>${allocationStatus.allocatedAmount.toFixed(8)} BTC</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <strong>Remaining to Allocate:</strong>
                        <span>${remainingToAllocate.toFixed(8)} BTC</span>
                    </div>
                ` : ''}
                <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; padding-top: 10px; border-top: 2px solid #dee2e6;">
                    <span>Total Allocated Now:</span>
                    <span id="totalAllocated" style="color: #28a745;">0.00000000 BTC</span>
                </div>
            </div>

            <div style="display: flex; justify-content: center; gap: 10px;">
                <button class="btn btn-primary" onclick="commitOutputAllocation()">
                    ✅ Commit Allocation
                </button>
                <button class="btn btn-secondary" onclick="closeOutputAllocationModal()">
                    Cancel
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Store thread data for auto-allocation
    window.outputAllocationThreads = availableThreads;
}
```

---

### Phase 7: Allocation Logic Functions

**New Function:** `updateAllocationTotal()`

```javascript
function updateAllocationTotal() {
    const threads = window.outputAllocationThreads || [];
    let total = 0;

    threads.forEach((thread, idx) => {
        const checkbox = document.getElementById(`thread_${idx}`);
        const amountInput = document.getElementById(`amount_${idx}`);

        if (checkbox && amountInput) {
            if (checkbox.checked) {
                const amount = parseFloat(amountInput.value) || 0;
                total += amount;
            }
        }
    });

    const totalDisplay = document.getElementById('totalAllocated');
    if (totalDisplay) {
        totalDisplay.textContent = total.toFixed(8) + ' BTC';

        // Color code based on allocation status
        const ctx = window.currentOutputAllocation;
        const allocationStatus = getOutputAllocationStatus(ctx.txHash, ctx.outputIndex);
        const remainingToAllocate = allocationStatus.remainingAmount || ctx.output.amount;

        if (Math.abs(total - remainingToAllocate) < 0.00000001) {
            totalDisplay.style.color = '#28a745'; // Perfect allocation
        } else if (total > remainingToAllocate) {
            totalDisplay.style.color = '#dc3545'; // Over-allocated
        } else {
            totalDisplay.style.color = '#ffc107'; // Partial
        }
    }
}
```

**New Function:** `autoAllocatePIFO()`

```javascript
function autoAllocatePIFO() {
    const threads = window.outputAllocationThreads || [];
    const ctx = window.currentOutputAllocation;
    const allocationStatus = getOutputAllocationStatus(ctx.txHash, ctx.outputIndex);
    let remainingToAllocate = allocationStatus.remainingAmount || ctx.output.amount;

    // PIFO: Proceeds In, First Out
    // Allocate from earliest threads first
    threads.forEach((thread, idx) => {
        const checkbox = document.getElementById(`thread_${idx}`);
        const amountInput = document.getElementById(`amount_${idx}`);

        if (remainingToAllocate > 0 && thread.available > 0) {
            const allocate = Math.min(remainingToAllocate, thread.available);

            checkbox.checked = true;
            amountInput.value = allocate.toFixed(8);

            remainingToAllocate -= allocate;
        } else {
            checkbox.checked = false;
            amountInput.value = '0';
        }
    });

    updateAllocationTotal();
}
```

**New Function:** `commitOutputAllocation()`

```javascript
async function commitOutputAllocation() {
    const ctx = window.currentOutputAllocation;
    const threads = window.outputAllocationThreads || [];

    // Collect allocations
    const allocations = [];
    let totalAllocated = 0;

    threads.forEach((thread, idx) => {
        const checkbox = document.getElementById(`thread_${idx}`);
        const amountInput = document.getElementById(`amount_${idx}`);

        if (checkbox && checkbox.checked && amountInput) {
            const amount = parseFloat(amountInput.value) || 0;
            if (amount > 0) {
                allocations.push({
                    threadId: thread.threadId,
                    amount: amount,
                    internalId: thread.internalId
                });
                totalAllocated += amount;
            }
        }
    });

    if (allocations.length === 0) {
        alert('Please select and allocate at least one thread');
        return;
    }

    // Validate allocation
    const allocationStatus = getOutputAllocationStatus(ctx.txHash, ctx.outputIndex);
    const remainingToAllocate = allocationStatus.remainingAmount || ctx.output.amount;

    if (totalAllocated > remainingToAllocate + 0.00000001) {
        alert(`Cannot allocate ${totalAllocated.toFixed(8)} BTC. Only ${remainingToAllocate.toFixed(8)} BTC remaining.`);
        return;
    }

    // Attribution check for destination address
    console.log(`🔍 Checking attribution for ${ctx.output.address}...`);
    let walletType = '';
    let attributionNote = '';

    try {
        const attribution = await getWalletAttribution(ctx.output.address, 'bitcoin');
        if (attribution && !attribution.isPersonalLabel) {
            walletType = 'purple';
            attributionNote = `\n\n🟣 AUTO-CLASSIFIED: Terminal Wallet (${attribution.name || attribution.label})`;
        }
    } catch (err) {
        console.log('Attribution check failed:', err);
    }

    // Contract detection
    const detectedContract = detectContractType(ctx.output.address);
    if (detectedContract && !walletType) {
        if (detectedContract.type === 'dex') {
            walletType = 'brown';
            attributionNote = `\n\n🔄 AUTO-CLASSIFIED: DEX (${detectedContract.name})`;
        } else if (detectedContract.type === 'bridge') {
            walletType = 'brown';
            attributionNote = `\n\n🌉 AUTO-CLASSIFIED: Bridge (${detectedContract.name})`;
        }
    }

    // Create entry
    const hopNumber = getCurrentHop();
    if (!hopNumber) {
        alert('No active hop found');
        return;
    }

    const hop = investigation.hops.find(h => h.hopNumber === hopNumber);
    if (!hop) {
        alert(`Hop ${hopNumber} not found`);
        return;
    }

    // Save undo state
    saveUndoState(`Allocate threads to Bitcoin output ${ctx.outputIndex + 1}`);

    // Build entry
    const entry = {
        id: hop.entries.length + 1,
        hopNumber: hopNumber,
        entryType: 'trace',
        amount: totalAllocated.toString(),
        currency: 'BTC',
        sourceThreadId: allocations[0].threadId, // Primary thread
        multipleSourceThreads: allocations.map(a => a.threadId),
        notation: '', // Will be auto-generated
        notes: `Created from Bitcoin UTXO Output\nTransaction: ${ctx.txHash}\nOutput ${ctx.outputIndex + 1}: ${ctx.output.amount.toFixed(8)} BTC\nAllocated: ${totalAllocated.toFixed(8)} BTC from ${allocations.length} thread(s)\nDestination: ${ctx.output.address}\n\nThread Allocations:\n${allocations.map(a => `  • ${a.threadId}: ${a.amount.toFixed(8)} BTC`).join('\n')}${attributionNote}`,
        timestamp: new Date(ctx.group.timestamp).toISOString().slice(0, 16),
        chain: 'bitcoin',
        transactionHash: ctx.txHash,
        utxoOutputIndex: ctx.outputIndex, // CRITICAL: Store output index
        toWallet: ctx.output.address,
        toWalletType: walletType
    };

    hop.entries.push(entry);

    // Save and render
    saveToStorage();
    buildAvailableThreadsIndex();
    renderHops();

    // Close modal
    closeOutputAllocationModal();

    // Refresh wallet explorer to show updated allocation status
    renderTransactionTable();

    showNotification(`✅ Allocated ${totalAllocated.toFixed(8)} BTC from ${allocations.length} thread(s) to Output ${ctx.outputIndex + 1}`, 'success');
}
```

**New Function:** `closeOutputAllocationModal()`

```javascript
function closeOutputAllocationModal() {
    const modal = document.getElementById('outputAllocationModal');
    if (modal) {
        modal.remove();
    }
    window.currentOutputAllocation = null;
    window.outputAllocationThreads = null;
}
```

---

### Phase 8: Transaction Analysis Modal (>4 Outputs)

**New Function:** `openTransactionAnalysisModal(txHash)`

```javascript
function openTransactionAnalysisModal(txHash) {
    const group = walletExplorerState.transactionGroups.find(g =>
        g.txHash.toLowerCase() === txHash.toLowerCase()
    );

    if (!group) {
        alert('Transaction not found');
        return;
    }

    // Store context
    window.currentTransactionAnalysis = {
        txHash: txHash,
        group: group,
        filters: {
            minAmount: 0,
            maxAmount: null,
            addressSearch: '',
            type: 'all' // 'all', 'new', 'change'
        },
        currentPage: 1,
        itemsPerPage: 20
    };

    showTransactionAnalysisModal();
}
```

**New Function:** `showTransactionAnalysisModal()`

```javascript
function showTransactionAnalysisModal() {
    const ctx = window.currentTransactionAnalysis;
    const group = ctx.group;

    const modal = document.createElement('div');
    modal.id = 'transactionAnalysisModal';
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 1000px; max-height: 90vh; display: flex; flex-direction: column;">
            <div class="modal-header" style="flex-shrink: 0; position: relative;">
                <button onclick="closeTransactionAnalysisModal()"
                        style="position: absolute; top: 15px; right: 15px; background: #dc3545; color: white; border: none; border-radius: 4px; padding: 8px 16px; font-size: 18px; font-weight: bold; cursor: pointer; z-index: 1000;"
                        title="Close">
                    ✕ Close
                </button>
                <h2>🔍 Transaction Analysis</h2>
                <p>Transaction: ${ctx.txHash.substring(0, 20)}...</p>
            </div>

            <div style="padding: 20px; flex-shrink: 0; background: #f8f9fa; border-bottom: 2px solid #dee2e6;">
                <div style="margin-bottom: 15px;">
                    <strong>Total Sent:</strong> ${group.totalSent.toFixed(8)} BTC &nbsp;&nbsp;
                    <strong>Outputs:</strong> ${group.outputCount} &nbsp;&nbsp;
                    <strong>Date:</strong> ${new Date(group.timestamp).toLocaleString()}
                </div>

                <h4 style="margin: 15px 0 10px 0;">Filters:</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                    <div>
                        <label style="display: block; margin-bottom: 5px;">Min Amount (BTC):</label>
                        <input type="number" id="filterMinAmount" step="0.00000001"
                               onchange="applyTransactionFilters()"
                               style="width: 100%; padding: 6px;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px;">Max Amount (BTC):</label>
                        <input type="number" id="filterMaxAmount" step="0.00000001"
                               onchange="applyTransactionFilters()"
                               style="width: 100%; padding: 6px;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 5px;">Type:</label>
                        <select id="filterType" onchange="applyTransactionFilters()"
                                style="width: 100%; padding: 6px;">
                            <option value="all">All Outputs</option>
                            <option value="new">New Addresses Only</option>
                            <option value="change">Change Only</option>
                        </select>
                    </div>
                </div>
                <div style="margin-top: 10px;">
                    <label style="display: block; margin-bottom: 5px;">Search Address:</label>
                    <input type="text" id="filterAddress" placeholder="Search for specific address..."
                           onchange="applyTransactionFilters()"
                           style="width: 100%; padding: 8px;">
                </div>
            </div>

            <div id="transactionOutputsList" style="flex: 1; overflow-y: auto; padding: 20px;">
                <!-- Outputs will be rendered here -->
            </div>

            <div style="flex-shrink: 0; padding: 20px; background: #f8f9fa; border-top: 2px solid #dee2e6;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span id="selectionSummary" style="font-weight: bold;">No outputs selected</span>
                    </div>
                    <div>
                        <button class="btn btn-secondary btn-sm" onclick="selectAllVisible()">
                            Select All Visible
                        </button>
                        <button class="btn btn-secondary btn-sm" onclick="deselectAll()">
                            Deselect All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Initialize
    renderTransactionOutputsList();
}
```

**New Function:** `applyTransactionFilters()`

```javascript
function applyTransactionFilters() {
    const ctx = window.currentTransactionAnalysis;

    ctx.filters.minAmount = parseFloat(document.getElementById('filterMinAmount')?.value) || 0;
    ctx.filters.maxAmount = parseFloat(document.getElementById('filterMaxAmount')?.value) || null;
    ctx.filters.addressSearch = document.getElementById('filterAddress')?.value.toLowerCase() || '';
    ctx.filters.type = document.getElementById('filterType')?.value || 'all';

    ctx.currentPage = 1; // Reset to first page
    renderTransactionOutputsList();
}
```

**New Function:** `renderTransactionOutputsList()`

```javascript
function renderTransactionOutputsList() {
    const ctx = window.currentTransactionAnalysis;
    const group = ctx.group;

    // Apply filters
    let filtered = group.outputs.filter(output => {
        // Amount filter
        if (output.amount < ctx.filters.minAmount) return false;
        if (ctx.filters.maxAmount && output.amount > ctx.filters.maxAmount) return false;

        // Address search
        if (ctx.filters.addressSearch &&
            !output.address.toLowerCase().includes(ctx.filters.addressSearch)) {
            return false;
        }

        // Type filter
        const isChange = output.isChange || output.address === walletExplorerState.address;
        if (ctx.filters.type === 'new' && isChange) return false;
        if (ctx.filters.type === 'change' && !isChange) return false;

        return true;
    });

    // Pagination
    const start = (ctx.currentPage - 1) * ctx.itemsPerPage;
    const end = start + ctx.itemsPerPage;
    const page = filtered.slice(start, end);

    const container = document.getElementById('transactionOutputsList');
    if (!container) return;

    let html = `
        <div style="margin-bottom: 15px; color: #666;">
            Showing ${start + 1}-${Math.min(end, filtered.length)} of ${filtered.length} outputs
        </div>
    `;

    page.forEach(output => {
        const isChange = output.isChange || output.address === walletExplorerState.address;
        const allocationStatus = getOutputAllocationStatus(ctx.txHash, output.index);

        html += `
            <div style="border: 2px solid ${isChange ? '#28a745' : '#dee2e6'};
                        border-radius: 8px;
                        padding: 15px;
                        margin-bottom: 15px;
                        background: ${isChange ? '#d4edda' : allocationStatus.fullyAllocated ? '#f8f9fa' : 'white'};">

                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">
                        <div style="margin-bottom: 8px;">
                            <strong>Output ${output.index + 1}:</strong>
                            <span style="margin-left: 10px; font-size: 18px; font-weight: bold;">
                                ${output.amount.toFixed(8)} BTC
                            </span>
                        </div>

                        <div style="color: #666; font-family: monospace; font-size: 13px; word-break: break-all;">
                            → ${output.address}
                        </div>

                        ${isChange ? `
                            <div style="margin-top: 8px;">
                                <span style="background: #28a745; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                                    🔗 CHANGE
                                </span>
                            </div>
                        ` : ''}

                        ${allocationStatus.isAllocated ? `
                            <div style="margin-top: 8px;">
                                <span style="background: #6c757d; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                                    ${allocationStatus.fullyAllocated ? '✓ FULLY ALLOCATED' : '⚠️ PARTIALLY ALLOCATED'}
                                    (${allocationStatus.entries.map(e => e.location).join(', ')})
                                </span>
                            </div>
                        ` : ''}
                    </div>

                    <div>
                        ${!isChange && !allocationStatus.fullyAllocated ? `
                            <button class="btn btn-primary btn-sm"
                                    onclick="allocateFromModal(${output.index})"
                                    style="width: 140px;">
                                📊 Allocate Threads
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    });

    // Pagination controls
    const totalPages = Math.ceil(filtered.length / ctx.itemsPerPage);
    if (totalPages > 1) {
        html += `
            <div style="margin-top: 20px; text-align: center;">
                <button class="btn btn-secondary btn-sm"
                        onclick="changeAnalysisPage(-1)"
                        ${ctx.currentPage === 1 ? 'disabled' : ''}>
                    ← Previous
                </button>
                <span style="margin: 0 15px;">
                    Page ${ctx.currentPage} of ${totalPages}
                </span>
                <button class="btn btn-secondary btn-sm"
                        onclick="changeAnalysisPage(1)"
                        ${ctx.currentPage === totalPages ? 'disabled' : ''}>
                    Next →
                </button>
            </div>
        `;
    }

    container.innerHTML = html;
}
```

**New Function:** `allocateFromModal(outputIndex)`

```javascript
function allocateFromModal(outputIndex) {
    const ctx = window.currentTransactionAnalysis;

    // Close analysis modal
    closeTransactionAnalysisModal();

    // Open allocation modal for this output
    openOutputThreadAllocation(ctx.txHash, outputIndex);
}
```

**New Function:** `closeTransactionAnalysisModal()`

```javascript
function closeTransactionAnalysisModal() {
    const modal = document.getElementById('transactionAnalysisModal');
    if (modal) {
        modal.remove();
    }
    window.currentTransactionAnalysis = null;
}
```

---

### Phase 9: Helper Function - Get Available Threads for Wallet

**New Function:** `getAvailableThreadsForWallet(walletAddress)`

```javascript
function getAvailableThreadsForWallet(walletAddress) {
    // Get all threads that are currently in this wallet
    const threads = [];

    if (!investigation || !walletAddress) {
        return threads;
    }

    const walletLower = walletAddress.toLowerCase();

    // Check victim transactions that went to this wallet
    if (investigation.victims) {
        investigation.victims.forEach(victim => {
            victim.transactions.forEach(transaction => {
                if (transaction.receivingWallet?.toLowerCase() === walletLower) {
                    const threadId = `V${victim.id}-T${transaction.id}`;

                    // Calculate available amount
                    const totalAmount = parseFloat(transaction.amount) || 0;
                    const usedAmount = calculateThreadUsage(threadId);
                    const available = totalAmount - usedAmount;

                    if (available > 0.00000001) { // Has available balance
                        threads.push({
                            threadId: threadId,
                            total: totalAmount,
                            used: usedAmount,
                            available: available,
                            currency: transaction.currency,
                            internalId: `V${victim.id}-T${transaction.id}`
                        });
                    }
                }
            });
        });
    }

    // Check hop entries that created threads in this wallet
    // (This gets more complex - would need to track thread movements through hops)

    // For now, focus on victim-originated threads
    // Can expand later to include hop-derived threads

    return threads;
}
```

**New Function:** `calculateThreadUsage(threadId)`

```javascript
function calculateThreadUsage(threadId) {
    let used = 0;

    if (!investigation.hops) return used;

    for (const hop of investigation.hops) {
        if (!hop.entries) continue;

        for (const entry of hop.entries) {
            // Check if this entry uses this thread
            if (entry.sourceThreadId === threadId ||
                entry.multipleSourceThreads?.includes(threadId)) {

                // For multi-source entries, need to determine portion allocated to this thread
                if (entry.multipleSourceThreads && entry.multipleSourceThreads.length > 1) {
                    // This is simplified - in reality would need to track individual allocations
                    // For now, assume equal split (can improve later)
                    const portion = parseFloat(entry.amount) / entry.multipleSourceThreads.length;
                    used += portion;
                } else {
                    used += parseFloat(entry.amount) || 0;
                }
            }
        }
    }

    return used;
}
```

---

## Testing Plan

### Test Case 1: Simple 3-Output Transaction
1. Load Bitcoin wallet with victim thread (V1-T1: 10 BTC)
2. Find outgoing transaction with 3 outputs
3. Expand transaction → Should see 3 outputs inline
4. Select Output 1 → Allocate 6 BTC from V1-T1
5. Verify entry created with `utxoOutputIndex: 0`
6. Verify V1-T1 now has 4 BTC available

### Test Case 2: Large Transaction (>4 Outputs)
1. Find transaction with 50+ outputs
2. Expand → Should see "Analyze Transaction" button
3. Click → Modal opens with all outputs
4. Filter for amount > 1 BTC
5. Select 3 outputs
6. Allocate threads to each
7. Verify 3 entries created with correct output indices

### Test Case 3: Commingled Threads
1. Load wallet with 3 victim threads (1 BTC each)
2. Find outgoing transaction with 2 BTC output
3. Allocate: V1-T1 (1 BTC) + V2-T1 (1 BTC)
4. Verify entry has `multipleSourceThreads: ['V1-T1', 'V2-T1']`
5. Verify notation shows commingling: `V(1,2)-T(1,1)-H2`

### Test Case 4: Partial Allocation
1. Thread has 5 BTC available
2. Output is 3 BTC
3. Allocate 3 BTC from thread
4. Verify thread has 2 BTC remaining
5. Find another output, allocate remaining 2 BTC
6. Verify thread fully allocated

### Test Case 5: Change Detection
1. Transaction with change back to same address
2. Expand → Change output should show green "CHANGE" badge
3. No "Allocate Threads" button on change
4. Has "Cluster Address" button instead

---

## Database Schema Changes

### Entry Object Updates

Add new field to entry objects:

```javascript
{
    // ... existing fields ...

    // NEW: For Bitcoin UTXO tracking
    utxoOutputIndex: 0,  // Which output in the transaction (0, 1, 2, etc.)

    // EXISTING: Already supports multi-threading
    sourceThreadId: 'V1-T1',
    multipleSourceThreads: ['V1-T1', 'V2-T1'],

    // ... other fields ...
}
```

### Wallet Explorer State Updates

Add to `walletExplorerState`:

```javascript
walletExplorerState = {
    // ... existing fields ...

    // NEW: For Bitcoin grouping
    transactionGroups: [],  // Grouped transactions (Bitcoin) or flat (account-based)
    expandedTransactions: new Set(),  // Track which transactions are expanded

    // ... other fields ...
}
```

---

## Migration Strategy

### Backward Compatibility

1. **Existing entries without `utxoOutputIndex`**:
   - Treat as `utxoOutputIndex: 0` (first output)
   - No migration needed - handle in code

2. **Account-based chains (Ethereum, Tron, etc.)**:
   - Continue using existing flat transaction display
   - `utxoOutputIndex` always `0` or `undefined`

3. **Existing investigations**:
   - Load normally
   - When viewing Bitcoin wallet explorer, grouping applies automatically
   - Previous entries still work correctly

---

## Performance Considerations

### Optimization 1: Lazy Loading
- Only group transactions when Bitcoin wallet is opened
- Don't pre-process all transactions on load

### Optimization 2: Pagination
- Transaction Analysis Modal: 20 outputs per page
- Prevents UI freeze with 100+ output transactions

### Optimization 3: Caching
- Cache allocation status calculations
- Only recalculate when entries change

### Optimization 4: Debouncing
- Filter changes debounced by 300ms
- Prevents excessive re-renders during typing

---

## Edge Cases to Handle

### Edge Case 1: Mixed IN/OUT in Same Transaction
- Bitcoin allows receiving and spending in same transaction
- Group by type (IN vs OUT)
- Rare but possible

### Edge Case 2: Zero-Value Outputs (OP_RETURN)
- Filter out outputs with 0 value
- Don't display in output list

### Edge Case 3: Very Large Outputs (>1000)
- Add warning in Transaction Analysis Modal
- Suggest filtering before selecting

### Edge Case 4: Partially Allocated Output
- Show both allocated and remaining amounts
- Allow selecting again to allocate remainder
- Different threads can allocate portions

### Edge Case 5: Change to New Address
- `potentialNewAddressChange` flag already exists
- Show warning badge
- Offer clustering option

---

## Future Enhancements

### Enhancement 1: Bulk Operations
- Select multiple outputs
- Allocate same thread to all
- One-click "Allocate All to V1-T1"

### Enhancement 2: Visual Output Graph
- Show transaction as diagram
- Inputs → Transaction → Outputs
- Click output to allocate

### Enhancement 3: Change Clustering
- Auto-cluster change addresses
- Build address cluster groups
- Track through multiple transactions

### Enhancement 4: UTXO Coin Selection
- Show which specific UTXOs were spent (inputs)
- Trace UTXO lineage backwards
- Full UTXO graph visualization

---

## Files to Modify

1. **index.html** (primary changes)
   - `getBitcoinWalletHistory()` - Already correct ✓
   - `processWalletData()` - Add grouping call
   - `renderTransactionTable()` - Check blockchain type, render groups
   - Add 15+ new functions (listed above)

2. **CLAUDE.md** (documentation)
   - Update with UTXO feature description
   - Add to "Key Features" section

---

## Estimated Implementation Time

- **Phase 1-2** (Grouping + UI Structure): 2-3 hours
- **Phase 3-4** (Expandable UI): 2-3 hours
- **Phase 5-6** (Allocation Status + Modal): 3-4 hours
- **Phase 7** (Allocation Logic): 2-3 hours
- **Phase 8** (Analysis Modal): 3-4 hours
- **Phase 9** (Helper Functions): 1-2 hours
- **Testing + Bug Fixes**: 3-4 hours

**Total: 16-23 hours of development**

---

## Success Criteria

✅ Bitcoin transactions grouped by tx hash
✅ Expandable transaction view (inline for ≤4, modal for >4)
✅ Independent output selection and allocation
✅ Multi-thread allocation per output
✅ Correct `utxoOutputIndex` storage in entries
✅ Change detection and clustering
✅ Partial allocation tracking per output
✅ Attribution checking only on commit
✅ Backward compatible with existing data
✅ Works seamlessly with account-based chains

---

## Notes

- This implementation maintains full backward compatibility
- Account-based chains (ETH, TRON, etc.) continue working as before
- Bitcoin gets enhanced UTXO-aware interface
- Reuses existing ART allocation logic
- Follows established UI patterns (modals, buttons, badges)
- Respects API rate limits (check only on commit)

---

**End of Implementation Plan**
