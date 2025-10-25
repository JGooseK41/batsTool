/**
 * B.A.T.S. Modern Visualization Engine
 * A complete rewrite with modular architecture, Canvas rendering, and smart layouts
 */

// ============================================
// Core Data Model
// ============================================

class InvestigationGraph {
    constructor() {
        this.nodes = new Map();  // id -> node
        this.edges = new Map();  // id -> edge
        this.layers = [];        // Hierarchical layers
        this.metadata = {
            totalVictimAmount: 0,
            totalHops: 0,
            currencies: new Set(),
            startTime: null,
            endTime: null
        };
    }

    addNode(id, data) {
        this.nodes.set(id, {
            id,
            x: 0,
            y: 0,
            width: 100,
            height: 50,
            type: 'default',
            layer: 0,
            ...data
        });
    }

    addEdge(id, source, target, data = {}) {
        if (!this.nodes.has(source) || !this.nodes.has(target)) {
            console.warn(`Cannot add edge: nodes ${source} or ${target} not found`);
            return;
        }

        this.edges.set(id, {
            id,
            source,
            target,
            ...data
        });
    }

    getNode(id) {
        return this.nodes.get(id);
    }

    getEdge(id) {
        return this.edges.get(id);
    }

    // Computed properties
    get totalFlow() {
        let total = 0;
        this.nodes.forEach(node => {
            if (node.type === 'victim' && node.amount) {
                total += parseFloat(node.amount);
            }
        });
        return total;
    }

    get terminalNodes() {
        return Array.from(this.nodes.values()).filter(n => n.type === 'terminal');
    }

    clear() {
        this.nodes.clear();
        this.edges.clear();
        this.layers = [];
        this.metadata = {};
    }
}

// ============================================
// Canvas Renderer
// ============================================

class CanvasRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasId;
        }

        this.ctx = this.canvas.getContext('2d');
        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCtx = this.offscreenCanvas.getContext('2d');

        this.camera = {
            x: 0,
            y: 0,
            zoom: 1
        };

        this.theme = {
            background: '#1a1a2e',
            grid: 'rgba(255, 255, 255, 0.05)',

            node: {
                victim: { fill: '#ef4444', stroke: '#dc2626', text: '#fff' },
                hop: { fill: '#3b82f6', stroke: '#2563eb', text: '#fff' },
                terminal: { fill: '#10b981', stroke: '#059669', text: '#fff' },
                bridge: { fill: '#8b5cf6', stroke: '#7c3aed', text: '#fff' },
                default: { fill: '#64748b', stroke: '#475569', text: '#fff' }
            },

            edge: {
                stroke: 'rgba(255, 255, 255, 0.3)',
                strokeActive: '#fbbf24',
                width: 2
            }
        };

        this.setupCanvas();
    }

    setupCanvas() {
        // Set canvas size
        this.resize();

        // Handle resize
        window.addEventListener('resize', () => this.resize());

        // Set up double buffering
        this.offscreenCanvas.width = this.canvas.width;
        this.offscreenCanvas.height = this.canvas.height;
    }

    resize() {
        const container = this.canvas.parentElement || document.body;
        let width = container.clientWidth;
        let height = container.clientHeight;

        // Fallback if container has no size yet
        if (width === 0 || height === 0) {
            width = window.innerWidth - 40;
            height = window.innerHeight - 200;
        }

        // Ensure minimum size
        width = Math.max(width, 800);
        height = Math.max(height, 600);

        this.canvas.width = width;
        this.canvas.height = height;

        console.log(`Canvas resized to: ${width}x${height}`);

        if (this.offscreenCanvas) {
            this.offscreenCanvas.width = this.canvas.width;
            this.offscreenCanvas.height = this.canvas.height;
        }
    }

    clear() {
        this.ctx.fillStyle = this.theme.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    renderGrid() {
        const { zoom } = this.camera;
        const gridSize = 50 * zoom;

        this.ctx.strokeStyle = this.theme.grid;
        this.ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    worldToScreen(x, y) {
        return {
            x: (x - this.camera.x) * this.camera.zoom + this.canvas.width / 2,
            y: (y - this.camera.y) * this.camera.zoom + this.canvas.height / 2
        };
    }

    screenToWorld(x, y) {
        return {
            x: (x - this.canvas.width / 2) / this.camera.zoom + this.camera.x,
            y: (y - this.canvas.height / 2) / this.camera.zoom + this.camera.y
        };
    }

    renderNode(node) {
        const pos = this.worldToScreen(node.x, node.y);
        const theme = this.theme.node[node.type] || this.theme.node.default;

        // Draw node background
        this.ctx.fillStyle = theme.fill;
        this.ctx.strokeStyle = theme.stroke;
        this.ctx.lineWidth = 2;

        if (node.type === 'terminal') {
            // Diamond shape for terminals
            this.ctx.beginPath();
            this.ctx.moveTo(pos.x, pos.y - node.height/2);
            this.ctx.lineTo(pos.x + node.width/2, pos.y);
            this.ctx.lineTo(pos.x, pos.y + node.height/2);
            this.ctx.lineTo(pos.x - node.width/2, pos.y);
            this.ctx.closePath();
        } else if (node.type === 'victim') {
            // Circle for victims
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, node.width/2, 0, Math.PI * 2);
            this.ctx.closePath();
        } else {
            // Rectangle for others
            this.ctx.beginPath();
            this.ctx.roundRect(
                pos.x - node.width/2,
                pos.y - node.height/2,
                node.width,
                node.height,
                5
            );
        }

        this.ctx.fill();
        this.ctx.stroke();

        // Draw text
        this.ctx.fillStyle = theme.text;
        this.ctx.font = `${12 * this.camera.zoom}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        // Label
        const label = node.label || node.id;
        this.ctx.fillText(label, pos.x, pos.y - 5);

        // Amount (if exists)
        if (node.amount !== undefined) {
            this.ctx.font = `bold ${10 * this.camera.zoom}px Arial`;
            this.ctx.fillText(`${node.amount} ${node.currency || ''}`, pos.x, pos.y + 10);
        }
    }

    renderEdge(edge, sourceNode, targetNode) {
        const start = this.worldToScreen(sourceNode.x, sourceNode.y);
        const end = this.worldToScreen(targetNode.x, targetNode.y);

        this.ctx.strokeStyle = edge.active ?
            this.theme.edge.strokeActive :
            this.theme.edge.stroke;
        this.ctx.lineWidth = this.theme.edge.width * this.camera.zoom;

        // Draw line
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);

        // Add curve for better visualization
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2 - 50;

        this.ctx.quadraticCurveTo(midX, midY, end.x, end.y);
        this.ctx.stroke();

        // Draw arrow
        const angle = Math.atan2(end.y - midY, end.x - midX);
        const arrowLength = 15 * this.camera.zoom;

        this.ctx.beginPath();
        this.ctx.moveTo(end.x, end.y);
        this.ctx.lineTo(
            end.x - arrowLength * Math.cos(angle - Math.PI/6),
            end.y - arrowLength * Math.sin(angle - Math.PI/6)
        );
        this.ctx.moveTo(end.x, end.y);
        this.ctx.lineTo(
            end.x - arrowLength * Math.cos(angle + Math.PI/6),
            end.y - arrowLength * Math.sin(angle + Math.PI/6)
        );
        this.ctx.stroke();
    }

    render(graph, options = {}) {
        const visibleNodes = options.visibleNodes || new Set(graph.nodes.keys());
        const visibleEdges = options.visibleEdges || new Set(graph.edges.keys());

        // Clear canvas
        this.clear();

        // Render grid (optional)
        if (this.camera.zoom > 0.5) {
            this.renderGrid();
        }

        // Render only visible edges
        graph.edges.forEach((edge, edgeId) => {
            if (visibleEdges.has(edgeId)) {
                const sourceNode = graph.getNode(edge.source);
                const targetNode = graph.getNode(edge.target);

                if (sourceNode && targetNode) {
                    this.renderEdge(edge, sourceNode, targetNode);
                }
            }
        });

        // Render only visible nodes
        graph.nodes.forEach((node, nodeId) => {
            if (visibleNodes.has(nodeId)) {
                this.renderNode(node);
            }
        });
    }

    panTo(x, y, duration = 500) {
        const startX = this.camera.x;
        const startY = this.camera.y;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-in-out
            const eased = progress < 0.5 ?
                2 * progress * progress :
                1 - Math.pow(-2 * progress + 2, 2) / 2;

            this.camera.x = startX + (x - startX) * eased;
            this.camera.y = startY + (y - startY) * eased;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    zoomTo(level, duration = 300) {
        const startZoom = this.camera.zoom;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-in-out
            const eased = progress < 0.5 ?
                2 * progress * progress :
                1 - Math.pow(-2 * progress + 2, 2) / 2;

            this.camera.zoom = startZoom + (level - startZoom) * eased;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
}

// ============================================
// Smart Layout Engine
// ============================================

class SmartLayout {
    constructor() {
        this.config = {
            nodeSpacing: 150,
            layerSpacing: 200,
            padding: 50
        };
    }

    // Hierarchical layout for DAG structures
    hierarchicalLayout(graph) {
        // Group nodes by layer
        const layers = this.groupByLayers(graph);

        // Position each layer
        layers.forEach((layer, layerIndex) => {
            const layerY = layerIndex * this.config.layerSpacing + this.config.padding;
            const layerWidth = layer.length * this.config.nodeSpacing;
            const startX = -layerWidth / 2 + this.config.nodeSpacing / 2;

            layer.forEach((node, nodeIndex) => {
                node.x = startX + nodeIndex * this.config.nodeSpacing;
                node.y = layerY;
            });
        });

        return graph;
    }

    // Force-directed layout for complex networks
    forceDirectedLayout(graph, iterations = 100) {
        const nodes = Array.from(graph.nodes.values());
        const edges = Array.from(graph.edges.values());

        // Initialize random positions
        nodes.forEach(node => {
            node.x = (Math.random() - 0.5) * 1000;
            node.y = (Math.random() - 0.5) * 1000;
            node.vx = 0;
            node.vy = 0;
        });

        // Simulation parameters
        const k = Math.sqrt(1000 * 1000 / nodes.length);  // Ideal spring length
        const c = 0.1;  // Damping

        for (let i = 0; i < iterations; i++) {
            // Calculate repulsive forces
            nodes.forEach(node1 => {
                node1.fx = 0;
                node1.fy = 0;

                nodes.forEach(node2 => {
                    if (node1 !== node2) {
                        const dx = node1.x - node2.x;
                        const dy = node1.y - node2.y;
                        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

                        const repulsion = (k * k) / distance;
                        node1.fx += (dx / distance) * repulsion;
                        node1.fy += (dy / distance) * repulsion;
                    }
                });
            });

            // Calculate attractive forces
            edges.forEach(edge => {
                const source = graph.getNode(edge.source);
                const target = graph.getNode(edge.target);

                const dx = target.x - source.x;
                const dy = target.y - source.y;
                const distance = Math.sqrt(dx * dx + dy * dy) || 1;

                const attraction = distance * distance / k;
                const fx = (dx / distance) * attraction;
                const fy = (dy / distance) * attraction;

                source.fx += fx;
                source.fy += fy;
                target.fx -= fx;
                target.fy -= fy;
            });

            // Update positions
            nodes.forEach(node => {
                node.vx = (node.vx + node.fx) * c;
                node.vy = (node.vy + node.fy) * c;
                node.x += node.vx;
                node.y += node.vy;
            });
        }

        return graph;
    }

    // Tree layout for hierarchical data
    treeLayout(graph) {
        const root = this.findRoot(graph);
        if (!root) return this.hierarchicalLayout(graph);

        const visited = new Set();
        const queue = [{node: root, depth: 0, index: 0, parentX: 0}];
        const depthCounts = new Map();

        while (queue.length > 0) {
            const {node, depth, index, parentX} = queue.shift();

            if (visited.has(node.id)) continue;
            visited.add(node.id);

            // Count nodes at each depth
            depthCounts.set(depth, (depthCounts.get(depth) || 0) + 1);

            // Position node
            node.y = depth * this.config.layerSpacing + this.config.padding;
            node.x = parentX + (index - depthCounts.get(depth) / 2) * this.config.nodeSpacing;

            // Find children
            const children = this.getChildren(graph, node);
            children.forEach((child, i) => {
                queue.push({
                    node: child,
                    depth: depth + 1,
                    index: i,
                    parentX: node.x
                });
            });
        }

        return graph;
    }

    // Helper methods
    groupByLayers(graph) {
        const layers = new Map();

        graph.nodes.forEach(node => {
            const layer = node.layer || 0;
            if (!layers.has(layer)) {
                layers.set(layer, []);
            }
            layers.get(layer).push(node);
        });

        return Array.from(layers.values());
    }

    findRoot(graph) {
        // Find node with no incoming edges
        const hasIncoming = new Set();
        graph.edges.forEach(edge => {
            hasIncoming.add(edge.target);
        });

        for (const node of graph.nodes.values()) {
            if (!hasIncoming.has(node.id)) {
                return node;
            }
        }

        // If no root found, return first node
        return graph.nodes.values().next().value;
    }

    getChildren(graph, parent) {
        const children = [];
        graph.edges.forEach(edge => {
            if (edge.source === parent.id) {
                const child = graph.getNode(edge.target);
                if (child) children.push(child);
            }
        });
        return children;
    }
}

// ============================================
// Interaction Layer
// ============================================

class InteractionLayer {
    constructor(canvas, renderer, graph) {
        this.canvas = canvas;
        this.renderer = renderer;
        this.graph = graph;

        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.cameraStart = { x: 0, y: 0 };

        this.hoveredNode = null;
        this.selectedNode = null;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
        this.canvas.addEventListener('wheel', (e) => this.onWheel(e));

        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => this.onTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e));
        this.canvas.addEventListener('touchend', (e) => this.onTouchEnd(e));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
    }

    onMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if clicking on a node
        const worldPos = this.renderer.screenToWorld(x, y);
        const clickedNode = this.getNodeAt(worldPos.x, worldPos.y);

        if (clickedNode) {
            this.selectedNode = clickedNode;
            this.onNodeClick(clickedNode);
        } else {
            // Start panning
            this.isDragging = true;
            this.dragStart = { x: e.clientX, y: e.clientY };
            this.cameraStart = {
                x: this.renderer.camera.x,
                y: this.renderer.camera.y
            };
            this.canvas.style.cursor = 'grabbing';
        }
    }

    onMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.isDragging) {
            // Pan camera
            const dx = e.clientX - this.dragStart.x;
            const dy = e.clientY - this.dragStart.y;

            this.renderer.camera.x = this.cameraStart.x - dx / this.renderer.camera.zoom;
            this.renderer.camera.y = this.cameraStart.y - dy / this.renderer.camera.zoom;

            this.renderer.render(this.graph);
        } else {
            // Check hover
            const worldPos = this.renderer.screenToWorld(x, y);
            const hoveredNode = this.getNodeAt(worldPos.x, worldPos.y);

            if (hoveredNode !== this.hoveredNode) {
                this.hoveredNode = hoveredNode;
                this.canvas.style.cursor = hoveredNode ? 'pointer' : 'default';

                if (hoveredNode) {
                    this.onNodeHover(hoveredNode);
                }
            }
        }
    }

    onMouseUp(e) {
        this.isDragging = false;
        this.canvas.style.cursor = 'default';
    }

    onWheel(e) {
        e.preventDefault();

        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.max(0.1, Math.min(5, this.renderer.camera.zoom * delta));

        this.renderer.zoomTo(newZoom);
        setTimeout(() => this.renderer.render(this.graph), 10);
    }

    onTouchStart(e) {
        if (e.touches.length === 1) {
            // Single touch - treat as mouse down
            const touch = e.touches[0];
            this.onMouseDown({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        }
    }

    onTouchMove(e) {
        if (e.touches.length === 1) {
            // Single touch - treat as mouse move
            const touch = e.touches[0];
            this.onMouseMove({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        } else if (e.touches.length === 2) {
            // Pinch zoom
            // TODO: Implement pinch zoom
        }
    }

    onTouchEnd(e) {
        this.onMouseUp({});
    }

    onKeyDown(e) {
        switch(e.key) {
            case '+':
            case '=':
                this.renderer.zoomTo(this.renderer.camera.zoom * 1.2);
                break;
            case '-':
                this.renderer.zoomTo(this.renderer.camera.zoom * 0.8);
                break;
            case '0':
                this.renderer.camera.zoom = 1;
                this.renderer.camera.x = 0;
                this.renderer.camera.y = 0;
                break;
            case 'Escape':
                this.selectedNode = null;
                break;
        }

        setTimeout(() => this.renderer.render(this.graph), 10);
    }

    getNodeAt(x, y) {
        for (const node of this.graph.nodes.values()) {
            const dx = Math.abs(node.x - x);
            const dy = Math.abs(node.y - y);

            if (dx < node.width/2 && dy < node.height/2) {
                return node;
            }
        }
        return null;
    }

    onNodeClick(node) {
        console.log('Node clicked:', node);

        // Emit custom event
        this.canvas.dispatchEvent(new CustomEvent('nodeClick', {
            detail: { node }
        }));
    }

    onNodeHover(node) {
        // Show tooltip or highlight
        console.log('Node hovered:', node);

        // Emit custom event
        this.canvas.dispatchEvent(new CustomEvent('nodeHover', {
            detail: { node }
        }));
    }

    centerOn(nodeId) {
        const node = this.graph.getNode(nodeId);
        if (node) {
            this.renderer.panTo(node.x, node.y);
            setTimeout(() => this.renderer.render(this.graph), 10);
        }
    }

    fitToScreen() {
        if (this.graph.nodes.size === 0) return;

        // Calculate bounds
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;

        this.graph.nodes.forEach(node => {
            minX = Math.min(minX, node.x - node.width/2);
            maxX = Math.max(maxX, node.x + node.width/2);
            minY = Math.min(minY, node.y - node.height/2);
            maxY = Math.max(maxY, node.y + node.height/2);
        });

        const width = maxX - minX;
        const height = maxY - minY;

        // Calculate zoom to fit
        const padding = 50;
        const zoomX = (this.canvas.width - padding * 2) / width;
        const zoomY = (this.canvas.height - padding * 2) / height;
        const zoom = Math.min(zoomX, zoomY, 2);  // Max zoom 2x

        // Center and zoom
        this.renderer.camera.x = (minX + maxX) / 2;
        this.renderer.camera.y = (minY + maxY) / 2;
        this.renderer.zoomTo(zoom);

        setTimeout(() => this.renderer.render(this.graph), 10);
    }
}

// ============================================
// Export System
// ============================================

class ExportManager {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;
    }

    exportPNG(width = 1920, height = 1080) {
        // Create temporary canvas
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;

        const tempRenderer = new CanvasRenderer(tempCanvas.id);
        tempRenderer.canvas = tempCanvas;
        tempRenderer.ctx = tempCanvas.getContext('2d');
        tempRenderer.resize();

        // Render at high resolution
        tempRenderer.render(this.graph);

        // Export as blob
        return new Promise((resolve) => {
            tempCanvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png');
        });
    }

    exportSVG() {
        // Create SVG string
        let svg = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">`;
        svg += `<rect width="1920" height="1080" fill="#1a1a2e"/>`;

        // Add edges
        this.graph.edges.forEach(edge => {
            const source = this.graph.getNode(edge.source);
            const target = this.graph.getNode(edge.target);

            if (source && target) {
                svg += `<line x1="${source.x + 960}" y1="${source.y + 540}"
                             x2="${target.x + 960}" y2="${target.y + 540}"
                             stroke="rgba(255,255,255,0.3)" stroke-width="2"/>`;
            }
        });

        // Add nodes
        this.graph.nodes.forEach(node => {
            const x = node.x + 960;
            const y = node.y + 540;

            if (node.type === 'victim') {
                svg += `<circle cx="${x}" cy="${y}" r="${node.width/2}"
                               fill="#ef4444" stroke="#dc2626" stroke-width="2"/>`;
            } else {
                svg += `<rect x="${x - node.width/2}" y="${y - node.height/2}"
                             width="${node.width}" height="${node.height}"
                             fill="#3b82f6" stroke="#2563eb" stroke-width="2" rx="5"/>`;
            }

            svg += `<text x="${x}" y="${y}" text-anchor="middle" fill="white"
                         font-family="Arial" font-size="12">${node.label || node.id}</text>`;
        });

        svg += `</svg>`;

        return svg;
    }

    exportJSON() {
        return JSON.stringify({
            nodes: Array.from(this.graph.nodes.values()),
            edges: Array.from(this.graph.edges.values()),
            metadata: this.graph.metadata
        }, null, 2);
    }
}

