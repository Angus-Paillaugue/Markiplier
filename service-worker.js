/**
 * Listens for the extension being installed and adds a listener for tab updates.
 * @param {Object} details - Details about the installation event.
 */
chrome.runtime.onInstalled.addListener(function(details) {
    /**
     * Listens for tab updates and sends a message when the tab status is 'complete'.
     * @param {number} tabId - The ID of the updated tab.
     * @param {Object} changeInfo - Details about the tab update.
     * @param {Object} tab - The updated tab object.
     */
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.status === 'complete') {
            chrome.tabs.sendMessage(tabId, {
                message: 'urlChanged'
            });
        }
    });
});