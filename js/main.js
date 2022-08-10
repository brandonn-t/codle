document.addEventListener("DOMContentLoaded", () => {
    createSquares();

    const keys = document.querySelectorAll(".keyboardrow button");
    let guessedWords = [[]]
    let availableSpace = 1;
    let word = "dairy";
    let guessedWordCount = 0;
    let lowletter = false;

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

    function getTileColor(letter, index){
        const isCorrectLetter = word.includes(letter);
        if(!isCorrectLetter){
            return "rgb(58, 58, 60)";
        }

        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition

        if(isCorrectPosition){
            return "rgb(83, 141, 78)";
        }

        return "rgb(181, 159, 59)";
    }


    function handleSubmitWord(){
        const currentWordArr = getCurrentWordArr()
        if(currentWordArr.length !== 5){
            window.alert("Word must be 5 letters");
            lowletter = true;
            return;
            
        }

        const currentWord = currentWordArr.join("");


        const firstLetterId = guessedWordCount * 5 + 1;
        const interval  = 250;

        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, index)

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId)
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor}; border-color:${tileColor}`
            }, interval * index);
        });

        guessedWordCount += 1;

        if(currentWord === word){
            window.alert("Congratulations!");
        }

        else if(guessedWords.length === 6){
            window.alert(`You lost :( , the word is ${word}.`);
        }

        guessedWords.push([])
    }


    function createSquares() {
        const gameBoard = document.getElementById("board")
        for(let i = 0; i < 30; i++){
            let square = document.createElement("div")
            square.classList.add("square")
            square.classList.add("animate__animated");
            square.setAttribute("id", i + 1)
            gameBoard.appendChild(square);
        }
    }

    function handleDeleteLetter(){
        const currentWordArr = getCurrentWordArr()
        const removedLetter = currentWordArr.pop()

        guessedWords[guessedWords.length - 1] = currentWordArr;
        const lastLetterEl = document.getElementById(String(availableSpace - 1))
        lastLetterEl.textContent = '';
        availableSpace = availableSpace - 1;
    }

    for (let index = 0; index < keys.length; index++) {
        keys[index].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if(letter == 'enter'){
                
                handleSubmitWord();

                if(lowletter){
                    const currentWordArr = getCurrentWordArr()
                    console.log(currentWordArr.length)
                    while(currentWordArr.length > 0){
                        handleDeleteLetter();
                    }
                    lowletter = false;
                }

                return;
            }

            if(letter == 'del'){
                handleDeleteLetter();
                return;
            }

            updateGuessedWords(letter)
        };        
    }


})