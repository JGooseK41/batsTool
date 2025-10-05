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
            width: 2400,
            height: 1600,
            margin: { top: 80, right: 50, bottom: 80, left: 50 },
            hopColumnWidth: 350,
            nodeRadius: 35,
            verticalSpacing: 100,
            artBoxHeight: 70,
            artBoxWidth: 280,
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

        // Build victim column (Hop 0)
        const victimColumn = {
            hopNumber: 0,
            title: 'VICTIMS',
            nodes: [],
            artBefore: {},
            artAfter: {},
            x: this.config.margin.left + this.config.hopColumnWidth / 2
        };

        // Add victim nodes
        this.investigation.victims.forEach((victim, vIndex) => {
            victim.transactions.forEach((tx, tIndex) => {
                const nodeId = `V${victim.id}-T${tx.id}`;
                const node = {
                    id: nodeId,
                    label: `V${victim.id}-T${tx.id}`,
                    wallet: tx.receivingWallet,
                    walletLabel: tx.walletLabel || this.shortenAddress(tx.receivingWallet),
                    type: 'red',
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
                x: this.config.margin.left + (hopIndex + 1) * this.config.hopColumnWidth + this.config.hopColumnWidth / 2
            };

            // Process entries
            hop.entries.forEach((entry, entryIndex) => {
                if (entry.entryType === 'writeoff') {
                    // Skip writeoffs for now (could add as special nodes later)
                    return;
                }

                const nodeId = `H${hop.hopNumber}-E${entryIndex}`;
                const node = {
                    id: nodeId,
                    label: entry.notation || nodeId,
                    wallet: entry.destinationWallet,
                    walletLabel: entry.walletLabel || this.shortenAddress(entry.destinationWallet),
                    type: entry.walletType || 'black',
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
                            currency: node.currency
                        });
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

    render() {
        if (this.layoutMode === 'sankey') {
            this.renderSankey();
        } else {
            this.renderHopColumns();
        }
    }

    renderHopColumns() {
        console.log('Rendering hop-centric column layout...');

        // Position nodes in columns
        this.hopColumns.forEach((column, colIndex) => {
            const columnX = this.config.margin.left + colIndex * this.config.hopColumnWidth;
            const totalHeight = column.nodes.length * this.config.verticalSpacing;
            const startY = (this.config.height - totalHeight) / 2;

            column.nodes.forEach((node, nodeIndex) => {
                node.x = columnX + this.config.hopColumnWidth / 2;
                node.y = startY + nodeIndex * this.config.verticalSpacing;
            });
        });

        // Draw hop column dividers
        this.drawHopDividers();

        // Draw ART boxes
        this.drawARTBoxes();

        // Draw edges
        this.drawEdges();

        // Draw nodes
        this.drawNodes();

        // Fit to view
        this.fitToView();
    }

    drawHopDividers() {
        const dividers = this.mainGroup.selectAll('.hop-divider')
            .data(this.hopColumns);

        dividers.enter()
            .append('g')
            .attr('class', 'hop-divider')
            .each(function(d, i) {
                const g = d3.select(this);

                // Vertical line
                g.append('line')
                    .attr('x1', d.x)
                    .attr('y1', 50)
                    .attr('x2', d.x)
                    .attr('y2', 1550)
                    .attr('stroke', '#ddd')
                    .attr('stroke-width', 2)
                    .attr('stroke-dasharray', '5,5');

                // Title
                g.append('text')
                    .attr('x', d.x)
                    .attr('y', 40)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '20px')
                    .attr('font-weight', 'bold')
                    .attr('fill', '#2c3e50')
                    .text(d.title);
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
            .attr('class', 'edge');

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

        // Add edge label
        edgeEnter.append('text')
            .attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', d => (d.source.y + d.target.y) / 2 - 10)
            .attr('text-anchor', 'middle')
            .attr('font-size', '11px')
            .attr('fill', '#7f8c8d')
            .attr('font-weight', '600')
            .text(d => d.label);
    }

    drawNodes() {
        const nodes = this.nodesGroup.selectAll('.node')
            .data(this.nodes);

        const nodeEnter = nodes.enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => `translate(${d.x}, ${d.y})`)
            .style('cursor', 'pointer')
            .on('click', (event, d) => this.editNodeLabel(event, d));

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

        // Node label (V-T-H notation)
        nodeEnter.append('text')
            .attr('y', -this.config.nodeRadius - 10)
            .attr('text-anchor', 'middle')
            .attr('font-size', '13px')
            .attr('font-weight', 'bold')
            .attr('fill', '#2c3e50')
            .text(d => d.label);

        // Wallet address
        nodeEnter.append('text')
            .attr('y', this.config.nodeRadius + 20)
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('fill', '#7f8c8d')
            .text(d => d.walletLabel);

        // Amount
        nodeEnter.append('text')
            .attr('y', this.config.nodeRadius + 35)
            .attr('text-anchor', 'middle')
            .attr('font-size', '11px')
            .attr('font-weight', 'bold')
            .attr('fill', '#27ae60')
            .text(d => `${d.amount.toFixed(2)} ${d.currency}`);
    }

    editNodeLabel(event, node) {
        const newLabel = prompt(`Edit label for ${node.id}:`, node.walletLabel);
        if (newLabel !== null && newLabel.trim() !== '') {
            node.walletLabel = newLabel.trim();
            this.render(); // Re-render to show updated label
        }
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
