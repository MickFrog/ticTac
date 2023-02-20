//Global variables
let currPlayer = null;
let boardArray = [];
let gameWon = -1;
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
function getLegalMoves() {
    let legals = [];
    for (let i = 0; i < boardArray.length; i++) {
        if(!boardArray[i].dataset.symbol) {
            legals.push(boardArray[i]);
        }
    }

    return legals;
}

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
    gameWon = -1;
    round = 0;
    currPlayer = Player('X');
    printMessage(`Player ${currPlayer.name}'s turn.`);
}

function createCard() {
    const card = document.createElement('div');
    card.classList.add('gameCard');

    card.addEventListener('click', (event)=> { //show current player's name on card
        if (gameWon != -1) return; //prevent further play when game is won or drew

        if (event.target.dataset.symbol) return; //prevent changing already played card
            
        card.classList.add(`${currPlayer.name}-card`);
        card.setAttribute('data-symbol', currPlayer.name); //set custom attribute for card owner ie X or O.

        round++;
        if (currPlayer.checkWinCondition() != -1) return; //prevent further play when game is won
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
                gameWon = 1;
                printMessage(`Player ${name} wins the game!.`);
                return 1;
            }
        };

        if (round == 9) {
            gameWon = 0;
            printMessage(`Game is a draw!`);
            return 0;
        }

        return -1;
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

function minimax(tempPlayer) { //board used is global 
    let availSpots = getLegalMoves();

    //check for terminal states
    if (tempPlayer.name == 'X' && tempPlayer.checkWinCondition() == 1) {
        return {score: -1};
    } else if (tempPlayer.name == 'O' && tempPlayer.checkWinCondition() == 1) {
        return {score: 1};
    } else if (availSpots.length == 0) {
        return {score: 0};
    }
    
    let allMoves = []; //collect all move Objs

    for (let i = 0; i < availSpots.length; i++) {
        let move;

        move.card = availSpots[i]; //ref to div in the page

        availSpots[i].dataset.symbol = tempPlayer.name; //set curr spot to taken by temp player

        //keep switching tempPlayer and recall minimax
        if (tempPlayer.name == 'O') { //ai player
            tempPlayer.name = 'X'; 
            let result = minimax(tempPlayer);
            move.score = result;

        } else {
            tempPlayer.name = 'O';
            let result = minimax(tempPlayer);
            move.score = result;
        }

        //reset the symbol data attr to nothing
        delete availSpots[i].dataset.symbol;
        
        //add move to allMoves
        allMoves.push(move);
    }

    //evaluate bestmove; by getting actual card in page
    let bestCard;

    if (tempPlayer.name == 'O') {
        let bestScore = -10000;
        for (let i = 0; i < allMoves.length; i++) {
            if (allMoves[i].score > bestScore) {
                bestScore = allMoves[i].score;
                bestCard = allMoves[i].card; 
            }
        }

    } else { //when player is human
        let bestScore = 10000;
        for (let i = 0; i < allMoves.length; i++) {
            if (allMoves[i].score < bestScore) {
                bestScore = allMoves[i].score;
                bestCard = allMoves[i].card; 
            }
        }
    }

    return bestCard;
}