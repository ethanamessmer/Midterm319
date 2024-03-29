/*
Author : Ethan Messmer
netid : emessmer@iastate.edu
date : 3/4/2024
*/

const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
let isInGame = false;
let isSnakeAlive = true;
let foodX = 40, foodY = 15;
let snakeX = 2, snakeY = 2;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let isMoving = false;
let score = 0;
let highScore = 4;

const changeFoodPosition = () => { //a random food placement
    foodX = Math.floor(Math.random() * 60) + 1
    foodY = Math.floor(Math.random() * 30) + 1
    score++;
    scoreElement.innerText = `Score: ${score}`;
}

const changeDirection = (key) => { //the controls for the game
    if (key.key == "ArrowRight" && isSnakeAlive && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    else if (key.key == "ArrowLeft" && isSnakeAlive && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (key.key == "ArrowUp" && isSnakeAlive && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (key.key == "ArrowDown" && isSnakeAlive && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else {

    }
  
}
const gameOver = () => { //sets everything up for the next game and checks for a new high score
    isSnakeAlive = false;
    isMoving = false;
    isIngame = false;
    velocityX = 0;
    velocityY = 0;
    snakeX = 2;
    snakeY = 2;
    for (let i = 0; i < snakeBody.length + 1;i++){
    snakeBody.pop()
    }
    foodX = 40, foodY = 15;
    
    
    
    if (score > highScore){
        highScore = score;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    score = 0;
    scoreElement.innerText = `Score: ${score}`;
    isSnakeAlive = true;
}

let firstLoad = true;
const initGame = () =>{ //not really initializing it's moreso every frame while the game is running.
    if (isSnakeAlive && isMoving){
    isInGame = true;
    }
    if (velocityX > 0 || velocityY > 0){
        isMoving = true;
    }

    if (firstLoad == true){
        scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop;
    scrollLeft =
        window.pageXOffset ||
        document.documentElement.scrollLeft,

        // if any scroll is attempted,
        // set this to the previous value
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
        firstLoad = false;
    }
    
    let htmlMarkup = `<div class = "food" style = "grid-area: ${foodY} / ${foodX}"></div>`;
    snakeX += velocityX;
    snakeY += velocityY;
    if (snakeX == foodX && snakeY == foodY){
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);
    }
    for (let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    snakeBody[0] = [snakeX, snakeY];
    if (snakeX <= 0 || snakeX > 60 || snakeY <= 0 || snakeY > 30){
        
       gameOver();

    }
    for (let i = 0; i < snakeBody.length;i++){
        htmlMarkup += `<div class = "snakeHead" style = "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i != 0 && snakeBody[0][1] == snakeBody[i][1] && snakeBody[0][0] == snakeBody[i][0]){
            gameOver();
        }
    }
    playBoard.innerHTML = htmlMarkup;
}

setInterval(initGame,50);//sets the speed for the game.
document.addEventListener("keydown", changeDirection);