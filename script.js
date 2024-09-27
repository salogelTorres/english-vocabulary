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
let history = [];
let incorrectWords = JSON.parse(localStorage.getItem("incorrectWords")) || [];

// Función para seleccionar una palabra aleatoria
function getRandomWordIndex() {
  return Math.floor(Math.random() * words.length);
}

// Función para normalizar el texto y eliminar las tildes
function normalizeText(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function showWord() {
  // Si hay palabras incorrectas en el LocalStorage, selecciona una aleatoria
  if (incorrectWords.length > 0 && Math.random() > 0.85) {
    const randomIndex = Math.floor(Math.random() * incorrectWords.length);
    currentWordIndex = words.findIndex(
      (word) => word.english === incorrectWords[randomIndex].english
    );
  } else {
    // Selecciona una palabra aleatoria del total
    currentWordIndex = getRandomWordIndex();
  }

  const wordElement = document.getElementById("word");
  wordElement.textContent = words[currentWordIndex].english; // Muestra la palabra en inglés
}

function checkAnswer() {
  const answer = document.getElementById("answer").value.trim();
  const resultElement = document.getElementById("result");

  let isCorrect = false;

  if (
    normalizeText(answer) === normalizeText(words[currentWordIndex].spanish)
  ) {
    // Compara la respuesta en español
    resultElement.textContent = "¡Correcto!";
    resultElement.style.color = "green";
    isCorrect = true;

    // Si acertó una palabra que antes era incorrecta
    if (
      incorrectWords.some(
        (word) => word.english === words[currentWordIndex].english
      )
    ) {
      removeFromIncorrect(words[currentWordIndex].english);
      resultElement.textContent +=
        " ¡Has corregido una palabra que antes tenías mal!";
    }
  } else {
    resultElement.textContent = `Incorrecto. La respuesta correcta es: ${words[currentWordIndex].spanish}`;
    resultElement.style.color = "red";

    // Añadir al localStorage si la palabra no está ya registrada como incorrecta
    if (
      !incorrectWords.some(
        (word) => word.english === words[currentWordIndex].english
      )
    ) {
      addToIncorrect(
        words[currentWordIndex].english,
        words[currentWordIndex].spanish
      );
    }
  }

  // Añadir palabra al historial
  addToHistory(words[currentWordIndex].english, answer, isCorrect);
}

function addToHistory(word, answer, isCorrect) {
  // Crear elemento de lista
  const historyList = document.getElementById("historyList");
  const listItem = document.createElement("li");

  // Crear texto para mostrar en el historial
  const resultText = isCorrect ? "correcta" : "incorrecta";
  listItem.textContent = `Palabra: ${word} - Tu respuesta: ${
    answer || "(sin respuesta)"
  }`;

  // Añadir la clase correcta
  if (isCorrect) {
    listItem.classList.add("correct");
  } else {
    listItem.classList.add("incorrect");
  }

  // Añadir el nuevo elemento a la lista
  historyList.appendChild(listItem);

  // Añadir al array de historial (opcional si necesitas hacer algo más adelante con los datos)
  history.push({ word, answer, isCorrect });
}

function nextWord() {
  document.getElementById("answer").value = ""; // Limpia el campo de respuesta
  document.getElementById("result").textContent = ""; // Limpia el resultado
  showWord(); // Muestra una nueva palabra aleatoria
}

function addToIncorrect(english, spanish) {
  incorrectWords.push({ english, spanish });
  localStorage.setItem("incorrectWords", JSON.stringify(incorrectWords));
}

function removeFromIncorrect(english) {
  incorrectWords = incorrectWords.filter((word) => word.english !== english);
  localStorage.setItem("incorrectWords", JSON.stringify(incorrectWords));
}

// Cargar historial de palabras incorrectas desde LocalStorage
function loadIncorrectWords() {
  incorrectWords.forEach((word) => {
    addToHistory(word.english, "(sin respuesta)", false);
  });
}

// Detectar la tecla Enter
document.getElementById("answer").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

// Mostrar la primera palabra al cargar la página
window.onload = function () {
  loadIncorrectWords(); // Cargar historial previo
  showWord(); // Mostrar nueva palabra
};
