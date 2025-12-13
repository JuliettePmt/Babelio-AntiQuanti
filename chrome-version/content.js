import { ratings } from "./scripts/book_pages/ratings.js";
import { community } from "./scripts/book_pages/community.js";
import { platformMetrics } from "./scripts/book_pages/platformMetrics.js";
import { authorMetrics } from "./scripts/book_pages/authorMetrics.js";
import { commercial } from "./scripts/book_pages/commercial.js";
import { userMetrics } from "./scripts/user_profile/userMetrics.js";
import { sideMetrics } from "./scripts/user_profile/sideMetrics.js";
import { masquerNotifs, afficherNotifs } from './scripts/user_profile/notifications.js';

// -------------------------------- Supprimer / afficher les notifications --------------------------------
chrome.storage.local.get(['showNotifications'], (result) => {
  if (result.showNotifications) {
    afficherNotifs();
  } else {
    masquerNotifs();
  }
});

// 2. Écoute les messages du popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'masquerNotifs') {
    masquerNotifs();
  } else if (request.action === 'afficherNotifs') {
    afficherNotifs();
  }
});

// ---------------------------------------------------------------------------------------------------------


// NB : à ce stade, le body est masqué par le CSS.
function showBody() {
  const style = document.createElement('style');
  style.textContent = 'body { display: block !important; }';
  document.head.appendChild(style);
}


async function pluginLaunch() {
  try {
    ratings();
    community();
    platformMetrics();
    authorMetrics();
    commercial();
    userMetrics();
    sideMetrics();
    notifications();
  } catch (e) {
    console.error("Erreur dans pluginLaunch :", e);
  } finally {
    showBody();
  }
}

pluginLaunch();
