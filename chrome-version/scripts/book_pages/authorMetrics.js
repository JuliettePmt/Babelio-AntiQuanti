// Pas ici nb de pages
export function authorMetrics() {

    // Nombre de livres écrits et de critiques reçues
    const statsAuteur = document.querySelectorAll(".livre_bold a");

    statsAuteur.forEach((link) => {
        if (link.href.includes("/bibliographie")) {
        // Remplace le contenu par "Livres" uniquement
        link.textContent = "Livres";
        } else if (link.href.includes("/critiques")) {
        // Remplace le contenu par "Critiques" uniquement
        link.textContent = "Critiques";
        }
    });

  //   const etoiles = Array.from(document.querySelectorAll("*"))
  //   .filter(etoile => Array.from(etoile.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent.includes("★")) );
  
  // console.log("Éléments supprimés :", etoiles);
  
  // etoiles.forEach(étoile => étoile.remove());
  
  const ratingScales = document.querySelectorAll("div.rateit");
  ratingScales.forEach(ratingScale => ratingScale.remove());


    // "Bibliographie de [Virginie Despentes] (XX)"
    const allDivTitres = document.getElementsByClassName("titre");

    if (allDivTitres.length > 0) {
      const observer = new MutationObserver(() => {
        Array.from(allDivTitres).forEach((titre) => {
          // Cas spécifique pour le div #dvideo
          if (titre.id === "dvideo") {
            // Parcours les nœuds enfants du div
            Array.from(titre.childNodes).forEach((node) => {
              // Ne garde que les nœuds texte (pas le lien <a>)
              if (node.nodeType === Node.TEXT_NODE) {
                // Supprime les "(XX)" dans le nœud texte
                node.textContent = node.textContent.replace(/\s*\(\d+\)/g, "");
              }
            });
          }
          // Autres cas (Citations, Vidéos, etc.)
          else if (
            titre.textContent.includes("Citations sur") ||
            titre.textContent.includes("Citations de") ||
            titre.textContent.includes("Vidéos de") ||
            titre.textContent.includes("Videos de")
          ) {
            const span = titre.querySelector("span");
            if (span) span.remove();
          }
        });
      });


      // Démarre l'observation
      observer.observe(document.body, { childList: true, subtree: true });
    }



    

    // Voir plus (XX)
    const voirPlus = document.getElementsByClassName("more");
    if (voirPlus) {
        const nbVoirPlus = Array.from(voirPlus);
        nbVoirPlus.forEach((element) => {
            element.textContent = element.textContent.replace(/\s*\(\d+\)/g, "");
        });
    }  
    
    // PAGE DE RECHERCHE D'UN AUTEUR (quand on tape dans la barre de recherche)

    const statsAuteursRecherche = document.querySelectorAll(".resultats_bas");

    if (statsAuteursRecherche) {
        statsAuteursRecherche.forEach((div) => {
            // Supprimer "3 livres" et "9 lecteurs"
            div.innerHTML = div.innerHTML.replace(/\d+(?=\s*(livres|lecteurs|lectures|participants))/g, '').trim(); // Supprimer les chiffres avant les mots "livres", "lecteurs" et "participants"
            div.innerHTML = div.innerHTML.replace("livres", 'Livres').trim();
            div.innerHTML = div.innerHTML.replace("lecteurs", '').trim();
            div.innerHTML = div.innerHTML.replace("lectures", '').trim();
            div.innerHTML = div.innerHTML.replace("participants", '').trim();
      
          });
    }

    

}
