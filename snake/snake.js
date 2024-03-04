/*
Author : Ethan Messmer
netid : emessmer@iastate.edu
date : 3/4/2024
*/

const playBoard = document.querySelector(".play-board");


let foodX = 20, foodY = 15;


const initGame = () =>{
    let htmlMarkup = `<div class = "food" style = "grid-area: ${foodY} / ${foodX}"></div>`;
    playBoard.innerHTML = htmlMarkup;
}
initGame();