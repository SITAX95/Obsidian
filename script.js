// ================================
// NAVIGATION LATERALE
// ================================
document.querySelectorAll(".nav-question").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.target;
        const target = document.getElementById(`question-${id}`);

        window.scrollTo({
            top: target.offsetTop - 20,
            behavior: "smooth"
        });

        // Highlight the selected navigation button
        document.querySelectorAll(".nav-question").forEach(x => x.classList.remove("selected"));
        btn.classList.add("selected");
    });
});

// ================================
// VALIDATION DU QCM
// ================================
document.getElementById("validate-btn").onclick = () => {

    let score = 0;

    document.querySelectorAll(".qcm-question").forEach(q => {

        const id = q.dataset.question;
        const answer = q.querySelector("input:checked");
        const good = q.querySelector(".correction-panel p b:nth-child(1)").innerText.split(":")[1].trim();

        // Coloration des options
        q.querySelectorAll("input").forEach(radio => {
            radio.disabled = true;

            if (radio.value === good) {
                radio.parentElement.style.color = "lime";
                radio.parentElement.style.fontWeight = "bold";
            }

            if (answer && radio === answer && answer.value !== good) {
                radio.parentElement.style.color = "red";
            }
        });

        // Score
        if (answer && answer.value === good) score++;

        // Affichage auto explication
        q.querySelector(".correction-panel").classList.add("visible");
    });

    document.getElementById("score-result").innerHTML = `Score : ${score} / 30`;
};

// ================================
// RESET COMPLET
// ================================
document.getElementById("reset-btn").onclick = () => {
    location.reload();
};

// ================================
// BOUTON "Afficher toutes les explications"
// ================================
document.getElementById("toggle-explanations-btn").onclick = () => {
    document.querySelectorAll(".correction-panel").forEach(panel => {
        panel.classList.add("visible");
    });
};
