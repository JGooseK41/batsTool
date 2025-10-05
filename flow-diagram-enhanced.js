// Enhanced Flow Diagram with Hop-Centric DAG and T-Account Style
// This creates a visualization that combines forensic tracing with accounting principles

function generateHopCentricDAG(svg, investigation) {
    // Clear existing content
    svg.innerHTML = '';

    // Configuration for hop-centric layout
    const config = {
        nodeRadius: 30,
        hopColumnWidth: 350,
        verticalSpacing: 120,
        topMargin: 120,
        bottomMargin: 100,
        leftMargin: 50,
        rightMargin: 50,
        threadLabelOffset: 15,
        artBoxHeight: 80,
        artBoxWidth: 300,
        edgeCurvature: 0.3
    };

    // Color scheme for wallet types (B.A.T.S. standard)
    const walletColors = {
        red: '#e74c3c',      // Victim
        black: '#2c3e50',    // Regular
        purple: '#9b59b6',   // Terminal/Exchange
        brown: '#8B4513',    // DEX/Swap
        gray: '#95a5a6',     // Obfuscated/Mixer
        blue: '#3498db',     // Cold Storage
        orange: '#f39c12',   // Change
        green: '#27ae60'     // Recovered
    };

    // Analyze investigation structure
    const hopColumns = [];
    const nodeMap = new Map();
    const edges = [];
    let maxNodesInColumn = 0;

    // Build victim column
    const victimColumn = {
        hopNumber: 0,
        title: 'VICTIMS',
        nodes: [],
        artBefore: {},
        artAfter: {},
        writeoffs: [],
        swaps: []
    };

    // Process victims
    investigation.victims.forEach(victim => {
        victim.transactions.forEach(tx => {
            const nodeId = `V${victim.id}-T${tx.id}`;
            const node = {
                id: nodeId,
                label: `V${victim.id}-T${tx.id}`,
                wallet: tx.receivingWallet,
                type: 'red',
                amount: parseFloat(tx.amount),
                currency: tx.currency === 'CUSTOM' ? tx.customCurrency : tx.currency,
                isVictim: true,
                timestamp: tx.datetime
            };
            victimColumn.nodes.push(node);
            nodeMap.set(nodeId, node);

            // Update ART
            const currency = node.currency;
            if (!victimColumn.artAfter[currency]) {
                victimColumn.artAfter[currency] = 0;
            }
            victimColumn.artAfter[currency] += node.amount;
        });
    });

    hopColumns.push(victimColumn);
    maxNodesInColumn = Math.max(maxNodesInColumn, victimColumn.nodes.length);

    // Process each hop
    investigation.hops.forEach(hop => {
        const hopColumn = {
            hopNumber: hop.hopNumber,
            title: `HOP ${hop.hopNumber}`,
            nodes: [],
            artBefore: hop.artAtStartByCurrency || {},
            artAfter: {},
            writeoffs: [],
            swaps: []
        };

        // Group entries by destination wallet
        const walletGroups = new Map();

        hop.entries.forEach(entry => {
            if (entry.entryType === 'writeoff') {
                hopColumn.writeoffs.push(entry);
                return;
            }

            const walletKey = entry.toWallet;
            if (!walletGroups.has(walletKey)) {
                walletGroups.set(walletKey, {
                    wallet: entry.toWallet,
                    type: entry.toWalletType || 'black',
                    entries: [],
                    totalByCurrency: {},
                    isSwap: entry.entryType === 'swap',
                    isTerminal: entry.toWalletType === 'purple' || entry.isTerminalWallet,
                    isColdStorage: entry.toWalletType === 'blue',
                    timestamp: entry.timestamp
                });
            }

            const group = walletGroups.get(walletKey);
            group.entries.push(entry);

            // Handle swaps specially
            if (entry.entryType === 'swap' && entry.swapDetails) {
                hopColumn.swaps.push(entry);
                // Track both input and output currencies
                const inputCurrency = entry.currency === 'CUSTOM' ? entry.customCurrency : entry.currency;
                const outputCurrency = entry.outputCurrency;

                if (!group.totalByCurrency[outputCurrency]) {
                    group.totalByCurrency[outputCurrency] = 0;
                }
                group.totalByCurrency[outputCurrency] += parseFloat(entry.outputAmount || 0);
            } else {
                // Regular entry
                const currency = entry.currency === 'CUSTOM' ? entry.customCurrency : entry.currency;
                if (!group.totalByCurrency[currency]) {
                    group.totalByCurrency[currency] = 0;
                }
                group.totalByCurrency[currency] += parseFloat(entry.amount);
            }
        });

        // Create nodes from wallet groups
        walletGroups.forEach((group, walletKey) => {
            const mainEntry = group.entries[0];
            const nodeId = `H${hop.hopNumber}-${walletKey.substring(0, 8)}`;
            const node = {
                id: nodeId,
                label: mainEntry.notation || `H${hop.hopNumber}`,
                wallet: group.wallet,
                type: group.type,
                totalByCurrency: group.totalByCurrency,
                isSwap: group.isSwap,
                isTerminal: group.isTerminal,
                isColdStorage: group.isColdStorage,
                entries: group.entries,
                timestamp: group.timestamp
            };

            hopColumn.nodes.push(node);
            nodeMap.set(nodeId, node);

            // Create edges from source threads
            group.entries.forEach(entry => {
                const sourceThreads = entry.multipleSourceThreads ||
                                    (entry.sourceThreadId ? [entry.sourceThreadId] : []);

                sourceThreads.forEach(sourceThread => {
                    // Find source node
                    let sourceNode = null;
                    nodeMap.forEach((node, id) => {
                        if (node.label === sourceThread ||
                            node.label.includes(sourceThread.split('-H')[0])) {
                            sourceNode = node;
                        }
                    });

                    if (sourceNode) {
                        const edgeData = {
                            from: sourceNode.id,
                            to: nodeId,
                            amount: parseFloat(entry.amount),
                            currency: entry.currency === 'CUSTOM' ? entry.customCurrency : entry.currency,
                            notation: entry.notation,
                            isSwap: entry.entryType === 'swap',
                            swapDetails: entry.swapDetails,
                            txHash: entry.txHash
                        };

                        if (entry.entryType === 'swap' && entry.swapDetails) {
                            edgeData.outputAmount = parseFloat(entry.outputAmount);
                            edgeData.outputCurrency = entry.outputCurrency;
                        }

                        edges.push(edgeData);
                    }
                });
            });

            // Update ART after
            Object.entries(group.totalByCurrency).forEach(([currency, amount]) => {
                if (!hopColumn.artAfter[currency]) {
                    hopColumn.artAfter[currency] = 0;
                }
                hopColumn.artAfter[currency] += amount;
            });
        });

        hopColumns.push(hopColumn);
        maxNodesInColumn = Math.max(maxNodesInColumn, hopColumn.nodes.length);
    });

    // Calculate SVG dimensions
    const totalWidth = config.leftMargin + (hopColumns.length * config.hopColumnWidth) + config.rightMargin;
    const totalHeight = config.topMargin + (maxNodesInColumn * config.verticalSpacing) +
                       config.artBoxHeight * 2 + config.bottomMargin;

    svg.setAttribute('width', totalWidth);
    svg.setAttribute('height', totalHeight);
    svg.setAttribute('viewBox', `0 0 ${totalWidth} ${totalHeight}`);

    // Create defs for gradients and markers
    createSVGDefs(svg, walletColors);

    // Draw hop columns with T-account style
    hopColumns.forEach((column, colIndex) => {
        const x = config.leftMargin + (colIndex * config.hopColumnWidth);

        // Draw column background
        if (colIndex > 0) {
            drawColumnBackground(svg, x, 0, config.hopColumnWidth, totalHeight, colIndex % 2 === 0);
        }

        // Draw column header
        drawColumnHeader(svg, x, config.hopColumnWidth, column.title);

        // Draw T-account style ART boxes
        if (colIndex > 0) {
            drawARTBox(svg, x + 25, 50, column.artBefore, 'Starting ART', config, true);
        }

        // Position and draw nodes
        column.nodes.forEach((node, nodeIndex) => {
            const nodeY = config.topMargin + config.artBoxHeight + (nodeIndex * config.verticalSpacing);
            const nodeX = x + config.hopColumnWidth / 2;

            node.x = nodeX;
            node.y = nodeY;

            drawWalletNode(svg, node, nodeX, nodeY, config, walletColors);
        });

        // Draw ending ART with reconciliation
        if (column.nodes.length > 0) {
            const bottomY = config.topMargin + config.artBoxHeight +
                          (column.nodes.length * config.verticalSpacing) + 30;

            // Calculate reconciliation
            const reconciliation = calculateReconciliation(column);
            drawARTBox(svg, x + 25, bottomY, column.artAfter, 'Ending ART', config, false, reconciliation);
        }

        // Draw writeoffs if any
        if (column.writeoffs && column.writeoffs.length > 0) {
            drawWriteoffs(svg, x, totalHeight - 100, column.writeoffs, config);
        }
    });

    // Draw edges with thread amounts
    edges.forEach(edge => {
        const fromNode = nodeMap.get(edge.from);
        const toNode = nodeMap.get(edge.to);

        if (fromNode && toNode) {
            drawThreadEdge(svg, fromNode, toNode, edge, config);
        }
    });

    // Add legend
    drawLegend(svg, totalWidth - 200, totalHeight - 180, walletColors);

    // Add summary statistics
    drawSummaryStats(svg, 10, totalHeight - 80, investigation);
}

