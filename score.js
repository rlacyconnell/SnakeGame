// score.js



let score = 0;
function updateScore() {
    document.getElementById("scoreDisplay").innerText = "Current Score: " + score;
}

// Load highest score from local storage
let highestScore = localStorage.getItem("highestScore");
if (!highestScore) {
    highestScore = 0;
} else {
    highestScore = parseInt(highestScore);
}
document.getElementById("highScoreDisplay").innerText = "High Score: " + highestScore;

// Update highest score
function updateHighestScore() {
    if (score > highestScore) {
        highestScore = score;
        localStorage.setItem("highestScore", highestScore.toString());
        document.getElementById("highScoreDisplay").innerText = "High Score: " + highestScore;
    }
}