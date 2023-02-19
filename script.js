//Global variables
let currPlayer = null;
let boardArray = [];
let gameWon = false;
let round = 0;

//Acquire elements
const humanBtn = document.getElementById('humanBtn');
const robotBtn = document.getElementById('botBtn');
const gameBoard = document.querySelector('.gameBoard');
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
    while(gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }

    //draw gameBoard
    for (let i = 0; i < 9; i++) {
        gameBoard.appendChild(createCard());
    }

    //Add restart button
    createRestartBtn();

    boardArray = [...gameBoard.childNodes];

    //initialise game variables
    gameWon = false;
    round = 0;
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

        round++;
        if (currPlayer.checkWinCondition()) return; //prevent further play when game is won
        currPlayer.switchPlayer();
    });

    return card;
}

function printMessage(message) {
    msg.textContent = message;
}

function createRestartBtn() {
    if (gameBoard.nextElementSibling != null) { //prevent adding restart btn if already exists
        if (gameBoard.nextElementSibling.id == 'restartBtn') return;
    }

    const contentSect = document.querySelector('.content');

    let RestartBtn = document.createElement('button');
    RestartBtn.id = 'restartBtn';
    RestartBtn.textContent = 'Restart';

    RestartBtn.addEventListener('click', () => {
        initialiseGameCards();
    });

    contentSect.appendChild(RestartBtn);
}

//Factories
const Player = (playerName) => {
    let name = playerName;

    let combinations = [ //all win conditions
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6]
    ]

    let switchPlayer = () => { //Switch Players by changing name
        if (name == 'X') {
            name = 'O';
            printMessage(`Player ${name}'s turn.`);
            return;
        } 
        name = 'X';
        printMessage(`Player ${name}'s turn.`);
    };

    const checkWinCondition = () => {
        for(let i = 0; i < combinations.length; i++) {
            if(boardArray[combinations[i][0]].dataset.symbol == name &&
                boardArray[combinations[i][1]].dataset.symbol == name && 
                boardArray[combinations[i][2]].dataset.symbol == name) 
            {
                gameWon = true;
                printMessage(`Player ${name} wins the game!.`);
                return true;
            }
        };

        if (round == 9) {
            gameWon = true;
            printMessage(`Game is a draw!`);
            return true;
        }

        return false;
    };

    return {name, switchPlayer, checkWinCondition, 
        // To enable access of object variables instead of this function's closure variable.
        set name(val) {
            name = val;
        }, 
        get name() {
            return name;
        }};
};