// Helper functions for the DAG visualization

function createSVGDefs(svg, colors) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    // Arrow marker
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '7');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '3.5');
    marker.setAttribute('orient', 'auto');

    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
    polygon.setAttribute('fill', '#333');
    marker.appendChild(polygon);
    defs.appendChild(marker);

    // Create gradients for each wallet type
    Object.entries(colors).forEach(([type, color]) => {
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
        gradient.setAttribute('id', `gradient-${type}`);

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', color);
        stop1.setAttribute('stop-opacity', '0.8');

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', color);
        stop2.setAttribute('stop-opacity', '1');

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
    });

    svg.appendChild(defs);
}

function drawColumnBackground(svg, x, y, width, height, isEven) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    rect.setAttribute('fill', isEven ? '#f8f9fa' : '#ffffff');
    rect.setAttribute('opacity', '0.5');
    svg.appendChild(rect);
}

function drawColumnHeader(svg, x, width, title) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Header background
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', 0);
    rect.setAttribute('width', width);
    rect.setAttribute('height', 40);
    rect.setAttribute('fill', '#2c3e50');
    g.appendChild(rect);

    // Header text
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x + width / 2);
    text.setAttribute('y', 25);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '18');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('fill', 'white');
    text.textContent = title;
    g.appendChild(text);

    svg.appendChild(g);
}

