/**
 * B.A.T.S. D3.js Visualization Engine
 * Professional blockchain investigation visualization using D3.js
 * Features: Hop-centric columns, Sankey diagrams, ART reconciliation, editable labels
 */

class BATSVisualizationD3 {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.investigation = null;
        this.layoutMode = 'hop-columns'; // 'hop-columns' or 'sankey'
        this.orientation = 'horizontal'; // 'horizontal' or 'vertical'
        this.expandedEdgeGroups = new Set(); // Track which edge groups are manually expanded (>5 auto-collapse)
        this.collapsedEdgeGroups = new Set(); // Track which edge groups are manually collapsed (<5)
        this.adjustMode = false; // When true, enables dragging wallets and edges
        this.undoStack = []; // Stack for undo operations
        this.redoStack = []; // Stack for redo operations

        // Configuration
        this.config = {
            width: 3000,
            height: 1800,
            margin: { top: 100, right: 80, bottom: 100, left: 80 },
            walletColumnWidth: 220,  // Width of wallet columns
            hopSpaceWidth: 400,      // Space between wallet columns (for edges/flow)
            nodeRadius: 40,
            verticalSpacing: 140,    // Increased from 100 to prevent overlap
            artBoxHeight: 80,
            artBoxWidth: 300,
            edgeCurvature: 0.4,
            colors: {
                red: '#e74c3c',      // Victim
                black: '#2c3e50',    // Regular trace
                purple: '#9b59b6',   // Terminal/Exchange
                brown: '#8B4513',    // DEX/Swap
                gray: '#95a5a6',     // Obfuscated/Mixer
                blue: '#3498db',     // Cold Storage
                orange: '#f39c12',   // Change
                green: '#27ae60'     // Recovered
            }
        };

