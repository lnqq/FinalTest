const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const caroElements = document.querySelectorAll('[data-caro]')
const quang = document.getElementById('quang')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  caroElements.forEach(caro => {
    caro.classList.remove(X_CLASS)
    caro.classList.remove(CIRCLE_CLASS)
    caro.removeEventListener('click', handleClick)
    caro.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const caro = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(caro, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Chiến Thắng Rồi Nè!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...caroElements].every(caro => {
    return caro.classList.contains(X_CLASS) || caro.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(caro, currentClass) {
  caro.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  quang.classList.remove(X_CLASS)
  quang.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    quang.classList.add(CIRCLE_CLASS)
  } else {
    quang.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return caroElements[index].classList.contains(currentClass)
    })
  })
}