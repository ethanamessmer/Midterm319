/*
Author : Ethan Messmer
netid : emessmer@iastate.edu
date : 3/4/2024
*/

const playBoard = document.querySelector(".play-board");

let isInGame = false;
let isSnakeAlive = true;
let foodX = 20, foodY = 15;
let snakeX = 2, snakeY = 2;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let isMoving = false;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
}

const changeDirection = (key) => {
    if (key.key == "ArrowRight" && isSnakeAlive){
        velocityX = 1;
        velocityY = 0;
    }
    else if (key.key == "ArrowLeft" && isSnakeAlive){
        velocityX = -1;
        velocityY = 0;
    }
    else if (key.key == "ArrowUp" && isSnakeAlive){
        velocityX = 0;
        velocityY = -1;
    }
    else if (key.key == "ArrowDown" && isSnakeAlive){
        velocityX = 0;
        velocityY = 1;
    }
    else {

    }
  
}

const initGame = () =>{
    if (isSnakeAlive && isMoving){
    isInGame = true;
    }
    if (velocityX > 0 || velocityY > 0){
        isMoving = true;
    }

    if (isInGame){
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
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        isSnakeAlive = false;
        isMoving = false;
        isIngame = false;
        velocityX = 0;
        velocityY = 0;
    }
    for (let i = 0; i < snakeBody.length;i++){
        htmlMarkup += `<div class = "snakeHead" style = "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }
    playBoard.innerHTML = htmlMarkup;
}

setInterval(initGame,125);
document.addEventListener("keydown", changeDirection);