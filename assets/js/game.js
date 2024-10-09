// Abecedario
const morseDictionary = [
    { letter: 'A', morse: '.-' },
    { letter: 'B', morse: '-...' },
    { letter: 'C', morse: '-.-.' },
    { letter: 'D', morse: '-..' },
    { letter: 'E', morse: '.' },
    { letter: 'F', morse: '..-.' },
    { letter: 'G', morse: '--.' },
    { letter: 'H', morse: '....' },
    { letter: 'I', morse: '..' },
    { letter: 'J', morse: '.---' },
    { letter: 'K', morse: '-.-' },
    { letter: 'L', morse: '.-..' },
    { letter: 'M', morse: '--' },
    { letter: 'N', morse: '-.' },
    { letter: 'O', morse: '---' },
    { letter: 'P', morse: '.--.' },
    { letter: 'Q', morse: '--.-' },
    { letter: 'R', morse: '.-.' },
    { letter: 'S', morse: '...' },
    { letter: 'T', morse: '-' },
    { letter: 'U', morse: '..-' },
    { letter: 'V', morse: '...-' },
    { letter: 'W', morse: '.--' },
    { letter: 'X', morse: '-..-' },
    { letter: 'Y', morse: '-.--' },
    { letter: 'Z', morse: '--..' }
];

let score = 0;
let round = 0;
const totalRounds = 10;

const morseCard = document.getElementById('morseCard');
const scoreDisplay = document.getElementById('score');
const roundDisplay = document.getElementById('round');
const resetBtn = document.getElementById('resetBtn');
const optionButtons = document.querySelectorAll('.options button');

function getRandomMorse() {
    const randomIndex = Math.floor(Math.random() * morseDictionary.length);
    return morseDictionary[randomIndex];
}

// opciones incorrectas
function getUniqueIncorrectOptions(correctLetter, count) {
    const incorrectOptions = [];
    while (incorrectOptions.length < count) {
        const randomEntry = getRandomMorse();
        const randomLetter = randomEntry.letter.toUpperCase();
        if (randomLetter !== correctLetter && !incorrectOptions.includes(randomLetter)) {
            incorrectOptions.push(randomLetter);
        }
    }
    return incorrectOptions;
}

function loadRound() {
    if (round < totalRounds) {
        round++;
        roundDisplay.textContent = `Ronda: ${round}/${totalRounds}`;
        
        const correctMorse = getRandomMorse();
        morseCard.textContent = correctMorse.morse;
        const correctLetter = correctMorse.letter.toUpperCase();
        
        const incorrectOptions = getUniqueIncorrectOptions(correctLetter, optionButtons.length - 1);
        
        const allOptions = [...incorrectOptions, correctLetter];
        
        shuffleArray(allOptions);
        
        optionButtons.forEach((button, index) => {
            button.textContent = allOptions[index];
        });

        morseCard.dataset.correctAnswer = correctLetter;
    } else {
        setTimeout(() => {
            alert(`¡Juego terminado! Tu puntuación final es: ${score}`);
            resetBtn.style.display = 'block';  
        }, 100); 
    }
}

function checkAnswer(button) {
    const selectedAnswer = button.textContent.toUpperCase();
    const correctAnswer = morseCard.dataset.correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score += 10;  
        button.style.backgroundColor = '#28a745';
    } else {
        button.style.backgroundColor = '#dc3545'; 
        optionButtons.forEach(btn => {
            if (btn.textContent.toUpperCase() === correctAnswer) {
                btn.style.backgroundColor = '#28a745'; 
            }
        });
    }

    optionButtons.forEach(btn => btn.disabled = true);

    scoreDisplay.textContent = `Puntos: ${score}`;
    
    setTimeout(() => {
        optionButtons.forEach(btn => {
            btn.style.backgroundColor = '#ff9d00';
            btn.disabled = false;
        });
        loadRound();
    }, 1000); 
}

function resetGame() {
    score = 0;
    round = 0;
    scoreDisplay.textContent = `Puntos: ${score}`;
    roundDisplay.textContent = `Ronda: ${round + 1}/${totalRounds}`;
    resetBtn.style.display = 'none';  
    loadRound();  
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

optionButtons.forEach(button => {
    button.addEventListener('click', () => checkAnswer(button));
});

loadRound();
