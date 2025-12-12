// Delete all ads and commercial calls to action

export function commercial() {
    console.log("Commercial OK");

    // Supprimer le bandeau d'achat sur une plateforme en ligne
    const titles = document.querySelectorAll(".side_r_content");

    titles.forEach(title => {
        if (title.textContent.includes("Acheter ce livre sur")) {
            title.remove();
        }
    });
    
}

