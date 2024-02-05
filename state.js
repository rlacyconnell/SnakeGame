// state.js



let isPaused = false;

// Get reference to the pause button
const pauseButton = document.getElementById("pauseButton");

// Event listener for mouse clicks
pauseButton.addEventListener("click", togglePause);

// Function to toggle the pause state
function togglePause() {
    if (isPaused) {
        isPaused = false;
        gameLoop(); // Resume the game
        pauseButton.innerText = "Pause";
    } else {
        isPaused = true;
        pauseButton.innerText = "Resume";
    }
}

// Function to draw a pause message
function drawPauseMessage() {
    context.fillStyle = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black background
    context.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas
    context.fillStyle = "#ffffff"; // White text color
    context.font = "30px Arial"; // Set font size and family
    context.textAlign = "center"; // Center text horizontally
    context.fillText("Game Paused", canvas.width / 2, canvas.height / 2); // Draw the text in the center
}

// Function to clear the pause message
function clearPauseMessage() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
}

// game over state
let gameOver = false;

// Function to handle game over
function gameOverHandler() {
    // Display an alert with the game over message
    alert("Game Over! Your final score is: " + score);

    // Ask the user if they want to restart the game
    const restartGame = confirm("Do you want to play again?");

    if (restartGame) {
        // Reset the game variables and start a new game
        resetGame();
        gameLoop();
    } else {
        // Reload the page to reset the entire game
        location.reload();
    }
}

// Function to reset game variables
function resetGame() {
    snake = [{ x: 10, y: 10 }]; // Reset snake position
    snakeDirection = 'right'; // Reset snake direction
    apple = {
        x: Math.floor(Math.random() * (canvas.width / segmentSize)),
        y: Math.floor(Math.random() * (canvas.height / segmentSize)),
        color: "red"
    }; // Respawn the apple
    score = 0; // Reset score
    updateScore(); // Update score display
    gameOver = false; // Reset game over flag
}

