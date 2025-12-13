// PAs ici nb de pages forum

export function ratings() {
  console.log("Ratings OK");
  let ratingArray = [];

  //******** MULTIPLE ELEMENTS ********

  // Recommended books to read next (before critics)
  const recoBooks = document.querySelectorAll(
    "div.list_livre:not(.hidden-by-script)"
  );

  if (recoBooks) {
    recoBooks.forEach((book) => {
      const bookRating = book.querySelector("div > div > div > div > h3");
      const bookCritics = book.querySelector(
        "div > div > div > div > h3 > nobr > a"
      );

      if (bookRating) {
        bookRating.style.display = "none";
        bookRating.classList.add("processed-by-script");
      }

      if (bookCritics) {
        bookCritics.style.display = "none";
        bookCritics.classList.add("processed-by-script");
      }
    });
  }

  // Community ratings (stars before critics)
  const communityRatings = document.querySelectorAll(
    "span > div.entete_critique > div.entete_login > div"
  );
  
  const textNoter = document.querySelector(
    "#page_corps > div > div:nth-child(3) > div.side_l > div.livre_con > div.col.col-8 > table > tbody > tr > td:nth-child(1) > nobr"
  );

  if (communityRatings) {
    communityRatings.forEach((communityRating) => {
      communityRating.style.display = "none";
      communityRating.classList.add("processed-by-script");
    });
  }

  if (textNoter) {
    textNoter.remove();
    textNoter.classList.add("processed-by-script");
  }

  // Selected books. Example : https://www.babelio.com/categories/Non-fiction/10/tous
  const ratingSelectedBooks = document.querySelectorAll(
    '[id^="rateit-range-"]'
  );
  if (ratingSelectedBooks) {
    ratingSelectedBooks.forEach((ratingSelectedBook) => {
      ratingSelectedBook.style.display = "none";
      ratingSelectedBook.classList.add("processed-by-script");
    });
  }

  //******** UNIQUE ELEMENTS ********
  // Top part of book page (beside metadata)
  // const ratingValue = document.querySelector(
  //   "#page_corps > div > div:nth-child(3) > div.side_l > div.livre_con > div.col.col-8 > span:nth-child(7)"
  // );
  // const ratingValueV2 = document.querySelector(
  //   "#page_corps > div > div:nth-child(3) > div.side_l > div.livre_con > div.col.col-8 > span:nth-child(3)"
  // );
  // if (ratingValue) ratingArray.push(ratingValue);
  // if (ratingValueV2) ratingArray.push(ratingValueV2);

  // const ratingStars = document.querySelector("div.rateit");
  // if (ratingStars) ratingArray.push(ratingStars);

  // const ratingScale = document.querySelector(
  //   "#page_corps > div > div:nth-child(3) > div.side_l > div.livre_con > div.col.col-8 > span:nth-child(5)"
  // );
  // if (ratingScale) ratingArray.push(ratingScale);

  // // Bottom part of book page (just before critics)
  // const distributionRatings = document.querySelector(
  //   "#page_corps > div > div:nth-child(3) > div.side_l > div:nth-child(9)"
  // );
  // if (distributionRatings) ratingArray.push(distributionRatings);


  const bookMetadata = document.querySelector("div.livre_con");
  if (bookMetadata) {
    const newBookRating = document.querySelector("[style*='border-radius:5px']");
    if (newBookRating) ratingArray.push(newBookRating); // Fonctionne pour masquer tout
    }

  //// Onglet "Critiques"
  // Sumary of critics
  const summaryRatingsPageCritics = document.querySelector("#histogramme");
  if (summaryRatingsPageCritics) {
    summaryRatingsPageCritics.remove();
  }

  /// Search page
  const bookRatingSearch = document.querySelectorAll("div.sgst_auteur_txt");

  if (bookRatingSearch) {
    bookRatingSearch.forEach((bookRating) => {
      const bookStats = bookRating.querySelector("br");
      if (bookStats) {
        let statistic = bookStats.nextSibling;
        while (statistic) {
          const nextSibling = statistic.nextSibling;
          statistic.remove();
          statistic = nextSibling;
        }
      }
    });
  }


// ----------------------------------- SUPPRIMER LA NOTE DANS LA RECO DU JOUR ---------------------------------------------

  // Attendre que la lightbox soit ouverte et que l'iframe soit chargé
function checkAndCleanLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || lightbox.style.visibility !== 'inherit') return;

  const iframe = lightbox.querySelector('iframe');
  if (!iframe) return;

  // Accéder au contenu de l'iframe (nécessite same-origin ou CORS permissif)
  try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      if (!iframeDoc) {
          // Si l'iframe n'est pas encore chargé, réessayer plus tard
          setTimeout(checkAndCleanLightbox, 300);
          return;
      }

      // Sélecteur pour cibler la note ("4.09★") dans l'iframe
      const ratingElement = iframeDoc.querySelector('div[style*="margin:0px auto 7px auto"] > span[style*="color:#fbb91e"]')?.parentElement;
      if (ratingElement) {
          ratingElement.remove();
          console.log("Élément supprimé dans l'iframe !");
      } else {
          console.log("Élément non trouvé dans l'iframe.");
      }
  } catch (e) {
      console.error("Erreur d'accès à l'iframe (CORS ?) :", e);
  }
}

// 1. Vérifier périodiquement si la lightbox est ouverte
const lightboxChecker = setInterval(checkAndCleanLightbox, 500);

// 2. Écouter les clics qui pourraient ouvrir la lightbox
document.addEventListener('click', () => {
  setTimeout(checkAndCleanLightbox, 200); // Délai pour laisser le temps à l'iframe de charger
});

// 3. Nettoyer quand la lightbox est fermée
const originalClose = document.getElementById('lightbox_close')?.onclick;
if (originalClose) {
  document.getElementById('lightbox_close').onclick = function() {
      originalClose.call(this);
      clearInterval(lightboxChecker); // Arrêter la vérification si la lightbox est fermée
  };
}

// --------------------------------------------------------------------------------
  


  //  >> Execution <<
  for (let i = 0; i < ratingArray.length; i++) {
    const element = ratingArray[i];
    if (element) {
      element.setAttribute(
        "style",
        "display: none !important; visibility: hidden !important;"
      );
      element.classList.add("hidden-by-script");
    }
  }
}
