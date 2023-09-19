import { WORDS_LIST, KEYBOARD_LETTERS } from "./constant";

const divGame = document.getElementById("game");
const logoH1 = document.getElementById("logo");
const subLogo = document.getElementById("sublogo");

let triesLeft;
let wordCount;

const createPlaceholder = () => {
  const word = sessionStorage.getItem("word");
  const wordArr = Array.from(word);
  const placeholderLetters = wordArr.reduce((acc, curr, i) => {
    return acc + `<h1 class="letter" id="letter_${i}">_</h1>`;
  }, "");
  return `<div id="placeholders" class="placeholder-wrapper">${placeholderLetters}</div>`;
};

export const createKeyboard = () => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  keyboard.id = "keyboard";

  const keyboardButtons = KEYBOARD_LETTERS.reduce((acc, curr) => {
    return (
      acc +
      `<button class="button-primary keyboard-button" id="${curr}">${curr}</button>`
    );
  }, "");

  keyboard.innerHTML = keyboardButtons;
  return keyboard;
};

export const createImage = () => {
  const image = document.createElement("img");
  image.classList.add("hangman-img");
  image.src = "images/hg-0.png";
  image.alt = "hangman image";
  image.id = "hangman-img";

  return image;
};

export const checkLetter = (letter) => {
  const letterName = letter.toLowerCase();
  const word = sessionStorage.getItem("word");
  const elemTries = document.getElementById("tries-left");
  const elemImage = document.getElementById("hangman-img");

  if (!word.includes(letterName)) {
    triesLeft -= 1;
    elemTries.innerText = triesLeft;
    elemImage.src = `images/hg-${10 - triesLeft}.png`;

    if (triesLeft === 0) {
      stopGame("lose");
    }
  } else {
    const wordArr = Array.from(word);

    wordArr.forEach((lett, i) => {
      if (lett === letterName) {
        wordCount++;

        if (wordCount === word.length) {
          stopGame("win");
          return;
        }

        document.getElementById(`letter_${i}`).innerText = lett.toUpperCase();
      }
    });
  }
};

export const stopGame = (status) => {
  document.getElementById("keyboard").remove();
  document.getElementById("placeholders").remove();
  document.getElementById("tries").remove();
  document.getElementById("quit").remove();

  const word = sessionStorage.getItem("word");

  if (status === "win") {
    document.getElementById("hangman-img").src = "images/hg-win.png";
    document.getElementById("game").innerHTML +=
      '<h2 class="result-header win">You won! :)</h2>';
  }
  if (status === "lose") {
    document.getElementById("game").innerHTML +=
      '<h2 class="result-header lose">You lost! :(</h2>';
  }
  if (status === "quit") {
    logoH1.classList.remove("logo-sm");
    document.getElementById("hangman-img").remove();
  }

  document.getElementById(
    "game"
  ).innerHTML += `<p>The word was: <span class="result-word">${word}</span></p><button id="play-again" class="button-primary px-5 py-2 mt-5">Play again</button>`;
  document.getElementById("play-again").onclick = startGame;
};

export const startGame = () => {
  triesLeft = 10;
  wordCount = 0;

  if (subLogo) {
    subLogo.remove();
  }

  logoH1.classList.add("logo-sm");

  const wordIndex = Math.round(Math.random() * (WORDS_LIST.length - 1));
  const wordToGuess = WORDS_LIST[wordIndex];
  sessionStorage.setItem("word", wordToGuess);

  divGame.innerHTML = createPlaceholder();
  divGame.innerHTML += `<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">${triesLeft}</span> </p>`;

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "button") {
      e.target.disabled = true;
      checkLetter(e.target.id);
    }
  });
  divGame.appendChild(keyboardDiv);

  const imageImg = createImage();
  divGame.prepend(imageImg);

  divGame.insertAdjacentHTML(
    "beforeend",
    "<button id='quit' class='button-secondary px-3 py-1 mt-10'>Quit</button>"
  );

  document.getElementById("quit").onclick = () => {
    const isQuit = confirm("Are you sure you want to quit and lose progress?");
    if (isQuit) {
      stopGame("quit");
    }
  };
};
