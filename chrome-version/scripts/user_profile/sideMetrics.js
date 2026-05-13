export function sideMetrics() {
  console.log("sideMetrics OK")

  // Nombre de participants à un groupe
  const statsGroupe = document.querySelectorAll(".gris");

  statsGroupe.forEach((span) => {
      const text = span.textContent.toLowerCase();

      if (text.includes("participants") || text.includes("messages")) {
          span.textContent = "";
      }
  });
  

  const observer = new MutationObserver(() => {
    var messageElement = document.querySelector(".actualites_side_item");
    if (messageElement) {
      const messages = document.querySelector("a.actualites_side_item > font");

      if (messages) {
        let numberOfMessages = parseInt(messages.textContent.trim(), 10);
        let message = "Vous n'avez pas de message";

        if (numberOfMessages === 1) {
          message = "Vous avez un message";
        } else if (numberOfMessages > 1) {
          message = "Vous avez des messages";
        }

        messages.remove();
        messageElement.innerHTML = messageElement.innerHTML.replace(
          "Message(s)",
          message
        );
      }
    }

    // NB : ça supprime aussi le "abonnés" dans le menu hover du haut MAIS si je mets pas ça, ça remet des stats sur le profil (étrange) => obligé de filtrer
    const nbFollowers = Array.from(document.querySelectorAll('a[href="/abonnes"]')).filter(el => !el.closest('#menu_notif'));
    const nbFollowing = document.querySelectorAll('a[href="/abonnements"]');

    nbFollowers.forEach(function (follower) {
      follower.remove();
    });

    nbFollowing.forEach(function (following) {
      following.remove();
    });

    // CONTRIBUTIONS
    // Nombre de critiques rédigées
    const nbCriticsMyBooks = document.querySelectorAll('a[href="mescritiques.php"]');
    if (nbCriticsMyBooks) {
        const span = nbCriticsMyBooks[0].querySelector('span');
        span.remove();
    }

    // Nombre de citations ajoutées
    const nbQuotesMyBooks = document.querySelectorAll('a[href="mescitations.php"]');
    if (nbQuotesMyBooks) {
      const span = nbQuotesMyBooks[0].querySelector('span');
      span.remove();    
    }
    if (nbQuotesMyBooks.nextSibling?.nodeName === "BR") node.nextSibling.remove();


    // CONTRIBUTIONS APPRÉCIÉES
    // Nombre de critiques appréciées
    const nbCriticsAppreciees = document.querySelectorAll('a[href="mescritiquesappreciees.php"]');
    if (nbCriticsAppreciees) {
        const span = nbCriticsAppreciees[0].querySelector('span');
        span.remove();
    }

    // Nombre de citations appréciées
    const nbQuotesAppreciees = document.querySelectorAll('a[href="mescitationsappreciees.php"]');
    if (nbQuotesAppreciees) {
        const span = nbQuotesAppreciees[0].querySelector('span');
        span.remove();
    }

    // Supprimer les doubles balises <br>
    document.querySelectorAll('.side_r_content').forEach(sideR => {
      sideR.querySelectorAll('br + br').forEach(br => br.remove());
    });

    const sideStats = document.querySelector('a[href="mescitationsappreciees.php"]').closest('.side_stats');
    let next = sideStats.nextSibling;
    while (next?.nodeName === "BR") {
      const toRemove = next;
      next = next.nextSibling;
      toRemove.remove();
    }

    document.querySelectorAll('.side_r_content').forEach(sideR => {
      if (sideR.textContent.includes("Contributions appréciées")) {
        sideR.querySelectorAll('br').forEach(br => br.remove());
      }
    });

    const contributionStat = document.querySelectorAll(".contribution_progress");
    contributionStat.forEach((stat) => {
      stat.remove();
    });

    // "Contribution sur 78 % de vos livres"
    const contributionStatLegend = document.querySelectorAll(".contribution_legend");
    contributionStatLegend.forEach((stat) => {
      stat.remove();
    });

    // INSIGNES - vérifier avec un log
    const insignes = document.querySelectorAll(".side_insignes");
    insignes.forEach((stat) => {
      stat.remove();
    });

    // Supprimer le défi lecture
    const titres = document.querySelectorAll(".side_r_content");
    titres.forEach((titre) => {
      if (titre.textContent.includes("Notez vos lectures")) {
        titre.remove();
        if (titre.previousSibling?.nodeName === "BR") titre.previousSibling.remove();
      } else if (titre.textContent.includes("Contributions & insignes")) {
        const titreDiv = titre.querySelector(".titre");
        if (titreDiv) {
          titreDiv.childNodes[0].textContent = "Contributions ";
        }
      }
    });
    document.querySelectorAll('.titre').forEach(t => {
      if (t.textContent.includes("défi de lecture")) t.remove();
    });
    document.querySelector('a.libelle[href*="historique_lecture_annee"]')?.remove();
    
    document.querySelectorAll('.side_r_content').forEach(sideR => {
      sideR.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("livres lus sur")) {
          node.remove();
        }
      });
    });

    // "Définir l'objectif"
    document.querySelectorAll('a').forEach(a => {
      if (a.textContent.includes("définir l'objectif")) {
        a.remove();
      }
    });
    // document.querySelector('a.tiny_links.dark')?.remove();


  });
  

  observer.observe(document.body, { childList: true, subtree: true });
}