// Not here nombre de pages de forum disparaissent

export function platformMetrics() {

    console.log("platformMetrics OK")

    let numberOfElementsArray = []

    // Top banner with press and community critics, citations
    const bannerBookInfo = document.querySelector("#page_corps > div > div:nth-child(3) > div.livre_header.row > table > tbody > tr > td:nth-child(2) > div > div")

    if (bannerBookInfo) {
        const infosSections = bannerBookInfo.querySelectorAll("a")

        infosSections.forEach(section => {
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


    // Nombre de livres lus (displayed in the banner of the user profile) : "Livres (XXX)"
    const nbBooksRead = Array.from(document.querySelectorAll("#page_corps > div > div.livre_header.row > div > div")).find(a => a.textContent.includes("Livres"));

    if (nbBooksRead) {
        Array.from(nbBooksRead.childNodes).forEach(node => {
                node.textContent = node.textContent.replace(/\(\d+\)/g, '');
        });
    }

    // Notes dans les recommandations quotidiennes


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

    if (targetNodeNbReaders) {
        const observer = new MutationObserver(() => {


        const readersDiv = Array.from(targetNodeNbReaders.querySelectorAll("div.titre")).find(div => div.textContent.includes("Lecteurs")); // Nombre de lecteurs sur la page d'un livre

        const authorOtherBooksDiv = Array.from(targetNodeNbReaders.querySelectorAll("div.titre")).find(div => div.textContent.includes("Autres livres de")); // Nombre d'autres livres par le même auteur


        const listsDivPageLists = Array.from(document.querySelectorAll("div.titre")).find(div => div.textContent.includes("Listes contenant")); // Nombre de livres dans la liste (sur la page des livres)
    
        if (listsDivPageLists) {
            // Parcourt uniquement les nœuds texte
            listsDivPageLists.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    // Supprime le nombre entre parenthèses, même si des espaces/retours sont autour
                    node.nodeValue = node.nodeValue.replace(/\(\d+\)/g, '').trim();
                }
            });
        }

        if (targetNodeNbReaders) {

            const listsDiv = Array.from(targetNodeNbReaders.querySelectorAll("div.titre")).find(div => div.textContent.includes("Listes avec ce livre")); // Nombre de listes avec ce livre

            if (listsDiv) { 
                const link = listsDiv.querySelector("a"); 
                if (link) {
                    link.textContent = link.textContent.replace(/\(\d+\)/g, '');
                }
            }

            if (authorOtherBooksDiv) {
                authorOtherBooksDiv.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("Autres livres de")) {
                        node.textContent = node.textContent.replace(/\(\d+\)/g, '');}
                });
            }          
        
            if (readersDiv) {
                readersDiv.childNodes.forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.includes("Lecteurs")) {
                        node.textContent = node.textContent.replace(/\(\d+\)/g, ''); // Remove directly only the number in parentheses
                    }
                });
            }


            }
        observer.disconnect();
        });  

        observer.observe(targetNodeNbReaders, { childList: true, subtree: true });
    }

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


    // >> Execution <<
    numberOfElementsArray.forEach(element => {
        element.childNodes.forEach(node => { // Use childNodes to prevent the suppression of all CSS style
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = node.textContent.replace(/\s*\(.*?\)\s*/g, '');
            }
        });
    });
    
}
