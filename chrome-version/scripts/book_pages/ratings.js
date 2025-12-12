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
