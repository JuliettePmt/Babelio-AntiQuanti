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

    const nbFollowers = document.querySelectorAll('a[href="/abonnes"]');
    const nbFollowing = document.querySelectorAll('a[href="/abonnements"]');

    nbFollowers.forEach(function (follower) {
      follower.remove();
    });

    nbFollowing.forEach(function (following) {
      following.remove();
    });

    const sideStats = document.querySelectorAll(".side_stats");
    sideStats.forEach((stat) => {
      stat.remove();
    });

    const contributionStat = document.querySelectorAll(".contribution_progress");
    contributionStat.forEach((stat) => {
      stat.remove();
    });

    const contributionStatLegend = document.querySelectorAll(".contribution_legend");
    contributionStatLegend.forEach((stat) => {
      stat.remove();
    });

    // INSIGNES - vérifier avec un log
    const insignes = document.querySelectorAll(".side_insignes");
    insignes.forEach((stat) => {
      console.log("Suppression de:", stat);
      stat.remove();
    });

    const titres = document.querySelectorAll(".side_r_content");
    titres.forEach((titre) => {
      if (
        titre.textContent.includes("Contributions appréciées") ||
        titre.textContent.includes("Contributions & insignes") ||
        titre.textContent.includes("Notez vos lectures")
      ) {
        titre.remove();
      }
    });

  });

  observer.observe(document.body, { childList: true, subtree: true });
}