function drawWalletNode(svg, node, x, y, config, colors) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'wallet-node');
    g.style.cursor = 'pointer';

    // Outer ring for terminals
    if (node.isTerminal) {
        const outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        outerCircle.setAttribute('cx', x);
        outerCircle.setAttribute('cy', y);
        outerCircle.setAttribute('r', config.nodeRadius + 5);
        outerCircle.setAttribute('fill', 'none');
        outerCircle.setAttribute('stroke', colors.purple);
        outerCircle.setAttribute('stroke-width', '3');
        outerCircle.setAttribute('stroke-dasharray', '5,5');
        g.appendChild(outerCircle);
    }

    // Main circle with gradient
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', config.nodeRadius);
    circle.setAttribute('fill', `url(#gradient-${node.type})`);
    circle.setAttribute('stroke', '#fff');
    circle.setAttribute('stroke-width', '2');
    g.appendChild(circle);

    // Node label
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', x);
    label.setAttribute('y', y + 5);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', '14');
    label.setAttribute('fill', 'white');
    label.setAttribute('font-weight', 'bold');
    label.textContent = node.label.split('-').slice(-1)[0];
    g.appendChild(label);

    // Wallet address
    const address = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    address.setAttribute('x', x);
    address.setAttribute('y', y + config.nodeRadius + 15);
    address.setAttribute('text-anchor', 'middle');
    address.setAttribute('font-size', '10');
    address.setAttribute('fill', '#666');
    address.textContent = node.wallet ?
        `${node.wallet.substring(0, 6)}...${node.wallet.slice(-4)}` : '';
    g.appendChild(address);

    // Amount summary
    if (node.totalByCurrency) {
        let yOffset = 0;
        Object.entries(node.totalByCurrency).forEach(([curr, amt]) => {
            const amountText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            amountText.setAttribute('x', x);
            amountText.setAttribute('y', y + config.nodeRadius + 28 + yOffset);
            amountText.setAttribute('text-anchor', 'middle');
            amountText.setAttribute('font-size', '11');
            amountText.setAttribute('fill', '#333');
            amountText.setAttribute('font-weight', 'bold');
            amountText.textContent = `${amt.toLocaleString()} ${curr}`;
            g.appendChild(amountText);
            yOffset += 14;
        });
    }

    // Terminal indicator
    if (node.isTerminal) {
        const terminal = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        terminal.setAttribute('x', x + config.nodeRadius + 10);
        terminal.setAttribute('y', y - config.nodeRadius);
        terminal.setAttribute('font-size', '20');
        terminal.textContent = '🛑';
        g.appendChild(terminal);
    }

    // Add hover effect
    g.onmouseenter = () => {
        circle.style.filter = 'brightness(1.2)';
    };
    g.onmouseleave = () => {
        circle.style.filter = '';
    };

    svg.appendChild(g);
}

