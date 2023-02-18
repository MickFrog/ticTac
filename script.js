//Global variables
let currPlayer = null;
let boardArray = [];
let gameWon = false;

//Acquire elements
const humanBtn = document.getElementById('humanBtn');
const robotBtn = document.getElementById('botBtn');
const msg = document.getElementById('msg');

//Event listeners
humanBtn.addEventListener('click', ()=> {
    //if board already displayed for this option then do nothing
    if (humanBtn.className == 'clicked') {
        return;
    }
    
    humanBtn.className = 'clicked';
    robotBtn.className = '';

    initialiseGameCards();
});

robotBtn.addEventListener('click', ()=> {
    //if board already displayed for this option then do nothing
    if (robotBtn.className == 'clicked') {
        return;
    }

    robotBtn.className = 'clicked';
    humanBtn.className = '';

    initialiseGameCards();
});

//functions
function initialiseGameCards() {
    //clear gameBoard
    const gameBoard = document.querySelector('.gameBoard');
    
    while(gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }

    //draw gameBoard
    for (let i = 0; i < 9; i++) {
        gameBoard.appendChild(createCard());
    }

    boardArray = [...gameBoard.childNodes];

    //initialise game variables
    gameWon = false;
    currPlayer = Player('X');
    printMessage(`Player ${currPlayer.name}'s turn.`);
}

function createCard() {
    const card = document.createElement('div');
    card.classList.add('gameCard');

    card.addEventListener('click', (event)=> { //show current player's name on card
        if (gameWon == true) return; //prevent further play when game is won

        if (event.target.dataset.symbol) return; //prevent changing already played card
            
        card.classList.add(`${currPlayer.name}-card`);
        card.setAttribute('data-symbol', currPlayer.name); //set custom attribute for card owner ie X or O.

        if (currPlayer.checkWinCondition()) return;
        switchPlayer();
    });

    return card;
}

function printMessage(message) {
    msg.textContent = message;
}

const Player = (name) => {
    this.name = name;

    this.checkWinCondition = () => {
        // console.log(boardArray);
        let combinations = [
            [0, 1, 2], 
            [3, 4, 5], 
            [6, 7, 8], 
            [0, 3, 6], 
            [1, 4, 7], 
            [2, 5, 8], 
            [0, 4, 8], 
            [2, 4, 6]
        ]
    
        for(let i = 0; i < combinations.length; i++) {
            if(boardArray[combinations[i][0]].dataset.symbol == boardArray[combinations[i][1]].dataset.symbol && 
                boardArray[combinations[i][2]].dataset.symbol == this.name) 
            {
                // console.log(this.name + ' wins');
                gameWon = true;
                printMessage(`Player ${this.name} wins the game!.`);
                return true;
            }
        }

        return false;
    };

    return {name, checkWinCondition};
};

function switchPlayer() { //Switch Players by changing name
    if (currPlayer.name == 'X') {
        currPlayer.name = 'O';
        printMessage(`Player ${currPlayer.name}'s turn.`);
        return;
    } 
    currPlayer.name = 'X';
    printMessage(`Player ${currPlayer.name}'s turn.`);
}

//Driver code
let newPlayer = Player('X');
currPlayer = newPlayer;