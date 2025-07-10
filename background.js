// Background script for Drupal Tooler
// Handles context menu for field filling functionality

chrome.runtime.onInstalled.addListener(() => {
    // Create context menu items for field filling
    chrome.contextMenus.create({
        id: "fillAllFields",
        title: "Fill all form fields",
        contexts: ["page"],
        documentUrlPatterns: ["*://*.drupal.org/*", "*://*/*"]
    });

    chrome.contextMenus.create({
        id: "fillSingleField",
        title: "Fill this field",
        contexts: ["editable"],
        documentUrlPatterns: ["*://*.drupal.org/*", "*://*/*"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "fillAllFields") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                // Check if the field filler is already loaded
                if (window.drupalFieldFillerLoaded) {
                    window.fillAllFormFields();
                } else {
                    // Try to trigger the fill via a custom event
                    document.dispatchEvent(new CustomEvent('drupalToolerFillAll'));
                }
            }
        });
    } else if (info.menuItemId === "fillSingleField") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                // Check if the field filler is already loaded
                if (window.drupalFieldFillerLoaded) {
                    window.fillSingleField();
                } else {
                    // Try to trigger the fill via a custom event
                    document.dispatchEvent(new CustomEvent('drupalToolerFillSingle'));
                }
            }
        });
    }
});
