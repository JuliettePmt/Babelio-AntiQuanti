// En cours de refacto

export function platformMetrics() {

    console.log("platformMetrics OK")

  //// Fonction de suppression des parenthèses : élément de type "Nombre de lecteurs (7 000)" -> "Nombre de lecteurs"          
    function deleteParentheses(pageElement) {
        if (pageElement) {
            pageElement.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent = node.textContent.replace(/\(\d+\)/, '');
                }
            });
        }
    }

    //// Fonction de suppression des parenthèses : élément de type "Nombre de lecteurs (7 000)" -> "Nombre de lecteurs"
    let numberOfElementsArray = []

    // Bannière avec nb d'articles de presse, de critiques, de citations sur la page d'un livre
    const bannerBookInfo = document.querySelectorAll(".menu_link")

    if (bannerBookInfo) {
        bannerBookInfo.forEach(section => {
            numberOfElementsArray.push(section)
        });
    }

    // Étoiles dans le texte (exemple : "4.53★ (2998)"")
    const etoileDivs = document.querySelectorAll(".titre_livre_elements");

    etoileDivs.forEach(ratingDiv => {
        const ratingText = Array.from(ratingDiv.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.includes("★"));
        
        if (ratingText) {
            ratingText.remove();
        }
    });


    // Nombre de livres lus (dans la bannière du profil d'utilisateur) : "Livres (XXX)"
    const nbBooksRead = Array.from(document.querySelectorAll(".menu_link")).find(a => a.textContent.includes("Livres"));
    deleteParentheses(nbBooksRead)

    // "Critiques, Analyses et Avis (XXX)"
    const criticsNumber = document.querySelector("#critiques")
    if (criticsNumber) numberOfElementsArray.push(criticsNumber)

    // Bottom nb of press critics ("Presse (XXX)")
    const pressNumber = document.querySelector("#critiques_presse")
    if (pressNumber) numberOfElementsArray.push(pressNumber)

    // Bottom nb of citations ("Citations (XXX)")
    const citationsNumber = document.querySelector("#citations")
    if (citationsNumber) numberOfElementsArray.push(citationsNumber)

    // Nb of readers (dynamic)
    const targetNodeNbReaders = document.querySelector("div.side_r");

    // Nb of pages du livres ("566 pages")
    const nbDePages = document.querySelectorAll(".livre_refs");
    nbDePages.forEach(page => {
        page.childNodes.forEach(node => {
          if (
            node.nodeType === Node.TEXT_NODE &&
            node.textContent.includes("pages")
          ) {
            node.remove();
          }
        });
      });
      

    if (targetNodeNbReaders) {
        const observer = new MutationObserver(() => {

        const readersDiv = Array.from(targetNodeNbReaders.querySelectorAll("div.titre")).find(div => div.textContent.includes("Lecteurs")); // Nombre de lecteurs sur la page d'un livre
        deleteParentheses(readersDiv)

        const authorOtherBooksDiv = Array.from(targetNodeNbReaders.querySelectorAll("div.titre")).find(div => div.textContent.includes("Autres livres de")); // Nombre d'autres livres par le même auteur
        deleteParentheses(authorOtherBooksDiv)


        const listsDivPageLists = Array.from(document.querySelectorAll("div.titre")).find(div => div.textContent.includes("Listes contenant")); // Nombre de livres dans la liste (sur la page des livres)
        deleteParentheses(listsDivPageLists)

        const listsDiv = Array.from(targetNodeNbReaders.querySelectorAll("div.titre")).find(div => div.textContent.includes("Listes avec ce livre")); // Nombre de listes avec ce livre

        if (listsDiv) { 
            const link = listsDiv.querySelector("a"); 
            if (link) {
                link.textContent = link.textContent.replace(/\(\d+\)/g, '');
            }
        }


        observer.disconnect();
        });  

        observer.observe(targetNodeNbReaders, { childList: true, subtree: true });
    }


    
    const observer = new MutationObserver(() => {
        const currentlyReading = Array.from(document.querySelectorAll("div.titre"))
            .find(div => div.textContent.includes("en train de le lire")); // " Ils sont en train de le lire"
    
        const haveRead = Array.from(document.querySelectorAll("div.titre"))
            .find(div => div.textContent.includes("l'ont lu")); // "Ils l'ont lu"
    
        const wantToRead = Array.from(document.querySelectorAll("div.titre"))
            .find(div => div.textContent.includes("veulent le lire")); // "Ils veulent le lire"

        const lecteursDe = Array.from(document.querySelectorAll("h2")) //h2, pas div.titre
            .find(div => div.textContent.includes("Lecteurs de")); // "Lecteurs de Les Guerriers de l'hiver (17216)"

        const wantToExchange = Array.from(document.querySelectorAll("h2")) //h2, pas div.titre
            .find(div => div.textContent.includes("veulent l'échanger")); // "Ils veulent l'échanger"


        deleteParentheses(currentlyReading)
        deleteParentheses(haveRead)
        deleteParentheses(wantToRead)
        deleteParentheses(lecteursDe)
        deleteParentheses(wantToExchange)
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });


    // Masquer l'iframe du nombre de followers sur Facebook (sur la page d'accueil)
    document.querySelectorAll('iframe[src*="facebook.com"]').forEach(iframe => {
        iframe.style.display = 'none';
    });


    // Number of citations between reco books 
    const bookCitations = document.querySelectorAll(".side_l h3 nobr a");
    if (bookCitations) {
        bookCitations.forEach(bookCitation => {
            bookCitation.style.display = "none";
        });
    };


    // Nombre de critique par chaque média de presse (page "Dernières critiques")
    document.querySelectorAll("div.fiche_lecteur span").forEach(span => {
        if (/^\d+\s+critiques$/.test(span.textContent.trim())) {
            span.remove();
        }
    });


    // >> Execution <<
    numberOfElementsArray.forEach(element => {deleteParentheses(element)})


    // numberOfElementsArray.forEach(element => {
    //     element.childNodes.forEach(node => {
    //         if (node.nodeType === Node.TEXT_NODE) {
    //             node.textContent = node.textContent.replace(/\s*\(.*?\)\s*/g, '');
    //         }
    //     });
    // });
    
}
