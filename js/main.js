document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    const keys = document.querySelectorAll(".keyboardrow button");
    let guessedWords = [[]]
    let availableSpace = 1;

    for (let index = 0; index < keys.length; index++) {
        keys[index].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            updateGuessedWords(letter)
        };        
    }


    function getCurrentWordArr(){
        const numOfGuessedWords = guessedWords.length
        return guessedWords[numOfGuessedWords - 1]
    }
    
    function updateGuessedWords(letter){
        const currentWordArr = getCurrentWordArr()
        if (currentWordArr && currentWordArr.length < 5){
            currentWordArr.push(letter)
            const availableSpaceEl = document.getElementById(String(availableSpace))
            availableSpace = availableSpace + 1

            availableSpaceEl.textContent = letter;
        }

    }



    function createSquares() {
        const gameBoard = document.getElementById("board")
        for(let i = 0; i < 30; i++){
            let square = document.createElement("div")
            square.classList.add("square")
            square.setAttribute("id", i + 1)
            gameBoard.appendChild(square);
        }
    }


})