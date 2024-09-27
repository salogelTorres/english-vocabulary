const words = [
  { spanish: "Primero", english: "Firstly" },
  { spanish: "Segundo", english: "Secondly" },
  { spanish: "Al principio", english: "At first" },
  { spanish: "Al comienzo", english: "In the beginning" },
  { spanish: "Actualmente", english: "Presently" },
  { spanish: "Actualmente", english: "Currently" },
  { spanish: "En el pasado", english: "In the past" },
  { spanish: "Previo a, antes de", english: "Prior to" },
  { spanish: "En ese momento", english: "At that time" },
  { spanish: "Al mismo tiempo", english: "At the same time" },
  { spanish: "Mientras que", english: "Meantime" },
  { spanish: "Mientras tanto", english: "Meanwhile" },
  { spanish: "Cuando", english: "When" },
  { spanish: "Mientras", english: "As" },
  { spanish: "Mientras", english: "While" },
  { spanish: "A continuación", english: "Next to" },
  { spanish: "Después", english: "After" },
  { spanish: "Después", english: "Lately" },
  { spanish: "Posteriormente", english: "Subsequently" },
  { spanish: "Justo antes", english: "Just before" },
  { spanish: "Durante", english: "Since/for" },
  { spanish: "Entonces", english: "Then" },
  { spanish: "A continuación", english: "Immediately" },
  { spanish: "A continuación", english: "Thereupon" },
  { spanish: "A partir de ahí", english: "Thereafter" },
  { spanish: "A la larga, con el tiempo", english: "Eventually" },
  { spanish: "Al final", english: "At last" },
  { spanish: "Finalmente", english: "Finally" },
];

let currentWordIndex = 0;

// Función para seleccionar una palabra aleatoria
function getRandomWordIndex() {
  return Math.floor(Math.random() * words.length);
}

function showWord() {
  currentWordIndex = getRandomWordIndex(); // Selecciona una palabra aleatoria
  const wordElement = document.getElementById("word");
  wordElement.textContent = words[currentWordIndex].english;
}

function checkAnswer() {
  const answer = document.getElementById("answer").value.trim().toLowerCase();
  const resultElement = document.getElementById("result");

  if (answer === words[currentWordIndex].spanish.toLowerCase()) {
    resultElement.textContent = "¡Correcto!";
    resultElement.style.color = "green";
  } else {
    resultElement.textContent = `Incorrecto. La respuesta correcta es: ${words[currentWordIndex].spanish}`;
    resultElement.style.color = "red";
  }
}

function nextWord() {
  document.getElementById("answer").value = ""; // Limpia el campo de respuesta
  document.getElementById("result").textContent = ""; // Limpia el resultado
  showWord(); // Muestra una nueva palabra aleatoria
}

// Detectar la tecla Enter
document.getElementById("answer").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

// Mostrar la primera palabra al cargar la página
window.onload = showWord;