// ============================================
// Main Visualization System
// ============================================

class BATSVisualizationEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`Container ${containerId} not found`);
        }

        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'bats-viz-canvas';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.container.appendChild(this.canvas);

        // Initialize components
        this.graph = new InvestigationGraph();
        this.renderer = new CanvasRenderer(this.canvas.id);
        this.layout = new SmartLayout();
        this.interaction = new InteractionLayer(this.canvas, this.renderer, this.graph);
        this.exporter = new ExportManager(this.canvas, this.graph);

        // Animation loop
        this.isAnimating = false;
        this.animationFrame = null;
    }

    loadInvestigation(investigation) {
        try {
            console.log('Loading investigation into visualization:', investigation);

            // Clear existing graph
            this.graph.clear();

            // Validate investigation data
            if (!investigation) {
                console.warn('No investigation data provided');
                return;
            }

            // BUILD PROVENANCE INDEX
            this.provenanceIndex = {
                threads: new Map(),
                descendants: new Map(),
                ancestors: new Map(),
                nodeToThreads: new Map(),
                threadToNodes: new Map(),
                victimRootThreads: new Map(),
                notationToIds: new Map(),
                terminalAncestors: new Map()
            };

            let nodeIdCounter = 0;
            let edgeIdCounter = 0;

            // INDEX STEP 1: Index all threads from investigation.availableThreads
            if (investigation.availableThreads) {
                for (const currency in investigation.availableThreads) {
                    for (const internalId in investigation.availableThreads[currency]) {
                        const thread = investigation.availableThreads[currency][internalId];

                        this.provenanceIndex.threads.set(internalId, thread);

                        // Map notation → internalIds
                        if (thread.notation) {
                            if (!this.provenanceIndex.notationToIds.has(thread.notation)) {
                                this.provenanceIndex.notationToIds.set(thread.notation, new Set());
                            }
                            this.provenanceIndex.notationToIds.get(thread.notation).add(internalId);
                        }

                        // Build parent-child relationships (handle both field names)
                        const parentIds = thread.parentInternalIds || thread.parentThreads || [];
                        if (parentIds.length > 0) {
                            parentIds.forEach(parentId => {
                                if (!this.provenanceIndex.descendants.has(parentId)) {
                                    this.provenanceIndex.descendants.set(parentId, new Set());
                                }
                                this.provenanceIndex.descendants.get(parentId).add(internalId);

                                if (!this.provenanceIndex.ancestors.has(internalId)) {
                                    this.provenanceIndex.ancestors.set(internalId, new Set());
                                }
                                this.provenanceIndex.ancestors.get(internalId).add(parentId);
                            });
                        }

                        // Track victim root threads
                        if (thread.victimId && thread.transactionId) {
                            const victimKey = `V${thread.victimId}`;
                            if (!this.provenanceIndex.victimRootThreads.has(victimKey)) {
                                this.provenanceIndex.victimRootThreads.set(victimKey, new Set());
                            }
                            this.provenanceIndex.victimRootThreads.get(victimKey).add(internalId);
                        }
                    }
                }
            }

            console.log('✅ Indexed', this.provenanceIndex.threads.size, 'threads');

            // CREATE NODES: Victims
            if (investigation.victims && Array.isArray(investigation.victims)) {
                console.log(`Processing ${investigation.victims.length} victims`);
                investigation.victims.forEach((victim, vIndex) => {
                    if (victim && victim.transactions && Array.isArray(victim.transactions)) {
                        victim.transactions.forEach(tx => {
                            if (!tx) return;

                            const nodeId = `victim_${nodeIdCounter++}`;
                            const notation = `V${victim.id}-T${tx.id}`;
                            const threadIds = this.provenanceIndex.notationToIds.get(notation) || new Set();
                            const walletAddress = tx.receivingWallet || tx.redWallet || 'Unknown';

                            this.graph.addNode(nodeId, {
                                type: 'victim',
                                label: this.formatWalletLabel(walletAddress),
                                amount: parseFloat(tx.amount) || 0,
                                currency: tx.currency || 'Unknown',
                                layer: 0,
                                data: tx,
                                threadNotation: notation,
                                threadInternalIds: Array.from(threadIds),
                                victimId: `V${victim.id}`
                            });

                            // Map node ↔ threads
                            this.provenanceIndex.nodeToThreads.set(nodeId, threadIds);
                            threadIds.forEach(tid => {
                                if (!this.provenanceIndex.threadToNodes.has(tid)) {
                                    this.provenanceIndex.threadToNodes.set(tid, new Set());
                                }
                                this.provenanceIndex.threadToNodes.get(tid).add(nodeId);
                            });
                        });
                    }
                });
            }

            // CREATE NODES: Hops
            if (investigation.hops && Array.isArray(investigation.hops)) {
                console.log(`Processing ${investigation.hops.length} hops`);
                investigation.hops.forEach((hop, hopIndex) => {
                    if (hop && hop.entries && Array.isArray(hop.entries)) {
                        hop.entries.forEach(entry => {
                            if (!entry) return;

                            const nodeId = `hop_${nodeIdCounter++}`;
                            const threadIds = entry.notation ?
                                (this.provenanceIndex.notationToIds.get(entry.notation) || new Set()) :
                                new Set();
                            const sourceIds = entry.sourceThreadInternalId ?
                                [entry.sourceThreadInternalId] :
                                (entry.multipleSourceInternalIds || []);
                            const walletAddress = entry.toWallet || entry.walletAddress || 'Unknown';

                            this.graph.addNode(nodeId, {
                                type: entry.entryType || 'hop',
                                label: this.formatWalletLabel(walletAddress),
                                entity: entry.exchangeName || entry.exchangeAttribution?.name || entry.entity,
                                layer: hopIndex + 1,
                                data: entry,
                                threadNotation: entry.notation,
                                threadInternalIds: Array.from(threadIds),
                                sourceThreadInternalIds: sourceIds
                            });

                            // Map node ↔ threads
                            this.provenanceIndex.nodeToThreads.set(nodeId, threadIds);
                            threadIds.forEach(tid => {
                                if (!this.provenanceIndex.threadToNodes.has(tid)) {
                                    this.provenanceIndex.threadToNodes.set(tid, new Set());
                                }
                                this.provenanceIndex.threadToNodes.get(tid).add(nodeId);
                            });

                            // Build terminal ancestor index
                            if (entry.entryType === 'terminal') {
                                const allAncestors = new Set();
                                threadIds.forEach(tid => {
                                    this.getAllAncestors(tid, allAncestors);
                                });
                                this.provenanceIndex.terminalAncestors.set(nodeId, allAncestors);
                            }

                            // CREATE EDGES: Based on source thread provenance
                            sourceIds.forEach(sourceInternalId => {
                                const sourceNodes = this.provenanceIndex.threadToNodes.get(sourceInternalId);
                                if (sourceNodes) {
                                    sourceNodes.forEach(sourceNodeId => {
                                        const edgeId = `edge_${edgeIdCounter++}`;
                                        const thread = this.provenanceIndex.threads.get(sourceInternalId);

                                        this.graph.addEdge(edgeId, sourceNodeId, nodeId, {
                                            threadNotation: thread?.notation,
                                            threadInternalId: sourceInternalId,
                                            amount: thread?.totalAmount,
                                            currency: thread?.currency
                                        });
                                    });
                                }
                            });
                        });
                    }
                });
            }

            console.log('✅ Provenance index built:', {
                threads: this.provenanceIndex.threads.size,
                victims: this.provenanceIndex.victimRootThreads.size,
                terminals: this.provenanceIndex.terminalAncestors.size,
                nodes: this.graph.nodes.size,
                edges: this.graph.edges.size
            });

            // Apply layout
            this.applyLayout('hierarchical');

            // Create filter manager after index is built
            this.filterManager = new FocusedFilterManager(this);
            this.currentFilterResult = null;

            // Render
            this.render();
            this.interaction.fitToScreen();

            console.log('Visualization loading complete');

        } catch (error) {
            console.error('Error loading investigation into visualization:', error);
            const container = document.getElementById('visualization-container');
            if (container) {
                container.innerHTML = `
                    <div style="padding: 20px; background: #fff3cd; border: 2px solid #ff9800; border-radius: 8px; margin: 20px;">
                        <h3 style="color: #e65100;">⚠️ Visualization Error</h3>
                        <p>Unable to render the visualization: ${error.message}</p>
                        <p style="font-size: 12px; color: #666;">Check console for details.</p>
                    </div>
                `;
            }
        }
    }

    // Helper: Get all ancestors recursively (for backward tracing)
    getAllAncestors(internalId, result = new Set()) {
        if (result.has(internalId)) return result;
        result.add(internalId);

        const parents = this.provenanceIndex.ancestors.get(internalId);
        if (parents) {
            parents.forEach(parentId => {
                this.getAllAncestors(parentId, result);
            });
        }

        return result;
    }

    // Helper: Get all descendants recursively (for forward tracing)
    getAllDescendants(internalId, result = new Set()) {
        if (result.has(internalId)) return result;
        result.add(internalId);

        const children = this.provenanceIndex.descendants.get(internalId);
        if (children) {
            children.forEach(childId => {
                this.getAllDescendants(childId, result);
            });
        }

        return result;
    }

    // Helper: Format wallet label
    formatWalletLabel(address) {
        if (!address || typeof address !== 'string') return 'Unknown';
        return address.length > 12 ? address.substring(0, 8) + '...' : address;
    }

    applyLayout(type = 'hierarchical') {
        switch(type) {
            case 'force':
                this.layout.forceDirectedLayout(this.graph);
                break;
            case 'tree':
                this.layout.treeLayout(this.graph);
                break;
            case 'hierarchical':
            default:
                this.layout.hierarchicalLayout(this.graph);
                break;
        }
    }

    setLayout(type) {
        console.log('Changing layout to:', type);
        this.applyLayout(type);
        this.render();
        this.interaction.fitToScreen();
    }

    render() {
        if (this.currentFilterResult) {
            this.renderer.render(this.graph, {
                visibleNodes: this.currentFilterResult.nodes,
                visibleEdges: this.currentFilterResult.edges
            });
        } else {
            this.renderer.render(this.graph);
        }
    }

    // Public API: Filter by victim
    filterByVictim(victimId) {
        if (!this.filterManager) return;
        this.currentFilterResult = this.filterManager.filterByVictim(victimId);
        this.render();
        this.interaction.fitToScreen();
        return this.currentFilterResult;
    }

    // Public API: Filter by root thread
    filterByRootThread(notation) {
        if (!this.filterManager) return;
        this.currentFilterResult = this.filterManager.filterByRootThread(notation);
        this.render();
        this.interaction.fitToScreen();
        return this.currentFilterResult;
    }

    // Public API: Filter by terminal
    filterByTerminal(terminalNodeId) {
        if (!this.filterManager) return;
        this.currentFilterResult = this.filterManager.filterByTerminal(terminalNodeId);
        this.render();
        this.interaction.fitToScreen();
        return this.currentFilterResult;
    }

    // Public API: Clear filter
    clearFilter() {
        if (!this.filterManager) return;
        this.currentFilterResult = this.filterManager.clearFilter();
        this.render();
        this.interaction.fitToScreen();
        return this.currentFilterResult;
    }

    startAnimation() {
        if (this.isAnimating) return;

        this.isAnimating = true;

        const animate = () => {
            if (!this.isAnimating) return;

            this.render();
            this.animationFrame = requestAnimationFrame(animate);
        };

        animate();
    }

    stopAnimation() {
        this.isAnimating = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    // Public API
    async exportAs(format) {
        switch(format) {
            case 'png':
                return await this.exporter.exportPNG();
            case 'svg':
                return this.exporter.exportSVG();
            case 'json':
                return this.exporter.exportJSON();
            default:
                throw new Error(`Unknown export format: ${format}`);
        }
    }

    setTheme(theme) {
        Object.assign(this.renderer.theme, theme);
        this.render();
    }

    centerOnNode(nodeId) {
        this.interaction.centerOn(nodeId);
    }

    destroy() {
        this.stopAnimation();
        this.container.removeChild(this.canvas);
    }
}

