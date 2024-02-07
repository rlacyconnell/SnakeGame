// state.js



var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext('2d');

// Define isGameStarted variable globally
var isGameStarted = false;

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
    context.fillStyle = "rgba(0, 0, 0, 0.25)"; // Semi-transparent black background
    context.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas
    context.fillStyle = "#ffffff"; // White text color
    context.font = "30px Times New Roman"; // Set font size and family
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

// Function to draw a start message/button over canvas
function drawStartMessage() {
    context.fillStyle = "rgba(0, 0, 0, 0.25)"; // Semi-transparent black background
    context.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas
    context.fillStyle = "#ffffff"; // White text color
    context.font = "30px Times New Roman"; // Set font size and family
    context.textAlign = "center"; // Center text horizontally
    context.fillText("Click to Start Game", canvas.width / 2, canvas.height / 2); // Draw the text in the center
}

// Call the drawStartMessage function initially to display the start message/button
drawStartMessage(context);


// Add this event listener to the canvas
canvas.addEventListener("click", startGameOnClick);

// Modify the function to start the game loop
function startGameOnClick(event) {
    // Check if the game has already started
    if (!isGameStarted) {
        // Hide the start message/button
        drawStartMessage();

        // Set isGameStarted to true
        isGameStarted = true;

        // Start the game loop
        gameLoop();
    }
}
