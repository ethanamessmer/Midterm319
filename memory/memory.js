/*
Author : Ben Johll
netid : bdjohll@iastate.edu
date : 3/8/2024
*/

const memoryA = document.getElementById("memoryA");
const memoryB = document.getElementById("memoryB");
const memoryC = document.getElementById("memoryC");
const memoryD = document.getElementById("memoryD");
const scoreText = document.getElementsByClassName("score")[0];
const highscoreText = document.getElementsByClassName("high-score")[0];

let score = 0;
let highScore = 0;
let pattern = [];
let highlightQueue = [];
let progress = 0;

const setPattern = () => {
    let target = Math.floor(Math.random() * 4);
    pattern.push(target);
    console.log(pattern);
    for(let i = 0; i<=score; i++){
        highlightQueue.push(pattern[i]);
    }
}

const gameOver = () => {
    alert("Game over!");
    if(score>highScore){
        highScore = score;
        highscoreText.textContent = "High Score: "+ highScore;
    }
    score = 0;
    progress = 0;
    pattern = [];
    setPattern();
}

const highlight = (index) => {
    switch(index){
        case 0:
            memoryA.style.backgroundColor="blue";
            setTimeout(function(){
                memoryA.style.backgroundColor="darkblue";
            }, 500);
            break;
        case 1:
            memoryB.style.backgroundColor="orchid";
            setTimeout(function(){
                memoryB.style.backgroundColor="darkorchid";
            }, 500);
            break;
        case 2:
            memoryC.style.backgroundColor="red";
            setTimeout(function(){
                memoryC.style.backgroundColor="darkred";
            }, 500);
            break;
        case 3:
            memoryD.style.backgroundColor="green";
            setTimeout(function(){
                memoryD.style.backgroundColor="darkgreen";
            }, 500);
            break;
    } 
}

const memoryClick = (index) => {
    if(highlightQueue.length==0){
        if(index == pattern[progress]){
            highlight(index);
            if(progress == score){
                progress = 0;
                score++;
                setTimeout(function(){
                    setPattern();
                }, 500);                
            } else {
                progress++;
            }
        } else{
            gameOver();
        }
    }
}

setTimeout(function(){
    setPattern();
}, 500);
setInterval(function(){
    if(highlightQueue.length!=0){
        highlight(highlightQueue.shift());
    }
    scoreText.textContent = "Score: " + score;
}, 750);