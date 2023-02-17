//Acquire elements
const humanBtn = document.getElementById('humanBtn');
const robotBtn = document.getElementById('botBtn');

//Event listeners
function initialiseGameCards() {
    //clear gameBoard
    const gameBoard = document.querySelector('.gameBoard');
    
    while(gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }

    for (let i = 0; i < 9; i++) {
        gameBoard.appendChild(createCard());
    }
}

function createCard() {
    const card = document.createElement('div');
    card.classList.add('gameCard');

    card.addEventListener('click', ()=> {
        card.classList.add('X-card');
    });

    return card;
}

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
