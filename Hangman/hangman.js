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



fetch("./hangman.json") //fetch info from json file
    .then(response => response.json())
    .then(randWords => loadRandWord(randWords))





let currWord, wrongCount = 0,currHint,correctLetters = 0;
const maxGuesses = 6;

function loadRandWord (randWords){ //loads a random word and hint from the json file
    let i = Math.floor(Math.random() * 48) + 1;
    currWord = randWords.wordRepo[i].word;
    currHint = randWords.wordRepo[i].hint;
    document.querySelector(".hint strong").innerText = currHint;
    console.log(currWord);
    console.log(currHint);
    word.innerHTML = currWord.split("").map(() => `<li class = "letter"></li>`).join();
   console.log("The length of the word is " + currWord.length)
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

const reset = () => { //resets that game, I could never get the button to work properly so this never really get's triggered and when play again is pressed it is instead just refreshed
    correctLetters = [];
    wrongGuessCount = 0;
    hangman.src = "images/hangman-0.svg";
    guesses.innerText = `0 / ${maxGuesses}`;
    
    keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModel.classList.remove("show");
    
}
const gameOver = (isVictory) => { //checks if it's a win or a lose and gives a different screen bassed on true or false;
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

    const inGame = (button,clickedLetter) => { //after any letter gets clicked it is checked to see if it is part of the word, how many there are in the word and it disables that letter from being pressed again.
        if(currWord.includes(clickedLetter)){
            for (let i = 0; i < currWord.length;i++){
                if (clickedLetter == currWord[i]){
                    correctLetters++;
                    
                }
                console.log(correctLetters)

            }
            //correctLetters += currWord.match(clickedLetter).length;
            //console.log(correctLetters);
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
        if (correctLetters == currWord.length) return gameOver(true);
    }


    for (let i = 97; i <= 122; i++) { //the letters of the alphabet using ASCII values.
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(i);
        keyboard.appendChild(button);
        button.addEventListener("click", (e) => inGame(e.target, String.fromCharCode(i)));
    }

    
   