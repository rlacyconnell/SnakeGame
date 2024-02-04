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

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    switch(event.keyCode) {
        case 37: // left
            if (snakeDirection !== 'right') {
                snakeDirection = 'left';
            }
            break;
        case 38: // up
            if (snakeDirection !== 'down') {
                snakeDirection = 'up';
            }
            break;
        case 39: // right
            if (snakeDirection !== 'left') {
                snakeDirection = 'right';
            }
            break;
        case 40: // down
            if (snakeDirection !== 'up') {
                snakeDirection = 'down';
            }
            break;
        case 32: // spacebar
            // play/pause maybe?
            break;
    }
});

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
    
    // collision check
    for (let i = 1; i < snake.length; i++) { // Start from index 1 instead of 0
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
