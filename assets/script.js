let players = [];
let selectedCategory = "";
let usedQuestions = [];
let questions = {
    culture: ["💡 Quel est le plus long fleuve du monde ?", "🧐 Qui a peint La Joconde ?", "🏛️ En quelle année a eu lieu la Révolution Française ?"],
    humour: ["🤣 Quelle est la meilleure blague que tu connais ?", "😂 Fais une imitation d'un acteur célèbre !"],
    blagues: ["😆 Pourquoi les plongeurs plongent-ils toujours en arrière ?", "🤡 Quelle est la différence entre un pigeon ?"],
    defis: ["🔥 Bois une gorgée de ta boisson sans les mains !", "🎭 Fais une grimace et tiens-la 10 secondes !"],
    mystere: ["🔮 Si tu pouvais connaître une seule chose du futur, ce serait quoi ?", "🕵️‍♂️ Si tu pouvais être un personnage de film, qui serais-tu ?"]
};

let gages = [
    "🛑 Danse au milieu du restaurant pendant 10 secondes !",
    "🎤 Chante une chanson avec un verre d’eau en guise de micro.",
    "🤣 Commande un dessert en pleurant de joie."
];

function chooseCategory(category) {
    selectedCategory = category;
    document.getElementById("portal").style.display = "none";
    document.getElementById("category-selection").style.display = "block";
    document.getElementById("selected-category").textContent = `📚 Catégorie choisie : ${category.toUpperCase()}`;
}

function addPlayer() {
    let nameInput = document.getElementById("playerName").value;
    if (nameInput.trim() === "" || players.length >= 6) {
        document.getElementById("error-msg").textContent = "Ajoutez au moins 2 et max 6 joueurs.";
        return;
    }
    players.push({ name: nameInput, score: 0 });
    document.getElementById("playerName").value = "";
}

function startGame() {
    if (players.length < 2) return;
    document.getElementById("category-selection").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    nextTurn();
}

function nextTurn() {
    let player = players[Math.floor(Math.random() * players.length)];
    document.getElementById("announcement").textContent = `🔥 ${player.name}, c'est ton tour !`;
    let question = questions[selectedCategory][Math.floor(Math.random() * questions[selectedCategory].length)];
    document.getElementById("question").textContent = question;
}

function restartGame() {
    location.reload();
}
