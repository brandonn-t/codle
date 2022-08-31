document.addEventListener("DOMContentLoaded", () => {
    createSquares();
    getNewWord();


    const keys = document.querySelectorAll(".keyboardrow button");
    let guessedWords = [[]]
    let availableSpace = 1;
    let str;
    console.log(str);
    
    let guessedWordCount = 0;
    let lowletter = false;


    function getNewWord() {
        fetch(
          `http://3.87.53.234:8080/posts`)
          .then((response) => {
            return response.json();
          })
          .then((res) => {
            str = res.info.word;
          })
          .catch((err) => {
            console.error(err);
          });
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

    function getTileColor(letter, index, checkedLetters){
        let word = Array.from(str);
        const isCorrectLetter = word.includes(letter);
        if(!isCorrectLetter || !checkedLetters.includes(letter)){
            return "rgb(58, 58, 60)";
        }

        const isCorrectPosition = letter === word[index]

        if(isCorrectPosition){
            checkedLetters[index] = ''
            return "rgb(83, 141, 78)";
        }
        const indexOfLetter = checkedLetters.indexOf(letter);
        checkedLetters[indexOfLetter] = '';
        return "rgb(181, 159, 59)";
    }


    function handleSubmitWord(){
        let word = Array.from(str);
        const currentWordArr = getCurrentWordArr()
        if(currentWordArr.length !== 5){
            window.alert("Word must be 5 letters");
            lowletter = true;
            return;
            
        }

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval  = 250;
        let checkedLetters = Array.from(word);

        currentWordArr.forEach((letter, index) => {
            setTimeout(() => {
                
                const tileColor = getTileColor(letter, index, checkedLetters)

                const letterId = firstLetterId + index;
                const letterEl = document.getElementById(letterId)
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor}; border-color:${tileColor}`
            }, interval * index);
        });

        guessedWordCount += 1;

        
        const result = currentWordArr.length === word.length && currentWordArr.every((e, index) => word.includes(e) && e === word[index]);
        if(result){
            window.alert("Congratulations!");
        }

        else if(guessedWords.length === 6){
            window.alert(`You lost :( , the word is ${str}.`);
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