function drawThreadEdge(svg, fromNode, toNode, edge, config) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Calculate control points for curved path
    const startX = fromNode.x + config.nodeRadius;
    const startY = fromNode.y;
    const endX = toNode.x - config.nodeRadius;
    const endY = toNode.y;
    const midX = (startX + endX) / 2;
    const controlX = midX + (endX - startX) * config.edgeCurvature;

    // Create path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M ${startX} ${startY} Q ${controlX} ${startY} ${midX} ${(startY + endY) / 2} T ${endX} ${endY}`;
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', edge.isSwap ? '#8B4513' : '#333');
    path.setAttribute('stroke-width', edge.isSwap ? '3' : '2');
    path.setAttribute('marker-end', 'url(#arrowhead)');
    path.style.strokeDasharray = edge.isSwap ? '8,4' : 'none';
    path.style.opacity = '0.7';
    g.appendChild(path);

    // Thread amount label with background
    const labelX = midX;
    const labelY = (startY + endY) / 2;

    const labelBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    labelBg.setAttribute('x', labelX - 50);
    labelBg.setAttribute('y', labelY - 12);
    labelBg.setAttribute('width', '100');
    labelBg.setAttribute('height', '24');
    labelBg.setAttribute('fill', 'white');
    labelBg.setAttribute('stroke', edge.isSwap ? '#8B4513' : '#333');
    labelBg.setAttribute('stroke-width', '1');
    labelBg.setAttribute('rx', '3');
    labelBg.style.opacity = '0.95';
    g.appendChild(labelBg);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', labelX);
    label.setAttribute('y', labelY + 4);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', '12');
    label.setAttribute('fill', '#333');
    label.setAttribute('font-weight', 'bold');

    if (edge.isSwap && edge.outputAmount) {
        label.textContent = `${edge.amount.toLocaleString()} ${edge.currency} → ${edge.outputAmount.toLocaleString()} ${edge.outputCurrency}`;
    } else {
        label.textContent = `${edge.amount.toLocaleString()} ${edge.currency}`;
    }
    g.appendChild(label);

    svg.appendChild(g);
}

function drawARTBox(svg, x, y, artByCurrency, title, config, isStart, reconciliation) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // T-account style box
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', config.artBoxWidth);
    rect.setAttribute('height', config.artBoxHeight);
    rect.setAttribute('fill', '#f8f9fa');
    rect.setAttribute('stroke', '#2c3e50');
    rect.setAttribute('stroke-width', '2');
    rect.setAttribute('rx', '5');
    g.appendChild(rect);

    // Title with underline (T-account style)
    const titleText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    titleText.setAttribute('x', x + config.artBoxWidth / 2);
    titleText.setAttribute('y', y + 18);
    titleText.setAttribute('text-anchor', 'middle');
    titleText.setAttribute('font-size', '13');
    titleText.setAttribute('font-weight', 'bold');
    titleText.setAttribute('fill', '#2c3e50');
    titleText.textContent = title;
    g.appendChild(titleText);

    // Underline
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x + 10);
    line.setAttribute('y1', y + 25);
    line.setAttribute('x2', x + config.artBoxWidth - 10);
    line.setAttribute('y2', y + 25);
    line.setAttribute('stroke', '#2c3e50');
    line.setAttribute('stroke-width', '1');
    g.appendChild(line);

    // Currency amounts
    let offsetY = 40;
    Object.entries(artByCurrency).forEach(([currency, amount]) => {
        if (amount > 0.01) {
            const amountText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            amountText.setAttribute('x', x + config.artBoxWidth / 2);
            amountText.setAttribute('y', y + offsetY);
            amountText.setAttribute('text-anchor', 'middle');
            amountText.setAttribute('font-size', '12');
            amountText.setAttribute('fill', '#333');
            amountText.textContent = `${amount.toLocaleString()} ${currency}`;
            g.appendChild(amountText);
            offsetY += 16;
        }
    });

    // Add reconciliation if provided
    if (reconciliation) {
        offsetY += 5;
        const reconText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        reconText.setAttribute('x', x + config.artBoxWidth / 2);
        reconText.setAttribute('y', y + offsetY);
        reconText.setAttribute('text-anchor', 'middle');
        reconText.setAttribute('font-size', '10');
        reconText.setAttribute('fill', reconciliation.isBalanced ? '#27ae60' : '#e74c3c');
        reconText.setAttribute('font-style', 'italic');
        reconText.textContent = reconciliation.message;
        g.appendChild(reconText);
    }

    svg.appendChild(g);
}

