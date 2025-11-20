document.addEventListener("DOMContentLoaded", () => {

  const validateBtn = document.getElementById("validate-btn");
  const resetBtn = document.getElementById("reset-btn");
  const scoreBox = document.getElementById("score-result");
  const toggleAllBtn = document.getElementById("toggle-explanations-btn");
  const navButtons = document.querySelectorAll(".nav-question");

  let validated = false;

  const correctAnswers = {
    1:"B", 2:"B", 3:"B", 4:"B", 5:"B",
    6:"A", 7:"B", 8:"A", 9:"B", 10:"B",
    11:"B", 12:"B", 13:"B", 14:"B", 15:"B",
    16:"C", 17:"B", 18:"B", 19:"B", 20:"B",
    21:"B", 22:"B", 23:"B", 24:"B", 25:"B",
    26:"B", 27:"C", 28:"B", 29:"B", 30:"B"
  };

  /* ---------------------- */
  /*   NAVIGATION Q1 → Q30  */
  /* ---------------------- */
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.target;
      document.getElementById(`question-${id}`).scrollIntoView({ behavior:"smooth" });
    });
  });

  /* ---------------------- */
  /*   VALIDATION GLOBALE   */
  /* ---------------------- */
  validateBtn.addEventListener("click", () => {
    if (validated) return;
    validated = true;

    let score = 0;

    document.querySelectorAll(".qcm-question").forEach(q => {
      const num = q.dataset.question;
      const chosen = q.querySelector("input:checked");
      const correct = correctAnswers[num];

      /* Bloquer les réponses */
      q.classList.add("locked");

      if (chosen) {
        if (chosen.value === correct) {
          chosen.parentElement.classList.add("correct");
          score++;
        } else {
          chosen.parentElement.classList.add("wrong");
        }
      }

      /* Afficher l’explication */
      q.classList.add("explanation-visible");
      q.querySelector(".correction-panel").classList.add("visible");
      q.querySelector("details").setAttribute("open", "");
    });

    scoreBox.textContent = `Score : ${score} / 30`;
  });

  /* ---------------------- */
  /*      RESET TOTAL       */
  /* ---------------------- */
  resetBtn.addEventListener("click", () => {
    validated = false;
    scoreBox.textContent = "Score : — / 30";

    document.querySelectorAll("input[type=radio]").forEach(r => r.checked = false);

    document.querySelectorAll(".qcm-question").forEach(q => {
      q.classList.remove("locked","explanation-visible");
      q.querySelectorAll(".correct").forEach(e => e.classList.remove("correct"));
      q.querySelectorAll(".wrong").forEach(e => e.classList.remove("wrong"));
      q.querySelector(".correction-panel").classList.remove("visible");
      q.querySelector("details").removeAttribute("open");
    });
  });

  /* ---------------------- */
  /* OUVRIR TOUTES EXPLICS  */
  /* ---------------------- */
  toggleAllBtn.addEventListener("click", () => {
    document.querySelectorAll(".correction-panel").forEach(p => p.classList.add("visible"));
    document.querySelectorAll(".qcm-question details").forEach(d => d.setAttribute("open",""));
  });

});
