import { WORDS_LIST, KEYBOARD_LETTERS } from "./constant";

const divGame = document.getElementById("game");
const logoH1 = document.getElementById("logo");

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
  image.src = "images/hg-10.png";
  image.alt = "hangman image";
  image.id = "hangman-img";

  return image;
};

export const startGame = () => {
  logoH1.classList.add("logo-sm");

  const wordIndex = Math.round(Math.random() * WORDS_LIST.length);
  const wordToGuess = WORDS_LIST[wordIndex];
  sessionStorage.setItem("word", wordToGuess);

  divGame.innerHTML = createPlaceholder();
  divGame.innerHTML += `<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-medium text-red-600">10</span> </p>`;

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (e) => {
    console.log(e.target.id);
  });

  divGame.appendChild(keyboardDiv);
  const imageImg = createImage();
  divGame.prepend(imageImg);
};
