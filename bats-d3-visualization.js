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

        this.svg.call(this.zoom);

        // Main group for all elements
        this.mainGroup = this.svg.append('g');

        // Groups for different layers
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
                    walletId: this.generateWalletId(colorType),
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

                // Handle swaps/conversions - create intermediate DEX node in hop space
                if (entry.entryType === 'swap' || entry.walletType === 'brown' || entry.isBridge) {
                    const swapNodeId = `H${hop.hopNumber}-SWAP${entryIndex}`;
                    const colorType = 'brown';
                    const swapNode = {
                        id: swapNodeId,
                        label: entry.swapPlatform || 'DEX',
                        wallet: entry.destinationWallet || 'Swap Contract',
                        walletLabel: entry.swapPlatform || 'Conversion',
                        walletId: this.generateWalletId(colorType),
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
                                entryData: entry  // Store full entry for details
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
                        walletId: this.generateWalletId(outputColorType),
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
                        entryData: entry  // Store full entry for details
                    });

                    // Update ART with output currency
                    const outCurrency = outputNode.currency;
                    hopColumn.artAfter[outCurrency] = (hopColumn.artAfter[outCurrency] || 0) + outputNode.amount;

                } else {
                    // Regular trace entry
                    const nodeId = `H${hop.hopNumber}-E${entryIndex}`;
                    const colorType = entry.walletType || 'black';
                    const node = {
                        id: nodeId,
                        label: entry.notation || nodeId,
                        wallet: entry.destinationWallet,
                        walletLabel: entry.walletLabel || this.shortenAddress(entry.destinationWallet),
                        walletId: this.generateWalletId(colorType),
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

    generateWalletId(colorType) {
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

        return `${prefixes[colorType] || 'U'}-${count}`;
    }

    render() {
        if (this.layoutMode === 'sankey') {
            this.renderSankey();
        } else {
            this.renderHopColumns();
        }
    }

    renderHopColumns() {
        console.log('Rendering hop-centric column layout...');

        // Calculate positions for wallet columns and hop spaces
        // Layout: [Wallet Col 0] [Hop Space 1] [Wallet Col 1] [Hop Space 2] [Wallet Col 2] ...
        this.hopColumns.forEach((column) => {
            const colIndex = column.columnIndex;
            column.x = this.config.margin.left +
                       colIndex * (this.config.walletColumnWidth + this.config.hopSpaceWidth) +
                       this.config.walletColumnWidth / 2;
        });

        // Position nodes in their wallet columns
        this.hopColumns.forEach((column) => {
            const totalHeight = column.nodes.length * this.config.verticalSpacing;
            const startY = (this.config.height - totalHeight) / 2;

            column.nodes.forEach((node, nodeIndex) => {
                node.x = column.x;
                node.y = startY + nodeIndex * this.config.verticalSpacing;
            });
        });

        // Position swap nodes in hop spaces (between columns)
        const swapNodes = this.nodes.filter(n => n.isSwap);
        swapNodes.forEach((swapNode, index) => {
            const colIndex = Math.floor(swapNode.column);
            const leftColumn = this.hopColumns[colIndex];
            const rightColumn = this.hopColumns[colIndex + 1];

            if (leftColumn && rightColumn) {
                // Position in middle of hop space
                swapNode.x = (leftColumn.x + this.config.walletColumnWidth / 2 +
                             rightColumn.x - this.config.walletColumnWidth / 2) / 2;
                swapNode.y = 400 + index * 120;  // Stagger vertically if multiple swaps
            }
        });

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
        const columns = this.mainGroup.selectAll('.wallet-column-bg')
            .data(this.hopColumns);

        columns.enter()
            .append('rect')
            .attr('class', 'wallet-column-bg')
            .attr('x', d => d.x - this.config.walletColumnWidth / 2)
            .attr('y', 60)
            .attr('width', this.config.walletColumnWidth)
            .attr('height', 1420)
            .attr('fill', d => d.columnIndex === 0 ? '#ffe6e6' : '#e6f2ff')  // Light red for victims, light blue for others
            .attr('opacity', 0.3)
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
        // Draw labels in the space BETWEEN wallet columns
        const hopSpaces = [];

        for (let i = 0; i < this.hopColumns.length - 1; i++) {
            const leftColumn = this.hopColumns[i];
            const rightColumn = this.hopColumns[i + 1];

            hopSpaces.push({
                hopNumber: rightColumn.hopNumber,
                x: (leftColumn.x + this.config.walletColumnWidth / 2 + rightColumn.x - this.config.walletColumnWidth / 2) / 2,
                leftX: leftColumn.x + this.config.walletColumnWidth / 2,
                rightX: rightColumn.x - this.config.walletColumnWidth / 2
            });
        }

        const labels = this.mainGroup.selectAll('.hop-space-label')
            .data(hopSpaces);

        labels.enter()
            .append('text')
            .attr('class', 'hop-space-label')
            .attr('x', d => d.x)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .attr('font-size', '18px')
            .attr('font-weight', 'bold')
            .attr('fill', '#7f8c8d')
            .text(d => `→ HOP ${d.hopNumber} →`);

        // Draw subtle vertical guides at hop space boundaries
        const guides = this.mainGroup.selectAll('.hop-guide')
            .data(hopSpaces);

        guides.enter()
            .append('line')
            .attr('class', 'hop-guide')
            .attr('x1', d => d.leftX)
            .attr('y1', 60)
            .attr('x2', d => d.leftX)
            .attr('y2', 1480)
            .attr('stroke', '#ddd')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '10,5')
            .attr('opacity', 0.4);
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
            .style('cursor', 'pointer')
            .on('click', (event, d) => this.showNodeDetails(event, d));

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

        // Wallet ID (B-1, P-2, etc) - top label
        nodeEnter.append('text')
            .attr('y', -this.config.nodeRadius - 30)
            .attr('text-anchor', 'middle')
            .attr('font-size', '14px')
            .attr('font-weight', 'bold')
            .attr('fill', d => this.config.colors[d.type] || '#2c3e50')
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

    showNodeDetails(event, node) {
        const details = `
Wallet ID: ${node.walletId}
Thread Notation: ${node.label}
Full Address: ${node.wallet}
Amount: ${node.amount.toFixed(6)} ${node.currency}
Type: ${node.type.charAt(0).toUpperCase() + node.type.slice(1)}
${node.isSwap ? '\nSwap/Conversion Node' : ''}
${node.isTerminal ? '\nTerminal Exchange' : ''}

Click OK to copy full address to clipboard.
        `.trim();

        if (confirm(details)) {
            navigator.clipboard.writeText(node.wallet);
            alert('Address copied to clipboard!');
        }
    }

    showEdgeDetails(event, edge) {
        if (!edge.entryData) {
            alert('No entry data available for this edge.');
            return;
        }

        const entry = edge.entryData;
        const details = `
═══════════════════════════════════
THREAD DETAILS
═══════════════════════════════════
Notation: ${entry.notation || 'N/A'}
Amount: ${edge.amount.toFixed(6)} ${edge.currency}

Source Thread: ${entry.sourceThreadId || 'N/A'}
Destination: ${entry.destinationWallet || 'N/A'}
${entry.transactionHash ? `\nTx Hash: ${entry.transactionHash}` : ''}
${entry.timestamp ? `\nTimestamp: ${entry.timestamp}` : ''}

Entry Type: ${entry.entryType || 'trace'}
${entry.walletType ? `Wallet Type: ${entry.walletType}` : ''}

${entry.notes ? `\n───────────────────────────────────\nNOTES:\n${entry.notes}\n───────────────────────────────────` : ''}

${entry.swapDetails ? `\n───────────────────────────────────\nSWAP DETAILS:\nPlatform: ${entry.swapPlatform || entry.swapDetails.platform || 'Unknown'}\nInput: ${entry.amount} ${entry.currency}\nOutput: ${entry.swapDetails.outputAmount || entry.outputAmount} ${entry.swapDetails.outputCurrency}\n───────────────────────────────────` : ''}
        `.trim();

        alert(details);
    }

    renderSankey() {
        console.log('Rendering Sankey diagram...');
        // TODO: Implement Sankey layout using d3-sankey
        alert('Sankey diagram coming soon!');
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
