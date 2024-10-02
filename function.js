// abecedario y numerología en Morse

function textToMorse(text) {
    return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
}

document.getElementById('morseForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const textInput = document.getElementById('textInput').value;
    const morseResult = textToMorse(textInput);

    document.getElementById('result').innerText = `Traducción en Morse: ${morseResult}`;
    document.getElementById('vibrateButton').style.display = window.innerWidth < 1024 ? 'block' : 'none';
});

function vibrateMorse(morse) {
    const vibratePattern = [];
    const words = morse.split('   ');

    words.forEach((word, wordIndex) => {
        const letters = word.split(' '); 

        letters.forEach((letter, letterIndex) => {
            letter.split('').forEach((char, charIndex) => {
                if (char === '.') {
                    vibratePattern.push(1000); // la duración de un punto es de 1 segundo
                } else if (char === '-') {
                    vibratePattern.push(3000); // la duración de una raya es de 3 segundos
                }

                // pausa de 1 segundo entre los símbolos de la misma letra (-- ..) 
                if (charIndex < letter.length - 1) {
                    vibratePattern.push(1000); 
                }
            });

            // pausa de 3 segundos entre las letras de una palabra
            if (letterIndex < letters.length - 1) {
                vibratePattern.push(3000);
            }
        });

        // pausa de 9 segundos después de cada palabra
        if (wordIndex < words.length - 1) {
            vibratePattern.push(9000);
        }
    });

    navigator.vibrate(vibratePattern); // Aquí se activa la vibración
}

document.getElementById('vibrateButton').addEventListener('click', function() {
    const morseResult = document.getElementById('result').innerText.replace('Traducción en Morse: ', '');
    if (navigator.vibrate) {
        vibrateMorse(morseResult);
    } else {
        alert("Este dispositivo no soporta vibraciones.");
    }
});