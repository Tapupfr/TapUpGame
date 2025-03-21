document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Tap Up Game Chargé !");
    
    const startButton = document.getElementById("startGame");
    if (startButton) {
        startButton.addEventListener("click", function () {
            alert("🚀 Le jeu va commencer !");
        });
    }

    const categoryButtons = document.querySelectorAll(".category-btn");
    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            alert(`📌 Catégorie sélectionnée : ${this.dataset.category}`);
        });
    });
});
