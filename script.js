// ===============================
//   Bonnes réponses du QCM
// ===============================
const bonnesReponses = {
  1: "B", 2: "B", 3: "B", 4: "B", 5: "B",
  6: "A", 7: "B", 8: "A", 9: "B", 10: "B",
  11: "B", 12: "B", 13: "B", 14: "B", 15: "B",
  16: "C", 17: "B", 18: "B", 19: "B", 20: "B",
  21: "B", 22: "B", 23: "B", 24: "B", 25: "B",
  26: "B", 27: "C", 28: "B", 29: "B", 30: "B"
};

// ===============================
//  Fonction de validation
// ===============================
function corrigerQCM() {
  const questions = document.querySelectorAll(".qcm-question");
  let score = 0;

  // Reset bordures avant correction
  questions.forEach(q => q.style.border = "2px solid transparent");

  // Reset état sidebar
  document.querySelectorAll(".nav-question").forEach(btn => {
    btn.classList.remove("good", "bad", "missing");
  });

  // Correction principale
  for (let i = 1; i <= 30; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    const block = document.getElementById(`question-${i}`);
    const navBtn = document.querySelector(`.nav-question[data-target="${i}"]`);

    if (!selected) {
      block.style.border = "3px solid orange";
      navBtn?.classList.add("missing");
      continue;
    }

    if (selected.value === bonnesReponses[i]) {
      score++;
      block.style.border = "3px solid lime";
      navBtn?.classList.add("good");
    } else {
      block.style.border = "3px solid #ff4444";
      navBtn?.classList.add("bad");
    }
  }

  // Affichage du score
  const scoreBox = document.getElementById("score-result");
  scoreBox.textContent = `Score : ${score} / 30`;
  scoreBox.classList.remove("score-bump");
  void scoreBox.offsetWidth; // reset animation
  scoreBox.classList.add("score-bump");

  // Afficher toutes les explications
  document.querySelectorAll(".correction-panel").forEach(p => {
    p.style.opacity = "1";
    p.style.transform = "translateY(0)";
    p.style.pointerEvents = "auto";
  });

  // Désactivation des réponses
  document.querySelectorAll("input[type='radio']").forEach(r => {
    r.disabled = true;
  });
}

// ===============================
//  Reset complet
// ===============================
function resetQCM() {
  // Réinitialisation graphique
  const questions = document.querySelectorAll(".qcm-question");
  questions.forEach(q => {
    q.style.border = "2px solid transparent";
    q.querySelectorAll("input[type='radio']").forEach(r => r.checked = false);
  });

  // Réactivation des radios
  document.querySelectorAll("input[type='radio']").forEach(r => {
    r.disabled = false;
  });

  // Masquer les explications
  document.querySelectorAll(".correction-panel").forEach(p => {
    p.style.opacity = "0";
    p.style.transform = "translateY(-5px)";
    p.style.pointerEvents = "none";
  });

  // Reset score
  const scoreBox = document.getElementById("score-result");
  scoreBox.textContent = "Score : — / 30";

  // Reset sidebar colors
  document.querySelectorAll(".nav-question").forEach(btn => {
    btn.classList.remove("good", "bad", "missing");
  });
}

// ===============================
//   Navigation sidebar
// ===============================
function initSidebarNavigation() {
  document.querySelectorAll(".nav-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(`question-${btn.dataset.target}`);
      target.scrollIntoView({ behavior: "smooth", block: "center" });

      if (window.innerWidth <= 900) {
        document.body.classList.remove("sidebar-open");
      }
    });
  });
}

// ===============================
//   Burger menu
// ===============================
function initBurger() {
  const burger = document.getElementById("sidebar-toggle");
  if (burger) {
    burger.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-open");
    });
  }
}

// ===============================
//   INIT GLOBAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  initSidebarNavigation();
  initBurger();

  document.getElementById("validate-btn").addEventListener("click", corrigerQCM);
  document.getElementById("reset-btn").addEventListener("click", resetQCM);
});