        this.initializeSVG();
    }

    initializeSVG() {
        // Clear container
        this.container.innerHTML = '';

        // Create control panel for adjust mode toggle
        const controlPanel = document.createElement('div');
        controlPanel.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            gap: 10px;
        `;

        // Undo button
        this.undoButton = document.createElement('button');
        this.undoButton.textContent = '↶ Undo';
        this.undoButton.style.cssText = `
            padding: 12px 20px;
            background: #95a5a6;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            opacity: 0.5;
        `;
        this.undoButton.onclick = () => this.undo();
        this.undoButton.disabled = true;

        // Redo button
        this.redoButton = document.createElement('button');
        this.redoButton.textContent = '↷ Redo';
        this.redoButton.style.cssText = `
            padding: 12px 20px;
            background: #95a5a6;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            opacity: 0.5;
        `;
        this.redoButton.onclick = () => this.redo();
        this.redoButton.disabled = true;

        // Reset button
        this.resetButton = document.createElement('button');
        this.resetButton.textContent = '⟲ Reset';
        this.resetButton.style.cssText = `
            padding: 12px 20px;
            background: #e74c3c;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;
        this.resetButton.onclick = () => this.resetLayout();

        // Adjust Graph toggle button
        this.adjustButton = document.createElement('button');
        this.adjustButton.textContent = '🔧 Adjust Graph';
        this.adjustButton.style.cssText = `
            padding: 12px 20px;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        `;
        this.adjustButton.onmouseover = () => {
            if (!this.adjustMode) {
                this.adjustButton.style.background = '#2980b9';
            }
        };
        this.adjustButton.onmouseout = () => {
            if (!this.adjustMode) {
                this.adjustButton.style.background = '#3498db';
            }
        };
        this.adjustButton.onclick = () => this.toggleAdjustMode();

        controlPanel.appendChild(this.undoButton);
        controlPanel.appendChild(this.redoButton);
        controlPanel.appendChild(this.resetButton);
        controlPanel.appendChild(this.adjustButton);
        this.container.appendChild(controlPanel);

        // Create SVG
        this.svg = d3.select(this.container)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${this.config.width} ${this.config.height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        // Main group for zoomable/pannable elements (including backgrounds)
        this.mainGroup = this.svg.append('g');

        // Add zoom behavior with constraints to prevent white space
        this.zoom = d3.zoom()
            .scaleExtent([0.8, 4])  // Min zoom 0.8 - allows slight zoom out but prevents excessive white space
            .extent([[0, 0], [this.config.width, this.config.height]])  // Viewport bounds
            .on('zoom', (event) => {
                // Constrain translation to prevent white space
                const transform = event.transform;
                const scale = transform.k;

                // Calculate bounds based on current scale
                // At scale 1, content fills viewport perfectly
                // At smaller scales, allow less panning
                // At larger scales, allow more panning to see zoomed areas
                const maxTranslateX = 0;
                const minTranslateX = this.config.width * (1 - scale);
                const maxTranslateY = 0;
                const minTranslateY = this.config.height * (1 - scale);

                // Clamp translation to prevent white space
                const clampedX = Math.max(minTranslateX, Math.min(maxTranslateX, transform.x));
                const clampedY = Math.max(minTranslateY, Math.min(maxTranslateY, transform.y));

                this.mainGroup.attr('transform',
                    `translate(${clampedX},${clampedY}) scale(${scale})`);
            });

        this.svg.call(this.zoom);

        // Groups for different layers (order matters - first drawn is behind)
        this.backgroundGroup = this.mainGroup.append('g').attr('class', 'backgrounds');
        this.edgesGroup = this.mainGroup.append('g').attr('class', 'edges');
        this.nodesGroup = this.mainGroup.append('g').attr('class', 'nodes');
        this.labelsGroup = this.mainGroup.append('g').attr('class', 'labels');
        this.artGroup = this.mainGroup.append('g').attr('class', 'art-boxes');
    }

    loadInvestigation(investigation) {
        console.log('Loading investigation into D3 visualization:', investigation);

        // Log investigation structure for debugging
        console.log('=== INVESTIGATION DATA STRUCTURE ===');
        console.log('Victims:', investigation.victims?.length || 0);
        investigation.victims?.forEach((v, i) => {
            console.log(`  Victim ${v.id}: ${v.name}, ${v.transactions?.length || 0} transactions`);
            v.transactions?.forEach((tx, j) => {
                console.log(`    T${tx.id}: ${tx.amount} ${tx.currency}`);
            });
        });

        console.log('Hops:', investigation.hops?.length || 0);
        investigation.hops?.forEach((hop, i) => {
            console.log(`  Hop ${hop.hopNumber}: ${hop.entries?.length || 0} entries`);
            hop.entries?.forEach((entry, j) => {
                console.log(`    Entry ${j}: ${entry.notation}, amount: ${entry.amount} ${entry.currency}, isBridge: ${entry.isBridge}, toWalletType: ${entry.toWalletType}`);
                if (entry.bridgeDetails) {
                    console.log(`      Bridge: ${entry.bridgeDetails.destinationAmount} ${entry.bridgeDetails.destinationAsset}`);
                }
            });
        });
        console.log('=== END INVESTIGATION DATA ===\n');

        this.investigation = investigation;

        // Build data structure
        this.buildDataStructure();

        // Render based on layout mode
        this.render();
    }

    buildDataStructure() {
        this.nodes = [];
        this.edges = [];
        this.hopColumns = [];
        this.nodeMap = new Map();

        // Counters for wallet IDs by color type
        this.walletCounters = {
            red: 0,      // R-1, R-2
            black: 0,    // B-1, B-2
            purple: 0,   // P-1, P-2
            brown: 0,    // Br-1, Br-2
            gray: 0,     // G-1, G-2
            blue: 0,     // BL-1, BL-2
            orange: 0,   // O-1, O-2
            green: 0     // GR-1, GR-2
        };

        // Map to track wallet addresses to IDs (to reuse same ID for same wallet)
        this.walletAddressMap = new Map();

        // Build red wallet column (Hop 0) - first wallets under criminal control
        const victimColumn = {
            hopNumber: 0,
            title: 'RED WALLETS',
            nodes: [],
            artBefore: {},
            artAfter: {},
            columnIndex: 0
        };

        // Add victim nodes - consolidate by wallet address
        const redWalletMap = new Map(); // Track red wallets by address

        this.investigation.victims.forEach((victim, vIndex) => {
            victim.transactions.forEach((tx, tIndex) => {
                const walletAddress = tx.receivingWallet;
                const threadId = `V${victim.id}-T${tx.id}`;

                // Get or create red wallet node for this address
                let redWallet = redWalletMap.get(walletAddress);

                if (!redWallet) {
                    const colorType = 'red';
                    redWallet = {
                        id: `RED-${walletAddress}`,
                        wallet: walletAddress,
                        walletLabel: tx.walletLabel || this.shortenAddress(walletAddress),
                        walletId: this.generateWalletId(colorType, walletAddress),
                        type: colorType,
                        column: 0,
                        isVictim: true,
                        threads: [], // Track all threads (transactions) going through this wallet
                        totalAmount: 0,
                        currencies: {}
                    };

                    redWalletMap.set(walletAddress, redWallet);
                    victimColumn.nodes.push(redWallet);
                    this.nodes.push(redWallet);

                    // Register red wallet node by its ID for edge lookups
                    this.nodeMap.set(redWallet.id, redWallet);
                }

                // Add this transaction as a thread
                const txCurrency = tx.currency === 'CUSTOM' ? tx.customCurrency : tx.currency;
                const txAmount = parseFloat(tx.amount);

                redWallet.threads.push({
                    id: threadId,
                    label: threadId,
                    amount: txAmount,
                    currency: txCurrency,
                    victim: victim,
                    transaction: tx
                });

                // Update wallet totals
                redWallet.totalAmount += txAmount;
                redWallet.currencies[txCurrency] = (redWallet.currencies[txCurrency] || 0) + txAmount;

                // Register thread ID for edge connections (both with and without currency suffix)
                this.nodeMap.set(threadId, redWallet);
                this.nodeMap.set(`${threadId}_${txCurrency}`, redWallet);  // Also register with currency suffix

                // Update ART
                victimColumn.artAfter[txCurrency] = (victimColumn.artAfter[txCurrency] || 0) + txAmount;
            });
        });

        this.hopColumns.push(victimColumn);

        // Build hop columns (wallet columns after each hop - the hop space itself is between columns)
        // First pass: collect entries that belong to later hops (cross-hop entries from bridges)
        const deferredEntries = new Map(); // hopNumber -> array of entries

        this.investigation.hops.forEach((hop, hopIndex) => {
            hop.entries.forEach((entry, entryIndex) => {
                if (entry.hopNumber && entry.hopNumber !== hop.hopNumber) {
                    // This entry belongs to a different hop, defer it
                    const targetHop = entry.hopNumber;
                    if (!deferredEntries.has(targetHop)) {
                        deferredEntries.set(targetHop, []);
                    }
                    deferredEntries.get(targetHop).push(entry);
                }
            });
        });

        this.investigation.hops.forEach((hop, hopIndex) => {
            const hopColumn = {
                hopNumber: hop.hopNumber,
                title: `HOP ${hop.hopNumber} COMPLETION`,  // Wallet columns show where hop funds land/complete
                nodes: [],
                artBefore: hop.artAtStartByCurrency || {},
                artAfter: {},
                columnIndex: hopIndex + 1
            };

            // Process entries
            console.log(`Processing Hop ${hop.hopNumber} with ${hop.entries.length} entries`);
            hop.entries.forEach((entry, entryIndex) => {
                if (entry.entryType === 'writeoff') {
                    console.log(`  - Skipping writeoff entry ${entryIndex}`);
                    // Skip writeoffs for now (could add as special nodes later)
                    return;
                }

                // Skip entries that don't belong to this hop (will be processed later as deferred)
                if (entry.hopNumber && entry.hopNumber !== hop.hopNumber) {
                    console.log(`  - Deferring entry ${entryIndex} (belongs to hop ${entry.hopNumber}, not ${hop.hopNumber})`);
                    return;
                }
                console.log(`  - Processing entry ${entryIndex}: ${entry.notation || entry.id}, type: ${entry.entryType}, walletType: ${entry.walletType}, toWalletType: ${entry.toWalletType}, isBridge: ${entry.isBridge}`);

                // Normalize entry data - BATS app uses different field names
                if (!entry.destinationWallet && entry.toWallet) {
                    entry.destinationWallet = entry.toWallet;
                }
                if (!entry.walletType && entry.toWalletType) {
                    entry.walletType = entry.toWalletType;
                }
                if (!entry.walletLabel && entry.notes) {
                    // Extract wallet label from notes if available
                    const labelMatch = entry.notes.match(/Terminal wallet: ([^\n]+)/);
                    if (labelMatch) {
                        entry.walletLabel = labelMatch[1];
                    }
                }
                if (entry.isTerminalWallet && !entry.isTerminal) {
                    entry.isTerminal = entry.isTerminalWallet;
                }

                // Handle swaps/conversions
                console.log(`  [Routing] Entry ${entry.notation}: entryType=${entry.entryType}, walletType=${entry.walletType}, isBridge=${entry.isBridge}`);
                if (entry.entryType === 'swap' || entry.walletType === 'brown' || entry.isBridge) {
                    console.log(`  [Routing] → Taking SWAP/BRIDGE path`);
                    // Check if this is an internal swap (same wallet doing the conversion)
                    // or if it's going to another brown/service wallet
                    const isInternalSwap = entry.walletType === 'brown' && entry.toWalletType === 'brown' &&
                                          entry.destinationWallet && entry.destinationWallet === entry.swapPlatform;

                    console.log(`  [Swap type] isInternalSwap=${isInternalSwap}, destWallet=${entry.destinationWallet?.substring(0,20)}, swapPlatform=${entry.swapPlatform?.substring(0,20)}`);

                    if (isInternalSwap) {
                        console.log(`  [Swap type] → INTERNAL swap (brown in hop space only)`);
                        // Internal conversion - brown wallet exists ONLY in hop space
                        // Consolidate by attribution/label, not address
                        const attribution = entry.walletLabel || this.shortenAddress(entry.destinationWallet);
                        const brownWalletKey = `H${hop.hopNumber}-BROWN-${attribution}`;
                        let brownNode = this.nodeMap.get(brownWalletKey);

                        if (!brownNode) {
                            // Create brown wallet node in hop space (between columns)
                            brownNode = {
                                id: brownWalletKey,
                                label: attribution,
                                wallet: entry.destinationWallet,  // Primary wallet address
                                walletAddresses: [entry.destinationWallet],  // Track all addresses in cluster
                                walletLabel: attribution,
                                walletId: this.generateWalletId('brown', attribution),
                                type: 'brown',
                                amount: 0,  // Will accumulate from threads
                                currency: 'multiple',  // Brown wallets handle multiple currencies
                                column: hopIndex + 0.5,  // Position in hop space (between columns)
                                isSwap: true,
                                swapDetails: entry.swapDetails,
                                inputThreads: [],
                                outputThreads: [],
                                notation: entry.notation  // Store for thread tracking
                            };

                            this.nodes.push(brownNode);
                            this.nodeMap.set(brownWalletKey, brownNode);
                        } else {
                            // Brown wallet already exists - add this address to the cluster if not already present
                            if (!brownNode.walletAddresses.includes(entry.destinationWallet)) {
                                brownNode.walletAddresses.push(entry.destinationWallet);
                            }
                        }

                        // Add this thread to the brown wallet's inputs
                        brownNode.inputThreads.push({
                            notation: entry.notation,
                            amount: parseFloat(entry.amount || 0),
                            currency: entry.currency
                        });

                        // Add output thread info (but NO output node in hop column)
                        const outputAmount = entry.bridgeDetails ? parseFloat(entry.bridgeDetails.destinationAmount || entry.bridgeDetails.toAmount || 0) :
                                           (entry.swapDetails ? parseFloat(entry.swapDetails.outputAmount || entry.outputAmount || 0) : parseFloat(entry.amount || 0));
                        const outputCurrency = entry.bridgeDetails ? entry.bridgeDetails.destinationAsset || entry.bridgeDetails.toCurrency :
                                             (entry.swapDetails ? entry.swapDetails.outputCurrency : entry.currency);

                        console.log(`  [Bridge output] Entry ${entry.notation}: input=${entry.amount} ${entry.currency}, output=${outputAmount} ${outputCurrency}`);
                        console.log(`  [Bridge check] entry.isBridge=${entry.isBridge} (type: ${typeof entry.isBridge}), hasAvailableThreads=${!!this.investigation.availableThreads}`);

                        // For bridges, find the internal ID from availableThreads
                        let internalId = null;
                        if (entry.isBridge && this.investigation.availableThreads) {
                            console.log(`  [Bridge] Looking for internal ID for entry id=${entry.id}, hop=${hop.hopNumber}, notation=${entry.notation}`);
                            console.log(`  [Bridge] availableThreads keys:`, Object.keys(this.investigation.availableThreads));
                            // Search through available threads to find matching bridge output
                            for (const currency in this.investigation.availableThreads) {
                                console.log(`  [Bridge] Checking currency ${currency}, ${Object.keys(this.investigation.availableThreads[currency]).length} threads`);
                                for (const threadId in this.investigation.availableThreads[currency]) {
                                    const thread = this.investigation.availableThreads[currency][threadId];
                                    console.log(`  [Bridge]   Thread ${threadId}: entryId=${thread.entryId}, hopLevel=${thread.hopLevel} (looking for entryId=${entry.id}, hopLevel=${hop.hopNumber})`);
                                    if (thread.entryId === entry.id && thread.hopLevel === hop.hopNumber) {
                                        internalId = thread.internalId;
                                        console.log(`  [Bridge] ✓ Found internal ID: ${internalId} for ${currency}`);
                                        break;
                                    }
                                }
                                if (internalId) break;
                            }
                            if (!internalId) {
                                console.log(`  [Bridge] ✗ NO internal ID found for entry ${entry.id}, hop ${hop.hopNumber}`);
                            }
                        } else {
                            console.log(`  [Bridge] Skipping lookup: isBridge=${entry.isBridge}, hasAvailableThreads=${!!this.investigation.availableThreads}`);
                        }

                        const outputThread = {
                            notation: entry.notation,
                            internalId: internalId, // Store internal bridge output ID for lookup
                            amount: outputAmount,
                            currency: outputCurrency
                        };
                        console.log(`  [Bridge] Adding output thread to brown wallet ${brownWalletKey}:`, outputThread);
                        brownNode.outputThreads.push(outputThread);

                        // Register this as a thread source for next hop to connect to
                        this.nodeMap.set(entry.notation, brownNode);
                        // Also register with currency suffix for thread lookups
                        if (entry.notation && entry.currency) {
                            this.nodeMap.set(`${entry.notation}_${entry.currency}`, brownNode);
                        }
                        // IMPORTANT: Also register by internal bridge ID so deferred entries can find it
                        if (internalId) {
                            this.nodeMap.set(internalId, brownNode);
                            console.log(`  [Bridge] Registered brown wallet by internal ID: ${internalId}`);
                        }

                        // Edge: Source → Brown wallet (input currency)
                        // Check for multiple source thread IDs (convergence or bridge outputs)
                        const sourceThreadIds = entry.multipleSourceInternalIds || entry.sourceThreadIds ||
                                              (entry.sourceThreadId ? [entry.sourceThreadId] : []);

                        if (sourceThreadIds.length > 0) {
                            sourceThreadIds.forEach(threadId => {
                                const sourceThread = this.findSourceNode(threadId, hopIndex);
                                if (sourceThread) {
                                    // Get individual amount if available (for convergence entries)
                                    const individualAmount = entry.individualSourceAssignments?.[threadId] || (parseFloat(entry.amount || 0) / sourceThreadIds.length);

                                    this.edges.push({
                                        source: sourceThread.id,
                                        target: brownWalletKey,
                                        label: `${entry.notation || ''} (${individualAmount} ${entry.currency} → ${outputAmount} ${outputCurrency})`,
                                        amount: individualAmount,
                                        currency: entry.currency,
                                        entryData: entry
                                    });
                                }
                            });
                        }

                        // Update ART with output currency
                        hopColumn.artAfter[outputCurrency] = (hopColumn.artAfter[outputCurrency] || 0) + outputAmount;

                    } else {
                        console.log(`  [Swap type] → EXTERNAL swap (DEX/bridge)`);
                        // External swap - brown wallet in hop space, consolidate by attribution
                        const swapWalletAddress = entry.swapPlatform || entry.destinationWallet;
                        const attribution = entry.swapPlatform || 'DEX';
                        const swapNodeKey = `H${hop.hopNumber}-BROWN-${attribution}`;
                        let swapNode = this.nodeMap.get(swapNodeKey);

                        if (!swapNode) {
                            // Create DEX/brown wallet node in hop space
                            swapNode = {
                                id: swapNodeKey,
                                label: attribution,
                                wallet: swapWalletAddress,  // Primary wallet address
                                walletAddresses: [swapWalletAddress],  // Track all addresses in cluster
                                walletLabel: attribution,
                                walletId: this.generateWalletId('brown', attribution),
                                type: 'brown',
                                amount: parseFloat(entry.amount || 0),
                                currency: entry.currency,
                                column: hopIndex + 0.5,  // Position in hop space (between columns)
                                isSwap: true,
                                swapDetails: entry.swapDetails
                            };

                            this.nodes.push(swapNode);
                            this.nodeMap.set(swapNodeKey, swapNode);
                        } else {
                            // Brown wallet already exists - add this address to the cluster if not already present
                            if (!swapNode.walletAddresses.includes(swapWalletAddress)) {
                                swapNode.walletAddresses.push(swapWalletAddress);
                            }
                        }

                        // Edge 1: Source → DEX (input currency)
                        // Check for multiple source thread IDs (convergence or bridge outputs)
                        const sourceThreadIds = entry.multipleSourceInternalIds || entry.sourceThreadIds ||
                                              (entry.sourceThreadId ? [entry.sourceThreadId] : []);

                        if (sourceThreadIds.length > 0) {
                            sourceThreadIds.forEach(threadId => {
                                const sourceThread = this.findSourceNode(threadId, hopIndex);
                                if (sourceThread) {
                                    // Get individual amount if available (for convergence entries)
                                    const individualAmount = entry.individualSourceAssignments?.[threadId] || (parseFloat(entry.amount || 0) / sourceThreadIds.length);

                                    this.edges.push({
                                        source: sourceThread.id,
                                        target: swapNodeKey,
                                        label: entry.notation || '',
                                        amount: individualAmount,
                                        currency: entry.currency,
                                        entryData: entry
                                    });
                                }
                            });
                        }

                        // Check if output is also brown (same entity, possibly new chain/address)
                        const outputColorType = entry.toWalletType || 'black';
                        const outputAmount = entry.bridgeDetails ? parseFloat(entry.bridgeDetails.destinationAmount || entry.bridgeDetails.toAmount || 0) :
                                           (entry.swapDetails ? parseFloat(entry.swapDetails.outputAmount || entry.outputAmount || 0) : parseFloat(entry.amount || 0));
                        const outputCurrency = entry.bridgeDetails ? (entry.bridgeDetails.destinationAsset || entry.bridgeDetails.toCurrency) :
                                             (entry.swapDetails ? entry.swapDetails.outputCurrency : entry.currency);

                        console.log(`  [EXTERNAL swap output] Entry ${entry.notation}: output=${outputAmount} ${outputCurrency}`);

                        if (outputColorType === 'brown') {
                            // Output is also brown (e.g., bridge to new chain)
                            // Create an output node in the hop COMPLETION column to hold the converted currency

                            // For bridges, find the internal ID from availableThreads
                            let internalId = null;
                            if (entry.isBridge && this.investigation.availableThreads) {
                                console.log(`  [Bridge] Looking for internal ID for entry id=${entry.id}, hop=${hop.hopNumber}, notation=${entry.notation}`);
                                console.log(`  [Bridge] availableThreads keys:`, Object.keys(this.investigation.availableThreads));
                                // Search through available threads to find matching bridge output
                                for (const currency in this.investigation.availableThreads) {
                                    console.log(`  [Bridge] Checking currency ${currency}, ${Object.keys(this.investigation.availableThreads[currency]).length} threads`);
                                    for (const threadId in this.investigation.availableThreads[currency]) {
                                        const thread = this.investigation.availableThreads[currency][threadId];
                                        console.log(`  [Bridge]   Thread ${threadId}: entryId=${thread.entryId}, hopLevel=${thread.hopLevel} (looking for entryId=${entry.id}, hopLevel=${hop.hopNumber})`);
                                        if (thread.entryId === entry.id && thread.hopLevel === hop.hopNumber) {
                                            internalId = thread.internalId;
                                            console.log(`  [Bridge] ✓ Found internal ID: ${internalId} for ${currency}`);
                                            break;
                                        }
                                    }
                                    if (internalId) break;
                                }
                                if (!internalId) {
                                    console.log(`  [Bridge] ✗ NO internal ID found for entry ${entry.id}, hop ${hop.hopNumber}`);
                                }
                            } else {
                                console.log(`  [Bridge] Skipping lookup: isBridge=${entry.isBridge}, hasAvailableThreads=${!!this.investigation.availableThreads}`);
                            }

                            // Track the output thread on swap node for display (internal to brown wallet)
                            if (!swapNode.outputThreads) swapNode.outputThreads = [];
                            swapNode.outputThreads.push({
                                notation: entry.notation,
                                internalId: internalId,
                                amount: outputAmount,
                                currency: outputCurrency
                            });

                            // Register swap node by internal ID so deferred entries can find it
                            if (internalId) {
                                this.nodeMap.set(internalId, swapNode);
                                console.log(`  [Bridge] Registered swap node ${swapNode.id} by internal ID ${internalId}`);
                            }

                            // Update ART with output currency
                            hopColumn.artAfter[outputCurrency] = (hopColumn.artAfter[outputCurrency] || 0) + outputAmount;
                        } else {
                            // Output is different type (black, purple, etc.) - create output node
                            const outputNodeId = `H${hop.hopNumber}-E${entryIndex}`;
                            const outputNode = {
                                id: outputNodeId,
                                label: entry.notation || outputNodeId,
                                wallet: entry.destinationWallet,
                                walletLabel: entry.walletLabel || this.shortenAddress(entry.destinationWallet),
                                walletId: this.generateWalletId(outputColorType, entry.destinationWallet),
                                type: outputColorType,
                                amount: outputAmount,
                                currency: outputCurrency,
                                column: hopIndex + 1,
                                isTerminal: entry.toWalletType === 'purple'
                            };

                            hopColumn.nodes.push(outputNode);
                            this.nodes.push(outputNode);
                            this.nodeMap.set(outputNodeId, outputNode);
                            // Also register by notation for next hop lookups
                            if (entry.notation) {
                                this.nodeMap.set(entry.notation, outputNode);
                                // Also register with currency suffix for thread lookups
                                if (outputNode.currency) {
                                    this.nodeMap.set(`${entry.notation}_${outputNode.currency}`, outputNode);
                                }
                            }

                            // Edge 2: DEX → Output (output currency)
                            this.edges.push({
                                source: swapNodeKey,
                                target: outputNodeId,
                                label: `${outputNode.amount.toFixed(2)} ${outputNode.currency}`,
                                amount: outputNode.amount,
                                currency: outputNode.currency,
                                entryData: entry
                            });

                            // Update ART with output currency
                            hopColumn.artAfter[outputCurrency] = (hopColumn.artAfter[outputCurrency] || 0) + outputAmount;
                        }
                    }

                } else {
                    console.log(`  [Routing] → Taking REGULAR TRACE path`);
                    // Regular trace entry
                    const nodeId = `H${hop.hopNumber}-E${entryIndex}`;
                    const colorType = entry.walletType || 'black';
                    const node = {
                        id: nodeId,
                        label: entry.notation || nodeId,
                        wallet: entry.destinationWallet,
                        walletLabel: entry.walletLabel || this.shortenAddress(entry.destinationWallet),
                        walletId: this.generateWalletId(colorType, entry.destinationWallet),
                        type: colorType,
                        amount: parseFloat(entry.amount || 0),
                        currency: entry.currency,
                        column: hopIndex + 1,
                        isTerminal: entry.walletType === 'purple'
                    };

                    hopColumn.nodes.push(node);
                    this.nodes.push(node);
                    this.nodeMap.set(nodeId, node);
                    // Also register by notation for next hop lookups
                    if (entry.notation) {
                        this.nodeMap.set(entry.notation, node);
                        // Also register with currency suffix for thread lookups
                        if (node.currency) {
                            this.nodeMap.set(`${entry.notation}_${node.currency}`, node);
                        }
                    }

                    // Update ART
                    const currency = node.currency;
                    hopColumn.artAfter[currency] = (hopColumn.artAfter[currency] || 0) + node.amount;

                    // Create edges from source threads
                    // Check for multiple source thread IDs (convergence or bridge outputs)
                    const sourceThreadIds = entry.multipleSourceInternalIds || entry.sourceThreadIds ||
                                          (entry.sourceThreadId ? [entry.sourceThreadId] : []);

                    if (sourceThreadIds.length > 0) {
                        console.log(`Processing entry ${entry.notation}: sourceThreadIds =`, sourceThreadIds);
                        // Handle multiple source threads
                        sourceThreadIds.forEach(threadId => {
                            const sourceThread = this.findSourceNode(threadId, hopIndex);
                            console.log(`  - Looking for thread "${threadId}":`, sourceThread ? `Found ${sourceThread.id}` : 'NOT FOUND');
                            if (sourceThread) {
                                // Get individual amount if available (for convergence entries)
                                const individualAmount = entry.individualSourceAssignments?.[threadId] || (node.amount / sourceThreadIds.length);

                                this.edges.push({
                                    source: sourceThread.id,
                                    target: nodeId,
                                    label: entry.notation || '',
                                    amount: individualAmount,
                                    currency: node.currency,
                                    entryData: entry  // Store full entry for details
                                });
                            }
                        });
                    }
                }
            });

            // Process deferred entries that belong to this hop (from previous hops' arrays)
            if (deferredEntries.has(hop.hopNumber)) {
                const deferred = deferredEntries.get(hop.hopNumber);
                console.log(`Processing ${deferred.length} deferred entries for Hop ${hop.hopNumber}`);

                deferred.forEach((entry, entryIndex) => {
                    console.log(`  - Processing deferred entry: ${entry.notation || entry.id}, type: ${entry.entryType}, amount: ${entry.amount} ${entry.currency}`);

                    // Normalize entry data
                    if (!entry.destinationWallet && entry.toWallet) {
                        entry.destinationWallet = entry.toWallet;
                    }
                    if (!entry.walletType && entry.toWalletType) {
                        entry.walletType = entry.toWalletType;
                    }
                    if (!entry.walletLabel && entry.notes) {
                        const labelMatch = entry.notes.match(/Terminal wallet: ([^\n]+)/);
                        if (labelMatch) {
                            entry.walletLabel = labelMatch[1];
                        }
                    }
                    if (entry.isTerminalWallet && !entry.isTerminal) {
                        entry.isTerminal = entry.isTerminalWallet;
                    }

                    // Create destination node
                    // For bridge output entries, place in the SAME hop as the bridge (swaps don't count as hops)
                    // Find which hop the source threads are from
                    const sourceThreadIds = entry.sourceThreadIds ||
                                          entry.multipleSourceInternalIds ||
                                          [entry.sourceThreadId].filter(Boolean);

                    // Determine target hop based on source - if sources are bridge outputs, they're in the same hop
                    let targetHop = hop.hopNumber;
                    if (sourceThreadIds && sourceThreadIds.length > 0 && sourceThreadIds[0].startsWith('bridge_')) {
                        // Bridge outputs - find which hop they're from by checking availableThreads
                        for (const currency in this.investigation.availableThreads || {}) {
                            for (const threadId in this.investigation.availableThreads[currency]) {
                                if (sourceThreadIds.includes(threadId)) {
                                    const thread = this.investigation.availableThreads[currency][threadId];
                                    targetHop = thread.hopLevel;
                                    console.log(`  - Deferred entry sources from Hop ${targetHop} (bridge outputs)`);
                                    break;
                                }
                            }
                            if (targetHop !== hop.hopNumber) break;
                        }
                    }

                    const colorType = entry.walletType || (entry.isTerminal ? 'purple' : 'black');
                    const walletId = this.generateWalletId(colorType, entry.destinationWallet || `deferred-${entryIndex}`);
                    const nodeId = `H${targetHop}-${walletId}`;

                    const node = {
                        id: nodeId,
                        wallet: entry.destinationWallet || '',
                        walletLabel: entry.walletLabel || this.shortenAddress(entry.destinationWallet),
                        walletId: walletId,
                        type: colorType,
                        amount: parseFloat(entry.amount || 0),
                        currency: entry.currency || 'UNKNOWN',
                        column: targetHop,  // Use target hop, not entry.hopNumber
                        notation: entry.notation,
                        isTerminal: entry.isTerminal || false
                    };

                    this.nodes.push(node);
                    // Add to the correct hop column (might be different from current hop if bridge output)
                    const targetHopColumn = this.hopColumns.find(col => col.hopNumber === targetHop);
                    if (targetHopColumn) {
                        targetHopColumn.nodes.push(node);
                    } else {
                        hopColumn.nodes.push(node);  // Fallback to current hop
                    }
                    this.nodeMap.set(nodeId, node);

                    // Create edges from source threads (already extracted above)
                    if (sourceThreadIds && sourceThreadIds.length > 0) {
                        console.log(`    - Source threads for deferred entry:`, sourceThreadIds);
                        sourceThreadIds.forEach(threadId => {
                            // Look for this thread in available threads or as output thread on brown wallets
                            const sourceNode = this.findSourceNode(threadId, hopIndex);
                            console.log(`      - Looking for thread "${threadId}":`, sourceNode ? `Found ${sourceNode.id}` : 'NOT FOUND');

                            if (sourceNode) {
                                // Get individual amount if available
                                const individualAmount = entry.individualSourceAssignments?.[threadId] || (node.amount / sourceThreadIds.length);

                                this.edges.push({
                                    source: sourceNode.id,
                                    target: nodeId,
                                    label: entry.notation || '',
                                    amount: individualAmount,
                                    currency: entry.currency,
                                    entryData: entry
                                });
                            }
                        });
                    }
                });
            }

            this.hopColumns.push(hopColumn);
        });

        console.log('Built data structure:', {
            nodes: this.nodes.length,
            edges: this.edges.length,
            columns: this.hopColumns.length
        });
        console.log('\n=== EDGES CREATED ===');
        this.edges.forEach((e, i) => {
            console.log(`  ${i + 1}. ${e.source} → ${e.target} | ${e.label} | ${e.amount} ${e.currency}`);
        });

        console.log('\n=== NODES CREATED ===');
        this.nodes.forEach((n, i) => {
            console.log(`  ${i + 1}. ${n.id} (${n.type}) | ${n.walletLabel || n.label} | Column ${n.column}`);
            if (n.threads?.length > 0) {
                console.log(`     Threads: ${n.threads.map(t => t.id).join(', ')}`);
            }
            if (n.outputThreads?.length > 0) {
                console.log(`     Output threads: ${n.outputThreads.map(t => `${t.notation} (${t.currency})`).join(', ')}`);
            }
        });
        console.log('=== END BUILD DATA ===\n');
    }

    findSourceNode(threadId, currentHop) {
        // First try direct lookup by notation (for brown wallets registered with full notation)
        const directLookup = this.nodeMap.get(threadId);
        if (directLookup) {
            return directLookup;
        }

        // Check if it's a bridge output thread ID (e.g., bridge_3_USDC_1759657824768_xks0aq)
        if (threadId.startsWith('bridge_')) {
            console.log(`  [findSourceNode] Bridge thread lookup for "${threadId}"`);
            // Find the brown wallet that created this bridge output
            // Bridge outputs come from hop entries with isBridge=true
            for (let [id, node] of this.nodeMap) {
                if (node.type === 'brown' && node.outputThreads) {
                    // Check if any output thread has this internal ID
                    const match = node.outputThreads.find(t => t.internalId === threadId || t.notation === threadId);
                    if (match) {
                        console.log(`  [findSourceNode] Found brown wallet ${node.id} with outputThread:`, match);
                        return node;
                    }
                }
            }
            console.log(`  [findSourceNode] No brown wallet found with bridge output "${threadId}"`);
            console.log(`  [findSourceNode] Available brown wallets:`,
                Array.from(this.nodeMap.values()).filter(n => n.type === 'brown').map(n => ({
                    id: n.id,
                    outputThreads: n.outputThreads
                }))
            );
        }

        // Parse thread ID to find source node
        // Thread format: V{victimId}-T{txId}_CURRENCY or (V{victimId}-T{txId}) H{hopNum} or V{victimId}-T{txId} H{hopNum}

        // Remove parentheses if present
        const cleanThreadId = threadId.replace(/[()]/g, '').trim();
        const parts = cleanThreadId.split(/[\s-]+/);  // Split on spaces or dashes

        if (parts.length >= 2) {
            const vPart = parts[0]; // V1
            const tPart = parts[1]; // T1

            // Check if there's a hop number
            const hopPart = parts.find(p => p.startsWith('H'));

            if (hopPart) {
                // Thread from previous hop - could be in brown wallet
                const hopNum = parseInt(hopPart.substring(1));

                // Try to find matching node in that hop
                const searchPrefix = `H${hopNum}-`;
                for (let [id, node] of this.nodeMap) {
                    if (id.startsWith(searchPrefix)) {
                        // Check if this node has output threads matching our thread ID
                        if (node.outputThreads && node.outputThreads.some(t => t.notation === threadId)) {
                            return node;
                        }
                        // Or if the node notation matches
                        if (node.notation === threadId || node.label === threadId) {
                            return node;
                        }
                    }
                }
            } else {
                // Thread from victim
                const searchId = `${vPart}-${tPart}`;
                return this.nodeMap.get(searchId);
            }
        }

        return null;
    }

    shortenAddress(address) {
        if (!address) return '';
        if (address.length <= 20) return address;
        return address.substring(0, 10) + '...' + address.substring(address.length - 8);
    }

    generateWalletId(colorType, walletAddress = null) {
        // If we have a wallet address, check if we've already assigned an ID to it
        if (walletAddress && this.walletAddressMap) {
            const key = walletAddress + ':' + colorType;
            const existingId = this.walletAddressMap.get(key);
            if (existingId) {
                console.log(`♻️ Reusing wallet ID ${existingId} for ${colorType} wallet ${walletAddress.substring(0, 20)}...`);
                return existingId;
            }
        }

        // Increment counter for this color type
        this.walletCounters[colorType]++;
        const count = this.walletCounters[colorType];

        // Generate prefix based on color
        const prefixes = {
            red: 'R',
            black: 'B',
            purple: 'P',
            brown: 'Br',
            gray: 'G',
            blue: 'BL',
            orange: 'O',
            green: 'GR'
        };

        const walletId = `${prefixes[colorType] || 'U'}-${count}`;

        // Store mapping for reuse
        if (walletAddress && this.walletAddressMap) {
            const key = walletAddress + ':' + colorType;
            this.walletAddressMap.set(key, walletId);
            console.log(`🆕 Created new wallet ID ${walletId} for ${colorType} wallet ${walletAddress.substring(0, 20)}...`);
        }

        return walletId;
    }

    render() {
        if (this.layoutMode === 'sankey') {
            this.renderSankey();
        } else {
            this.renderHopColumns();
        }
    }

    renderHopColumns() {
        console.log(`Rendering hop-centric column layout (${this.orientation})...`);

        // Clear ALL content from mainGroup (important when switching from Sankey view)
        // Sankey removes subgroups, so we need to recreate them
        this.mainGroup.selectAll('*').remove();

        // Recreate the layer groups in the correct z-order
        this.backgroundGroup = this.mainGroup.append('g').attr('class', 'backgrounds');
        this.edgesGroup = this.mainGroup.append('g').attr('class', 'edges');
        this.nodesGroup = this.mainGroup.append('g').attr('class', 'nodes');
        this.labelsGroup = this.mainGroup.append('g').attr('class', 'labels');
        this.artGroup = this.mainGroup.append('g').attr('class', 'art-boxes');

        if (this.orientation === 'horizontal') {
            // Horizontal layout (left-to-right)
            this.hopColumns.forEach((column) => {
                const colIndex = column.columnIndex;
                column.x = this.config.margin.left +
                           colIndex * (this.config.walletColumnWidth + this.config.hopSpaceWidth) +
                           this.config.walletColumnWidth / 2;
            });

            this.hopColumns.forEach((column) => {
                const totalHeight = column.nodes.length * this.config.verticalSpacing;
                const startY = Math.max(200, (this.config.height - totalHeight) / 2);  // Ensure starts below header

                column.nodes.forEach((node, nodeIndex) => {
                    // Only recalculate position if not manually positioned
                    if (!node.manuallyPositioned) {
                        node.x = column.x;
                        node.y = startY + nodeIndex * this.config.verticalSpacing;
                    }
                });
            });

            const swapNodes = this.nodes.filter(n => n.isSwap);
            swapNodes.forEach((swapNode, index) => {
                const colIndex = Math.floor(swapNode.column);
                const leftColumn = this.hopColumns[colIndex];
                const rightColumn = this.hopColumns[colIndex + 1];

                if (leftColumn && rightColumn) {
                    swapNode.x = (leftColumn.x + this.config.walletColumnWidth / 2 +
                                 rightColumn.x - this.config.walletColumnWidth / 2) / 2;
                    swapNode.y = 400 + index * 120;
                }
            });
        } else {
            // Vertical layout (top-to-bottom)
            this.hopColumns.forEach((column) => {
                const colIndex = column.columnIndex;
                column.y = this.config.margin.top +
                           colIndex * (this.config.walletColumnWidth + this.config.hopSpaceWidth) +
                           this.config.walletColumnWidth / 2;
            });

            this.hopColumns.forEach((column) => {
                const totalWidth = column.nodes.length * this.config.verticalSpacing;
                const startX = (this.config.width - totalWidth) / 2;

                column.nodes.forEach((node, nodeIndex) => {
                    // Only recalculate position if not manually positioned
                    if (!node.manuallyPositioned) {
                        node.y = column.y;
                        node.x = startX + nodeIndex * this.config.verticalSpacing;
                    }
                });
            });

            const swapNodes = this.nodes.filter(n => n.isSwap);
            swapNodes.forEach((swapNode, index) => {
                const colIndex = Math.floor(swapNode.column);
                const topColumn = this.hopColumns[colIndex];
                const bottomColumn = this.hopColumns[colIndex + 1];

                if (topColumn && bottomColumn) {
                    swapNode.y = (topColumn.y + this.config.walletColumnWidth / 2 +
                                 bottomColumn.y - this.config.walletColumnWidth / 2) / 2;
                    swapNode.x = 400 + index * 120;
                }
            });
        }

        // Draw wallet column backgrounds
        this.drawWalletColumnBackgrounds();

        // Draw hop space labels
        this.drawHopSpaceLabels();

        // Draw edges
        this.drawEdges();

        // Draw nodes
        this.drawNodes();

        // Fit to view
        this.fitToView();
    }

    drawWalletColumnBackgrounds() {
        // Draw shaded background rectangles for each wallet column
        const columns = this.backgroundGroup.selectAll('.wallet-column-bg')
            .data(this.hopColumns);

        columns.enter()
            .append('rect')
            .attr('class', 'wallet-column-bg')
            .attr('x', d => d.x - this.config.walletColumnWidth / 2)
            .attr('y', 0)
            .attr('width', this.config.walletColumnWidth)
            .attr('height', this.config.height)  // Full viewport height
            .attr('fill', d => {
                // Darker shading for wallet columns - much more contrast
                if (d.columnIndex === 0) return '#2c3e50';  // Dark blue-gray for victims
                return '#34495e';  // Slightly lighter dark for other wallets
            })
            .attr('opacity', 0.12)  // Higher contrast
            .attr('rx', 8);

        // Add wallet column headers - styled like ART boxes (blue/gold)
        const headerGroup = columns.enter()
            .append('g')
            .attr('class', 'wallet-column-header');

        // Header background box (same style as hop ART boxes)
        headerGroup.append('rect')
            .attr('x', d => d.x - this.config.walletColumnWidth / 2 + 10)
            .attr('y', 20)
            .attr('width', this.config.walletColumnWidth - 20)
            .attr('height', 50)
            .attr('fill', '#2c3e50')
            .attr('stroke', '#3498db')
            .attr('stroke-width', 2)
            .attr('rx', 5);

        // Title text
        headerGroup.append('text')
            .attr('x', d => d.x)
            .attr('y', 50)
            .attr('text-anchor', 'middle')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .attr('fill', '#3498db')
            .text(d => d.title.toUpperCase());
    }

    drawHopSpaceLabels() {
        // Draw labels and reconciliation in the space BETWEEN wallet columns
        const hopSpaces = [];

        for (let i = 0; i < this.hopColumns.length - 1; i++) {
            const leftColumn = this.hopColumns[i];
            const rightColumn = this.hopColumns[i + 1];

            hopSpaces.push({
                hopNumber: rightColumn.hopNumber,
                x: (leftColumn.x + this.config.walletColumnWidth / 2 + rightColumn.x - this.config.walletColumnWidth / 2) / 2,
                leftX: leftColumn.x + this.config.walletColumnWidth / 2,
                rightX: rightColumn.x - this.config.walletColumnWidth / 2,
                width: rightColumn.x - this.config.walletColumnWidth / 2 - (leftColumn.x + this.config.walletColumnWidth / 2),
                hopData: this.investigation.hops.find(h => h.hopNumber === rightColumn.hopNumber),
                artBefore: rightColumn.artBefore,
                artAfter: rightColumn.artAfter
            });
        }

        // Draw hop column backgrounds (lighter shade for contrast)
        const hopBgs = this.backgroundGroup.selectAll('.hop-column-bg')
            .data(hopSpaces);

        hopBgs.enter()
            .append('rect')
            .attr('class', 'hop-column-bg')
            .attr('x', d => d.leftX)
            .attr('y', 0)
            .attr('width', d => d.width)
            .attr('height', this.config.height)  // Full viewport height
            .attr('fill', '#FFD700')  // Light gold for hop columns
            .attr('opacity', 0.06)  // Very subtle
            .attr('rx', 8);

        // Draw hop headers with ART
        this.drawHopHeaders(hopSpaces);

        // Draw hop reconciliation boxes
        this.drawHopReconciliation(hopSpaces);

        // Draw ART boxes at bottom of hop creation columns (moved from wallet columns)
        this.drawHopCreationARTBoxes(hopSpaces);

        // Draw subtle vertical guides at hop space boundaries
        const guides = this.backgroundGroup.selectAll('.hop-guide')
            .data(hopSpaces);

        guides.enter()
            .append('line')
            .attr('class', 'hop-guide')
            .attr('x1', d => d.leftX)
            .attr('y1', 0)
            .attr('x2', d => d.leftX)
            .attr('y2', this.config.height)
            .attr('stroke', '#ddd')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '10,5')
            .attr('opacity', 0.4);
    }

    drawHopHeaders(hopSpaces) {
        // Draw ART header at top of each hop creation column
        const headers = this.backgroundGroup.selectAll('.hop-header')
            .data(hopSpaces);

        const headerGroup = headers.enter()
            .append('g')
            .attr('class', 'hop-header');

        // Header background box (taller to fit hop creation label)
        headerGroup.append('rect')
            .attr('x', d => d.leftX + 10)
            .attr('y', 20)
            .attr('width', d => d.width - 20)
            .attr('height', 70)
            .attr('fill', '#2c3e50')
            .attr('stroke', '#f39c12')
            .attr('stroke-width', 2)
            .attr('rx', 5);

        // Hop Construction Title (top)
        headerGroup.append('text')
            .attr('x', d => d.x)
            .attr('y', 38)
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .attr('fill', '#f39c12')
            .text(d => `→ HOP ${d.hopNumber} CONSTRUCTION →`);

        // ART Label (middle)
        headerGroup.append('text')
            .attr('x', d => d.x)
            .attr('y', 55)
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('font-weight', 'bold')
            .attr('fill', '#95a5a6')
            .text('ART (Adjusted Root Total)');

        // ART Values (bottom)
        headerGroup.append('text')
            .attr('x', d => d.x)
            .attr('y', 75)
            .attr('text-anchor', 'middle')
            .attr('font-size', '13px')
            .attr('font-weight', 'bold')
            .attr('fill', '#ffffff')
            .text(d => {
                // Format ART values
                const artEntries = Object.entries(d.artBefore || {});
                if (artEntries.length === 0) return 'No ART';
                return artEntries.map(([currency, amount]) =>
                    `${amount.toFixed(2)} ${currency}`
                ).join(' + ');
            });
    }

    drawHopReconciliation(hopSpaces) {
        // Draw T-account reconciliation at bottom of each hop column
        const recon = this.backgroundGroup.selectAll('.hop-reconciliation')
            .data(hopSpaces);

        const reconGroup = recon.enter()
            .append('g')
            .attr('class', 'hop-reconciliation');

        // Calculate reconciliation data for each hop
        hopSpaces.forEach(hopSpace => {
            if (!hopSpace.hopData) return;

            const hop = hopSpace.hopData;
            const pairedRows = [];  // Rows with both left and right entries (conversions)
            const leftOnlyRows = [];  // Rows with only left entries (terminals, write-offs)
            const rightOnlyRows = [];  // Rows with only right entries (continuing traces)

            // Totals by currency
            const leftTotals = {};  // Terminated/consumed
            const rightTotals = {};  // Continuing/created

            // Process entries to categorize
            hop.entries.forEach(entry => {
                const currency = entry.currency === 'CUSTOM' ? entry.customCurrency : entry.currency;
                const amount = parseFloat(entry.amount) || 0;

                if (entry.entryType === 'writeoff') {
                    // Write-off: left side only
                    leftOnlyRows.push({
                        left: {
                            type: 'write-off',
                            amount: amount,
                            currency: currency,
                            label: `Write-off: ${entry.reason || 'Unknown'}`
                        },
                        right: null
                    });
                    leftTotals[currency] = (leftTotals[currency] || 0) + amount;

                } else if (entry.isBridge || entry.entryType === 'swap' || (entry.swapDetails && entry.swapDetails.outputCurrency)) {
                    // Conversion/Bridge: paired row (left = input consumed, right = output created)
                    const inputAmount = parseFloat(entry.amount || entry.swapDetails?.inputAmount || 0);
                    const inputCurrency = currency;
                    const outputAmount = parseFloat(entry.bridgeDetails?.destinationAmount || entry.swapDetails?.outputAmount || 0);
                    const outputCurrency = entry.bridgeDetails?.destinationAsset || entry.swapDetails?.outputCurrency || inputCurrency;

                    pairedRows.push({
                        left: {
                            type: 'conversion-in',
                            amount: inputAmount,
                            currency: inputCurrency,
                            label: `${entry.notation || ''}`
                        },
                        right: {
                            type: 'conversion-out',
                            amount: outputAmount,
                            currency: outputCurrency,
                            label: `${entry.notation || ''}`
                        }
                    });

                    leftTotals[inputCurrency] = (leftTotals[inputCurrency] || 0) + inputAmount;
                    rightTotals[outputCurrency] = (rightTotals[outputCurrency] || 0) + outputAmount;

                } else if (entry.isTerminal || entry.walletType === 'purple' || entry.toWalletType === 'purple') {
                    // Terminal wallet: left side only
                    leftOnlyRows.push({
                        left: {
                            type: 'terminal',
                            amount: amount,
                            currency: currency,
                            label: `${entry.notation || 'Terminal'}`
                        },
                        right: null
                    });
                    leftTotals[currency] = (leftTotals[currency] || 0) + amount;

                } else {
                    // Continuing trace: right side only
                    rightOnlyRows.push({
                        left: null,
                        right: {
                            type: 'trace',
                            amount: amount,
                            currency: currency,
                            label: entry.notation || `To H${hop.hopNumber + 1}`
                        }
                    });
                    rightTotals[currency] = (rightTotals[currency] || 0) + amount;
                }
            });

            // Combine all rows: paired first, then left-only, then right-only
            hopSpace.reconRows = [...pairedRows, ...leftOnlyRows, ...rightOnlyRows];
            hopSpace.leftTotals = leftTotals;
            hopSpace.rightTotals = rightTotals;
        });

        // Calculate dynamic height based on rows + totals + verification
        const lineHeight = 16;
        const headerHeight = 60;
        const totalsSectionHeight = 40;  // Space for totals at bottom
        const verificationHeight = 50;   // Space for verification section
        const bottomPadding = 10;

        const maxRows = d3.max(hopSpaces, d => (d.reconRows || []).length);
        const maxTotalLines = d3.max(hopSpaces, d => {
            const leftCurrencies = Object.keys(d.leftTotals || {}).length;
            const rightCurrencies = Object.keys(d.rightTotals || {}).length;
            return Math.max(leftCurrencies, rightCurrencies);
        });
        const maxVerificationLines = d3.max(hopSpaces, d => Object.keys(d.artBefore || {}).length);

        const boxHeight = headerHeight + (maxRows * lineHeight) + totalsSectionHeight + (maxTotalLines * 14) + verificationHeight + (maxVerificationLines * 14) + bottomPadding;

        // Store box height for drag boundary calculations
        this.reconBoxHeight = boxHeight;

        // Position reconciliation box near bottom of viewport (dynamic based on calculated height)
        const reconY = this.config.height - boxHeight - 50;

        // Main reconciliation box (dynamic height)
        reconGroup.append('rect')
            .attr('x', d => d.leftX + 10)
            .attr('y', reconY)
            .attr('width', d => d.width - 20)
            .attr('height', boxHeight)
            .attr('fill', '#ecf0f1')
            .attr('stroke', '#2c3e50')
            .attr('stroke-width', 2)
            .attr('rx', 5);

        // Title
        reconGroup.append('text')
            .attr('x', d => d.x)
            .attr('y', reconY + 18)
            .attr('text-anchor', 'middle')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .attr('fill', '#2c3e50')
            .text('HOP RECONCILIATION');

        // Divider line (vertical center) - use dynamic height
        reconGroup.append('line')
            .attr('x1', d => d.x)
            .attr('y1', reconY + 25)
            .attr('x2', d => d.x)
            .attr('y2', reconY + boxHeight - 5)
            .attr('stroke', '#34495e')
            .attr('stroke-width', 2);

        // Left header (TERMINATED)
        reconGroup.append('text')
            .attr('x', d => d.leftX + (d.width / 4))
            .attr('y', reconY + 40)
            .attr('text-anchor', 'middle')
            .attr('font-size', '11px')
            .attr('font-weight', 'bold')
            .attr('fill', '#e74c3c')
            .text('TERMINATED');

        // Right header (CONTINUING)
        reconGroup.append('text')
            .attr('x', d => d.x + (d.width / 4))
            .attr('y', reconY + 40)
            .attr('text-anchor', 'middle')
            .attr('font-size', '11px')
            .attr('font-weight', 'bold')
            .attr('fill', '#27ae60')
            .text('CONTINUING');

        // Currency color mapping for visual distinction
        const getCurrencyColor = (currency) => {
            const colors = {
                'HYPE': '#e74c3c',     // Red
                'USDC': '#3498db',     // Blue
                'ETH': '#9b59b6',      // Purple
                'BTC': '#f39c12',      // Orange
                'USDT': '#16a085',     // Teal
                'BNB': '#f1c40f',      // Yellow
                'MATIC': '#8e44ad',    // Dark Purple
                'SOL': '#1abc9c',      // Turquoise
                'AVAX': '#e67e22',     // Carrot
                'ARB': '#2980b9',      // Belize Blue
                'OP': '#c0392b',       // Pomegranate
                'TRX': '#d35400'       // Pumpkin
            };
            return colors[currency] || '#34495e';  // Default dark gray
        };

        // Render rows (paired left-right entries)
        reconGroup.each(function(d, i) {
            const group = d3.select(this);
            const rows = d.reconRows || [];
            const startY = reconY + 55;

            rows.forEach((row, idx) => {
                const yPos = startY + idx * lineHeight;

                // LEFT side (terminated/consumed)
                if (row.left) {
                    const icon = row.left.type === 'terminal' ? '⬤' :
                               row.left.type === 'conversion-in' ? '🔄' :
                               row.left.type === 'write-off' ? '✕' : '−';
                    const iconColor = row.left.type === 'terminal' ? '#9b59b6' :
                                    row.left.type === 'conversion-in' ? '#8B4513' : '#e74c3c';
                    const currencyColor = getCurrencyColor(row.left.currency);

                    group.append('text')
                        .attr('x', d.leftX + 15)
                        .attr('y', yPos)
                        .attr('font-size', '10px')
                        .attr('fill', iconColor)
                        .text(icon);

                    group.append('text')
                        .attr('x', d.leftX + 30)
                        .attr('y', yPos)
                        .attr('font-size', '9px')
                        .attr('font-weight', 'bold')
                        .attr('fill', currencyColor)
                        .text(`− ${row.left.amount.toFixed(2)} ${row.left.currency}`);
                }

                // RIGHT side (continuing/created)
                if (row.right) {
                    const icon = row.right.type === 'trace' ? '→' :
                               row.right.type === 'conversion-out' ? '🔄' : '+';
                    const iconColor = row.right.type === 'trace' ? '#27ae60' : '#8B4513';
                    const currencyColor = getCurrencyColor(row.right.currency);

                    group.append('text')
                        .attr('x', d.x + 15)
                        .attr('y', yPos)
                        .attr('font-size', '10px')
                        .attr('fill', iconColor)
                        .text(icon);

                    group.append('text')
                        .attr('x', d.x + 30)
                        .attr('y', yPos)
                        .attr('font-size', '9px')
                        .attr('font-weight', 'bold')
                        .attr('fill', currencyColor)
                        .text(`+ ${row.right.amount.toFixed(2)} ${row.right.currency}`);
                }
            });

            // Divider line before totals
            const totalsStartY = startY + (rows.length * lineHeight) + 10;
            group.append('line')
                .attr('x1', d.leftX + 15)
                .attr('y1', totalsStartY - 5)
                .attr('x2', d.x - 15)
                .attr('y2', totalsStartY - 5)
                .attr('stroke', '#34495e')
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', '3,3');

            group.append('line')
                .attr('x1', d.x + 15)
                .attr('y1', totalsStartY - 5)
                .attr('x2', d.leftX + d.width - 15)
                .attr('y2', totalsStartY - 5)
                .attr('stroke', '#34495e')
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', '3,3');

            // LEFT totals (terminated/consumed)
            let leftIdx = 0;
            for (const [currency, total] of Object.entries(d.leftTotals || {})) {
                const currencyColor = getCurrencyColor(currency);
                group.append('text')
                    .attr('x', d.leftX + 30)
                    .attr('y', totalsStartY + (leftIdx * 14))
                    .attr('font-size', '11px')
                    .attr('font-weight', 'bold')
                    .attr('fill', currencyColor)
                    .text(`− ${total.toFixed(2)} ${currency}`);
                leftIdx++;
            }

            // RIGHT totals (continuing/created)
            let rightIdx = 0;
            for (const [currency, total] of Object.entries(d.rightTotals || {})) {
                const currencyColor = getCurrencyColor(currency);
                group.append('text')
                    .attr('x', d.x + 30)
                    .attr('y', totalsStartY + (rightIdx * 14))
                    .attr('font-size', '11px')
                    .attr('font-weight', 'bold')
                    .attr('fill', currencyColor)
                    .text(`+ ${total.toFixed(2)} ${currency}`);
                rightIdx++;
            }

            // Verification check: ART IN = LEFT + RIGHT totals for each currency
            const verifyY = totalsStartY + (Math.max(leftIdx, rightIdx) * 14) + 20;

            group.append('text')
                .attr('x', d.x)
                .attr('y', verifyY)
                .attr('text-anchor', 'middle')
                .attr('font-size', '10px')
                .attr('font-weight', 'bold')
                .attr('fill', '#7f8c8d')
                .text('VERIFICATION');

            // Check each currency from ART
            let verifyIdx = 0;
            const artBefore = d.artBefore || {};

            for (const [currency, artAmount] of Object.entries(artBefore)) {
                const leftTotal = d.leftTotals[currency] || 0;
                const rightTotal = d.rightTotals[currency] || 0;
                const totalAccounted = leftTotal + rightTotal;
                const isBalanced = Math.abs(artAmount - totalAccounted) < 0.01;
                const currencyColor = getCurrencyColor(currency);

                group.append('text')
                    .attr('x', d.x)
                    .attr('y', verifyY + 15 + (verifyIdx * 14))
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '9px')
                    .attr('font-weight', 'bold')
                    .attr('fill', isBalanced ? '#27ae60' : '#e74c3c')
                    .text(`${isBalanced ? '✓' : '✗'} ${currency}: ${artAmount.toFixed(2)} ${isBalanced ? '=' : '≠'} ${totalAccounted.toFixed(2)}`);

                verifyIdx++;
            }
        });
    }

    drawHopCreationARTBoxes(hopSpaces) {
        // Draw NEW ART boxes below T-account in hop creation columns
        // These show the ART AFTER the hop completes
        const artBoxes = this.backgroundGroup.selectAll('.hop-creation-art-box')
            .data(hopSpaces);

        const artGroup = artBoxes.enter()
            .append('g')
            .attr('class', 'hop-creation-art-box');

        // Position below T-account reconciliation box
        const boxY = this.config.height - this.reconBoxHeight - 130;

        // Header background box (same style as other headers)
        artGroup.append('rect')
            .attr('x', d => d.leftX + 10)
            .attr('y', boxY)
            .attr('width', d => d.width - 20)
            .attr('height', 60)
            .attr('fill', '#2c3e50')
            .attr('stroke', '#f39c12')
            .attr('stroke-width', 2)
            .attr('rx', 5);

        // Label
        artGroup.append('text')
            .attr('x', d => d.x)
            .attr('y', boxY + 20)
            .attr('text-anchor', 'middle')
            .attr('font-size', '11px')
            .attr('font-weight', 'bold')
            .attr('fill', '#f39c12')
            .text('NEW ART (After Hop)');

        // ART Values
        artGroup.append('text')
            .attr('x', d => d.x)
            .attr('y', boxY + 45)
            .attr('text-anchor', 'middle')
            .attr('font-size', '13px')
            .attr('font-weight', 'bold')
            .attr('fill', '#ffffff')
            .text(d => {
                const currencies = Object.keys(d.artAfter);
                if (currencies.length === 0) return '0';
                return currencies.map(curr => `${d.artAfter[curr].toFixed(2)} ${curr}`).join(' + ');
            });
    }

    drawEdges() {
        const edgeData = this.edges.map(e => ({
            ...e,
            source: this.nodeMap.get(e.source),
            target: this.nodeMap.get(e.target)
        })).filter(e => e.source && e.target);

        // Group edges by source-target pair
        const edgeGroups = new Map();
        edgeData.forEach(edge => {
            const key = `${edge.source.id}->${edge.target.id}`;
            if (!edgeGroups.has(key)) {
                edgeGroups.set(key, []);
            }
            edgeGroups.get(key).push(edge);
        });

        // Process edge groups to determine if they should be collapsed
        const processedEdges = [];
        edgeGroups.forEach((edges, key) => {
            if (edges.length === 1) {
                // Single edge - render normally
                processedEdges.push({
                    ...edges[0],
                    isGroup: false,
                    threadCount: 1
                });
            } else {
                // Multiple edges - check if should be collapsed
                const groupKey = key;
                // Auto-collapse if >5 threads, unless user explicitly expanded
                // For <5 threads, collapse only if user explicitly collapsed
                const isExpanded = this.expandedEdgeGroups?.has(groupKey);
                const isManuallyCollapsed = this.collapsedEdgeGroups?.has(groupKey);

                let isCollapsed;
                if (edges.length > 5) {
                    // >5 threads: collapsed by default, unless user expanded
                    isCollapsed = !isExpanded;
                } else {
                    // <=5 threads: expanded by default, unless user collapsed
                    isCollapsed = isManuallyCollapsed;
                }

                if (isCollapsed) {
                    // Collapsed group - show as single thick edge
                    const totalAmount = edges.reduce((sum, e) => sum + e.amount, 0);
                    processedEdges.push({
                        ...edges[0], // Use first edge as template
                        isGroup: true,
                        isCollapsed: true,
                        threadCount: edges.length,
                        groupKey: groupKey,
                        threads: edges,
                        amount: totalAmount,
                        label: `${edges.length} threads`
                    });
                } else {
                    // Expanded group - show spaced individual edges
                    edges.forEach((edge, index) => {
                        processedEdges.push({
                            ...edge,
                            isGroup: true,
                            isCollapsed: false,
                            threadCount: edges.length,
                            threadIndex: index,
                            groupKey: groupKey,
                            threads: edges
                        });
                    });
                }
            }
        });

        const edges = this.edgesGroup.selectAll('.edge')
            .data(processedEdges, d => d.isGroup ? `${d.groupKey}-${d.isCollapsed}` : `${d.source.id}-${d.target.id}-${d.label}`);

        edges.exit().remove();

        const edgeEnter = edges.enter()
            .append('g')
            .attr('class', 'edge')
            .style('cursor', 'pointer')
            .on('click', (event, d) => {
                // Only trigger group expand/collapse or details if not dragging
                if (!d.wasDragging) {
                    if (d.isGroup && d.threadCount > 1) {
                        this.toggleEdgeGroup(d);
                    } else {
                        this.showEdgeDetails(event, d);
                    }
                }
                d.wasDragging = false;
            })
            .on('contextmenu', (event, d) => {
                event.preventDefault();
                this.showAddNoteModal(event, d, 'edge');
            })
            .on('mouseover', (event, d) => {
                if (d.note) {
                    this.showNoteTooltip(event, d.note);
                } else if (d.isGroup && d.threadCount > 1) {
                    this.showNoteTooltip(event, `${d.threadCount} threads - Click to ${d.isCollapsed ? 'expand' : 'collapse'}`);
                }
            })
            .on('mouseout', () => {
                this.hideNoteTooltip();
            });

        // Draw invisible wide path for easier dragging (only when adjust mode is on)
        edgeEnter.append('path')
            .attr('class', 'edge-drag-target')
            .attr('d', d => {
                let x1 = d.source.x + this.config.nodeRadius;
                let y1 = d.source.y;
                let x2 = d.target.x - this.config.nodeRadius;
                let y2 = d.target.y;

                // Apply offset for expanded multi-thread edges
                if (d.isGroup && !d.isCollapsed && d.threadCount > 1) {
                    const spacing = 15;
                    const totalHeight = (d.threadCount - 1) * spacing;
                    const offset = -totalHeight / 2 + d.threadIndex * spacing;
                    y1 += offset;
                    y2 += offset;
                }

                // Use custom control point if it exists
                if (d.controlPoint) {
                    return this.buildCustomCurvePath(x1, y1, x2, y2, d.controlPoint);
                }

                const mx = (x1 + x2) / 2;
                return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
            })
            .attr('fill', 'none')
            .attr('stroke', 'transparent')
            .attr('stroke-width', 20)
            .style('cursor', 'pointer')
            .style('pointer-events', 'all');

        // Draw visible curved path
        edgeEnter.append('path')
            .attr('class', 'edge-visible-path')
            .attr('d', d => {
                // Calculate proper node edge points
                const dx = d.target.x - d.source.x;
                const dy = d.target.y - d.source.y;
                const angle = Math.atan2(dy, dx);

                // Start point: edge of source node
                let x1 = d.source.x + Math.cos(angle) * this.config.nodeRadius;
                let y1 = d.source.y + Math.sin(angle) * this.config.nodeRadius;

                // End point: just to edge of target node (arrow will extend from here)
                let x2 = d.target.x - Math.cos(angle) * this.config.nodeRadius;
                let y2 = d.target.y - Math.sin(angle) * this.config.nodeRadius;

                // Apply offset for expanded multi-thread edges
                if (d.isGroup && !d.isCollapsed && d.threadCount > 1) {
                    const spacing = 15;
                    const totalHeight = (d.threadCount - 1) * spacing;
                    const offset = -totalHeight / 2 + d.threadIndex * spacing;

                    // Apply offset perpendicular to edge direction
                    const perpAngle = angle + Math.PI / 2;
                    x1 += Math.cos(perpAngle) * offset;
                    y1 += Math.sin(perpAngle) * offset;
                    x2 += Math.cos(perpAngle) * offset;
                    y2 += Math.sin(perpAngle) * offset;
                }

                // Use custom control point if it exists
                if (d.controlPoint) {
                    return this.buildCustomCurvePath(x1, y1, x2, y2, d.controlPoint);
                }

                // Create smooth bezier curve
                const mx = (x1 + x2) / 2;
                return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
            })
            .attr('fill', 'none')
            .attr('stroke', d => d.isCollapsed ? '#34495e' : '#95a5a6')
            .attr('stroke-width', d => d.isCollapsed ? Math.min(10, 3 + d.threadCount * 0.5) : 2)
            .attr('marker-end', d => d.isCollapsed ? 'url(#arrowhead-thick)' : 'url(#arrowhead)')
            .attr('opacity', d => d.isCollapsed ? 0.9 : 1)
            .style('pointer-events', 'none');

        // Add arrow marker definitions (only once)
        if (!this.svg.select('defs').node()) {
            const defs = this.svg.append('defs');

            // Standard arrowhead (for single edges and expanded groups)
            defs.append('marker')
                .attr('id', 'arrowhead')
                .attr('markerWidth', 8)
                .attr('markerHeight', 8)
                .attr('refX', 8)
                .attr('refY', 4)
                .attr('orient', 'auto')
                .append('polygon')
                .attr('points', '0 0, 8 4, 0 8')
                .attr('fill', '#95a5a6');

            // Thicker arrowhead for collapsed groups
            defs.append('marker')
                .attr('id', 'arrowhead-thick')
                .attr('markerWidth', 10)
                .attr('markerHeight', 10)
                .attr('refX', 10)
                .attr('refY', 5)
                .attr('orient', 'auto')
                .append('polygon')
                .attr('points', '0 0, 10 5, 0 10')
                .attr('fill', '#34495e');
        }

        // Add edge label with notation (or thread count for collapsed) - with text shadow for readability
        edgeEnter.append('text')
            .attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', d => {
                const baseY = (d.source.y + d.target.y) / 2 - 20;
                if (d.isGroup && !d.isCollapsed && d.threadCount > 1) {
                    const spacing = 15;
                    const totalHeight = (d.threadCount - 1) * spacing;
                    const offset = -totalHeight / 2 + d.threadIndex * spacing;
                    return baseY + offset;
                }
                return baseY;
            })
            .attr('text-anchor', 'middle')
            .attr('font-size', '11px')
            .attr('fill', '#2c3e50')
            .attr('font-weight', 'bold')
            .style('pointer-events', 'none')
            .style('paint-order', 'stroke')
            .style('stroke', 'white')
            .style('stroke-width', '3px')
            .style('stroke-linecap', 'round')
            .style('stroke-linejoin', 'round')
            .text(d => d.isCollapsed ? `${d.threadCount} threads` : d.label);

        // Add edge amount + currency label - with text shadow for readability
        edgeEnter.append('text')
            .attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', d => {
                const baseY = (d.source.y + d.target.y) / 2 - 5;
                if (d.isGroup && !d.isCollapsed && d.threadCount > 1) {
                    const spacing = 15;
                    const totalHeight = (d.threadCount - 1) * spacing;
                    const offset = -totalHeight / 2 + d.threadIndex * spacing;
                    return baseY + offset;
                }
                return baseY;
            })
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('fill', '#27ae60')
            .attr('font-weight', '600')
            .style('pointer-events', 'none')
            .style('paint-order', 'stroke')
            .style('stroke', 'white')
            .style('stroke-width', '3px')
            .style('stroke-linecap', 'round')
            .style('stroke-linejoin', 'round')
            .text(d => `${d.amount.toFixed(2)} ${d.currency}`);

        // Add note indicator for edges
        edgeEnter.append('text')
            .attr('x', d => (d.source.x + d.target.x) / 2 + 35)
            .attr('y', d => (d.source.y + d.target.y) / 2 - 15)
            .attr('text-anchor', 'middle')
            .attr('font-size', '14px')
            .style('pointer-events', 'none')
            .text(d => d.note ? '📝' : '');
    }

    drawNodes() {
        const nodes = this.nodesGroup.selectAll('.node')
            .data(this.nodes);

        const nodeEnter = nodes.enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x}, ${d.y})`)
            .style('cursor', 'pointer')
            .on('click', (event, d) => {
                // Don't interfere with dragging or zooming
                if (event.defaultPrevented) return;
                this.showNodeDetails(event, d);
            })
            .on('contextmenu', (event, d) => {
                event.preventDefault();
                this.showAddNoteModal(event, d, 'node');
            })
            .on('mouseover', (event, d) => {
                if (d.note) {
                    this.showNoteTooltip(event, d.note);
                }
            })
            .on('mouseout', () => {
                this.hideNoteTooltip();
            });

        // Node circle
        nodeEnter.append('circle')
            .attr('r', this.config.nodeRadius)
            .attr('fill', d => this.config.colors[d.type] || this.config.colors.black)
            .attr('stroke', '#fff')
            .attr('stroke-width', 3)
            .on('mouseover', function() {
                d3.select(this).attr('stroke-width', 5);
            })
            .on('mouseout', function() {
                d3.select(this).attr('stroke-width', 3);
            });

        // Wallet ID (B-1, P-2, etc) - INSIDE the circle in white
        nodeEnter.append('text')
            .attr('y', 5)  // Center vertically in circle
            .attr('text-anchor', 'middle')
            .attr('font-size', '16px')
            .attr('font-weight', 'bold')
            .attr('fill', '#ffffff')  // White text
            .style('pointer-events', 'none')
            .text(d => d.walletId);

        // Node label (V-T-H notation or thread count for red wallets)
        nodeEnter.append('text')
            .attr('y', -this.config.nodeRadius - 12)
            .attr('text-anchor', 'middle')
            .attr('font-size', '11px')
            .attr('font-weight', '600')
            .attr('fill', '#2c3e50')
            .text(d => {
                // For red wallets with multiple threads, show thread count
                if (d.type === 'red' && d.threads && d.threads.length > 0) {
                    return `${d.threads.length} thread${d.threads.length > 1 ? 's' : ''}`;
                }
                return d.label || '';
            });

        // Note indicator (small icon if note exists)
        nodeEnter.append('text')
            .attr('x', this.config.nodeRadius - 8)
            .attr('y', -this.config.nodeRadius + 5)
            .attr('text-anchor', 'middle')
            .attr('font-size', '16px')
            .style('pointer-events', 'none')
            .text(d => d.note ? '📝' : '');

        // Wallet address
        nodeEnter.append('text')
            .attr('y', this.config.nodeRadius + 22)
            .attr('text-anchor', 'middle')
            .attr('font-size', '9px')
            .attr('fill', '#7f8c8d')
            .text(d => d.walletLabel);

        // Amount - show totals for red wallets with multiple currencies
        nodeEnter.append('text')
            .attr('y', this.config.nodeRadius + 38)
            .attr('text-anchor', 'middle')
            .attr('font-size', '11px')
            .attr('font-weight', 'bold')
            .attr('fill', '#27ae60')
            .text(d => {
                // For red wallets with multiple threads/currencies, show all
                if (d.type === 'red' && d.currencies) {
                    const currencyEntries = Object.entries(d.currencies);
                    if (currencyEntries.length === 1) {
                        const [currency, amount] = currencyEntries[0];
                        return `${amount.toFixed(2)} ${currency}`;
                    } else if (currencyEntries.length > 1) {
                        return currencyEntries.map(([currency, amount]) =>
                            `${amount.toFixed(2)} ${currency}`
                        ).join(', ');
                    }
                }
                // Default for other wallet types
                return `${(d.amount || 0).toFixed(2)} ${d.currency || ''}`;
            });
    }

    dragging(event, d) {
        // Strictly constrain movement to vertical only within column
        const newY = event.y;

        // Calculate dynamic top boundary based on column header position
        // Column headers are at y=150 with height=60, so min should be 150 + 60 + nodeRadius
        const columnHeaderBottom = 150 + 60;  // Column header y + height
        const minY = columnHeaderBottom + this.config.nodeRadius + 10;  // Add padding below header

        // Calculate dynamic bottom boundary based on reconciliation box height
        const reconBoxHeight = this.reconBoxHeight || 200;  // Use stored height or default
        const maxY = this.config.height - reconBoxHeight - 70;  // Bottom boundary (above reconciliation boxes)

        // IMPORTANT: X position is LOCKED - never changes
        // Only Y can change, and only within bounds
        d.y = Math.max(minY, Math.min(maxY, newY));

        // Update all node positions (D3 will only update the dragged node's transform)
        this.nodesGroup.selectAll('.node')
            .filter(node => node.id === d.id)
            .attr('transform', `translate(${d.x}, ${d.y})`);

        // Update all connected edges
        this.updateEdges();
    }

    dragEdge(event, d) {
        // Simplified edge dragging - single midpoint control with constraints
        const [mouseX, mouseY] = d3.pointer(event, this.svg.node());

        const x1 = d.source.x + this.config.nodeRadius;
        const y1 = d.source.y;
        const x2 = d.target.x - this.config.nodeRadius;
        const y2 = d.target.y;

        // Calculate natural midpoint
        const naturalMidX = (x1 + x2) / 2;
        const naturalMidY = (y1 + y2) / 2;

        // Constrain how far the control point can move from natural position
        // Allow vertical movement up to 200px, horizontal up to 100px
        const maxVerticalOffset = 200;
        const maxHorizontalOffset = 100;

        const offsetX = Math.max(-maxHorizontalOffset, Math.min(maxHorizontalOffset, mouseX - naturalMidX));
        const offsetY = Math.max(-maxVerticalOffset, Math.min(maxVerticalOffset, mouseY - naturalMidY));

        // Store the single control point
        d.controlPoint = {
            x: naturalMidX + offsetX,
            y: naturalMidY + offsetY
        };

        // Update edge paths
        this.updateEdgePaths(d);
    }

    buildCustomCurvePath(x1, y1, x2, y2, controlPoint) {
        // Build curve with single control point (quadratic bezier)
        if (!controlPoint) {
            // Default simple curve
            const mx = (x1 + x2) / 2;
            return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
        }

        // Quadratic bezier through single control point
        return `M ${x1} ${y1} Q ${controlPoint.x} ${controlPoint.y}, ${x2} ${y2}`;
    }

    updateEdgePaths(edgeData) {
        // Update specific edge's path
        const self = this;
        this.edgesGroup.selectAll('.edge').each(function(d) {
            if (d === edgeData) {
                const edgeGroup = d3.select(this);

                let x1 = d.source.x + 40;
                let y1 = d.source.y;
                let x2 = d.target.x - 40;
                let y2 = d.target.y;

                // Apply offset for expanded multi-thread edges
                if (d.isGroup && !d.isCollapsed && d.threadCount > 1) {
                    const spacing = 15;
                    const totalHeight = (d.threadCount - 1) * spacing;
                    const offset = -totalHeight / 2 + d.threadIndex * spacing;
                    y1 += offset;
                    y2 += offset;
                }

                const newPath = edgeData.controlPoint
                    ? self.buildCustomCurvePath(x1, y1, x2, y2, edgeData.controlPoint)
                    : `M ${x1} ${y1} C ${(x1+x2)/2} ${y1}, ${(x1+x2)/2} ${y2}, ${x2} ${y2}`;

                edgeGroup.select('.edge-drag-target').attr('d', newPath);
                edgeGroup.select('.edge-visible-path').attr('d', newPath);
            }
        });
    }

    toggleEdgeGroup(edgeGroup) {
        const groupKey = edgeGroup.groupKey;

        if (edgeGroup.isCollapsed) {
            // Expanding - show modal with thread details
            this.showEdgeGroupModal(edgeGroup);
        } else {
            // Collapsing
            if (edgeGroup.threadCount > 5) {
                // For >5 threads: remove from expanded set (will auto-collapse)
                this.expandedEdgeGroups.delete(groupKey);
            } else {
                // For <=5 threads: add to collapsed set
                this.collapsedEdgeGroups.add(groupKey);
            }
            // Redraw edges to reflect the change
            this.edgesGroup.selectAll('.edge').remove();
            this.drawEdges();
        }
    }

    showEdgeGroupModal(edgeGroup) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            border: 3px solid #3498db;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 600px;
            max-height: 70vh;
            overflow-y: auto;
        `;

        const threadsList = edgeGroup.threads.map((thread, idx) => `
            <div style="background: ${idx % 2 === 0 ? '#ecf0f1' : 'white'}; padding: 10px; border-radius: 6px; margin: 5px 0;">
                <div style="font-weight: bold; color: #2c3e50;">${idx + 1}. ${thread.label || thread.notation || 'Thread'}</div>
                <div style="color: #27ae60; font-weight: 600; margin-top: 5px;">
                    ${thread.amount.toFixed(2)} ${thread.currency}
                </div>
            </div>
        `).join('');

        modal.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #3498db; margin: 0;">🔗 Edge Group</h2>
                <p style="color: #7f8c8d; margin: 10px 0;">
                    ${edgeGroup.threadCount} threads between wallets
                </p>
            </div>

            <div style="margin: 20px 0;">
                <div style="background: #3498db; color: white; padding: 10px; border-radius: 6px; margin-bottom: 10px;">
                    <strong>Total Amount:</strong> ${edgeGroup.amount.toFixed(2)} ${edgeGroup.currency}
                </div>

                <h3 style="color: #2c3e50; margin: 15px 0 10px 0;">Individual Threads:</h3>
                <div style="max-height: 300px; overflow-y: auto;">
                    ${threadsList}
                </div>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button onclick="this.getRootNode().host.remove()" style="flex: 1; padding: 12px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    Keep Collapsed
                </button>
                <button id="expandEdgeGroupBtn" style="flex: 1; padding: 12px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    Expand Group
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        // Add expand button handler
        document.getElementById('expandEdgeGroupBtn').onclick = () => {
            if (edgeGroup.threadCount > 5) {
                // For >5 threads: add to expanded set
                this.expandedEdgeGroups.add(edgeGroup.groupKey);
            } else {
                // For <=5 threads: remove from collapsed set
                this.collapsedEdgeGroups.delete(edgeGroup.groupKey);
            }
            this.edgesGroup.selectAll('.edge').remove();
            this.drawEdges();
            modal.remove();
        };

        // Close on backdrop click
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }

    updateEdges() {
        // Update edge paths to follow node positions
        const self = this;
        this.edgesGroup.selectAll('.edge').each(function(d) {
            const edgeGroup = d3.select(this);

            let x1 = d.source.x + 40;
            let y1 = d.source.y;
            let x2 = d.target.x - 40;
            let y2 = d.target.y;

            // Apply offset for expanded multi-thread edges
            if (d.isGroup && !d.isCollapsed && d.threadCount > 1) {
                const spacing = 15;
                const totalHeight = (d.threadCount - 1) * spacing;
                const offset = -totalHeight / 2 + d.threadIndex * spacing;
                y1 += offset;
                y2 += offset;
            }

            // Use custom control point if it exists
            let pathData;
            if (d.controlPoint) {
                pathData = self.buildCustomCurvePath(x1, y1, x2, y2, d.controlPoint);
            } else {
                const mx = (x1 + x2) / 2;
                pathData = `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
            }

            edgeGroup.select('.edge-drag-target').attr('d', pathData);
            edgeGroup.select('.edge-visible-path').attr('d', pathData);
        });

        // Update edge notation labels
        this.edgesGroup.selectAll('.edge')
            .selectAll('text')
            .attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', (d, i) => (d.source.y + d.target.y) / 2 + (i === 0 ? 15 : -5));
    }

    showNodeDetails(event, node) {
        // Calculate total funds through this wallet by currency
        const incomingByCurrency = {};
        const outgoingByCurrency = {};

        this.edges.forEach(e => {
            if (e.target === node.id) {
                incomingByCurrency[e.currency] = (incomingByCurrency[e.currency] || 0) + e.amount;
            }
            if (e.source === node.id) {
                outgoingByCurrency[e.currency] = (outgoingByCurrency[e.currency] || 0) + e.amount;
            }
        });

        // For backward compatibility, calculate single totals using node's primary currency
        const totalIncoming = incomingByCurrency[node.currency] || 0;
        const totalOutgoing = outgoingByCurrency[node.currency] || Object.values(outgoingByCurrency).reduce((sum, val) => sum + val, 0);

        // Get unique VTH notations for this wallet
        const vthNotations = new Set();
        this.edges.forEach(e => {
            if (e.source === node.id || e.target === node.id) {
                if (e.notation) vthNotations.add(e.notation);
                if (e.entryData && e.entryData.notation) vthNotations.add(e.entryData.notation);
            }
        });

        // If this is a victim node, add its own notation
        if (node.label) vthNotations.add(node.label);

        const vthList = Array.from(vthNotations).sort().join(', ');

        // Create modal HTML
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        modal.innerHTML = `
            <div style="background: white; border-radius: 12px; padding: 30px; max-width: 600px; max-height: 80vh; overflow-y: auto; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                <h2 style="margin: 0 0 20px 0; color: #2c3e50; border-bottom: 3px solid ${this.config.colors[node.type]}; padding-bottom: 10px;">
                    <span style="background: ${this.config.colors[node.type]}; color: white; padding: 5px 15px; border-radius: 20px; font-size: 18px; margin-right: 10px;">
                        ${node.walletId}
                    </span>
                    Wallet Details
                </h2>

                <div style="margin-bottom: 20px;">
                    <strong style="color: #7f8c8d;">Thread Notation:</strong><br>
                    <span style="color: #2c3e50; font-size: 16px; font-weight: 600;">${node.label}</span>
                </div>

                <div style="margin-bottom: 20px;">
                    <strong style="color: #7f8c8d;">${node.walletAddresses && node.walletAddresses.length > 1 ? 'Clustered Wallet Addresses:' : 'Full Wallet Address:'}</strong><br>
                    ${node.walletAddresses && node.walletAddresses.length > 1 ?
                        node.walletAddresses.map((addr, idx) => `
                            <div style="background: #ecf0f1; padding: 12px; border-radius: 8px; font-family: monospace; word-break: break-all; margin-top: 5px;">
                                <div style="color: #7f8c8d; font-size: 11px; margin-bottom: 3px;">Address ${idx + 1}:</div>
                                ${addr}
                                <button onclick="navigator.clipboard.writeText('${addr}').then(() => alert('Address copied!'))"
                                        style="margin-top: 8px; padding: 6px 12px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 11px; font-weight: 600;">
                                    📋 Copy
                                </button>
                            </div>
                        `).join('') :
                        `<div style="background: #ecf0f1; padding: 12px; border-radius: 8px; font-family: monospace; word-break: break-all; margin-top: 5px;">
                            ${node.wallet}
                        </div>
                        <button onclick="navigator.clipboard.writeText('${node.wallet}').then(() => alert('Address copied!'))"
                                style="margin-top: 10px; padding: 8px 16px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
                            📋 Copy Address
                        </button>`
                    }
                </div>

                <div style="margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; border-left: 4px solid #27ae60;">
                        <div style="color: #7f8c8d; font-size: 12px; margin-bottom: 5px;">TOTAL INCOMING</div>
                        ${Object.entries(incomingByCurrency).map(([curr, amt]) =>
                            `<div style="color: #27ae60; font-size: ${Object.keys(incomingByCurrency).length > 1 ? '16px' : '20px'}; font-weight: bold;">${amt.toFixed(6)} ${curr}</div>`
                        ).join('')}
                    </div>
                    <div style="background: #ffebee; padding: 15px; border-radius: 8px; border-left: 4px solid #e74c3c;">
                        <div style="color: #7f8c8d; font-size: 12px; margin-bottom: 5px;">TOTAL OUTGOING</div>
                        ${Object.entries(outgoingByCurrency).map(([curr, amt]) =>
                            `<div style="color: #e74c3c; font-size: ${Object.keys(outgoingByCurrency).length > 1 ? '16px' : '20px'}; font-weight: bold;">${amt.toFixed(6)} ${curr}</div>`
                        ).join('')}
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <strong style="color: #7f8c8d;">Wallet Type:</strong>
                    <span style="color: #2c3e50; margin-left: 10px;">
                        ${node.type.charAt(0).toUpperCase() + node.type.slice(1)}
                        ${node.isSwap ? ' (Conversion/DEX)' : ''}
                        ${node.isTerminal ? ' (Terminal Exchange)' : ''}
                    </span>
                </div>

                ${node.type === 'red' && node.threads ? `
                    <div style="margin-bottom: 20px;">
                        <strong style="color: #7f8c8d;">Victim Transactions:</strong>
                        <div style="margin-top: 10px;">
                            ${node.threads.map(thread => `
                                <div style="background: #ffebee; padding: 12px; margin-bottom: 8px; border-radius: 8px; border-left: 4px solid #e74c3c;">
                                    <div style="margin-bottom: 6px;">
                                        <span style="font-weight: bold; color: #e74c3c;">${thread.id}</span>
                                        <span style="color: #7f8c8d; margin-left: 10px;">
                                            ${thread.amount.toFixed(6)} ${thread.currency}
                                        </span>
                                    </div>
                                    ${thread.transaction.transactionHash ? `
                                        <div style="font-size: 11px; color: #7f8c8d; margin-bottom: 4px;">TX Hash:</div>
                                        <div style="background: white; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 11px; word-break: break-all; color: #2c3e50;">
                                            ${thread.transaction.transactionHash}
                                        </div>
                                        <button onclick="navigator.clipboard.writeText('${thread.transaction.transactionHash}').then(() => alert('TX hash copied!'))"
                                                style="margin-top: 6px; padding: 4px 10px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 10px; font-weight: 600;">
                                            📋 Copy TX Hash
                                        </button>
                                    ` : '<div style="font-size: 11px; color: #95a5a6; font-style: italic;">No transaction hash recorded</div>'}
                                    ${thread.transaction.timestamp ? `
                                        <div style="font-size: 11px; color: #7f8c8d; margin-top: 6px;">
                                            Timestamp: ${new Date(thread.transaction.timestamp).toLocaleString()}
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <div style="margin-bottom: 20px;">
                    <strong style="color: #7f8c8d;">Connected Thread Notations:</strong>
                    <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-top: 5px; font-family: monospace; color: #2c3e50;">
                        ${vthList || 'None'}
                    </div>
                </div>

                <button id="closeModalBtn"
                        style="width: 100%; padding: 12px; background: #34495e; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 16px;">
                    Close
                </button>
            </div>
        `;

        // Helper function to close modal and re-enable zoom
        const closeModal = () => {
            modal.remove();
            // Re-enable zoom/pan after modal closes
            this.svg.call(this.zoom);
        };

        // Close button handler
        modal.querySelector('#closeModalBtn').onclick = closeModal;

        // Close on background click
        modal.onclick = (e) => {
            if (e.target === modal) closeModal();
        };

        document.body.appendChild(modal);
    }

    showEdgeDetails(event, edge) {
        if (!edge.entryData) {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.7); display: flex; align-items: center;
                justify-content: center; z-index: 10000;
            `;
            modal.innerHTML = `
                <div style="background: white; border-radius: 12px; padding: 30px; max-width: 500px;">
                    <h2 style="color: #2c3e50; margin-bottom: 15px;">Thread Details</h2>
                    <p>No detailed entry data available for this connection.</p>
                    <p><strong>Amount:</strong> ${edge.amount.toFixed(6)} ${edge.currency}</p>
                    <p><strong>Notation:</strong> ${edge.notation || 'N/A'}</p>
                    <button onclick="this.parentElement.parentElement.remove()"
                            style="margin-top: 20px; width: 100%; padding: 12px; background: #34495e; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
                        Close
                    </button>
                </div>
            `;
            modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
            document.body.appendChild(modal);
            return;
        }

        const entry = edge.entryData;

        // Create modal HTML
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        const isSwap = entry.entryType === 'swap' || entry.isSwap;
        const txHash = entry.transactionHash || entry.txHash || '';

        modal.innerHTML = `
            <div style="background: white; border-radius: 12px; padding: 30px; max-width: 700px; max-height: 80vh; overflow-y: auto; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                <h2 style="margin: 0 0 20px 0; color: #2c3e50; border-bottom: 3px solid #f39c12; padding-bottom: 10px;">
                    🔗 Thread Entry Details
                </h2>

                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #3498db;">
                    <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 5px;">THREAD NOTATION</div>
                    <div style="font-size: 20px; font-weight: bold; color: #2c3e50; font-family: monospace;">
                        ${entry.notation || edge.notation || 'N/A'}
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                    <div>
                        <strong style="color: #7f8c8d; font-size: 12px;">AMOUNT</strong>
                        <div style="font-size: 18px; color: #27ae60; font-weight: bold;">
                            ${edge.amount.toFixed(6)} ${edge.currency}
                        </div>
                    </div>
                    <div>
                        <strong style="color: #7f8c8d; font-size: 12px;">ENTRY TYPE</strong>
                        <div style="font-size: 16px; color: #2c3e50; font-weight: 600;">
                            ${(entry.entryType || 'trace').toUpperCase()}
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <strong style="color: #7f8c8d;">Source Thread:</strong>
                    <div style="background: #ecf0f1; padding: 10px; border-radius: 6px; margin-top: 5px; font-family: monospace;">
                        ${entry.sourceThreadId || 'N/A'}
                    </div>
                </div>

                <div style="margin-bottom: 20px;">
                    <strong style="color: #7f8c8d;">Destination Wallet:</strong>
                    <div style="background: #ecf0f1; padding: 10px; border-radius: 6px; margin-top: 5px; font-family: monospace; word-break: break-all;">
                        ${entry.destinationWallet || 'N/A'}
                    </div>
                </div>

                ${txHash ? `
                <div style="margin-bottom: 20px;">
                    <strong style="color: #7f8c8d;">Transaction Hash:</strong>
                    <div style="background: #ecf0f1; padding: 10px; border-radius: 6px; margin-top: 5px; font-family: monospace; word-break: break-all; font-size: 11px;">
                        ${txHash}
                    </div>
                    <button onclick="navigator.clipboard.writeText('${txHash}').then(() => alert('Transaction hash copied!'))"
                            style="margin-top: 8px; padding: 6px 12px; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        📋 Copy Tx Hash
                    </button>
                </div>
                ` : ''}

                ${entry.timestamp ? `
                <div style="margin-bottom: 20px;">
                    <strong style="color: #7f8c8d;">Timestamp:</strong>
                    <span style="margin-left: 10px; color: #2c3e50;">${entry.timestamp}</span>
                </div>
                ` : ''}

                ${isSwap ? `
                <div style="background: #fff3cd; border: 2px solid #8B4513; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
                    <h3 style="margin: 0 0 10px 0; color: #8B4513;">🔄 Swap/Conversion Details</h3>
                    <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 10px; align-items: center;">
                        <div>
                            <div style="font-size: 12px; color: #7f8c8d;">INPUT</div>
                            <div style="font-size: 16px; font-weight: bold; color: #e74c3c;">
                                ${entry.inputAmount || entry.amount} ${entry.inputCurrency || entry.currency}
                            </div>
                        </div>
                        <div style="font-size: 24px;">→</div>
                        <div>
                            <div style="font-size: 12px; color: #7f8c8d;">OUTPUT</div>
                            <div style="font-size: 16px; font-weight: bold; color: #27ae60;">
                                ${entry.outputAmount || 'N/A'} ${entry.outputCurrency || 'N/A'}
                            </div>
                        </div>
                    </div>
                    ${entry.swapPlatform || entry.dexName ? `
                    <div style="margin-top: 10px;">
                        <strong style="font-size: 12px; color: #7f8c8d;">PLATFORM:</strong>
                        <span style="margin-left: 5px; color: #2c3e50;">${entry.swapPlatform || entry.dexName}</span>
                    </div>
                    ` : ''}
                </div>
                ` : ''}

                ${entry.notes ? `
                <div style="margin-bottom: 20px;">
                    <strong style="color: #7f8c8d;">Entry Notes:</strong>
                    <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-top: 5px; white-space: pre-wrap; color: #2c3e50; border-left: 3px solid #f39c12;">
                        ${entry.notes}
                    </div>
                </div>
                ` : ''}

                ${entry.walletType ? `
                <div style="margin-bottom: 20px;">
                    <strong style="color: #7f8c8d;">Wallet Type:</strong>
                    <span style="margin-left: 10px; color: #2c3e50;">${entry.walletType}</span>
                </div>
                ` : ''}

                <button onclick="this.parentElement.parentElement.remove()"
                        style="width: 100%; padding: 12px; background: #34495e; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 16px;">
                    Close
                </button>
            </div>
        `;

        // Close on background click
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };

        document.body.appendChild(modal);
    }

    renderSankey() {
        console.log('🌊 Rendering Sankey diagram...');

        // Clear existing content
        this.mainGroup.selectAll('*').remove();

        // Transform BATS data into Sankey format
        const sankeyData = this.transformToSankeyFormat();

        console.log('📊 Sankey nodes:', sankeyData.nodes);
        console.log('📊 Sankey links:', sankeyData.links);

        if (!sankeyData || sankeyData.nodes.length === 0) {
            console.error('No data available for Sankey diagram');
            return;
        }

        // Configure Sankey generator
        const sankey = d3.sankey()
            .nodeId(d => d.id)
            .nodeWidth(30)
            .nodePadding(40)
            .extent([[100, 100], [this.config.width - 100, this.config.height - 100]]);

        // Generate Sankey layout
        const graph = sankey({
            nodes: sankeyData.nodes.map(d => Object.assign({}, d)),
            links: sankeyData.links.map(d => Object.assign({}, d))
        });

        // Draw links (flows)
        const link = this.mainGroup.append('g')
            .selectAll('.sankey-link')
            .data(graph.links)
            .enter()
            .append('path')
            .attr('class', 'sankey-link')
            .attr('d', d3.sankeyLinkHorizontal())
            .attr('stroke', d => {
                // Color based on source node type
                const sourceNode = graph.nodes.find(n => n.id === d.source.id);
                return sourceNode ? this.config.colors[sourceNode.colorType] || '#95a5a6' : '#95a5a6';
            })
            .attr('stroke-width', d => Math.max(1, d.width))
            .attr('fill', 'none')
            .attr('opacity', 0.5)
            .style('cursor', 'pointer')
            .on('mouseover', function(event, d) {
                d3.select(this).attr('opacity', 0.8);
            })
            .on('mouseout', function(event, d) {
                d3.select(this).attr('opacity', 0.5);
            })
            .on('click', (event, d) => this.showSankeyLinkDetails(event, d));

        // Add link labels (amounts)
        this.mainGroup.append('g')
            .selectAll('.link-label')
            .data(graph.links)
            .enter()
            .append('text')
            .attr('class', 'link-label')
            .attr('x', d => (d.source.x1 + d.target.x0) / 2)
            .attr('y', d => (d.y0 + d.y1) / 2)
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('fill', '#2c3e50')
            .attr('font-weight', 'bold')
            .style('pointer-events', 'none')
            .text(d => `${d.value.toFixed(2)} ${d.currency || ''}`);

        // Draw nodes (wallets)
        const node = this.mainGroup.append('g')
            .selectAll('.sankey-node')
            .data(graph.nodes)
            .enter()
            .append('g')
            .attr('class', 'sankey-node')
            .style('cursor', 'pointer')
            .on('click', (event, d) => this.showSankeyNodeDetails(event, d));

        // Node rectangles
        node.append('rect')
            .attr('x', d => d.x0)
            .attr('y', d => d.y0)
            .attr('height', d => d.y1 - d.y0)
            .attr('width', d => d.x1 - d.x0)
            .attr('fill', d => this.config.colors[d.colorType] || '#34495e')
            .attr('stroke', '#2c3e50')
            .attr('stroke-width', 2)
            .on('mouseover', function(event, d) {
                d3.select(this)
                    .attr('opacity', 0.8)
                    .attr('stroke-width', 3);
            })
            .on('mouseout', function(event, d) {
                d3.select(this)
                    .attr('opacity', 1)
                    .attr('stroke-width', 2);
            });

        // Node labels (wallet IDs)
        node.append('text')
            .attr('x', d => d.x0 - 10)
            .attr('y', d => (d.y0 + d.y1) / 2)
            .attr('text-anchor', 'end')
            .attr('font-size', '12px')
            .attr('font-weight', 'bold')
            .attr('fill', '#2c3e50')
            .style('pointer-events', 'none')
            .text(d => d.walletId || d.name);

        // Node amounts
        node.append('text')
            .attr('x', d => d.x1 + 10)
            .attr('y', d => (d.y0 + d.y1) / 2)
            .attr('text-anchor', 'start')
            .attr('font-size', '11px')
            .attr('font-weight', 'bold')
            .attr('fill', '#27ae60')
            .style('pointer-events', 'none')
            .text(d => d.amount ? `${d.amount.toFixed(2)} ${d.currency || ''}` : '');

        console.log('✅ Sankey diagram rendered');
    }

    transformToSankeyFormat() {
        const nodes = [];
        const links = [];
        const nodeMap = new Map();

        // Create nodes from BATS nodes
        this.nodes.forEach(node => {
            const sankeyNode = {
                id: node.id,
                name: node.label,
                walletId: node.walletId,
                wallet: node.wallet,
                colorType: node.type,
                amount: node.amount,
                currency: node.currency,
                isSwap: node.isSwap,
                isTerminal: node.isTerminal
            };
            nodes.push(sankeyNode);
            nodeMap.set(node.id, sankeyNode);
        });

        // Create links from BATS edges
        this.edges.forEach(edge => {
            const sourceNode = nodeMap.get(edge.source);
            const targetNode = nodeMap.get(edge.target);

            if (sourceNode && targetNode) {
                links.push({
                    source: edge.source,
                    target: edge.target,
                    value: edge.amount,
                    currency: edge.currency,
                    notation: edge.notation,
                    entryData: edge.entryData
                });
            }
        });

        return { nodes, links };
    }

    showSankeyNodeDetails(event, node) {
        const details = `
Wallet ID: ${node.walletId || 'N/A'}
Thread Notation: ${node.name}
Full Address: ${node.wallet || 'N/A'}
Amount: ${node.amount ? node.amount.toFixed(6) : 'N/A'} ${node.currency || ''}
Type: ${node.colorType ? node.colorType.charAt(0).toUpperCase() + node.colorType.slice(1) : 'Unknown'}
${node.isSwap ? '\nSwap/Conversion Node' : ''}
${node.isTerminal ? '\nTerminal Exchange' : ''}

Click OK to copy full address to clipboard.
        `.trim();

        if (node.wallet && confirm(details)) {
            navigator.clipboard.writeText(node.wallet);
            alert('Address copied to clipboard!');
        } else if (!node.wallet) {
            alert(details);
        }
    }

    showSankeyLinkDetails(event, link) {
        const entry = link.entryData;

        if (!entry) {
            alert(`
Flow Details:
Amount: ${link.value.toFixed(6)} ${link.currency || ''}
Notation: ${link.notation || 'N/A'}
            `.trim());
            return;
        }

        const details = `
═══════════════════════════════════
THREAD DETAILS
═══════════════════════════════════
Notation: ${entry.notation || link.notation || 'N/A'}
Amount: ${link.value.toFixed(6)} ${link.currency || ''}

Source Thread: ${entry.sourceThreadId || 'N/A'}
Destination: ${entry.destinationWallet || 'N/A'}
${entry.transactionHash ? `\nTx Hash: ${entry.transactionHash}` : ''}
${entry.timestamp ? `\nTimestamp: ${entry.timestamp}` : ''}

${entry.isSwap ? `
SWAP DETAILS:
From: ${entry.inputAmount} ${entry.inputCurrency}
To: ${entry.outputAmount} ${entry.outputCurrency}
Rate: ${entry.exchangeRate || 'N/A'}
DEX: ${entry.dexName || 'Unknown'}
` : ''}

${entry.notes ? `
NOTES:
${entry.notes}
` : ''}

Click OK to copy transaction hash to clipboard.
        `.trim();

        if (entry.transactionHash && confirm(details)) {
            navigator.clipboard.writeText(entry.transactionHash);
            alert('Transaction hash copied to clipboard!');
        } else {
            alert(details);
        }
    }

    setLayout(mode) {
        this.layoutMode = mode;
        this.render();
    }

    fitToView() {
        // Graph should always fill viewport - backgrounds already set to full height
        // Just center content horizontally and vertically without scaling down
        const bounds = this.mainGroup.node().getBBox();
        const fullWidth = this.config.width;
        const fullHeight = this.config.height;
        const midX = bounds.x + bounds.width / 2;
        const midY = bounds.y + bounds.height / 2;

        // Center the content, but don't scale down
        // Graph columns extend full height, so content should fill viewport
        const translateX = fullWidth / 2 - midX;
        const translateY = fullHeight / 2 - midY;

        // Apply centering translation only
        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, d3.zoomIdentity.translate(translateX, translateY).scale(1));
    }

    resetView() {
        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, d3.zoomIdentity);
    }

    toggleOrientation() {
        this.orientation = this.orientation === 'horizontal' ? 'vertical' : 'horizontal';
        console.log(`🔄 Switched to ${this.orientation} orientation`);

        // Swap width and height for vertical mode
        if (this.orientation === 'vertical') {
            [this.config.width, this.config.height] = [this.config.height, this.config.width];
        } else {
            // Restore original dimensions
            [this.config.width, this.config.height] = [this.config.height, this.config.width];
        }

        // Update SVG viewBox
        this.svg.attr('viewBox', `0 0 ${this.config.width} ${this.config.height}`);

        // Re-render the visualization
        this.render();
    }

    exportPNG(filename = 'bats_visualization.png') {
        const svgElement = this.svg.node();
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        canvas.width = this.config.width;
        canvas.height = this.config.height;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        img.onload = () => {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            canvas.toBlob(blob => {
                const link = document.createElement('a');
                link.download = filename;
                link.href = URL.createObjectURL(blob);
                link.click();
            });
        };

        img.src = url;
    }

    exportSVG(filename = 'bats_visualization.svg') {
        const svgElement = this.svg.node();
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);
        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }

    showAddNoteModal(event, data, type) {
        // Create modal for adding/editing notes
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;

        const title = type === 'node' ? `Add Note to ${data.walletId || data.label}` : `Add Note to Edge`;
        const existingNote = data.note || '';

        modal.innerHTML = `
            <div style="background: white; border-radius: 12px; padding: 30px; max-width: 500px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                <h3 style="margin: 0 0 20px 0; color: #2c3e50;">${title}</h3>
                <textarea id="noteInput"
                          placeholder="Enter your note here..."
                          style="width: 100%; min-height: 120px; padding: 12px; border: 2px solid #ddd; border-radius: 8px; font-size: 14px; font-family: Arial, sans-serif; resize: vertical;">${existingNote}</textarea>
                <div style="margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end;">
                    <button id="cancelNote" style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Cancel</button>
                    ${existingNote ? '<button id="deleteNote" style="padding: 10px 20px; background: #e74c3c; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Delete</button>' : ''}
                    <button id="saveNote" style="padding: 10px 20px; background: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">Save Note</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Focus textarea
        const textarea = modal.querySelector('#noteInput');
        textarea.focus();

        // Cancel button
        modal.querySelector('#cancelNote').onclick = () => {
            document.body.removeChild(modal);
        };

        // Delete button (if exists)
        const deleteBtn = modal.querySelector('#deleteNote');
        if (deleteBtn) {
            deleteBtn.onclick = () => {
                delete data.note;
                document.body.removeChild(modal);
                // Just update the visual display, don't rebuild entire visualization
                if (type === 'node') {
                    this.updateNodeNoteIndicators();
                } else {
                    this.updateEdgeNoteIndicators();
                }
            };
        }

        // Save button
        modal.querySelector('#saveNote').onclick = () => {
            const note = textarea.value.trim();
            if (note) {
                data.note = note;
            } else {
                delete data.note;
            }
            document.body.removeChild(modal);
            // Just update the visual display, don't rebuild entire visualization
            if (type === 'node') {
                this.updateNodeNoteIndicators();
            } else {
                this.updateEdgeNoteIndicators();
            }
        };

        // Close on background click
        modal.onclick = (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        };
    }

    showNoteTooltip(event, note) {
        // Remove any existing tooltip
        this.hideNoteTooltip();

        // Create tooltip
        this.noteTooltip = document.createElement('div');
        this.noteTooltip.id = 'note-tooltip';
        this.noteTooltip.style.cssText = `
            position: fixed;
            background: rgba(44, 62, 80, 0.95);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 13px;
            max-width: 300px;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            line-height: 1.4;
        `;
        this.noteTooltip.textContent = note;

        document.body.appendChild(this.noteTooltip);

        // Position tooltip near cursor
        const x = event.pageX + 15;
        const y = event.pageY + 15;

        this.noteTooltip.style.left = x + 'px';
        this.noteTooltip.style.top = y + 'px';
    }

    hideNoteTooltip() {
        if (this.noteTooltip) {
            document.body.removeChild(this.noteTooltip);
            this.noteTooltip = null;
        }
    }

    updateNodeNoteIndicators() {
        // Update note indicators on nodes without rebuilding the entire visualization
        this.nodesGroup.selectAll('.node').each(function(d) {
            const nodeGroup = d3.select(this);

            // Remove existing note indicator if any
            nodeGroup.select('.note-indicator').remove();

            // Add note indicator if node has a note
            if (d.note) {
                nodeGroup.append('text')
                    .attr('class', 'note-indicator')
                    .attr('x', 25)
                    .attr('y', -25)
                    .attr('font-size', '20px')
                    .style('pointer-events', 'none')
                    .text('📝');
            }
        });
    }

    updateEdgeNoteIndicators() {
        // Update note indicators on edges without rebuilding the entire visualization
        this.edgesGroup.selectAll('.edge').each(function(d) {
            const edgeGroup = d3.select(this);

            // Remove existing note indicator if any
            edgeGroup.select('.edge-note-indicator').remove();

            // Add note indicator if edge has a note
            if (d.note) {
                const midX = (d.source.x + d.target.x) / 2;
                const midY = (d.source.y + d.target.y) / 2;

                edgeGroup.append('text')
                    .attr('class', 'edge-note-indicator')
                    .attr('x', midX + 10)
                    .attr('y', midY - 10)
                    .attr('font-size', '16px')
                    .style('pointer-events', 'none')
                    .text('📝');
            }
        });
    }

    toggleAdjustMode() {
        this.adjustMode = !this.adjustMode;

        if (this.adjustMode) {
            // Enable adjust mode
            this.adjustButton.textContent = '✓ Done Adjusting';
            this.adjustButton.style.background = '#27ae60';
            this.adjustButton.style.transform = 'scale(1.05)';

            // Disable zoom/pan so dragging nodes/edges works
            this.svg.on('.zoom', null);

            // Enable dragging on nodes and edges
            this.enableDragging();
        } else {
            // Disable adjust mode
            this.adjustButton.textContent = '🔧 Adjust Graph';
            this.adjustButton.style.background = '#3498db';
            this.adjustButton.style.transform = 'scale(1)';

            // Disable dragging
            this.disableDragging();

            // Re-enable zoom/pan for navigation
            this.svg.call(this.zoom);
        }
    }

    enableDragging() {
        const self = this;

        // Enable node dragging
        this.nodesGroup.selectAll('.node')
            .style('cursor', 'grab')
            .call(d3.drag()
                .on('start', function(event, d) {
                    event.sourceEvent.stopPropagation();
                    d3.select(this).style('cursor', 'grabbing');
                    d.isDragging = true;
                })
                .on('drag', (event, d) => {
                    event.sourceEvent.stopPropagation();
                    this.dragging(event, d);
                })
                .on('end', function(event, d) {
                    event.sourceEvent.stopPropagation();
                    d3.select(this).style('cursor', 'grab');
                    d.isDragging = false;
                    // Mark as manually positioned so it's preserved when switching views
                    d.manuallyPositioned = true;
                    // Save state for undo
                    self.saveState();
                }));

        // Enable edge dragging
        this.edgesGroup.selectAll('.edge-drag-target')
            .style('cursor', 'move')
            .call(d3.drag()
                .on('start', (event, d) => {
                    event.sourceEvent.stopPropagation();
                    d.isDraggingEdge = true;
                })
                .on('drag', (event, d) => {
                    event.sourceEvent.stopPropagation();
                    this.dragEdge(event, d);
                })
                .on('end', (event, d) => {
                    event.sourceEvent.stopPropagation();
                    if (d.isDraggingEdge) {
                        d.wasDragging = true;
                    }
                    d.isDraggingEdge = false;
                    // Save state for undo
                    self.saveState();
                }));
    }

    disableDragging() {
        // Disable node dragging
        this.nodesGroup.selectAll('.node')
            .style('cursor', 'pointer')
            .on('.drag', null); // Remove drag handlers

        // Disable edge dragging
        this.edgesGroup.selectAll('.edge-drag-target')
            .style('cursor', 'pointer')
            .on('.drag', null); // Remove drag handlers
    }

    saveState() {
        // Save current state for undo
        const state = {
            nodes: this.nodes.map(n => ({
                id: n.id,
                x: n.x,
                y: n.y
            })),
            edges: this.edges.map(e => ({
                id: `${e.source.id}-${e.target.id}-${e.label}`,
                controlPoint: e.controlPoint ? { ...e.controlPoint } : null
            }))
        };
        this.undoStack.push(state);
        // Clear redo stack when new action is taken
        this.redoStack = [];
        this.updateUndoRedoButtons();
    }

    undo() {
        if (this.undoStack.length === 0) return;

        // Save current state to redo stack
        const currentState = {
            nodes: this.nodes.map(n => ({
                id: n.id,
                x: n.x,
                y: n.y
            })),
            edges: this.edges.map(e => ({
                id: `${e.source.id}-${e.target.id}-${e.label}`,
                controlPoint: e.controlPoint ? { ...e.controlPoint } : null
            }))
        };
        this.redoStack.push(currentState);

        // Restore previous state
        const previousState = this.undoStack.pop();
        this.restoreState(previousState);
        this.updateUndoRedoButtons();
    }

    redo() {
        if (this.redoStack.length === 0) return;

        // Save current state to undo stack
        const currentState = {
            nodes: this.nodes.map(n => ({
                id: n.id,
                x: n.x,
                y: n.y
            })),
            edges: this.edges.map(e => ({
                id: `${e.source.id}-${e.target.id}-${e.label}`,
                controlPoint: e.controlPoint ? { ...e.controlPoint } : null
            }))
        };
        this.undoStack.push(currentState);

        // Restore redo state
        const nextState = this.redoStack.pop();
        this.restoreState(nextState);
        this.updateUndoRedoButtons();
    }

    restoreState(state) {
        // Restore node positions
        state.nodes.forEach(savedNode => {
            const node = this.nodes.find(n => n.id === savedNode.id);
            if (node) {
                node.x = savedNode.x;
                node.y = savedNode.y;
            }
        });

        // Restore edge control points
        state.edges.forEach(savedEdge => {
            const edge = this.edges.find(e =>
                `${e.source.id}-${e.target.id}-${e.label}` === savedEdge.id
            );
            if (edge) {
                edge.controlPoint = savedEdge.controlPoint;
            }
        });

        // Redraw
        this.nodesGroup.selectAll('.node')
            .attr('transform', d => `translate(${d.x}, ${d.y})`);
        this.updateEdges();
    }

    resetLayout() {
        // Clear all custom positions and control points
        this.nodes.forEach(node => {
            // Reset to original position (recalculate from scratch)
            delete node.x;
            delete node.y;
        });

        this.edges.forEach(edge => {
            delete edge.controlPoint;
        });

        // Clear undo/redo stacks
        this.undoStack = [];
        this.redoStack = [];

        // Rebuild and re-render
        this.buildDataStructure();
        this.render();
        this.updateUndoRedoButtons();
    }

    updateUndoRedoButtons() {
        // Update undo button
        if (this.undoStack.length > 0) {
            this.undoButton.disabled = false;
            this.undoButton.style.opacity = '1';
            this.undoButton.style.cursor = 'pointer';
        } else {
            this.undoButton.disabled = true;
            this.undoButton.style.opacity = '0.5';
            this.undoButton.style.cursor = 'not-allowed';
        }

        // Update redo button
        if (this.redoStack.length > 0) {
            this.redoButton.disabled = false;
            this.redoButton.style.opacity = '1';
            this.redoButton.style.cursor = 'pointer';
        } else {
            this.redoButton.disabled = true;
            this.redoButton.style.opacity = '0.5';
            this.redoButton.style.cursor = 'not-allowed';
        }
    }
}
