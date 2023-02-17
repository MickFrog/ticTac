//Acquire elements
const gameCards = [...document.querySelectorAll('.gameCard')];
const humanBtn = document.getElementById('humanBtn');
const robotBtn = document.getElementById('botBtn');

//Event listeners
function initialiseGameCards() {
    for (let i = 0; i < gameCards.length; i++) {
        gameCards[i].addEventListener('click', (event) => {
            event.target.classList.add('X-card');
        });
    }
}

humanBtn.addEventListener('click', ()=> {
    humanBtn.className = 'clicked';
    robotBtn.className = '';

});

robotBtn.addEventListener('click', ()=> {
    robotBtn.className = 'clicked';
    humanBtn.className = '';

});

//Driver code
initialiseGameCards();