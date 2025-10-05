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

        // Create SVG
        this.svg = d3.select(this.container)
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${this.config.width} ${this.config.height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        // Add zoom behavior
        this.zoom = d3.zoom()
            .scaleExtent([0.1, 4])
            .on('zoom', (event) => {
                this.mainGroup.attr('transform', event.transform);
            });

        // Main group for zoomable/pannable elements (including backgrounds)
        this.mainGroup = this.svg.append('g');

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

        // Build victim column (Hop 0)
        const victimColumn = {
            hopNumber: 0,
            title: 'VICTIMS',
            nodes: [],
            artBefore: {},
            artAfter: {},
            columnIndex: 0
        };

        // Add victim nodes
        this.investigation.victims.forEach((victim, vIndex) => {
            victim.transactions.forEach((tx, tIndex) => {
                const nodeId = `V${victim.id}-T${tx.id}`;
                const colorType = 'red';
                const node = {
                    id: nodeId,
                    label: `V${victim.id}-T${tx.id}`,
                    wallet: tx.receivingWallet,
                    walletLabel: tx.walletLabel || this.shortenAddress(tx.receivingWallet),
                    walletId: this.generateWalletId(colorType, tx.receivingWallet),
                    type: colorType,
                    amount: parseFloat(tx.amount),
                    currency: tx.currency === 'CUSTOM' ? tx.customCurrency : tx.currency,
                    column: 0,
                    isVictim: true
                };

                victimColumn.nodes.push(node);
                this.nodes.push(node);
                this.nodeMap.set(nodeId, node);

                // Update ART
                const currency = node.currency;
                victimColumn.artAfter[currency] = (victimColumn.artAfter[currency] || 0) + node.amount;
            });
        });

        this.hopColumns.push(victimColumn);

        // Build hop columns
        this.investigation.hops.forEach((hop, hopIndex) => {
            const hopColumn = {
                hopNumber: hop.hopNumber,
                title: `HOP ${hop.hopNumber}`,
                nodes: [],
                artBefore: hop.artAtStartByCurrency || {},
                artAfter: {},
                columnIndex: hopIndex + 1
            };

            // Process entries
            hop.entries.forEach((entry, entryIndex) => {
                if (entry.entryType === 'writeoff') {
                    // Skip writeoffs for now (could add as special nodes later)
                    return;
                }

                // Handle swaps/conversions
                if (entry.entryType === 'swap' || entry.walletType === 'brown' || entry.isBridge) {
                    // Check if this is an internal swap (same wallet doing the conversion)
                    // or if it's going to another brown/service wallet
                    const isInternalSwap = entry.walletType === 'brown' && entry.toWalletType === 'brown' &&
                                          entry.destinationWallet && entry.destinationWallet === entry.swapPlatform;

                    if (isInternalSwap) {
                        // Internal conversion within same brown wallet - create single node in hop column
                        const nodeId = `H${hop.hopNumber}-E${entryIndex}`;
                        const node = {
                            id: nodeId,
                            label: entry.notation || nodeId,
                            wallet: entry.destinationWallet,
                            walletLabel: entry.walletLabel || this.shortenAddress(entry.destinationWallet),
                            walletId: this.generateWalletId('brown', entry.destinationWallet),
                            type: 'brown',
                            amount: entry.swapDetails ? parseFloat(entry.swapDetails.outputAmount || entry.outputAmount || 0) : parseFloat(entry.amount || 0),
                            currency: entry.swapDetails ? entry.swapDetails.outputCurrency : entry.currency,
                            column: hopIndex + 1,
                            isSwap: true,
                            swapDetails: entry.swapDetails
                        };

                        hopColumn.nodes.push(node);
                        this.nodes.push(node);
                        this.nodeMap.set(nodeId, node);

                        // Single edge: Source → Brown wallet (shows conversion)
                        if (entry.sourceThreadId) {
                            const sourceThread = this.findSourceNode(entry.sourceThreadId, hopIndex);
                            if (sourceThread) {
                                this.edges.push({
                                    source: sourceThread.id,
                                    target: nodeId,
                                    label: `${entry.notation || ''} (→ ${node.amount.toFixed(2)} ${node.currency})`,
                                    amount: parseFloat(entry.amount || 0),
                                    currency: entry.currency,
                                    entryData: entry
                                });
                            }
                        }

                        // Update ART with output currency
                        const outCurrency = node.currency;
                        hopColumn.artAfter[outCurrency] = (hopColumn.artAfter[outCurrency] || 0) + node.amount;

                    } else {
                        // External swap - create DEX node in hop space + output node
                        const swapNodeId = `H${hop.hopNumber}-SWAP${entryIndex}`;
                        const colorType = 'brown';
                        const swapNode = {
                            id: swapNodeId,
                            label: entry.swapPlatform || 'DEX',
                            wallet: entry.destinationWallet || 'Swap Contract',
                            walletLabel: entry.swapPlatform || 'Conversion',
                            walletId: this.generateWalletId(colorType, entry.swapPlatform || entry.destinationWallet),
                            type: colorType,
                            amount: parseFloat(entry.amount || 0),
                            currency: entry.currency,
                            column: hopIndex + 0.5,  // Position in hop space (between columns)
                            isSwap: true,
                            swapDetails: entry.swapDetails
                        };

                        this.nodes.push(swapNode);
                        this.nodeMap.set(swapNodeId, swapNode);

                        // Edge 1: Source → DEX (input currency)
                        if (entry.sourceThreadId) {
                            const sourceThread = this.findSourceNode(entry.sourceThreadId, hopIndex);
                            if (sourceThread) {
                                this.edges.push({
                                    source: sourceThread.id,
                                    target: swapNodeId,
                                    label: entry.notation || '',
                                    amount: parseFloat(entry.amount || 0),
                                    currency: entry.currency,
                                    entryData: entry
                                });
                            }
                        }

                        // Create output node in destination column
                        const outputNodeId = `H${hop.hopNumber}-E${entryIndex}`;
                        const outputColorType = entry.toWalletType || 'black';
                        const outputNode = {
                            id: outputNodeId,
                            label: entry.notation || outputNodeId,
                            wallet: entry.destinationWallet,
                            walletLabel: entry.walletLabel || this.shortenAddress(entry.destinationWallet),
                            walletId: this.generateWalletId(outputColorType, entry.destinationWallet),
                            type: outputColorType,
                            amount: entry.swapDetails ? parseFloat(entry.swapDetails.outputAmount || entry.outputAmount || 0) : parseFloat(entry.amount || 0),
                            currency: entry.swapDetails ? entry.swapDetails.outputCurrency : entry.currency,
                            column: hopIndex + 1,
                            isTerminal: entry.toWalletType === 'purple'
                        };

                        hopColumn.nodes.push(outputNode);
                        this.nodes.push(outputNode);
                        this.nodeMap.set(outputNodeId, outputNode);

                        // Edge 2: DEX → Output (output currency)
                        this.edges.push({
                            source: swapNodeId,
                            target: outputNodeId,
                            label: `${outputNode.amount.toFixed(2)} ${outputNode.currency}`,
                            amount: outputNode.amount,
                            currency: outputNode.currency,
                            entryData: entry
                        });

                        // Update ART with output currency
                        const outCurrency = outputNode.currency;
                        hopColumn.artAfter[outCurrency] = (hopColumn.artAfter[outCurrency] || 0) + outputNode.amount;
                    }

                } else {
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

                    // Update ART
                    const currency = node.currency;
                    hopColumn.artAfter[currency] = (hopColumn.artAfter[currency] || 0) + node.amount;

                    // Create edges from source threads
                    if (entry.sourceThreadId) {
                        // Find source node
                        const sourceThread = this.findSourceNode(entry.sourceThreadId, hopIndex);
                        if (sourceThread) {
                            this.edges.push({
                                source: sourceThread.id,
                                target: nodeId,
                                label: entry.notation || '',
                                amount: node.amount,
                                currency: node.currency,
                                entryData: entry  // Store full entry for details
                            });
                        }
                    }
                }
            });

            this.hopColumns.push(hopColumn);
        });

        console.log('Built data structure:', {
            nodes: this.nodes.length,
            edges: this.edges.length,
            columns: this.hopColumns.length
        });
    }

    findSourceNode(threadId, currentHop) {
        // Parse thread ID to find source node
        // Thread format: V{victimId}-T{txId}_CURRENCY or V{victimId}-T{txId}-H{hopNum}
        const parts = threadId.split('_')[0].split('-');

        if (parts.length >= 2) {
            const vPart = parts[0]; // V1
            const tPart = parts[1]; // T1
            const hPart = parts[2]; // H1 (if exists)

            if (hPart) {
                // Thread from previous hop
                const hopNum = parseInt(hPart.substring(1));
                const searchId = `H${hopNum}-`;
                for (let [id, node] of this.nodeMap) {
                    if (id.startsWith(searchId)) {
                        return node;
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
                const startY = (this.config.height - totalHeight) / 2;

                column.nodes.forEach((node, nodeIndex) => {
                    node.x = column.x;
                    node.y = startY + nodeIndex * this.config.verticalSpacing;
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
                    node.y = column.y;
                    node.x = startX + nodeIndex * this.config.verticalSpacing;
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

        // Draw ART boxes
        this.drawARTBoxes();

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

        // Add wallet column titles
        columns.enter()
            .append('text')
            .attr('x', d => d.x)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .attr('font-size', '16px')
            .attr('font-weight', 'bold')
            .attr('fill', '#2c3e50')
            .text(d => d.title);
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

        const labels = this.backgroundGroup.selectAll('.hop-space-label')
            .data(hopSpaces);

        labels.enter()
            .append('text')
            .attr('class', 'hop-space-label')
            .attr('x', d => d.x)
            .attr('y', 115)  // Moved down to make room for header
            .attr('text-anchor', 'middle')
            .attr('font-size', '18px')
            .attr('font-weight', 'bold')
            .attr('fill', '#7f8c8d')
            .text(d => `→ HOP ${d.hopNumber} →`);

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
        // Draw ART header at top of each hop column
        const headers = this.backgroundGroup.selectAll('.hop-header')
            .data(hopSpaces);

        const headerGroup = headers.enter()
            .append('g')
            .attr('class', 'hop-header');

        // Header background box
        headerGroup.append('rect')
            .attr('x', d => d.leftX + 10)
            .attr('y', 65)
            .attr('width', d => d.width - 20)
            .attr('height', 45)
            .attr('fill', '#2c3e50')
            .attr('stroke', '#f39c12')
            .attr('stroke-width', 2)
            .attr('rx', 5);

        // ART Title
        headerGroup.append('text')
            .attr('x', d => d.x)
            .attr('y', 82)
            .attr('text-anchor', 'middle')
            .attr('font-size', '11px')
            .attr('font-weight', 'bold')
            .attr('fill', '#f39c12')
            .text(d => `HOP ${d.hopNumber} - ART (Adjusted Root Total)`);

        // ART Values
        headerGroup.append('text')
            .attr('x', d => d.x)
            .attr('y', 100)
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
            const leftItems = [];  // Terminated/Write-offs/Conversion inputs
            const rightItems = [];  // Continuing/Conversion outputs

            // Process entries to categorize
            hop.entries.forEach(entry => {
                if (entry.entryType === 'writeoff') {
                    leftItems.push({
                        type: 'write-off',
                        amount: parseFloat(entry.amount) || 0,
                        currency: entry.currency === 'CUSTOM' ? entry.customCurrency : entry.currency,
                        label: `Write-off: ${entry.reason || 'Unknown'}`
                    });
                } else if (entry.entryType === 'swap') {
                    // Swap input on left, output on right
                    leftItems.push({
                        type: 'swap-in',
                        amount: parseFloat(entry.inputAmount) || 0,
                        currency: entry.inputCurrency,
                        label: `Swap: ${entry.inputCurrency} → ${entry.outputCurrency}`
                    });
                    rightItems.push({
                        type: 'swap-out',
                        amount: parseFloat(entry.outputAmount) || 0,
                        currency: entry.outputCurrency,
                        label: `Converted to ${entry.outputCurrency}`
                    });
                } else if (entry.isTerminal || entry.walletType === 'purple') {
                    // Terminal wallet - goes on left
                    leftItems.push({
                        type: 'terminal',
                        amount: parseFloat(entry.amount) || 0,
                        currency: entry.currency === 'CUSTOM' ? entry.customCurrency : entry.currency,
                        label: `Terminal: ${entry.walletLabel || 'Exchange'}`,
                        notation: entry.notation
                    });
                } else {
                    // Continuing trace - goes on right
                    rightItems.push({
                        type: 'trace',
                        amount: parseFloat(entry.amount) || 0,
                        currency: entry.currency === 'CUSTOM' ? entry.customCurrency : entry.currency,
                        label: entry.notation || `Trace to H${hop.hopNumber + 1}`,
                        notation: entry.notation
                    });
                }
            });

            hopSpace.leftItems = leftItems;
            hopSpace.rightItems = rightItems;
        });

        // Position reconciliation box near bottom of viewport (dynamic based on height)
        const reconY = this.config.height - 200;

        // Main reconciliation box
        reconGroup.append('rect')
            .attr('x', d => d.leftX + 10)
            .attr('y', reconY)
            .attr('width', d => d.width - 20)
            .attr('height', 150)
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

        // Divider line (vertical center)
        reconGroup.append('line')
            .attr('x1', d => d.x)
            .attr('y1', reconY + 25)
            .attr('x2', d => d.x)
            .attr('y2', reconY + 145)
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

        // Left items (with visual indicators)
        const self = this;
        reconGroup.each(function(d, i) {
            const group = d3.select(this);
            const leftItems = d.leftItems || [];
            const startY = reconY + 55;
            const lineHeight = 16;

            leftItems.slice(0, 3).forEach((item, idx) => {
                // Visual indicator
                const icon = item.type === 'terminal' ? '⬤' :
                           item.type === 'swap-in' ? '🔄' : '✕';
                const iconColor = item.type === 'terminal' ? '#9b59b6' :
                                item.type === 'swap-in' ? '#8B4513' : '#e74c3c';

                group.append('text')
                    .attr('x', d.leftX + 15)
                    .attr('y', startY + idx * lineHeight)
                    .attr('font-size', '10px')
                    .attr('fill', iconColor)
                    .text(icon);

                group.append('text')
                    .attr('x', d.leftX + 30)
                    .attr('y', startY + idx * lineHeight)
                    .attr('font-size', '9px')
                    .attr('fill', '#2c3e50')
                    .text(`- ${item.amount.toFixed(2)} ${item.currency}`);
            });

            // "More..." indicator if there are more items
            if (leftItems.length > 3) {
                group.append('text')
                    .attr('x', d.leftX + 30)
                    .attr('y', startY + 3 * lineHeight)
                    .attr('font-size', '8px')
                    .attr('fill', '#7f8c8d')
                    .attr('font-style', 'italic')
                    .text(`... +${leftItems.length - 3} more`);
            }
        });

        // Right items (with visual indicators)
        reconGroup.each(function(d, i) {
            const group = d3.select(this);
            const rightItems = d.rightItems || [];
            const startY = reconY + 55;
            const lineHeight = 16;

            rightItems.slice(0, 3).forEach((item, idx) => {
                // Visual indicator
                const icon = item.type === 'trace' ? '→' : '🔄';
                const iconColor = item.type === 'trace' ? '#27ae60' : '#8B4513';

                group.append('text')
                    .attr('x', d.x + 15)
                    .attr('y', startY + idx * lineHeight)
                    .attr('font-size', '10px')
                    .attr('fill', iconColor)
                    .text(icon);

                group.append('text')
                    .attr('x', d.x + 30)
                    .attr('y', startY + idx * lineHeight)
                    .attr('font-size', '9px')
                    .attr('fill', '#2c3e50')
                    .text(`+ ${item.amount.toFixed(2)} ${item.currency}`);
            });

            // "More..." indicator if there are more items
            if (rightItems.length > 3) {
                group.append('text')
                    .attr('x', d.x + 30)
                    .attr('y', startY + 3 * lineHeight)
                    .attr('font-size', '8px')
                    .attr('fill', '#7f8c8d')
                    .attr('font-style', 'italic')
                    .text(`... +${rightItems.length - 3} more`);
            }
        });

        // Balance indicator
        reconGroup.append('text')
            .attr('x', d => d.x)
            .attr('y', 1460)
            .attr('text-anchor', 'middle')
            .attr('font-size', '9px')
            .attr('font-weight', 'bold')
            .attr('fill', d => {
                // Check if balanced
                const artTotal = Object.values(d.artBefore || {}).reduce((sum, val) => sum + val, 0);
                return artTotal > 0 ? '#27ae60' : '#95a5a6';
            })
            .text(d => {
                const artTotal = Object.values(d.artBefore || {}).reduce((sum, val) => sum + val, 0);
                return artTotal > 0 ? `✓ BALANCED` : '— No Data';
            });
    }

    drawARTBoxes() {
        const artBoxes = this.artGroup.selectAll('.art-box')
            .data(this.hopColumns);

        const artEnter = artBoxes.enter()
            .append('g')
            .attr('class', 'art-box')
            .attr('transform', d => `translate(${d.x - this.config.artBoxWidth / 2}, 1480)`);

        artEnter.append('rect')
            .attr('width', this.config.artBoxWidth)
            .attr('height', this.config.artBoxHeight)
            .attr('fill', '#ecf0f1')
            .attr('stroke', '#34495e')
            .attr('stroke-width', 2)
            .attr('rx', 5);

        artEnter.append('text')
            .attr('x', this.config.artBoxWidth / 2)
            .attr('y', 25)
            .attr('text-anchor', 'middle')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .attr('fill', '#2c3e50')
            .text('ART (Available Running Total)');

        artEnter.append('text')
            .attr('x', this.config.artBoxWidth / 2)
            .attr('y', 50)
            .attr('text-anchor', 'middle')
            .attr('font-size', '13px')
            .attr('fill', '#27ae60')
            .attr('font-weight', 'bold')
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

        const edges = this.edgesGroup.selectAll('.edge')
            .data(edgeData);

        const edgeEnter = edges.enter()
            .append('g')
            .attr('class', 'edge')
            .style('cursor', 'pointer')
            .on('click', (event, d) => this.showEdgeDetails(event, d));

        // Draw curved path
        edgeEnter.append('path')
            .attr('d', d => {
                const x1 = d.source.x + this.config.nodeRadius;
                const y1 = d.source.y;
                const x2 = d.target.x - this.config.nodeRadius;
                const y2 = d.target.y;
                const mx = (x1 + x2) / 2;

                return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
            })
            .attr('fill', 'none')
            .attr('stroke', '#95a5a6')
            .attr('stroke-width', 2)
            .attr('marker-end', 'url(#arrowhead)');

        // Add arrow marker definition
        this.svg.append('defs')
            .append('marker')
            .attr('id', 'arrowhead')
            .attr('markerWidth', 10)
            .attr('markerHeight', 10)
            .attr('refX', 9)
            .attr('refY', 3)
            .attr('orient', 'auto')
            .append('polygon')
            .attr('points', '0 0, 10 3, 0 6')
            .attr('fill', '#95a5a6');

        // Add edge label with notation
        edgeEnter.append('text')
            .attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', d => (d.source.y + d.target.y) / 2 - 20)
            .attr('text-anchor', 'middle')
            .attr('font-size', '11px')
            .attr('fill', '#2c3e50')
            .attr('font-weight', 'bold')
            .text(d => d.label);

        // Add edge amount + currency label
        edgeEnter.append('text')
            .attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', d => (d.source.y + d.target.y) / 2 - 5)
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('fill', '#27ae60')
            .attr('font-weight', '600')
            .text(d => `${d.amount.toFixed(2)} ${d.currency}`);
    }

    drawNodes() {
        const nodes = this.nodesGroup.selectAll('.node')
            .data(this.nodes);

        const nodeEnter = nodes.enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x}, ${d.y})`)
            .style('cursor', 'grab')
            .on('click', (event, d) => this.showNodeDetails(event, d))
            .call(d3.drag()
                .on('start', (event, d) => {
                    event.sourceEvent.stopPropagation();  // Prevent zoom/pan interference
                    this.dragStarted(event, d);
                })
                .on('drag', (event, d) => {
                    event.sourceEvent.stopPropagation();  // Prevent zoom/pan interference
                    this.dragging(event, d);
                })
                .on('end', (event, d) => {
                    event.sourceEvent.stopPropagation();  // Prevent zoom/pan interference
                    this.dragEnded(event, d);
                }));

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

        // Node label (V-T-H notation)
        nodeEnter.append('text')
            .attr('y', -this.config.nodeRadius - 12)
            .attr('text-anchor', 'middle')
            .attr('font-size', '11px')
            .attr('font-weight', '600')
            .attr('fill', '#2c3e50')
            .text(d => d.label);

        // Wallet address
        nodeEnter.append('text')
            .attr('y', this.config.nodeRadius + 22)
            .attr('text-anchor', 'middle')
            .attr('font-size', '9px')
            .attr('fill', '#7f8c8d')
            .text(d => d.walletLabel);

        // Amount
        nodeEnter.append('text')
            .attr('y', this.config.nodeRadius + 38)
            .attr('text-anchor', 'middle')
            .attr('font-size', '11px')
            .attr('font-weight', 'bold')
            .attr('fill', '#27ae60')
            .text(d => `${d.amount.toFixed(2)} ${d.currency}`);
    }

    dragStarted(event, d) {
        d3.select(event.sourceEvent.target.parentNode).style('cursor', 'grabbing');
        d.isDragging = true;
    }

    dragging(event, d) {
        // Strictly constrain movement to vertical only within column
        const newY = event.y;
        const minY = 100;  // Top boundary (below header)
        const maxY = this.config.height - 250;  // Bottom boundary (above reconciliation boxes)

        // IMPORTANT: X position is LOCKED - never changes
        // Only Y can change, and only within bounds
        d.y = Math.max(minY, Math.min(maxY, newY));

        // Update node visual position - X is always d.x (original column position)
        d3.select(event.sourceEvent.target.parentNode)
            .attr('transform', `translate(${d.x}, ${d.y})`);

        // Update all connected edges
        this.updateEdges();
    }

    dragEnded(event, d) {
        d3.select(event.sourceEvent.target.parentNode).style('cursor', 'grab');
        d.isDragging = false;
    }

    updateEdges() {
        // Update edge paths to follow node positions
        this.edgesGroup.selectAll('.edge')
            .select('path')
            .attr('d', d => {
                const x1 = d.source.x + this.config.nodeRadius;
                const y1 = d.source.y;
                const x2 = d.target.x - this.config.nodeRadius;
                const y2 = d.target.y;
                const mx = (x1 + x2) / 2;

                return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
            });

        // Update edge notation labels
        this.edgesGroup.selectAll('.edge')
            .selectAll('text')
            .attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', (d, i) => (d.source.y + d.target.y) / 2 + (i === 0 ? 15 : -5));
    }

    showNodeDetails(event, node) {
        // Calculate total funds through this wallet
        const totalIncoming = this.edges
            .filter(e => e.target === node.id)
            .reduce((sum, e) => sum + e.amount, 0);

        const totalOutgoing = this.edges
            .filter(e => e.source === node.id)
            .reduce((sum, e) => sum + e.amount, 0);

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
                    <strong style="color: #7f8c8d;">Full Wallet Address:</strong><br>
                    <div style="background: #ecf0f1; padding: 12px; border-radius: 8px; font-family: monospace; word-break: break-all; margin-top: 5px;">
                        ${node.wallet}
                    </div>
                    <button onclick="navigator.clipboard.writeText('${node.wallet}').then(() => alert('Address copied!'))"
                            style="margin-top: 10px; padding: 8px 16px; background: #3498db; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">
                        📋 Copy Address
                    </button>
                </div>

                <div style="margin-bottom: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; border-left: 4px solid #27ae60;">
                        <div style="color: #7f8c8d; font-size: 12px; margin-bottom: 5px;">TOTAL INCOMING</div>
                        <div style="color: #27ae60; font-size: 20px; font-weight: bold;">${totalIncoming.toFixed(6)} ${node.currency}</div>
                    </div>
                    <div style="background: #ffebee; padding: 15px; border-radius: 8px; border-left: 4px solid #e74c3c;">
                        <div style="color: #7f8c8d; font-size: 12px; margin-bottom: 5px;">TOTAL OUTGOING</div>
                        <div style="color: #e74c3c; font-size: 20px; font-weight: bold;">${totalOutgoing.toFixed(6)} ${node.currency}</div>
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

                <div style="margin-bottom: 20px;">
                    <strong style="color: #7f8c8d;">Connected Thread Notations:</strong>
                    <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-top: 5px; font-family: monospace; color: #2c3e50;">
                        ${vthList || 'None'}
                    </div>
                </div>

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
        const bounds = this.mainGroup.node().getBBox();
        const fullWidth = this.config.width;
        const fullHeight = this.config.height;
        const width = bounds.width;
        const height = bounds.height;
        const midX = bounds.x + width / 2;
        const midY = bounds.y + height / 2;

        const scale = 0.9 / Math.max(width / fullWidth, height / fullHeight);
        const translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];

        this.svg.transition()
            .duration(750)
            .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
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
}
