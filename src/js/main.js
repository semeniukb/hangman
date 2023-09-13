import "../css/style.css"
import { toggleDarkMode } from "./utils"
import { startGame } from "./game"

toggleDarkMode()

const startGameBtn = document.getElementById("startGame")
startGameBtn.addEventListener('click', startGame)