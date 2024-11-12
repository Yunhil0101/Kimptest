function showNB() {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("nb-message").style.display = "block";
}

function demarrerQuiz() {
    document.getElementById("nb-message").style.display = "none";
    document.getElementById("question-box").style.display = "block";
    afficherQuestion();
}

const questions = [
    { question: "Avez-vous constaté un changement dans la fréquence, la couleur, ou l'odeur de vos urines ?", pointsOui: 0, pointsNon: 2 },
    { question: "Êtes-vous hypertendu ou diabétique ?", pointsOui: 0, pointsNon: 2 },
    { question: "Avez-vous des œdèmes ?", pointsOui: 0, pointsNon: 2 },
    { question: "Votre haleine a-t-elle une odeur ammoniacale ?", pointsOui: 0, pointsNon: 2 },
    { question: "Vous sentez-vous constamment fatigué(e) ?", pointsOui: 0, pointsNon: 2 },
    { question: "Ressentez-vous des douleurs dans le bas du dos ?", pointsOui: 0, pointsNon: 2 },
    { question: "Prenez-vous régulièrement des médicaments traditionnels ?", pointsOui: 0, pointsNon: 2 }
];

let currentQuestion = 0;
let score = 0;

function afficherQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById("question-number").innerText = `Question ${currentQuestion + 1} sur ${questions.length}`;
        document.getElementById("question").innerText = questions[currentQuestion].question;

        const questionBox = document.getElementById("question-box");
        questionBox.style.opacity = 0;
        questionBox.style.display = "block";
        setTimeout(() => {
            questionBox.style.opacity = 1;
        }, 50);
    } else {
        afficherResultat();
    }
}

function answer(response) {
    const current = questions[currentQuestion];
    score += response === 'oui' ? current.pointsOui : current.pointsNon;

    const questionBox = document.getElementById("question-box");
    questionBox.style.opacity = 1;
    setTimeout(() => {
        questionBox.style.opacity = 0;
        currentQuestion++;
        afficherQuestion();
    }, 1000);
}

function afficherResultat() {
    document.getElementById("question-box").style.display = "none";
    const result = document.getElementById("result");
    result.style.display = "block";

    let message;
    if (score >= 12) {
        message = `
            <div class="result-message">
                <h3>Félicitations !</h3>
                <p>Vous avez une santé rénale optimale !</p>
                <ul>
                    <li>💧 <strong>Boire 1,5 L d'eau par jour</strong></li>
                    <li>🏃‍♂️ <strong>Faire de l'activité physique régulière</strong></li>
                    <li>🚫 <strong>Éviter l'automédication</strong></li>
                    <li>🥗 <strong>Adopter une alimentation saine</strong></li>
                </ul>
            </div>
        `;
    } else if (score >= 6) {
        message = "Votre santé rénale est relativement bonne, mais quelques améliorations sont recommandées.";
    } else {
        message = "Votre santé rénale semble défectueuse. Consultez un professionnel.";
    }

    result.innerHTML = `<div>${message}</div><button onclick="location.href='feedback.html'">Continuez !</button>`;
}
