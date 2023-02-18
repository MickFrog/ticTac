//Global variables
let currPlayer = null;

//Acquire elements
const humanBtn = document.getElementById('humanBtn');
const robotBtn = document.getElementById('botBtn');

//Event listeners
humanBtn.addEventListener('click', ()=> {
    humanBtn.className = 'clicked';
    robotBtn.className = '';

    initialiseGameCards();
});

robotBtn.addEventListener('click', ()=> {
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
}

function createCard() {
    const card = document.createElement('div');
    card.classList.add('gameCard');

    card.addEventListener('click', ()=> { //show current player's name on card
        card.classList.add(`${currPlayer.name}-card`);
        switchPlayer();
    });

    return card;
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
        return;
    } 
    currPlayer.name = 'X';
}

//Driver code
let newPlayer = Player('X');
currPlayer = newPlayer;