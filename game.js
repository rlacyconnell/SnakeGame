//game.js



// canvas element
var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext('2d');

// game speed in milliseconds
const gameSpeed = 100;

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
        
        // Randomly select message from array
        const randomMessage = eatAppleMessages[Math.floor(Math.random() * eatAppleMessages.length)];
    
        // log that message
        console.log("Apple Eaten: " + randomMessage);
    
        // apple spawner
        apple.x = Math.floor(Math.random() * (canvas.width / segmentSize));
        apple.y = Math.floor(Math.random() * (canvas.height / segmentSize));
    } else {
        snake.pop();
    }

    // add new head segment to array
    snake.unshift(newHead);
}


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
            gameOver = true; // Set gameOver to true
            gameOverHandler(); // Call the gameOverHandler function
            return;
        }           
    }
    
    // collision with boundaries
    if (snake[0].x < 0 || snake[0].x >= canvas.width / segmentSize ||
        snake[0].y < 0 || snake[0].y >= canvas.height / segmentSize ||
        snake[0].x >= canvas.width || snake[0].y >= canvas.height) {
        console.log("Game Over: Collision with boundaries");
        gameOver = true; // Set gameOver to true
        gameOverHandler(); // Call the gameOverHandler function
        return;
}

    // Continue the game loop after a delay
    setTimeout(gameLoop, gameSpeed);
}

// Start the game loop
gameLoop();