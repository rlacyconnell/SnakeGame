// input.js



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
                clearPauseMessage(); // clear the pause message
                gameLoop(); // resume the game loop
            } else {
                // Pause the game
                isPaused = true;
                drawPauseMessage(); // draw the pause message
            }
            break;
    }
});

