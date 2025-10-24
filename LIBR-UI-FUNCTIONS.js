// ====================================================================
// LIBR UI Functions - To be inserted into index.html after line 35085
// CONDITIONAL: These functions only execute when investigation.tracingMethod === 'LIBR'
// ====================================================================

async function showLIBRBalanceTracker(walletAddress, criminalProceedsAmount, criminalProceedsDate, currency, blockchain) {
    console.log(`📊 [LIBR] Opening Balance Tracker for ${walletAddress}`);

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'librBalanceModal';
    modal.style.zIndex = '10000';

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 1000px; max-height: 90vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2>⚖️ LIBR Balance Analysis</h2>
                <button onclick="closeLIBRBalanceModal()" class="btn-close" style="font-size: 24px; border: none; background: none; cursor: pointer;">✕</button>
            </div>

            <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="margin-top: 0;">Wallet Address</h4>
                <p style="font-family: monospace; word-break: break-all; margin-bottom: 15px;">${walletAddress}</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <strong>Criminal Proceeds Deposited:</strong><br>
                        ${criminalProceedsAmount.toLocaleString()} ${currency}
                    </div>
                    <div>
                        <strong>Deposit Date:</strong><br>
                        ${new Date(criminalProceedsDate).toLocaleString()}
                    </div>
                </div>
                <p style="margin: 15px 0 0 0; padding: 10px; background: #fff; border-radius: 4px;">
                    <strong>📜 LIBR Rule:</strong> Only follow outbound transactions when wallet balance
                    drops below ${criminalProceedsAmount.toLocaleString()} ${currency}
                </p>
            </div>

            <div id="librLoadingIndicator" style="text-align: center; padding: 40px;">
                <div style="font-size: 48px;">⏳</div>
                <p>Fetching transaction history from ${blockchain} blockchain...</p>
                <p style="color: #666; font-size: 14px;">This may take a moment for wallets with many transactions</p>
            </div>

            <div id="librAnalysisResults" style="display: none;">
                <!-- Will be populated after analysis -->
            </div>

            <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
                <button onclick="closeLIBRBalanceModal()" class="btn btn-secondary">Close</button>
                <button id="librApplyButton" onclick="applyLIBRSelection()" class="btn btn-primary" style="display: none;">
                    Apply LIBR Selection
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Perform analysis
    try {
        await performLIBRAnalysis(walletAddress, criminalProceedsAmount, criminalProceedsDate, currency, blockchain);
    } catch (err) {
        document.getElementById('librLoadingIndicator').innerHTML = `
            <div style="color: #d32f2f;">
                <div style="font-size: 48px;">⚠️</div>
                <p>Failed to fetch transaction history</p>
                <p style="color: #666; font-size: 14px;">${err.message}</p>
                <button onclick="closeLIBRBalanceModal()" class="btn btn-secondary" style="margin-top: 20px;">Close</button>
            </div>
        `;
    }
}

async function performLIBRAnalysis(walletAddress, criminalProceedsAmount, criminalProceedsDate, currency, blockchain) {
    console.log(`📊 [LIBR] Performing analysis for ${walletAddress}`);

    // Fetch transaction history
    const txHistory = await fetchCompleteTransactionHistory(walletAddress, blockchain, currency);

    // Calculate running balance
    const balanceHistory = calculateRunningBalance(walletAddress, txHistory, blockchain);

    // Find LIBR transaction point
    const librAnalysis = findLIBRTransactionPoint(
        balanceHistory,
        criminalProceedsAmount,
        new Date(criminalProceedsDate).getTime()
    );

    // Store analysis in investigation object
    const walletKey = `${blockchain}_${walletAddress.toLowerCase()}`;
    if (!investigation.librWalletAnalysis) investigation.librWalletAnalysis = {};
    if (!investigation.librWalletAnalysis[walletKey]) {
        investigation.librWalletAnalysis[walletKey] = {};
    }

    investigation.librWalletAnalysis[walletKey] = {
        ...investigation.librWalletAnalysis[walletKey],
        address: walletAddress,
        blockchain: blockchain,
        currency: currency,
        criminalProceedsAmount: criminalProceedsAmount,
        criminalProceedsDate: criminalProceedsDate,
        balanceHistory: balanceHistory,
        librAnalysis: librAnalysis,
        lastAnalyzed: new Date().toISOString()
    };

    saveToStorage();

    // Display results
    displayLIBRAnalysisResults(librAnalysis, balanceHistory, criminalProceedsAmount, criminalProceedsDate, currency);
}

