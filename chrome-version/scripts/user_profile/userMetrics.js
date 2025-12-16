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
      const listeUserNb = Array.from(allDivTitres).find((a) => a.textContent.includes("Ses listes"));
      const critiquesSurTheme = Array.from(allDivTitres).find((div) => div.textContent.includes("Critiques sur le theme"));
      const podcasts = Array.from(allDivTitres).find((div) => div.textContent.includes("Podcasts de"));
      const themesCommunsComparaison = Array.from(allDivTitres).find((div) => div.textContent.includes("thèmes de lecture communs"));
      const citationsSur = Array.from(allDivTitres).find((div) => div.textContent.includes("Citations sur")); // "Citations sur "Feu" "
      const bibliographieAuteur = Array.from(allDivTitres).find((div) => div.textContent.includes("Bibliographie de")); // "Bibliographie de Marc Lévy"

      supprimerParentheses(ileDeserteDiv)
      supprimerParentheses(enTrainDeLire)
      supprimerParentheses(groupeNb)
      supprimerParentheses(messagesNb)
      supprimerParentheses(discussionNb)
      supprimerParentheses(listesNb)
      supprimerParentheses(echangesNb)
      supprimerParentheses(listeUserNb)
      supprimerParentheses(themesCommunsComparaison)
      supprimerParentheses(citationsSur)
      supprimerParentheses(podcasts)
      supprimerParentheses(critiquesSurTheme)
      supprimerParentheses(bibliographieAuteur) // A priori : non-fonctionnel, voir ci-après


      // "Voir tous mes livres (XXX)" (page d'un genre littéraire particulier : ex. : Littérature tchèque)
      const allTinyLinks = document.getElementsByClassName("tiny_links");

      if (allTinyLinks) {
        const voirTousMesLivres = Array.from(allTinyLinks).find((a) => a.textContent.includes("voir tous mes livres"));

        if (voirTousMesLivres) {
          supprimerParentheses(voirTousMesLivres)
          }
      }
      
      // "Bibliographie de Marc Lévy (XX)"
      document.querySelectorAll('.texte_t3').forEach(el => {
        const parent = el.closest('div');
        if (parent && parent.textContent.includes('Bibliographie de')) {
          el.remove();
        }
      });


      // Nb de livres dans une liste

      document.querySelectorAll('.liste_row').forEach(row => {
        row.querySelectorAll('h3').forEach(h3 => {
          const strong = h3.querySelector('strong');
          const span = h3.querySelector('span');
      
          if (
            strong &&
            span &&
            /^\d+$/.test(strong.textContent.trim()) &&
            span.textContent.includes('livres')
          ) {
            strong.remove();
            span.remove();
          }
        });
      });
      
         // Note et nb de notes sur livres (pages de recherche plus lointaines, genre p. 16)
   
         document.querySelectorAll('.list_livre').forEach(livre => {
          livre.querySelectorAll('h3').forEach(h3 => {
            if (
              h3.textContent.includes('★') &&
              /\(\d+\)/.test(h3.textContent)
            ) {
              h3.remove();
            }
          });
        });
        

    // Nombre de livres dans la bibliothèque sur le thème XX (exemple : "6 livre(s) sur le thème littérature tchèque")
    const spans = document.querySelectorAll("span[style*='float:left'][style*='margin-top:15px'][style*='margin-right:2em']");

    spans.forEach(span => {
      // Vérifier le contenu
      if (span.textContent.includes("livre(s)  sur le thème")) {    
        const nbLivresTheme = span.querySelector("b");
        if (nbLivresTheme) {
          nbLivresTheme.remove(); 
        }
      }
    });
    

    // Vous avez X livres en commun (page comparaison des profils)
    const nbLivresCommunsUtilisateurs = Array.from(allDivTitres).find(a => a.textContent.includes("livres en commun") );
    
    if (nbLivresCommunsUtilisateurs && !nbLivresCommunsUtilisateurs.textContent.includes("Vous avez des livres en commun")) {
      if (nbLivresCommunsUtilisateurs.textContent.includes("0 livre")) {
        nbLivresCommunsUtilisateurs.textContent = "Vous n'avez pas de livre en commun";
      } else {
        nbLivresCommunsUtilisateurs.textContent = "Vous avez des livres en commun";
      }
    }
    
    // "Vos thèmes de lecture communs (XX%)""
    const nbThemesLectureCommuns = Array.from(allDivTitres).find(div =>
      div.textContent.includes("thèmes de lecture communs")
    );
    
    if (nbThemesLectureCommuns && !nbThemesLectureCommuns.dataset.cleaned) {
      nbThemesLectureCommuns.textContent = "Vos thèmes de lecture communs";
      nbThemesLectureCommuns.dataset.cleaned = "true"; // marque comme traité
    }




    // Livres d'accord ("Vous êtes d'accord sur X livres")
    const allH3 = document.querySelectorAll("h3");

    allH3.forEach(h3 => {
      // Ne traiter que les h3 contenant "d’accord sur" et non encore modifiés
      if (/d[’']accord sur/.test(h3.textContent) && !h3.dataset.cleaned) {
        const font = h3.querySelector("font");
        const nbLivres = font ? parseInt(font.textContent, 10) : 0;
    
        if (nbLivres === 0) {
          h3.textContent = "Vous n'êtes d'accord sur aucun livre";
        } else {
          h3.textContent = "Vous êtes d'accord sur certains livres";
        }
    
        // Marquer comme traité pour éviter que l'observer le retravaille
        h3.dataset.cleaned = "true";
      }
    });
    
    

    // Livres sur île déserte : classement dans les PAL (c'est une image sur une autre. Apparaît dans la bibliothèque)
    const divMesLivres = document.querySelectorAll("div.mes_livres");
    const toDelete = [
      "/images/1blanc.gif",
      "/images/2blanc.gif",
      "/images/3blanc.gif",
      "/images/4blanc.gif",
      "/images/5blanc.gif",
      "/images/6blanc.gif"
    ];
    
    divMesLivres.forEach(div => {
      div.querySelectorAll("img").forEach(img => {
        if (toDelete.includes(img.getAttribute("src"))) {
          img.remove(); 
        }
      });
    });
    
    
    // Thèmes communs : comparaison ("roman (+10%)")
    const tagsParagraphs = document.querySelectorAll("p.tags");

    tagsParagraphs.forEach(p => {
      const nobrs = p.querySelectorAll("nobr");
    
      nobrs.forEach(nobr => {
        if (nobr.dataset.cleaned) return;
    
        // Parcourir les enfants du nobr
        nobr.childNodes.forEach(node => {
          // Ne modifier que les nœuds de texte
          if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = node.textContent.replace(/\s*\(.*?\)/g, '').trim();
          }
        });
    
        nobr.dataset.cleaned = "true";
      });
    });
    
    

         

      // Supprimer le nombre de messages envoyés dans une conversation
      const postCon = document.querySelectorAll('.post_con');

      postCon.forEach(encadrePostCon => {
        const compteurMessagesPrives = encadrePostCon.querySelector('div[style*="float:right"][style*="margin-right:10px"][style*="color:#999"][style*="font-size:13px"]');
        if (compteurMessagesPrives) {
          compteurMessagesPrives.remove();
        }

  // RECOMMANDATIONS PERSONNALISÉES DU JOUR
      // Nombre de livres figurant parmi les recommandations personnalisées du jour
        const nbLivresRecoQuotidienne = encadrePostCon.querySelector('div.gris');
        if (nbLivresRecoQuotidienne) {
          nbLivresRecoQuotidienne.remove();
        }

      // Nombre de livres à afficher en plus (+6)
      const inside_plus_n = encadrePostCon.querySelector('div.inside_plus_n');
      if (inside_plus_n) {
        inside_plus_n.remove();
      }

      });

    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
}