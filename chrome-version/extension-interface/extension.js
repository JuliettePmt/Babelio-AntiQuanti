// extension-interface/extension.js
document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('checkbox-notifs');
  
    // 1. Charge l'état de la checkbox depuis le stockage local
    chrome.storage.local.get(['showNotifications'], (result) => {
      checkbox.checked = !!result.showNotifications;
  
      // 2. Envoie un message au content script pour appliquer l'état actuel
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: checkbox.checked ? 'afficherNotifs' : 'masquerNotifs'
        });
      });
    });
  
    // 3. Écoute les changements de la checkbox
    checkbox.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
  
      // 4. Sauvegarde l'état dans le stockage local
      chrome.storage.local.set({ showNotifications: isChecked });
  
      // 5. Envoie un message au content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: isChecked ? 'afficherNotifs' : 'masquerNotifs'
        });
      });
    });
  });
  