export function community() {

    console.log("Community OK")

    // Likes on critics
    const communityLikes = document.querySelectorAll("span.qualite > span.post_items_like");

    if (communityLikes) {
        communityLikes.forEach(communityLike => {
            const numberLikes = communityLike.querySelector('[id^="myspan"]'); // name of the id starts with "myspan"

            if (numberLikes) {
                numberLikes.style.display = "none";
                numberLikes.classList.add("processed-by-script");
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
                numberOfCommentaryOnCritics.classList.add("processed-by-script");
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
            nbBooksListV2.classList.add("processed-by-script");
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
    
    
};