// ============================================
// Focused Filter Manager
// ============================================

class FocusedFilterManager {
    constructor(engine) {
        this.engine = engine;
        this.activeFilter = null;
    }

    // MODE 1: Filter by victim (forward trace)
    filterByVictim(victimId) {
        const rootThreads = this.engine.provenanceIndex.victimRootThreads.get(victimId);
        if (!rootThreads || rootThreads.size === 0) {
            console.warn(`No threads found for victim ${victimId}`);
            return this.getEmptyResult();
        }

        // Get all descendants of victim's root threads (forward trace)
        const allThreads = new Set();
        rootThreads.forEach(rootId => {
            this.engine.getAllDescendants(rootId, allThreads);
        });

        console.log(`${victimId}: ${rootThreads.size} root threads → ${allThreads.size} total threads`);

        return this.buildFilterResult(allThreads, {
            type: 'victim',
            value: victimId,
            description: `${victimId} - All funds traced forward`
        });
    }

    // MODE 2: Filter by root thread notation (forward trace)
    filterByRootThread(notation) {
        const threadIds = this.engine.provenanceIndex.notationToIds.get(notation);
        if (!threadIds || threadIds.size === 0) {
            console.warn(`No threads found for notation ${notation}`);
            return this.getEmptyResult();
        }

        // Get all descendants of this root thread (forward trace)
        const allThreads = new Set();
        threadIds.forEach(threadId => {
            this.engine.getAllDescendants(threadId, allThreads);
        });

        console.log(`${notation}: ${threadIds.size} thread(s) → ${allThreads.size} descendants`);

        return this.buildFilterResult(allThreads, {
            type: 'rootThread',
            value: notation,
            description: `${notation} - Traced forward to terminal(s)`
        });
    }

