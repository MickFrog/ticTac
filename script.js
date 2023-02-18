//Global variables
let currPlayer = null;
let boardArray = [];

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
    printMessage();
}

function createCard() {
    const card = document.createElement('div');
    card.classList.add('gameCard');

    card.addEventListener('click', ()=> { //show current player's name on card
        card.classList.add(`${currPlayer.name}-card`);
        card.id = currPlayer.name;
        switchPlayer();
    });

    return card;
}

function printMessage() {
    msg.textContent = `Player ${currPlayer.name}'s turn.`
}

const Player = (name) => {
    this.name = name;

    this.checkWinCondition = () => {

    };

    return {name, checkWinCondition};
};

function switchPlayer() { //Switch Players by changing name
    if (currPlayer.name == 'X') {
        currPlayer.name = 'O';
        printMessage();
        return;
    } 
    currPlayer.name = 'X';
    printMessage();
}

//Driver code
let newPlayer = Player('X');
currPlayer = newPlayer;