function displayLIBRAnalysisResults(librAnalysis, balanceHistory, criminalProceedsAmount, criminalProceedsDate, currency) {
    const loadingDiv = document.getElementById('librLoadingIndicator');
    const resultsDiv = document.getElementById('librAnalysisResults');

    if (loadingDiv) loadingDiv.style.display = 'none';
    if (resultsDiv) resultsDiv.style.display = 'block';

    const statusColor = librAnalysis.balanceDroppedBelowProceeds ? '#4caf50' : '#ff9800';
    const statusIcon = librAnalysis.balanceDroppedBelowProceeds ? '✅' : '⚠️';
    const statusText = librAnalysis.balanceDroppedBelowProceeds ?
        'Balance Dropped Below Proceeds' :
        'Proceeds Remain in Wallet';

    resultsDiv.innerHTML = `
        <div style="background: ${statusColor}22; border: 2px solid ${statusColor}; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: ${statusColor};">${statusIcon} ${statusText}</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px;">
                <div>
                    <strong>Lowest Balance:</strong><br>
                    ${librAnalysis.lowestIntermediateBalance?.toFixed(6) || 'N/A'} ${currency}
                </div>
                <div>
                    <strong>Current Balance:</strong><br>
                    ${librAnalysis.currentBalance?.toFixed(6) || 'N/A'} ${currency}
                </div>
                <div>
                    <strong>Transactions Analyzed:</strong><br>
                    ${librAnalysis.transactionsAnalyzed}
                </div>
            </div>
        </div>

        ${librAnalysis.balanceDroppedBelowProceeds ? `
            <div style="background: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; margin-bottom: 20px;">
                <h4 style="margin-top: 0;">📍 First Transaction to Follow</h4>
                <p style="margin-bottom: 10px;">Per LIBR methodology, begin tracing at:</p>
                <div style="background: white; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 12px;">
                    <strong>TX Hash:</strong> ${librAnalysis.firstTransactionToFollow.txHash}<br>
                    <strong>Date:</strong> ${new Date(librAnalysis.firstTransactionToFollow.timestamp).toLocaleString()}<br>
                    <strong>Balance After:</strong> ${librAnalysis.firstTransactionToFollow.balance.toFixed(6)} ${currency}<br>
                    <strong>Amount:</strong> ${librAnalysis.firstTransactionToFollow.amount.toFixed(6)} ${currency}
                </div>
            </div>
        ` : `
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 20px;">
                <h4 style="margin-top: 0;">💰 Proceeds Remain in Wallet</h4>
                <p>The wallet balance has never dropped below ${criminalProceedsAmount.toLocaleString()} ${currency}.</p>
                <p style="margin-bottom: 0;">Per LIBR methodology, the criminal proceeds remain in this wallet and should not be traced further at this time.</p>
            </div>
        `}

        <div style="max-height: 400px; overflow-y: auto; border: 1px solid #ddd; border-radius: 4px;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead style="position: sticky; top: 0; background: #f5f5f5; z-index: 1;">
                    <tr>
                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Date</th>
                        <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Type</th>
                        <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Amount</th>
                        <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Balance After</th>
                        <th style="padding: 10px; text-align: center; border-bottom: 2px solid #ddd;">LIBR Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${balanceHistory
                        .filter(h => h.timestamp >= new Date(criminalProceedsDate).getTime())
                        .map(h => {
                            const belowThreshold = h.balance < criminalProceedsAmount;
                            const isFirstDrop = librAnalysis.firstTransactionToFollow?.txHash === h.txHash;
                            return `
                                <tr style="background: ${isFirstDrop ? '#e3f2fd' : 'white'};">
                                    <td style="padding: 8px; border-bottom: 1px solid #eee; font-size: 12px;">
                                        ${new Date(h.timestamp).toLocaleString()}
                                    </td>
                                    <td style="padding: 8px; border-bottom: 1px solid #eee;">
                                        <span style="padding: 2px 8px; border-radius: 4px; background: ${h.type === 'inbound' ? '#4caf5022' : '#f4433622'}; color: ${h.type === 'inbound' ? '#4caf50' : '#f44336'};">
                                            ${h.type === 'inbound' ? '📥 In' : '📤 Out'}
                                        </span>
                                    </td>
                                    <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right; font-family: monospace;">
                                        ${h.amount.toFixed(6)}
                                    </td>
                                    <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right; font-family: monospace; font-weight: bold; color: ${belowThreshold ? '#f44336' : '#4caf50'};">
                                        ${h.balance.toFixed(6)}
                                    </td>
                                    <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">
                                        ${isFirstDrop ? '🎯 <strong>START HERE</strong>' : belowThreshold ? '✅ Follow' : '⏭️ Skip'}
                                    </td>
                                </tr>
                            `;
                        })
                        .join('')}
                </tbody>
            </table>
        </div>
    `;

    // Show apply button if balance dropped
    const applyButton = document.getElementById('librApplyButton');
    if (librAnalysis.balanceDroppedBelowProceeds && applyButton) {
        applyButton.style.display = 'inline-block';
    }
}

function closeLIBRBalanceModal() {
    const modal = document.getElementById('librBalanceModal');
    if (modal) modal.remove();
}

function applyLIBRSelection() {
    // This will be enhanced in Phase 3 to pre-fill transaction data
    showNotification('LIBR analysis complete. Use the identified transaction for your trace.', 'info');
    closeLIBRBalanceModal();
}

// Helper function to launch LIBR analyzer from wizard or other contexts
async function analyzeLIBRForWallet(walletAddress, proceedsAmount, proceedsDate, currency, blockchain) {
    // CONDITIONAL: Only execute if LIBR method is selected
    if (investigation.tracingMethod !== 'LIBR') {
        alert('LIBR Balance Tracker is only available when using LIBR methodology.\n\nYour current investigation uses PIFO method.');
        return;
    }

    await showLIBRBalanceTracker(walletAddress, proceedsAmount, proceedsDate, currency, blockchain);
}

// End of LIBR UI Functions
// ====================================================================
