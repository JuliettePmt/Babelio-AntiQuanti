// C'EST ICI que disparaissent les numéros de pages du forum

export function userMetrics() {
  console.log("userMetrics OK");

  // *** Volet "Statistiques"
  const voletStatistiques = document.querySelector(
    "#page_corps > div > div.livre_header.row > div > div > a:nth-child(4)"
  );
  if (voletStatistiques) {
    if (voletStatistiques.textContent == "Statistiques") {
      voletStatistiques.remove();
    }
  }

  // Menu déroulant (sous l'icône de profil en haut à droite) : supprimer l'accès à la page statistiques
  const menuDeroulant = document.getElementById("menu_user_under");

  if (menuDeroulant) {
    const statistiquesMenuDeroulant = Array.from(menuDeroulant.querySelectorAll("a")).find(link => link.textContent === "Statistiques");

    if (statistiquesMenuDeroulant) {
      statistiquesMenuDeroulant.remove();
    }
  }

  // Nombre d'abonnés / abonnements (milieu de page, sous le pseudo)
  const liensNoirs = document.getElementsByClassName("tiny_links dark");

  Array.from(liensNoirs).forEach((lien) => {
    if (lien.textContent.includes("abonnés")) {
      lien.textContent = "Abonnés"
    }
    else if (lien.textContent.includes("abonnements")) {
      lien.textContent = "Abonnements"
    }
  });

  // Menu déroulant de "Mes Livres"
  const selectElements = document.querySelectorAll("select");

  selectElements.forEach(selectElement => { 
    const options = selectElement.querySelectorAll("option"); 
  
    options.forEach(option => {
      option.textContent = option.textContent.replace(/\s*\(\d+\)/g, '').trim();
    });
  });

  // Number of books by category on profile (example : "Littérature italienne")
  const booksByCategories = document.querySelectorAll("#page_corps > div > div.side_l > div > div.liste_fiches > div");

  if (booksByCategories) {
    const nbBooksByCategory = document.querySelectorAll("a > div > p");

    nbBooksByCategory.forEach((nbByCategory) => {
      nbByCategory.remove();
    });
  }

  // *** Volet "Mes livres"

  // Statistiques : nombre de citations & critiques
  const nbQuotesMyBooks = document.querySelectorAll(
    "#form-test > div.mes_livres > div.mes_livres_con > table > tbody > tr > td.titre_livre > a.titre_livre_elements"
  );

  if (nbQuotesMyBooks.length > 0) {
    nbQuotesMyBooks.forEach((nbQuotes) => {
      nbQuotes.remove();
    });
  }

  // Supprimer le nombre de lecteurs dans le tableau des livres lus (onglet Mes Livres)
  const nbReadersColumnMyBooks = document.querySelectorAll("td.lecteurs");

  if (nbReadersColumnMyBooks.length > 0) {
    nbReadersColumnMyBooks.forEach((nb) => {
      nb.remove();
    });
  }

  // Supprimer le sélecteur de notes de "Mes livres" (pour trier par notes)
  const gradeSelector = document.querySelectorAll("div.styled-select");

  if (gradeSelector.length > 0) {
    gradeSelector.forEach((selector) => {
      if (selector.textContent.includes("Note")) {
        selector.remove();
      }
    });
  }

  // Nombre de livres "en train de lire" et "pour une île déserte"
  const allDivTitres = document.getElementsByClassName("titre");

  if (allDivTitres) {
    const observer = new MutationObserver(() => {
      const ileDeserteDiv = Array.from(allDivTitres).find((div) => div.textContent.includes("déserte")); 
      const enTrainDeLire = Array.from(allDivTitres).find((div) => div.textContent.includes("En train"));
      const groupeNb = Array.from(allDivTitres).find((div) => div.textContent.includes("Groupes"));
      const messagesNb = Array.from(allDivTitres).find((div) => div.textContent.includes("Mes Messages"));
      const discussionNb = Array.from(allDivTitres).find((div) => div.textContent.includes("Discussion avec"));
      const listesNb = Array.from(allDivTitres).find((div) => div.textContent.includes("Ses listes"));
      const echangesNb = Array.from(allDivTitres).find((div) => div.textContent.includes("A échanger"));

      function supprimerParentheses(array) {
        if (array) {
          array.childNodes.forEach((node) => {
            if (
              node.nodeType === Node.TEXT_NODE &&
              /\(\d+\)/.test(node.textContent)
            ) {
              node.textContent = node.textContent.replace(/\s*\(\d+\)/g, "");
            }
          });
        }
      }
      supprimerParentheses(ileDeserteDiv)
      supprimerParentheses(enTrainDeLire)
      supprimerParentheses(groupeNb)
      supprimerParentheses(messagesNb)
      supprimerParentheses(discussionNb)
      supprimerParentheses(listesNb)
      supprimerParentheses(echangesNb)

      // Supprimer le nombre de messages envoyés dans une conversation
      const messagesPrives = document.querySelectorAll('.post_con');

      messagesPrives.forEach(messagePrive => {
        const compteurMessagesPrives = messagePrive.querySelector('div[style*="float:right"][style*="margin-right:10px"][style*="color:#999"][style*="font-size:13px"]');
        if (compteurMessagesPrives) {
          compteurMessagesPrives.remove();
        }
      });


    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
}