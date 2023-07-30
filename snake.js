const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define the size of the game grid
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Initial position and speed of the snake
let snakeX = 10;
let snakeY = 10;
let snakeSpeedX = 1;
let snakeSpeedY = 0;
let snakeTail = 1;
const snakeTrail = [];

// Initial position of the food
let foodX = 15;
let foodY = 10;

// Keep track of the score
let score = 0;

function drawGame() {
  // Move the snake
  snakeX += snakeSpeedX;
  snakeY += snakeSpeedY;

  // Wrap the snake around the canvas edges
  if (snakeX < 0) {
    snakeX = tileCount - 1;
  }
  if (snakeX > tileCount - 1) {
    snakeX = 0;
  }
  if (snakeY < 0) {
    snakeY = tileCount - 1;
  }
  if (snakeY > tileCount - 1) {
    snakeY = 0;
  }

  // Clear the canvas
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = "#0f0";
  for (let i = 0; i < snakeTrail.length; i++) {
    ctx.fillRect(
      snakeTrail[i].x * gridSize,
      snakeTrail[i].y * gridSize,
      gridSize - 2,
      gridSize - 2
    );

    // Check if the snake collides with itself
    if (snakeTrail[i].x === snakeX && snakeTrail[i].y === snakeY) {
      snakeTail = 1;
      score = 0;
    }
  }

  // Add the current position of the snake to the snakeTrail array
  snakeTrail.push({ x: snakeX, y: snakeY });

  // Remove the tail cells if the snake is longer than its tail
  while (snakeTrail.length > snakeTail) {
    snakeTrail.shift();
  }

  // Draw the food
  ctx.fillStyle = "#f00";
  ctx.fillRect(foodX * gridSize, foodY * gridSize, gridSize - 2, gridSize - 2);

  // Check if the snake eats the food
  if (foodX === snakeX && foodY === snakeY) {
    snakeTail++;
    score++;
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
  }

  // Display the score
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  // Call the drawGame function again after a short delay
  setTimeout(drawGame, 1000 / 15);
}

// Listen for arrow key presses to change the snake's direction
document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 37: // Left
      snakeSpeedX = -1;
      snakeSpeedY = 0;
      break;
    case 38: // Up
      snakeSpeedX = 0;
      snakeSpeedY = -1;
      break;
    case 39: // Right
      snakeSpeedX = 1;
      snakeSpeedY = 0;
      break;
    case 40: // Down
      snakeSpeedX = 0;
      snakeSpeedY = 1;
      break;
  }
});

// Start the game
drawGame();
