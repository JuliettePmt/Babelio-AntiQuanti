// Pas ici pour le nb de pages sur le forum

export function community() {

    console.log("Community OK")

    // Likes on critics
    const communityLikes = document.querySelectorAll("span.qualite > span.post_items_like");

    if (communityLikes) {
        communityLikes.forEach(communityLike => {
            const numberLikes = communityLike.querySelector('[id^="myspan"]'); // name of the id starts with "myspan"

            if (numberLikes) {
                numberLikes.style.display = "none";
            }
        });
    }

    // Commentaires critiques
    const commentaryOnCritics = document.querySelectorAll("span.qualite > a");
    if (commentaryOnCritics) {
        commentaryOnCritics.forEach(commentary => {
            const numberOfCommentaryOnCritics = commentary.querySelector('[id^="myspan"]');
            if (numberOfCommentaryOnCritics) {
                numberOfCommentaryOnCritics.style.display = "none";
            }
        });
    }

    // Nombre de livres dans une liste
    const nbBooksLists = document.querySelectorAll("div.side_r > div:nth-child(8) > div.liste.row > div > div > h3");
    
    if (nbBooksLists.length > 0) {
        nbBooksLists.forEach(nbBooksList => {
            const nbBooksListsV1 = nbBooksList.querySelectorAll("strong");
            if (nbBooksListsV1.length > 0) {
                nbBooksListsV1.forEach(nbBooksListV1 => {
                    nbBooksListV1.remove();
                });
            }

            const textNbBooksListsV1 = nbBooksList.querySelectorAll("span")
            if (textNbBooksListsV1.length > 0) {
                textNbBooksListsV1.forEach(textNbBooksListV1 => {
                    textNbBooksListV1.remove();
                });
            }
        });
    }

    const nbBooksListsV2 = document.querySelectorAll("#page_corps > div > div > div.side_r > div > div > div.liste.row > div > div > h3 > span");

    if (nbBooksListsV2.length > 0) {
        nbBooksListsV2.forEach(nbBooksListV2 => {
            nbBooksListV2.remove();
        });
    }

    // "Lecteurs les plus actifs cette semaine" : delete number of critics
    const bestUserCriticsCard = document.querySelectorAll("div.fiche_lecteur > a");

    if (bestUserCriticsCard.length > 0) {
        bestUserCriticsCard.forEach(userCard => {
            // Iterate through the child elements of the <a> element
            userCard.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.match(/\d+\s*critiques/)) {
                    node.textContent = node.textContent.replace(/\d+\s*critiques/, '').trim();
                }
            });
        });
    };


    // QUIZ


    // Nombre de réponses aux quizz (page de livres)
    const numberUsersQuiz = document.querySelector(".side_quizz_nb")

    if (numberUsersQuiz) {
        numberUsersQuiz.remove();
    }

    // Nombre de participants aux quizz (page de quizz : https://www.babelio.com/quiz/)
    const quizMetadataGroup = document.querySelectorAll("div.quiz_row");

    quizMetadataGroup.forEach(quizMetadata => {
        const h3 = quizMetadata.querySelector("h3");
        if (h3) {
            h3.remove();
        }
    });
    


    // Quiz rating
    const metadataQuiz = document.querySelectorAll("div > div > div > div > h3 > a");
    metadataQuiz.forEach(link => {
        let ratingQuiz = link.nextSibling;
    
        while (ratingQuiz && (ratingQuiz.nodeType !== Node.TEXT_NODE || !ratingQuiz.nodeValue.trim())) {
            ratingQuiz = ratingQuiz.nextSibling;
        }
    
        if (ratingQuiz) {
            console.log("Texte suivant :", ratingQuiz.nodeValue.trim());
            ratingQuiz.remove();
        }
    });
    

    // GROUPS

    // Nb of users in groups + nb of messages
    const metadataGroups = document.querySelectorAll("div > div > div > a > table > tbody > tr > td > div > div > span")

    if (metadataGroups) {
        metadataGroups.forEach(metadata => {
            metadata.remove();
        });
    }

    
    // Nb of messages (inside groups)
    const nbMessagesGroups = document.querySelectorAll("div > div > div > a > table > tbody > tr > td > div > span > a")

    if (nbMessagesGroups) {
        nbMessagesGroups.forEach(metadata => {
            metadata.remove();
        });
    };


    // Users in groups ("PARTICIPANTS (XXX)")
    const nbUsersGroups = document.querySelector("#page_corps > div > div.side_r > div > div.titre")

    if (nbUsersGroups) {
        Array.from(nbUsersGroups.childNodes).forEach(node => {
            node.textContent = node.textContent.replace(/\(\d+\)/g, '');
        });
    }

    // "XXX livres en commun" sur le profil d'un utilisateur
    const commonBooks = document.querySelectorAll("div.livre_refs");

    commonBooks.forEach(book => {
        // Vérifiez si le texte contient un nombre suivi de "livres en commun"
        if (book.textContent.match(/^\d+\s*livres en commun/)) {
            // Supprimer l'élément si la condition est vraie
            book.remove();
        }
    });

    // Nb of books insigne
    const nbBooksInsigne = document.querySelectorAll("div.gris");

    if (nbBooksInsigne.length > 0) {
        nbBooksInsigne.forEach(bookNb => {
            if (bookNb.textContent.match(/^\d+\s*livres/)) {
                bookNb.textContent = bookNb.textContent.replace(/\s?\(\+\d+\)/, '').trim();
            }
        });
    }


