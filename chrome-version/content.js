import { ratings } from "./scripts/book_pages/ratings.js";
import { community } from "./scripts/book_pages/community.js";
import { platformMetrics } from "./scripts/book_pages/platformMetrics.js";
import { authorMetrics } from "./scripts/book_pages/authorMetrics.js";
import { commercial } from "./scripts/book_pages/commercial.js";
import { userMetrics } from "./scripts/user_profile/userMetrics.js";
import { sideMetrics } from "./scripts/user_profile/sideMetrics.js";

// 1. Le body est déjà caché par le CSS injecté

// 2. Fonction pour réafficher le body
function showBody() {
  const style = document.createElement('style');
  style.textContent = 'body { display: block !important; }';
  document.head.appendChild(style);
}

// 3. Exécute tes scripts avec gestion d'erreur
async function pluginLaunch() {
  try {
    // Exécute toutes les fonctions de nettoyage
    ratings();
    community();
    platformMetrics();
    authorMetrics();
    commercial();
    userMetrics();
    sideMetrics();
  } catch (e) {
    console.error("Erreur dans pluginLaunch :", e);
  } finally {
    showBody();
  }
}

// 4. Lance tout immédiatement
pluginLaunch();
