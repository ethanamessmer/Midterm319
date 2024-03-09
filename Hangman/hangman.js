/*
Name: Ethan Messmer
netid: emessmer@iastate.edu
date: 3/9/2024
*/
const word = document.querySelector(".word");
const guesses = document.querySelector(".guess strong");
const keyboard = document.querySelector(".keyboard");
const hangman = document.querySelector(".hangman-box img");
const gameModel = document.querySelector(".game-model");
const playAgainBtn = gameModel.querySelector("button");



fetch("./hangman.json")
    .then(response => response.json())
    .then(randWords => loadRandWord(randWords))





let currWord, wrongCount = 0,currHint,correctLetters;
const maxGuesses = 6;

function loadRandWord (randWords){
    let i = Math.floor(Math.random() * 48) + 1;
    currWord = randWords.wordRepo[i].word;
    currHint = randWords.wordRepo[i].hint;
    document.querySelector(".hint strong").innerText = currHint;
    console.log(currWord);
    console.log(currHint);
    word.innerHTML = currWord.split("").map(() => `<li class = "letter"></li>`).join();
   
}

const reset = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangman.src = "images/hangman-0.svg";
    guesses.innerText = `0 / ${maxGuesses}`;
    
    keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModel.classList.remove("show");
    
}
const gameOver = (isVictory) => {
    if (isVictory){
    const modelText = `you found the word:`;
    gameModel.querySelector("img").src = `./images/victory.gif`;
    gameModel.querySelector("h4").innerText = `Congrats!`
    gameModel.querySelector("p").innerHTML = `${modelText} <strong>${currWord}</strong>`;
    gameModel.classList.add("show");
    }
    else if (isVictory == false) {
        const modelText = `The correct word was::`;
    gameModel.querySelector("img").src = `./images/lost.gif`;
    gameModel.querySelector("h4").innerText = `Sorry, Game Over!`;
    gameModel.querySelector("p").innerHTML = `${modelText} <strong>${currWord}</strong>`;
    gameModel.classList.add("show");
    }
    }

    const inGame = (button,clickedLetter) => {
        if(currWord.includes(clickedLetter)){
            [...currWord].forEach((letter,index) => {
                if(letter === clickedLetter){
                    word.querySelectorAll("li")[index].innerText = letter;
                    word.querySelectorAll("li")[index].classList.add("guessed");
                }
            });
        } else {
            wrongCount++;
            hangman.src = `images/hangman-${wrongCount}.svg`;
        }
        button.disabled=true;
        guesses.innerText = `${wrongCount} / ${maxGuesses}`;
        if(wrongCount == maxGuesses) return gameOver(false);
        
    }


    for (let i = 97; i <= 122; i++) {
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(i);
        keyboard.appendChild(button);
        button.addEventListener("click", (e) => inGame(e.target, String.fromCharCode(i)));
    }

    
   