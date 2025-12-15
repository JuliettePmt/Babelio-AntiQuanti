import { ratings } from "./scripts/book_pages/ratings.js";
import { community } from "./scripts/book_pages/community.js";
import { platformMetrics } from "./scripts/book_pages/platformMetrics.js";
import { authorMetrics } from "./scripts/book_pages/authorMetrics.js";
import { commercial } from "./scripts/book_pages/commercial.js";
import { userMetrics } from "./scripts/user_profile/userMetrics.js";
import { sideMetrics } from "./scripts/user_profile/sideMetrics.js";
import { masquerNotifs, afficherNotifs } from './scripts/user_profile/notifications.js';

// -------------------------------- Supprimer / afficher les notifications --------------------------------
browser.storage.local.get(['showNotifications'], (result) => {
  if (result.showNotifications) {
    afficherNotifs();
  } else {
    masquerNotifs();
  }
});

// Écoute les messages du popup
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'masquerNotifs') {
    masquerNotifs();
  } else if (request.action === 'afficherNotifs') {
    afficherNotifs();
  }
});

// ---------------------------------------------------------------------------------------------------------
// NB : à ce stade, le body est masqué par le CSS hide-body.css
// ---------------------------------------------------------------------------------------------------------
function showBody() {
  console.log("showBody appelée");
  
  // Supprimer UNIQUEMENT le hide-body.css
  const allLinks = document.querySelectorAll('link[rel="stylesheet"]');
  allLinks.forEach(link => {
    if (link.href && link.href.includes('hide-body.css')) {
      link.remove();
      console.log("hide-body.css supprimé:", link.href);
    }
  });
  
  // Supprimer les <style> inline qui contiennent "visibility: hidden" pour html
  const allStyles = document.querySelectorAll('style');
  allStyles.forEach(style => {
    const content = style.textContent;
    if (content.includes('html') && 
        (content.includes('visibility: hidden') || content.includes('visibility:hidden'))) {
      style.remove();
      console.log("Style masquant HTML supprimé");
    }
  });
  
  // Forcer la visibilité avec style inline (le plus prioritaire)
  document.documentElement.style.setProperty('visibility', 'visible', 'important');
  document.documentElement.style.setProperty('opacity', '1', 'important');
  
  console.log("Page visible avec styles préservés");
}

async function pluginLaunch() {
  
  // ATTENDRE QUE LE BODY EXISTE
  while (!document.body) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  
  try {
    sideMetrics();
    ratings();
    community();
    platformMetrics();
    authorMetrics();
    commercial();
    userMetrics();
  } catch (e) {
    console.error("❌ Erreur dans pluginLaunch :", e);
  } finally {
    showBody();
  }
}

// Lancer le plugin
pluginLaunch();

