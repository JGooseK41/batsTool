// Fix wizard to properly use internal IDs for thread selection
// This ensures multiple threads with same notation (like V1-T2-H1) can be selected independently

(function() {
    console.log('=== FIXING WIZARD INTERNAL ID HANDLING ===');

    // Patch the updateWizardThreadSelection function to handle internal IDs
    window.updateWizardThreadSelection = function(threadInfo) {
        const wizardData = window.hopWizardData || window.currentWizardData;
        if (!wizardData) {
            console.error('No wizard data found');
            return;
        }

        // Support both string (legacy) and object (dual-layer) inputs
        let notation, internalId;

        if (typeof threadInfo === 'string') {
            // Legacy mode - need to find the internal ID
            const threads = getAvailableSourcesForHop(wizardData.hopNumber, null);
            const thread = threads.find(t => t.threadId === threadInfo || t.internalId === threadInfo);
            if (thread) {
                notation = thread.threadId;
                internalId = thread.internalId || thread.threadId;
            } else {
                notation = threadInfo;
                internalId = threadInfo;
            }
        } else {
            // Dual-layer mode - object with both notation and internalId
            notation = threadInfo.notation || threadInfo.threadId;
            internalId = threadInfo.internalId || threadInfo.notation || threadInfo.threadId;
        }

        // Initialize arrays if needed
        if (!wizardData.selectedInternalIds) {
            wizardData.selectedInternalIds = [];
        }
        if (!wizardData.selectedThreads) {
            wizardData.selectedThreads = [];
        }

        // Toggle selection using internal IDs
        const index = wizardData.selectedInternalIds.indexOf(internalId);

        if (index > -1) {
            // Remove selection
            wizardData.selectedInternalIds.splice(index, 1);
            // Also update legacy array for compatibility
            const notationIndex = wizardData.selectedThreads.indexOf(notation);
            if (notationIndex > -1) {
                wizardData.selectedThreads.splice(notationIndex, 1);
            }
        } else {
            // Add selection
            wizardData.selectedInternalIds.push(internalId);
            // Also update legacy array for compatibility
            if (!wizardData.selectedThreads.includes(notation)) {
                wizardData.selectedThreads.push(notation);
            }
        }

        console.log('Updated selections:');
        console.log('  Internal IDs:', wizardData.selectedInternalIds);
        console.log('  Notations:', wizardData.selectedThreads);

        // Refresh the wizard display
        if (typeof showWizardStep === 'function') {
            showWizardStep(1);
        } else if (typeof showHopWizardStep === 'function') {
            showHopWizardStep(1);
        }
    };

    // Patch getSelectedThreadsWithDetails to use internal IDs
    window.getSelectedThreadsWithDetails = function(wizardData) {
        const threads = getAvailableSourcesForHop(wizardData.hopNumber, null);
        const selectedThreads = [];

        // Use internal IDs if available, fall back to notations
        const selectedIds = wizardData.selectedInternalIds || wizardData.selectedThreads || [];

        selectedIds.forEach(id => {
            // Find thread by internal ID or notation
            const thread = threads.find(t =>
                t.internalId === id ||
                t.threadId === id
            );

            if (thread) {
                selectedThreads.push(thread);
            }
        });

        return selectedThreads;
    };

    console.log('✅ Wizard internal ID handling fixed');
    console.log('Now when you select threads:');
    console.log('  - Each V1-T2-H1 thread will be selectable independently');
    console.log('  - The system will track them by internal ID');
    console.log('  - Step 3 will show the correct allocations');

    // If wizard is currently open, refresh it
    if (window.currentWizardData || window.hopWizardData) {
        console.log('Refreshing current wizard...');
        if (typeof showWizardStep === 'function') {
            showWizardStep(1);
        } else if (typeof showHopWizardStep === 'function') {
            showHopWizardStep(1);
        }
    }
})();