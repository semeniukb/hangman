import { WORDS_LIST, KEYBOARD_LETTERS} from "./constant";

const divGame = document.getElementById('game')

const createPlaceholder = () => {
   const word = sessionStorage.getItem("word");
   const wordArr = Array.from(word)
    const placeholderLetters = wordArr.reduce((acc, curr, i) => {
        return acc + `<h1 class="letter" id="letter_${i}">_</h1>`
    }, "")
   return `<div id="placeholders" class="placeholder-wrapper">${placeholderLetters}</div>`
}

export const startGame = () => {
    const wordIndex = Math.round(Math.random() * WORDS_LIST.length)
    const wordToGuess = WORDS_LIST[wordIndex]
    sessionStorage.setItem("word", wordToGuess)

    divGame.innerHTML = createPlaceholder()
}