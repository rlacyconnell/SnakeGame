// Define variables
let gameInterval;
let endScreen = document.getElementById("endScreen");
let finalScoreDisplay = document.getElementById("finalScore");

// Function to handle game over
function gameOverHandler() {
    console.log("Game Over Handler called"); // Add this line
    clearInterval(gameInterval); // Stop the game loop
    endScreen.style.display = "block"; // Show the end screen
    finalScoreDisplay.innerText = "Final Score: " + score; // Display final score
}

// Function to play again
function playAgain() {
    endScreen.style.display = "none"; // Hide the end screen
    startGame(); // Restart the game
}

// Play again button event listener
document.getElementById("playAgainButton").addEventListener("click", playAgain);

// Load highest score from local storage
let highestScore = localStorage.getItem("highestScore");
if (!highestScore) {
    highestScore = 0;
} else {
    highestScore = parseInt(highestScore);
}
document.getElementById("highScoreDisplay").innerText = "High Score: " + highestScore;

// Update highest score if needed
function updateHighestScore() {
    if (score > highestScore) {
        highestScore = score;
        localStorage.setItem("highestScore", highestScore.toString()); // Convert the score to a string before storing
        document.getElementById("highScoreDisplay").innerText = "High Score: " + highestScore; // Update high score display
    }
}

// Get the canvas element
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext('2d');

// Define the snake
var snake = [
    { x: 10, y: 10 } // head of the snake
];

// Size and color of the snake
var segmentSize = 20; // size for each segment
var snakeColor = "green";

// Define the snake direction
var snakeDirection = 'right';

// Define the apple
var apple = {
    x: Math.floor(Math.random() * (canvas.width / segmentSize)), // random x coordinate within the canvas width
    y: Math.floor(Math.random() * (canvas.height / segmentSize)), // random y coordinate within the canvas height
    color: "red" // Color of the apple
};

let score = 0;
function updateScore() {
    document.getElementById("scoreDisplay").innerText = "Current Score: " + score;
}

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 37: // left arrow
            if (snakeDirection !== 'right') {
                snakeDirection = 'left';
            }
            break;
        case 38: // up arrow
            if (snakeDirection !== 'down') {
                snakeDirection = 'up';
            }
            break;
        case 39: // right arrow
            if (snakeDirection !== 'left') {
                snakeDirection = 'right';
            }
            break;
        case 40: // down arrow
            if (snakeDirection !== 'up') {
                snakeDirection = 'down';
            }
            break;
        case 32: // spacebar
            // Handle spacebar press (if needed)
            break;
    }
});

//snake movement
function moveSnake() {
    //moving the head
    var newHead = {x: snake[0].x, y: snake[0].y}; //new head segment
    switch (snakeDirection) {
        case 'up':
            newHead.y--;
            break;
        case 'down':
            newHead.y++;
            break;
        case 'left':
            newHead.x--;
            break;
        case 'right':
            newHead.x++;
            break;
    }
    
    // Check if the new head position collides with the apple
    if (newHead.x === apple.x && newHead.y === apple.y) {
        // Increase the score
        score++;
        // Update score display
        updateScore();
        // Update high score if needed
        updateHighestScore();
        
        // Generate a new random position for the apple
        apple.x = Math.floor(Math.random() * (canvas.width / segmentSize));
        apple.y = Math.floor(Math.random() * (canvas.height / segmentSize));
        
        // Instead of pushing a new segment, simply don't pop the tail segment
    } else {
        // Remove the last segment to maintain the snake's length
        snake.pop();
    }
    
    // Add the new head segment to the beginning of the array
    snake.unshift(newHead);
}

// Define a variable to track game over state
let gameOver = false;

// Define the speed of the game (in milliseconds)
const gameSpeed = 100; // Adjust this value to change the speed (higher value for slower speed)

function gameLoop() {
    
    // If game over, stop the loop
    if (gameOver) {
        console.log("Game over condition met"); // Add this line
        updateHighestScore(); // Update highest score before stopping the loop
        gameOverHandler(); // Call gameOverHandler function
        return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    
    // Draw the apple on the canvas
    context.fillStyle = apple.color;
    context.fillRect(apple.x * segmentSize, apple.y * segmentSize, segmentSize, segmentSize);

    // Draw the snake
    snake.forEach(segment => {
        context.fillStyle = snakeColor;
        context.fillRect(segment.x * segmentSize, segment.y * segmentSize, segmentSize, segmentSize);
    });
    
    // Check for collision
    for (let i = 1; i < snake.length; i++) { // Start from index 1 instead of 0
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            console.log("Game Over: Collision with itself");
            gameOver = true; // Set game over flag
            return; // Exit the loop to prevent further checks
        }
    }
    
    // Check for collision with boundaries
    if (snake[0].x < 0 || snake[0].x >= canvas.width / segmentSize ||
        snake[0].y < 0 || snake[0].y >= canvas.height / segmentSize ||
        snake[0].x >= canvas.width || snake[0].y >= canvas.height) {
        console.log("Game Over: Collision with boundaries");
        gameOver = true; // Set game over flag
        return; // Exit the loop to prevent further checks
    }

    // Continue the game loop after a delay
    setTimeout(gameLoop, gameSpeed);
}

// Start the game loop
gameLoop();
