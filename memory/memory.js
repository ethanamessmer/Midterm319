/*
Author : Ben Johll
netid : bdjohll@iastate.edu
date : 3/8/2024
*/

const memoryA = document.getElementById("memoryA");
const memoryB = document.getElementById("memoryB");
const memoryC = document.getElementById("memoryC");
const memoryD = document.getElementById("memoryD");

let score = 0;
let highScore = 4;
let pattern = [];
let progress = 0;
let unlocked = true;

const setPattern = () => {
    unlocked = false;
    let target = Math.floor(Math.random() * 4);
    pattern.push(target);
    console.log(pattern);
    for(let i = 0; i<=score; i++){
        setTimeout(function(){
            highlight(i);
        }, 500);
    }
    unlocked = true;
}

const gameOver = () => {
    alert("Game over!");
    if(score>highScore){
        highScore = score;
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
    } 
}

const memoryClick = (index) => {
    if(unlocked){
        if(index == pattern[progress]){
            highlight();
            if(progress == score){
                progress = 0;
                score++;
                setPattern();
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