// COMPARAISON ENTRE PROFILS

    // TO DO : vous avez XX livres en commun (remplacer par "Vous avez des livres en commun !")

    // Pourcentage de proximité des goûts entre nous et un autre utilisateur (ex : "Humour (+3%)")

        const pourcentageProxmiteGouts = document.querySelectorAll("p.tags")

        if (pourcentageProxmiteGouts.length > 0) {
            pourcentageProxmiteGouts.forEach(pourcentage => {
                if (pourcentage.textContent.match(/^\d+\s*livres/)) {
                    pourcentage.textContent = pourcentage.textContent.replace(/\s?\(\+\d+\)/, '').trim();
                }
            });
        }

    // Nombre de livres des derniers lecteurs inscrits
    document.querySelectorAll(".fiche_lecteur a").forEach(a => {
        a.childNodes.forEach(node => {
            if (
                node.nodeType === Node.TEXT_NODE &&
                /\d+\s+livres/.test(node.textContent)
            ) {
                node.remove();
            }
        });
    });


    // BADGES ET INSIGNES (accessibles autrement sur le site)
    
      // Nombre de points des "experts"
      document.querySelectorAll("div.gris").forEach(div => {
        if (div.textContent.includes("points")) {
            div.remove(); 
        }
    });
    
      
    // Supprimer les nombres de critiques des experts mais garder le <a>
    document.querySelectorAll("a.titre_livre_elements b").forEach(b => {
        if (/^\d+$/.test(b.textContent.trim())) {
            b.remove(); // supprime le <b> uniquement si c'est un numéro
        }
    });
    

    // Supprimer le classement des experts (1er, 178ème, etc.)
    document.querySelectorAll("a.titre1").forEach(a => {
        a.childNodes.forEach(node => {
            if (
                node.nodeType === Node.TEXT_NODE &&
                /\d+(er|ème)/.test(node.textContent)
            ) {
                node.remove();
            }
        });
    });


    // Supprimer le nombre de critiques d'un abonné
    document.querySelectorAll("a.titre_livre_elements").forEach(a => {
        // Vérifie si le lien contient "critiques"
        if (a.textContent.includes("critiques")) {
            a.querySelectorAll("span").forEach(span => {
                if (/^\d+$/.test(span.textContent.trim())) {
                    span.remove();
                }
            });
        }
    });

    document.querySelectorAll("a.titre_livre_elements").forEach(a => {
        // Vérifie si le lien contient "critiques"
        if (a.textContent.includes("citations")) {
            a.querySelectorAll("span").forEach(span => {
                if (/^\d+$/.test(span.textContent.trim())) {
                    span.remove();
                }
            });
        }
    });
    
    
    

    // Supprimer les nombres de tous les onglets ("premiers pas", "insignes", "experts")
    document.querySelectorAll("#tabsholder2 li span").forEach(span => {
        // Supprime uniquement les nombres entre parenthèses
        span.textContent = span.textContent.replace(/\(\s*\d+\s*\)/, "");
    });
    

    // Flèches de progression dans le classement

    document.querySelectorAll("div[style*='font-size:12px'] img").forEach(img => {
        if (img.src.includes("frouge.png")) {
            img.remove();
        }
    });

    document.querySelectorAll("div[style*='font-size:12px'] img").forEach(img => {
        if (img.src.includes("fverte.png")) {
            img.remove();
        }
    });
    
    // Classements et insignes, suite
    document.querySelectorAll("div[style*='font-size:12px'] span").forEach(span => {
        // Supprime uniquement si le texte est un nombre
        if (/^\d+$/.test(span.textContent.trim())) {
            span.remove();
        }
    });
    
    
};
