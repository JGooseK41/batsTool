// Fix duplicate threads immediately without reloading
// Paste this entire script into the browser console

// First, update the generateInternalThreadId function
window.generateInternalThreadId = function(notation, currency, forceUnique = false) {
    if (forceUnique) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `${notation}_${currency}_${timestamp}_${random}`;
    } else {
        return `${notation}_${currency}`;
    }
};

// Add the consolidation function
window.consolidateDuplicateThreads = function() {
    if (!investigation.availableThreads) return 0;

    console.log('Consolidating duplicate threads...');
    let duplicatesFound = 0;

    for (const currency in investigation.availableThreads) {
        const threads = investigation.availableThreads[currency];
        const threadsByNotation = {};
        const threadsToDelete = [];

        // Group threads by notation
        for (const threadId in threads) {
            const thread = threads[threadId];
            if (!thread.notation) continue;

            if (!threadsByNotation[thread.notation]) {
                threadsByNotation[thread.notation] = [];
            }
            threadsByNotation[thread.notation].push({ id: threadId, thread });
        }

        // Consolidate duplicates
        for (const notation in threadsByNotation) {
            const duplicates = threadsByNotation[notation];
            if (duplicates.length > 1) {
                console.log(`Found ${duplicates.length} threads with notation ${notation} in ${currency}`);
                duplicatesFound += duplicates.length - 1;

                // Keep the thread with highest amount
                let keepThread = duplicates[0];
                for (let i = 1; i < duplicates.length; i++) {
                    if (duplicates[i].thread.totalAmount > keepThread.thread.totalAmount) {
                        threadsToDelete.push(keepThread.id);
                        keepThread = duplicates[i];
                    } else {
                        threadsToDelete.push(duplicates[i].id);
                    }
                }

                // Update the kept thread to use deterministic ID
                const deterministicId = generateInternalThreadId(notation, currency, false);
                if (keepThread.id !== deterministicId) {
                    threads[deterministicId] = keepThread.thread;
                    keepThread.thread.internalId = deterministicId;
                    threadsToDelete.push(keepThread.id);
                }
            }
        }

        // Delete duplicate threads
        for (const threadId of threadsToDelete) {
            delete threads[threadId];
        }
    }

    if (duplicatesFound > 0) {
        console.log(`Consolidated ${duplicatesFound} duplicate threads`);
        showNotification(`✅ Consolidated ${duplicatesFound} duplicate threads`, 'success', 3000);
        // Refresh the UI
        updateUI();
    }

    return duplicatesFound;
};

// Run the consolidation
console.log('Running duplicate thread consolidation...');
const duplicates = consolidateDuplicateThreads();
if (duplicates === 0) {
    console.log('No duplicate threads found');
} else {
    console.log(`Successfully consolidated ${duplicates} duplicate threads`);
}