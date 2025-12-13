// scripts/user_profile/notifications.js
let observer = null;

// Fonction pour masquer les notifications
export function masquerNotifs() {
  // Désactive l'observateur précédent s'il existe
  if (observer) {
    observer.disconnect();
  }

  const notifications = document.querySelectorAll("div.menu_notif_nb");
  notifications.forEach(notif => {
    notif.style.display = "none";
  });

  // Crée un nouvel observateur pour les futures notifications
  observer = new MutationObserver(() => {
    const newNotifications = document.querySelectorAll("div.menu_notif_nb");
    newNotifications.forEach(notif => {
      notif.style.display = "none";
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Fonction pour afficher les notifications
export function afficherNotifs() {
  // Désactive l'observateur
  if (observer) {
    observer.disconnect();
    observer = null;
  }

  const notifications = document.querySelectorAll("div.menu_notif_nb");
  notifications.forEach(notif => {
    notif.style.display = "block";
  });
}