    // MODE 3: Filter by terminal (backward trace)
    filterByTerminal(terminalNodeId) {
        const ancestorThreads = this.engine.provenanceIndex.terminalAncestors.get(terminalNodeId);
        if (!ancestorThreads || ancestorThreads.size === 0) {
            console.warn(`No ancestor threads found for terminal ${terminalNodeId}`);
            return this.getEmptyResult();
        }

        const terminalNode = this.engine.graph.getNode(terminalNodeId);
        console.log(`Terminal ${terminalNode?.label}: ${ancestorThreads.size} ancestor threads`);

        return this.buildFilterResult(ancestorThreads, {
            type: 'terminal',
            value: terminalNodeId,
            description: `${terminalNode?.label || 'Terminal'} - Traced backward to sources`
        }, terminalNodeId);
    }

    // Build filter result from thread set
    buildFilterResult(threadSet, filterInfo, includeTerminalNode = null) {
        // Find all nodes containing these threads
        const visibleNodes = new Set();
        threadSet.forEach(threadId => {
            const nodes = this.engine.provenanceIndex.threadToNodes.get(threadId);
            if (nodes) {
                nodes.forEach(nodeId => visibleNodes.add(nodeId));
            }
        });

        // Include terminal node if specified
        if (includeTerminalNode) {
            visibleNodes.add(includeTerminalNode);
        }

        // Get edges where both source and target are visible AND thread is in set
        const visibleEdges = new Set();
        this.engine.graph.edges.forEach((edge, edgeId) => {
            if (visibleNodes.has(edge.source) &&
                visibleNodes.has(edge.target) &&
                threadSet.has(edge.threadInternalId)) {
                visibleEdges.add(edgeId);
            }
        });

        this.activeFilter = filterInfo;

        return {
            nodes: visibleNodes,
            edges: visibleEdges,
            filter: filterInfo
        };
    }

    getEmptyResult() {
        return {
            nodes: new Set(),
            edges: new Set(),
            filter: null
        };
    }

    clearFilter() {
        this.activeFilter = null;
        return {
            nodes: new Set(this.engine.graph.nodes.keys()),
            edges: new Set(this.engine.graph.edges.keys()),
            filter: null
        };
    }
}

// ============================================
// Export for use
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = BATSVisualizationEngine;
} else if (typeof window !== 'undefined') {
    window.BATSVisualizationEngine = BATSVisualizationEngine;
}