function calculateReconciliation(column) {
    let isBalanced = true;
    let message = '✓ Balanced';

    Object.entries(column.artBefore).forEach(([currency, startAmount]) => {
        const endAmount = column.artAfter[currency] || 0;
        const diff = Math.abs(startAmount - endAmount);

        if (diff > 0.01 && !column.swaps.some(s => s.currency === currency)) {
            isBalanced = false;
            message = `⚠ Variance: ${diff.toFixed(2)} ${currency}`;
        }
    });

    return { isBalanced, message };
}

function drawLegend(svg, x, y, colors) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('x', x - 10);
    bg.setAttribute('y', y - 20);
    bg.setAttribute('width', 180);
    bg.setAttribute('height', 160);
    bg.setAttribute('fill', 'white');
    bg.setAttribute('stroke', '#ddd');
    bg.setAttribute('stroke-width', '1');
    bg.setAttribute('rx', '5');
    bg.style.opacity = '0.95';
    g.appendChild(bg);

    // Title
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', x);
    title.setAttribute('y', y);
    title.setAttribute('font-size', '13');
    title.setAttribute('font-weight', 'bold');
    title.setAttribute('fill', '#2c3e50');
    title.textContent = 'Wallet Types';
    g.appendChild(title);

    const legendItems = [
        { color: colors.red, label: 'Victim' },
        { color: colors.black, label: 'Regular' },
        { color: colors.purple, label: 'Exchange/Terminal' },
        { color: colors.brown, label: 'DEX/Swap' },
        { color: colors.gray, label: 'Mixer/Obfuscated' },
        { color: colors.blue, label: 'Cold Storage' },
        { color: colors.orange, label: 'Change' }
    ];

    legendItems.forEach((item, index) => {
        const itemY = y + 20 + (index * 18);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x + 10);
        circle.setAttribute('cy', itemY);
        circle.setAttribute('r', 6);
        circle.setAttribute('fill', item.color);
        g.appendChild(circle);

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x + 25);
        label.setAttribute('y', itemY + 4);
        label.setAttribute('font-size', '11');
        label.setAttribute('fill', '#333');
        label.textContent = item.label;
        g.appendChild(label);
    });

    svg.appendChild(g);
}

function drawSummaryStats(svg, x, y, investigation) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Calculate totals
    let totalVictimAmount = 0;
    let totalRecovered = 0;
    let totalAtTerminals = 0;

    investigation.victims.forEach(v => {
        v.transactions.forEach(t => {
            totalVictimAmount += parseFloat(t.amount || 0);
        });
    });

    if (investigation.terminalWalletIndex) {
        investigation.terminalWalletIndex.forEach(t => {
            totalAtTerminals += t.amount;
        });
    }

    const recoveryRate = totalVictimAmount > 0 ?
        ((totalAtTerminals / totalVictimAmount) * 100).toFixed(1) : 0;

    // Background
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('x', x);
    bg.setAttribute('y', y - 15);
    bg.setAttribute('width', 250);
    bg.setAttribute('height', 70);
    bg.setAttribute('fill', '#2c3e50');
    bg.setAttribute('rx', '5');
    bg.style.opacity = '0.9';
    g.appendChild(bg);

    // Title
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', x + 10);
    title.setAttribute('y', y);
    title.setAttribute('font-size', '12');
    title.setAttribute('font-weight', 'bold');
    title.setAttribute('fill', 'white');
    title.textContent = 'Investigation Summary';
    g.appendChild(title);

    // Stats
    const stats = [
        `Victims: ${investigation.victims.length}`,
        `Hops: ${investigation.hops.length}`,
        `Terminal Arrivals: ${investigation.terminalWalletIndex ? investigation.terminalWalletIndex.length : 0}`,
        `Recovery Rate: ${recoveryRate}%`
    ];

    stats.forEach((stat, index) => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x + 10);
        text.setAttribute('y', y + 18 + (index * 12));
        text.setAttribute('font-size', '11');
        text.setAttribute('fill', '#ecf0f1');
        text.textContent = stat;
        g.appendChild(text);
    });

    svg.appendChild(g);
}

function drawWriteoffs(svg, x, y, writeoffs, config) {
    if (writeoffs.length === 0) return;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    // Writeoff indicator
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x + config.hopColumnWidth / 2);
    text.setAttribute('y', y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '11');
    text.setAttribute('fill', '#e74c3c');
    text.setAttribute('font-style', 'italic');

    const total = writeoffs.reduce((sum, w) => sum + parseFloat(w.amount || 0), 0);
    text.textContent = `Writeoffs: ${total.toLocaleString()}`;
    g.appendChild(text);

    svg.appendChild(g);
}

// Export the main function
window.generateHopCentricDAG = generateHopCentricDAG;