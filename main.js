const body = document.body;
const lettersDiv = document.querySelector(".letters");
const spanLetters = document.createElement("span");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");
const head = document.querySelector(".head");
const torso = document.querySelector(".torso");
const arm1 = document.querySelector(".arm-1");
const arm2 = document.querySelector(".arm-2");
const leg1 = document.querySelector(".leg-1");
const leg2 = document.querySelector(".leg-2");
let boneco = [head, torso, arm1, arm2, leg1, leg2];
const statusScreen = document.querySelector(".statusScreen");
const statusText = document.getElementById("statusText");
const words = [
  "BANANA",
  "PORTA",
  "MONITOR",
  "MESA",
  "MICROFONE",
  "XUXA",
  "IGREJA",
];
let spans = [];
let oldGuesses = [];
let wordIndex = [];
let guess;
let currentWord; // = parseInt(Math.random() * words.length);
let previousWords = [];
let hangmanControll = 0;
let wlControll;

getRandomWord();
startGame();

guessInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.toUpperCase();
});

guessInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkGuess();
  }
});

guessBtn.addEventListener("click", checkGuess);

resetBtn.addEventListener("click", resetGame);

function startGame() {
  for (let i = 0; i < words[currentWord].length; i++) {
    const span = document.createElement("span");
    spans.push(span);
    lettersDiv.append(span);
  }
  //console.log(currentWord);
}

function getRandomWord() {
  currentWord = parseInt(Math.random() * words.length);
  if (previousWords.includes(currentWord)) {
    while (previousWords.includes(currentWord)) {
      currentWord = parseInt(Math.random() * words.length);
    }
  }
  previousWords.push(currentWord);
  //console.log(previousWords);
  return currentWord;
}

function resetGame() {
  if (!wlControll) {
    while (lettersDiv.hasChildNodes()) {
      lettersDiv.removeChild(lettersDiv.firstChild);
    }
    oldGuesses = [];
    hangmanControll = 0;
    boneco.forEach((index) => {
      index.style.visibility = "hidden";
    });
    spans = [];
    previousWords = [];
    getRandomWord();
    startGame();
    statusScreen.style.display = "none";
    //console.log("game reseted");
  }
  if (wlControll) {
    while (lettersDiv.hasChildNodes()) {
      lettersDiv.removeChild(lettersDiv.firstChild);
    }
    oldGuesses = [];
    hangmanControll = 0;
    boneco.forEach((index) => {
      index.style.visibility = "hidden";
    });
    spans = [];
    getRandomWord();
    startGame();
    statusScreen.style.display = "none";
    //console.log("game reseted");
  }
}

function checkGuess() {
  guess = guessInput.value;
  if (guessInput.value === "") {
    alert("guess a letter");
    return;
  }
  if (oldGuesses.includes(guess)) {
    alert(`already guessed ${guess}`);
    guess = "";
  } else {
    oldGuesses.push(guess);
  }
  guessInput.value = "";

  findLetterIndex(words[currentWord], guess);
  if (wordIndex.length === 0) {
    hangmanControll++;
  }
  hangmanStatus();
  revealLetter();
  guessInput.value = "";
  //console.log(oldGuesses);
  if (Array.from(spans).every((span) => span.textContent.trim() !== "")) {
    if (previousWords.length === words.length) {
      wlControll = false;
      statusText.textContent = "Acertou todas as palavras!";
      statusScreen.style.display = "flex";
    } else {
      wlControll = true;
      displayStatusScreen(wlControll);
    }
  }
  guessInput.focus();
}

function displayStatusScreen(wl) {
  if (!wl) {
    statusText.textContent = "Perdeu!";
    statusScreen.style.display = "flex";
  } else {
    statusText.textContent = "Venceu!";
    statusScreen.style.display = "flex";
  }
}

function findLetterIndex(word, letter) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      wordIndex.push(i);
    }
  }
  return wordIndex;
}

function revealLetter() {
  wordIndex.forEach((index) => {
    spans[index].textContent = guess;
  });
  //console.log(wordIndex);
  wordIndex = [];
}

function hangmanStatus() {
  switch (hangmanControll) {
    case 1:
      boneco[0].style.visibility = "visible";
      break;
    case 2:
      boneco[1].style.visibility = "visible";
      break;
    case 3:
      boneco[2].style.visibility = "visible";
      break;
    case 4:
      boneco[3].style.visibility = "visible";
      break;
    case 5:
      boneco[4].style.visibility = "visible";
      break;
    case 6:
      boneco[5].style.visibility = "visible";
      wlControll = false;
      displayStatusScreen(wlControll);
      break;
  }
}
