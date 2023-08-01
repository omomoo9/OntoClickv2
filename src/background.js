'use strict';
// Function to create ontoclick context menu item
function createOntoClickContextMenu() {
  chrome.contextMenus.create({
    id: 'ontoclick-en',
    title: 'OntoClick',
    type: 'normal',
    contexts: ['all']
  });
}

// Add listener to create ontoclick context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(function() {
  createOntoClickContextMenu();
});

// Add listener to create ontoclick context menu items on Chrome browser startup
chrome.runtime.onStartup.addListener(function() {
  createOntoClickContextMenu();
})

// Add listener for context menu item clicks
chrome.contextMenus.onClicked.addListener(function(item, tab) {
  if (item.menuItemId === 'ontoclick-en') {
    chrome.scripting.insertCSS({
      target: {tabId: tab.id},
      files: ['css/loader.css']
    }, function() {
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['loader.js']
      });
    });
  }
});
