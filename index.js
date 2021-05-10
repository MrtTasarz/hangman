const wordList = document.getElementById('word')
const wrongLetters = document.getElementById('wrong-letters')
const hangItems = document.querySelectorAll('.hang-item')
const player = document.getElementById('player')
const death = document.getElementById('death')
const timer = document.getElementById('timer')
const keyboardEl = document.getElementById('keyboard')
const message = document.getElementById('message')
const winner = document.getElementById('winner')
const playBtn = document.getElementById('play-btn')
const clearBtn = document.getElementById('clear-btn')

let counter = 0;
let currentWord;
let wrong = [];
// words
const arr = ['ananas', 'kuchnia', 'mucha', 'kwiatek', 'dzbanek', 'obraz', 'muzyka', 'sen']

const localStoragePlayer = JSON.parse(localStorage.getItem('playerScore'));
let playerScore = localStorage.getItem('playerScore') !== null ? localStoragePlayer : [];

const localStorageDeath = JSON.parse(localStorage.getItem('deathScore'));
let deathScore = localStorage.getItem('deathScore') !== null ? localStorageDeath : [];

let score1 = deathScore;
let score2 = playerScore;
playerScore.length == 0 ? player.innerText = '0' : player.innerText = score2;
deathScore.length == 0 ? death.innerText = '0' : death.innerText = score1;


const rand = Math.floor(Math.random() * arr.length);


function newWord() {
  const word = arr[rand]
  currentWord = word.split('')
  currentWord.forEach(letter => {
    wordList.innerHTML += `<span class="hidden">${letter}</span>`
  })

}




function checkLetter(e) {
  const val = e
  let letters = /^[A-Za-zężźąńółćśĘÓĄŚŁŻŹĆŃ]$/;
  if (letters.test(val) || letters.test(e)) {
    findWord(val)
  } else {
    showWarning('To nie jest litera!')
  }
}

function findWord(val) {
  const v = val.toLowerCase()
  const hid = document.querySelectorAll('.hidden')
  if (currentWord.indexOf(v) !== -1) {
    hid.forEach(
      el => {
        el.textContent === v ? el.classList.add('show') : ''
      }
    )
  } else {
    if (wrong.length === 0 || wrong.indexOf(v) === -1) {
      counter++
      wrongLetters.innerHTML += `<span class="wrong">${v}, </span>`
      hangItems[counter - 1].style.display = "block"
      wrong.push(v)
    } else {
      showWarning('Litera w zbiorze - niepoprawne!')
    }
  }
}

function showWarning(message) {
  const warning = document.createElement('div')
  warning.classList.add('warning')
  warning.innerHTML = `<h5>${message}</h5>`

  document.body.appendChild(warning)

  setTimeout(() => {
    document.body.removeChild(warning)
  }, 2000)
}

function gameOver() {
  const shown = document.querySelectorAll('.show')

  setTimeout(() => {
    if (counter >= 10 || timer.innerHTML === "KONIEC") {
      death.innerText = `${score1 + 1}`
      showMessage('PRZEGRANA')
      updateLocalStorage('deathScore', `${score1 + 1}`)
    } else if (shown.length === currentWord.length) {
      player.innerText = `${score2 + 1}`
      showMessage('WYGRANA')
      updateLocalStorage('playerScore', `${score2 + 1}`)
    }
  }, 250)
}

function showMessage(result) {
  message.style.visibility = "visible"
  winner.textContent = result;
}

function countDown() {
  let countDownDate = new Date().getTime() + 60000;

  let counter = setInterval(() => {

    let now = new Date().getTime();
    let distance = countDownDate - now;
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    seconds < 10 ? timer.innerHTML = `0${minutes}:0${seconds}` : timer.innerHTML = `0${minutes}:${seconds}`
    if (distance < 0) {
      clearInterval(counter);
      timer.innerHTML = "KONIEC";
      gameOver()
    }
  }, 1000);

}

const keyboard = [
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'ą', 'ć', 'ę', 'ł', "ń", 'ó', 'ś', 'ż', "ź",
]

function generateKeyboard() {
  keyboard.forEach((key) => {
    keyboardEl.innerHTML += `<button type="button" class="key">${key}</button>`
  })
  addFunc()
}

function addFunc() {
  const keys = document.querySelectorAll('.key')
  keys.forEach(key => {
    key.addEventListener('click', (e) => checkLetter(e.target.innerText))
  })
}

function newGame() {
  location.reload()
}

// update local storage transactions
function updateLocalStorage(winner, score) {
  localStorage.setItem(winner, score);
}

function emptyLocalStorage() {
  localStorage.clear()
  newGame()
}

newWord()
countDown()
generateKeyboard()
console.log(currentWord)

clearBtn.addEventListener('click', emptyLocalStorage)
playBtn.addEventListener('click', newGame)

window.addEventListener('keydown', (e) => checkLetter(e.key))
window.addEventListener('keydown', gameOver)
window.addEventListener('click', gameOver)










































































































