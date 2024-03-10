/*
Author : Ben Johll
netid : bdjohll@iastate.edu
date : 3/9/2024
*/

let board = [];
const playboard = document.getElementById("play-board");

const setup = () => {

    board = new Array(20);
    for(let i=0;i<20;i++){
        board[i] = new Array(20);
        for(let j=0;j<20;j++){
            board[i][j]=document.createElement("div");
            board[i][j].className = "conway-dead";
            board[i][j].setAttribute("onclick","toggleLiving(this)");
            playboard.appendChild(board[i][j]);
        }
    }
}

const toggleLiving = (cell) => {
    if(cell.className == "conway-dead"){
        cell.className = "conway-living";
    } else {
        cell.className = "conway-dead";
    }
}

const updateGrid = (cell) => {
    let tempboard = new Array(20);
    for(let i=0;i<20;i++){
        tempboard[i] = new Array(20);
        for(let j=0;j<20;j++){
            newClass = null;
            console.log("I:" + i + " J:" + j);
            switch(countNeighbors(i,j)){
                case 0:
                    newClass = "conway-dead";
                    break;
                case 1:
                    newClass = "conway-dead";
                    break;
                case 2:
                    if(board[i][j].className == "conway-living"){
                        newClass = "conway-living";
                    } else {
                        newClass = "conway-dead";
                    }
                    break;
                case 3:
                    console.log("Alive!")
                    newClass = "conway-living";
                    break;
                case 4:
                    newClass = "conway-dead";
                    break;
                case 5:
                    newClass = "conway-dead";
                    break;
                case 6:
                    newClass = "conway-dead";
                    break;
                case 7:
                    newClass = "conway-dead";
                    break;
                case 8:
                    newClass = "conway-dead";
                    break;
            }
            tempboard[i][j]=document.createElement("div");
            tempboard[i][j].className = newClass;
            tempboard[i][j].setAttribute("onclick","toggleLiving(this)");
        }
    }
    board = tempboard;
    playboard.innerHTML="";
    for(let i=0;i<20;i++){
        for(let j=0;j<20;j++){
            playboard.appendChild(board[i][j]);
        }
    }
}

const countNeighbors = (x,y) => {
    n=0;
    n += checkLiving(x-1,y-1);
    n += checkLiving(x-1,y);
    n += checkLiving(x-1,y+1);
    n += checkLiving(x,y-1);
    n += checkLiving(x,y+1);
    n += checkLiving(x+1,y-1);
    n += checkLiving(x+1,y);
    n += checkLiving(x+1,y+1);
    return n;
}

const checkLiving = (x,y) => {
    X = ((x%20)+20)%20;
    Y = ((y%20)+20)%20;
    if(board[X][Y].className == "conway-living"){
        console.log("Found one at "+X+","+Y);
        return 1;
    } else {
        return 0;
    }
}

setup();
setInterval(function(){updateGrid()}, 5000);