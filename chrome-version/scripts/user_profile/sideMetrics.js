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

// PROFIL INDIVIDUEL
    // CONTRIBUTIONS
    // Nombre de critiques rédigées
    const nbCriticsMyBooks = document.querySelectorAll('a[href*="mescritiques.php"]');
    if (nbCriticsMyBooks) {
        const span = nbCriticsMyBooks[0].querySelector('span');
        span.remove();
    }

    // Nombre de citations ajoutées
    const nbQuotesMyBooks = document.querySelectorAll('a[href*="mescitations.php"]');
    if (nbQuotesMyBooks) {
      const span = nbQuotesMyBooks[0].querySelector('span');
      span.remove();    
    }
    if (nbQuotesMyBooks.nextSibling?.nodeName === "BR") node.nextSibling.remove();

    // Bug : parfois le nb de citations/critiques revient (notamment sur la page https://www.babelio.com/mescitations.php?id_user=XXXXXXX OU équivalent pour les critiques)
    document.querySelectorAll('a').forEach(a => {
      if (a.getAttribute('href')?.includes('mescitations.php') && !a.getAttribute('href')?.includes('appreciees')) {
        a.querySelector('span')?.remove();
      }
    });

    document.querySelectorAll('a').forEach(a => {
      if (a.getAttribute('href')?.includes('mescritiques.php') && !a.getAttribute('href')?.includes('appreciees')) {
        a.querySelector('span')?.remove();
      }
    });


    // CONTRIBUTIONS APPRÉCIÉES
    // Nombre de critiques appréciées
    const nbCriticsAppreciees = document.querySelectorAll('a[href*="mescritiquesappreciees.php"]');
    if (nbCriticsAppreciees) {
        const span = nbCriticsAppreciees[0].querySelector('span');
        span.remove();
    }

    // Nombre de citations appréciées
    const nbQuotesAppreciees = document.querySelectorAll('a[href*="mescitationsappreciees.php"]');
    if (nbQuotesAppreciees) {
        const span = nbQuotesAppreciees[0].querySelector('span');
        span.remove();
    }
    
    // Nb réponses
    const nbReponses = document.querySelectorAll('a[href*="ses_questions_reponses"]');
    if (nbReponses) {
        const span = nbReponses[0].querySelector('span');
        span.remove();
    }

    // Mes quiz
    const nbQuiz = document.querySelectorAll('a[href*="mes_quiz.php"]');
    if (nbQuiz) {
        const span = nbQuiz[0].querySelector('span');
        span.remove();
    }

    // Badges
    document.querySelector('a[href*="mesbadges.php"]')?.remove();

    // Insignes
    document.querySelector('.side_insignes')?.remove();

    // Défi lecture d'un autre utilisateur
    document.querySelectorAll('.titre').forEach(t => {
      if (t.textContent.includes("défi de lecture")) t.remove();
    });

    document.querySelector('a[href*="annee_lecture"]')?.remove();


    document.querySelectorAll('.side_r_content').forEach(sideR => {
      sideR.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("livres lus sur")) {
          if (node.previousSibling?.nodeName === "BR") node.previousSibling.remove();
          node.remove();
        }
      });
    });

    document.querySelectorAll('a').forEach(a => {
      const href = a.getAttribute('href');
      if (href?.includes('mescritiquesappreciees.php') || href?.includes('mescitationsappreciees.php')) {
        a.querySelector('span')?.remove();
      }
    });


    document.querySelectorAll('.titre').forEach(titre => {
      if (titre.textContent.includes("Citations")) {
        titre.querySelectorAll('span').forEach(span => {
          if (span.textContent.match(/^\(\d+\)$/)) span.remove();
        });
      }
    });


    document.querySelectorAll('.titre').forEach(titre => {
      if (titre.textContent.includes("Critiques appréciées")) {
        titre.querySelectorAll('span').forEach(span => {
          if (span.textContent.match(/^\(\d+\)$/)) span.remove();
        });
      }
    });


    const progress = document.querySelector('.contribution_progress');
    if (progress) {
      if (progress.previousSibling?.nodeName === "BR") progress.previousSibling.remove();
      if (progress.nextSibling?.nodeName === "BR") progress.nextSibling.remove();
      progress.remove();
    }


    // Supprimer les doubles balises <br>
    document.querySelectorAll('.side_r_content').forEach(sideR => {
      sideR.querySelectorAll('br + br').forEach(br => br.remove());
    });

    const sideStats = document.querySelector('a[href*="mescitationsappreciees.php"]').closest('.side_stats');
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



  });
  

  observer.observe(document.body, { childList: true, subtree: true });
}