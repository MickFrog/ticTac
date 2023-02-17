//Acquire elements
const gameCards = [...document.querySelectorAll('.gameCard')];

//Event listeners
function initialiseGameCards() {
    for (let i = 0; i < gameCards.length; i++) {
        gameCards[i].addEventListener('click', (event) => {
            event.target.classList.add('X-card');
        });
    }
}

//Driver code
initialiseGameCards();