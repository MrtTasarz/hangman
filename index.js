const wordList = document.getElementById('word')
const wrongLetters = document.getElementById('wrong-letters')
const hangItems = document.querySelectorAll('.hang-item')
const player = document.getElementById('player')
const death = document.getElementById('death')
const timer = document.getElementById('timer')
let score1 = 0;
let score2 = 0;
let counter = 0;
let currentWord;
let wrong = [];
// words
const arr = ['ananas', 'kuchnia', 'mucha', 'kwiatek', 'dzbanek', 'obraz', 'muzyka', 'sen']
const rand = Math.floor(Math.random() * arr.length);


function newWord() {
  const word = arr[rand]
  currentWord = word.split('')
  currentWord.forEach(letter => {
    wordList.innerHTML += `<span class="hidden">${letter}</span>`
  })

}




function checkLetter(e) {
  const val = e.key
  let letters = /^[A-Za-z]$/;
  if (letters.test(val)) {
    findWord(val)
  } else {
    alert("It's not a letter!")
  }
}

function findWord(val) {
  const hid = document.querySelectorAll('.hidden')
  if (currentWord.indexOf(val) !== -1) {
    hid.forEach(
      el => {
        el.textContent === val ? el.classList.add('show') : ''
      }
    )
  } else {
    if (wrong.length === 0 || wrong.indexOf(val) === -1) {
      counter++
      wrongLetters.innerHTML += `<span class="wrong">${val}, </span>`
      hangItems[counter - 1].style.display = "block"
      wrong.push(val)
    } else {
      alert('juz bylo')
    }
  }
}

function gameOver() {
  const shown = document.querySelectorAll('.show')
  setTimeout(() => {
    if (counter >= 10) {
      alert('you lost')
      death.innerText = `${score1 + 1}`
    } else if (shown.length === currentWord.length) {
      player.innerText = `${score2 + 1}`
      alert('you won')
    }
  }, 250)
}


function countDown() {
  let countDownDate = new Date().getTime() + 300000;

  let counter = setInterval(() => {

    let now = new Date().getTime();
    let distance = countDownDate - now;
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    seconds < 10 ? timer.innerHTML = `0${minutes}:0${seconds}` : timer.innerHTML = `0${minutes}:${seconds}`
    if (distance < 0) {
      clearInterval(counter);
      timer.innerHTML = "EXPIRED";
    }
  }, 1000);

}


newWord()
countDown()

console.log(currentWord)


window.addEventListener('keydown', (e) => checkLetter(e))
window.addEventListener('keydown', gameOver)










































































































