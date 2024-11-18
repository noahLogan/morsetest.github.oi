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
    { letter: 'Z', morse: '--..' },
    { letter: '1', morse: '.----' },
    { letter: '2', morse: '..---' },
    { letter: '3', morse: '...--' },
    { letter: '4', morse: '....-' },
    { letter: '5', morse: '.....' },
    { letter: '6', morse: '-....' },
    { letter: '7', morse: '--...' },
    { letter: '8', morse: '---..' },
    { letter: '9', morse: '----.' },
    { letter: '0', morse: '-----' }
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
        
        // dos opciones incorrectas solamente
        const incorrectOptions = getUniqueIncorrectOptions(correctLetter, optionButtons.length - 1);
        
        const allOptions = [...incorrectOptions, correctLetter];
        
        shuffleArray(allOptions);
        
        optionButtons.forEach((button, index) => {
            button.textContent = allOptions[index];
        });

        morseCard.dataset.correctAnswer = correctLetter;
    } else {
        // Fin del juego
        setTimeout(() => {
            alert(`¡Juego terminado! Tu puntuación final es: ${score}`);
            resetBtn.style.display = 'block'; 
        }, 100); 
    }
}

// para la respuesta correcta
function checkAnswer(button) {
    const selectedAnswer = button.textContent.toUpperCase();
    const correctAnswer = morseCard.dataset.correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score += 10;  // Para la acumulacioón de puntos
        button.style.backgroundColor = '#28a745'; // Verde
    } else {
        button.style.backgroundColor = '#dc3545'; // Rojo
        optionButtons.forEach(btn => {
            if (btn.textContent.toUpperCase() === correctAnswer) {
                btn.style.backgroundColor = '#28a745'; // Verde
            }
        });
    }

    optionButtons.forEach(btn => btn.disabled = true);

    // actualiza la puntuación
    scoreDisplay.textContent = `Puntos: ${score}`;
    
    setTimeout(() => {
        optionButtons.forEach(btn => {
            btn.style.backgroundColor = '#ff9d00';
            btn.disabled = false;
        });
        loadRound();
    }, 1000); 
}

// Función para jugar de nuevo en el juego
function resetGame() {
    score = 0;
    round = 0;
    scoreDisplay.textContent = `Puntos: ${score}`;
    roundDisplay.textContent = `Ronda: ${round + 1}/${totalRounds}`;
    resetBtn.style.display = 'none';  // Ocultar el botón de reinicio
    loadRound();  // Reiniciar las rondas
}

// mezcla del arreglo para mostrar una opción random
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
