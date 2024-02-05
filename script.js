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
        localStorage.setItem("highestScore", highestScore.toString()); // Convert the score to a string before storing
        document.getElementById("highScoreDisplay").innerText = "High Score: " + highestScore; // Update high score display
    }
}

// canvas element
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext('2d');

let isPaused = false;

// snake
var snake = [
    { x: 10, y: 10 } // head of the snake
];

// Size and color of snake
var segmentSize = 20; // size for each segment
var snakeColor = "green";

// snake starting direction
var snakeDirection = 'right';

// apple
var apple = {
    x: Math.floor(Math.random() * (canvas.width / segmentSize)),
    y: Math.floor(Math.random() * (canvas.height / segmentSize)),
    color: "red"
};

let score = 0;
function updateScore() {
    document.getElementById("scoreDisplay").innerText = "Current Score: " + score;
}

// Get reference to the pause button
const pauseButton = document.getElementById("pauseButton");

// Event listener for mouse clicks
pauseButton.addEventListener("click", togglePause);

// Event listener for touch screen taps
pauseButton.addEventListener("touchend", togglePause);

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



// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft':
        case 'a':
            if (snakeDirection !== 'right') {
                snakeDirection = 'left';
            }
            break;
        case 'ArrowUp':
        case 'w':
            if (snakeDirection !== 'down') {
                snakeDirection = 'up';
            }
            break;
        case 'ArrowRight':
        case 'd':
            if (snakeDirection !== 'left') {
                snakeDirection = 'right';
            }
            break;
        case 'ArrowDown':
        case 's':
            if (snakeDirection !== 'up') {
                snakeDirection = 'down';
            }
            break;
            case ' ': // spacebar
            if (isPaused) {
                // Resume the game
                isPaused = false;
                clearPauseMessage(); // Clear the pause message
                gameLoop(); // Restart the game loop
            } else {
                // Pause the game
                isPaused = true;
                drawPauseMessage(); // Draw the pause message
            }
            break;
    }
});

// Add touchstart event listener for touch input
document.addEventListener('touchstart', function(event) {
    // Prevent default behavior to avoid unwanted scrolling or zooming
    event.preventDefault();

    // Get the touch position relative to the canvas
    var touchX = event.touches[0].clientX - canvas.getBoundingClientRect().left;
    var touchY = event.touches[0].clientY - canvas.getBoundingClientRect().top;

    // Call a function to handle touch input
    handleTouchInput(touchX, touchY);
});

// Function to handle touch input
function handleTouchInput(touchX, touchY) {
    // Determine if the touch is on the left, right, top, or bottom half of the canvas
    var canvasMidX = canvas.width / 2;
    var canvasMidY = canvas.height / 2;

    if (touchX < canvasMidX) {
        // Left half of the canvas
        if (touchY < canvasMidY) {
            // Top-left quadrant, perform action (e.g., turn left)
            handleLeftTouch();
        } else {
            // Bottom-left quadrant, perform action (e.g., turn down)
            handleDownTouch();
        }
    } else {
        // Right half of the canvas
        if (touchY < canvasMidY) {
            // Top-right quadrant, perform action (e.g., turn right)
            handleRightTouch();
        } else {
            // Bottom-right quadrant, perform action (e.g., turn up)
            handleUpTouch();
        }
    }
}

// Functions to handle touch actions (modify as needed)
function handleLeftTouch() {
    if (snakeDirection !== 'right') {
        snakeDirection = 'left';
    }
}

function handleUpTouch() {
    if (snakeDirection !== 'down') {
        snakeDirection = 'up';
    }
}

function handleRightTouch() {
    if (snakeDirection !== 'left') {
        snakeDirection = 'right';
    }
}

function handleDownTouch() {
    if (snakeDirection !== 'up') {
        snakeDirection = 'down';
    }
}

//snake movement
function moveSnake() {
    //moving the head
    var newHead = {x: snake[0].x, y: snake[0].y}; //new head piece
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
    
    // head collision with apple
    if (newHead.x === apple.x && newHead.y === apple.y) {
       
        score++;
       
        updateScore();
        
        updateHighestScore();
        
        // apple spawner
        apple.x = Math.floor(Math.random() * (canvas.width / segmentSize));
        apple.y = Math.floor(Math.random() * (canvas.height / segmentSize));
        
       
    } else {
        
        snake.pop();
    }
    
    // Add the new head segment to the array
    snake.unshift(newHead);
}

// game over state
let gameOver = false;

// game speed milliseconds
const gameSpeed = 100;

function gameLoop() {
    // If game is paused, draw the pause message and return without updating the game state
    if (isPaused) {
        drawPauseMessage();
        return;
    }

    // Clear any existing pause message if the game is not paused
    clearPauseMessage();
    
    // If game over or paused, stop the loop
    if (gameOver || isPaused) {
        console.log("Game over condition met or game is paused");
        updateHighestScore();
        gameOverHandler();
        return;
    }

    // Rest of the game logic goes here
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

    // collision check
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            console.log("Game Over: Collision with itself");
            gameOver = true;
            return;
        }
    }

    // collision with boundaries
    if (snake[0].x < 0 || snake[0].x >= canvas.width / segmentSize ||
        snake[0].y < 0 || snake[0].y >= canvas.height / segmentSize ||
        snake[0].x >= canvas.width || snake[0].y >= canvas.height) {
        console.log("Game Over: Collision with boundaries");
        gameOver = true;
        return;
    }

    // Continue the game loop after a delay
    setTimeout(gameLoop, gameSpeed);
}

// Start the game loop
gameLoop();