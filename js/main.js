document.addEventListener("DOMContentLoaded", () => {
    createSquares();


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