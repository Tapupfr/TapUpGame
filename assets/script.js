// script.js

const screens = {
  accueil: document.getElementById("accueil"),
  joueurs: document.getElementById("joueurs"),
  jeu: document.getElementById("jeu"),
  fin: document.getElementById("fin")
};

let joueurs = [];
let currentIndex = 0;
let questionsParJoueur = 3;
let questionsTotales = [];
let currentQuestion = null;
let scores = {};

const categories = {
  culture: ["Quelle est la capitale de l’Australie ?", "En quelle année a eu lieu la Révolution française ?"],
  humour: ["Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?", "Qu’est-ce qui est jaune et qui attend ?"],
  blagues: ["C’est l’histoire d’un pingouin qui respire par les fesses...", "Pourquoi les squelettes ne se battent jamais entre eux ?"],
  defis: ["Fais 10 pompes maintenant !", "Crie 'Je suis un génie !' dans le restaurant !"],
  mystere: ["Tu dois révéler ton secret le plus honteux.", "Fais une imitation de ton animal préféré."]
};

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.cat;
    questionsTotales = [...categories[cat]];
    showScreen("joueurs");
  });
});

document.getElementById("valider-joueurs").addEventListener("click", () => {
  joueurs = [];
  scores = {};
  document.querySelectorAll(".player-input").forEach(input => {
    const nom = input.value.trim();
    if (nom) {
      const emoji = Math.random() > 0.5 ? "👦" : "👧";
      joueurs.push(emoji + " " + nom);
      scores[nom] = 0;
    }
  });
  shuffleArray(questionsTotales);
  showScreen("jeu");
  lancerTour();
});

function lancerTour() {
  if (currentIndex >= joueurs.length * questionsParJoueur) {
    afficherPerdant();
    return;
  }

  const joueur = joueurs[currentIndex % joueurs.length];
  document.getElementById("joueur-actif").textContent = `🔥 À toi de briller, ${joueur} ! Montre-nous ton génie !`;
  currentQuestion = questionsTotales.pop();
  document.getElementById("question-area").textContent = currentQuestion;
  document.getElementById("resultat").textContent = "";
}

document.getElementById("repondre-btn").addEventListener("click", () => {
  const joueur = joueurs[currentIndex % joueurs.length].split(" ")[1];
  const reussi = Math.random() > 0.3;
  if (reussi) {
    scores[joueur]++;
    document.getElementById("resultat").textContent = "Bonne réponse !";
  } else {
    document.getElementById("resultat").textContent = "Oups... mauvaise réponse.";
  }
  updateScores();
  currentIndex++;
  setTimeout(lancerTour, 1500);
});

function updateScores() {
  const zoneScores = document.getElementById("scores");
  zoneScores.innerHTML = "";
  for (let j of joueurs) {
    const nom = j.split(" ")[1];
    const score = scores[nom];
    const div = document.createElement("div");
    div.textContent = `${j} : ${score}`;
    zoneScores.appendChild(div);
  }
}

function afficherPerdant() {
  const minScore = Math.min(...Object.values(scores));
  const perdants = Object.entries(scores).filter(([_, v]) => v === minScore);
  const [nom] = perdants[Math.floor(Math.random() * perdants.length)];
  document.getElementById("perdant-msg").textContent = `Dommage ${nom}, tu es notre grand perdant ! 😅`;
  showScreen("fin");

  document.getElementById("mon-gage").onclick = () => {
    const gages = ["Chante une chanson à haute voix.", "Fais le tour du resto en dansant.", "Commande de l'eau comme un roi."];
    const gage = gages[Math.floor(Math.random() * gages.length)];
    document.getElementById("gage-area").textContent = gage;
  };
}

document.getElementById("rejouer").addEventListener("click", () => {
  window.location.reload();
});

function showScreen(nom) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[nom].classList.add("active");
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
