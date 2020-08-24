
var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClass = null;
var secondCardClass = null;
var maxMatches = 9
var matches = 0
var attempts = 0
var gamesPlayed = 0
var gameTimer = 0
var gameCards = document.getElementById('gameCards')
var cardClickSound = new Audio("assets/sounds/nsmb_fireball.wav")
var matchedPairSound = new Audio("assets/sounds/nsmb_coin.wav")
var noMatchSound = new Audio("assets/sounds/nsmb_jump.wav")
var gameWinSound = new Audio("assets/sounds/nsmb_course_clear-bonus.wav")
var gameOverSound = new Audio("assets/sounds/smb_gameover.wav")

onload = startGame



var resetGameButton = document.getElementById('resetGame')
resetGameButton.addEventListener('click', resetGame)

var gameOverResetGameButton = document.getElementById('resetGame-go')
gameOverResetGameButton.addEventListener('click', resetGame)

var gameCards = document.getElementById('gameCards')
gameCards.addEventListener('click', handleClick)



function handleClick(event) {
    cardClickSound.loop = false;
    cardClickSound.play()
    if(event.target.className.indexOf('back-card') === -1) {
        return;
     } else {
          event.target.classList.add('hidden');
    }
    
    if (firstCardClicked === null) {
        firstCardClicked = event.target
        firstCardClass = firstCardClicked.previousElementSibling.className
    } else {
        secondCardClicked = event.target
        secondCardClass = secondCardClicked.previousElementSibling.className
        gameCards.removeEventListener('click', handleClick)
        attempts+=1
        if (firstCardClass === secondCardClass) {
            gameCards.addEventListener('click', handleClick)
            firstCardClicked = null;
            secondCardClicked = null;
            matches += 1
            matchedPairSound.loop = false;
            matchedPairSound.play()
            
            if (matches === maxMatches) {
                var win = document.querySelector('.modal-container')
                win.classList.remove('hidden')
                gameWinSound.loop = false;
                gameWinSound.play()
            }
        } else {
            setTimeout(function () {
                firstCardClicked.classList.remove('hidden')
                secondCardClicked.classList.remove('hidden')
                gameCards.addEventListener('click', handleClick)
                firstCardClicked = null;
                secondCardClicked = null;
                noMatchSound.loop = false;
                noMatchSound.play()
               }, 1500)   
        }
        displayStats()
    }
}

function displayStats() {
    var userGamesPlayed = document.getElementById('games-played')
    userGamesPlayed.textContent = gamesPlayed
    var gameAttempts = document.getElementById('attempts')
    gameAttempts.textContent = attempts
    var gameAccuracy = document.getElementById('accuracy')
    gameAccuracy.textContent = calculateAccuracy(attempts, matches)
}

function calculateAccuracy(attempts, matches) {
    if (attempts === 0) {
        return "0%"
    } else {
        var percentage = Math.trunc((matches / attempts) * 100)
        return percentage + "%"
    }
}

function resetGame() {
    cardClickSound.loop = false;
    cardClickSound.play()
    matches = 0
    attempts = 0
    gamesPlayed += 1
    displayStats()
    resetCards()
    var resetGame = document.querySelector('.modal-container')
    var gameOverReset = document.querySelector('.modal-container-go')
    resetGame.classList.add('hidden')
    gameOverReset.classList.add('hidden')
    gameCards.innerHTML = ''
    startGame()
}

function resetCards() {
    var hiddenCards = document.querySelectorAll('.back-card')
    for (var i = 0; i < hiddenCards.length; i++) {
        hiddenCards[i].classList.remove('hidden')
    }
}

function startGame() {
    shuffleCards(gameCardPics)
    for (var i = 0; i < 18; i++) {
        var cardContainer = document.createElement('div')
        cardContainer.classList.add("col-2", "card")
        var cardFrontDiv = document.createElement('div')
        cardFrontDiv.classList.add("front-card", gameCardPics[i])
        var cardBackDiv = document.createElement('div')
        cardBackDiv.classList.add("back-card")
        cardContainer.append(cardFrontDiv, cardBackDiv)
        gameCards.append(cardContainer) 
    }
}

var gameCardPics = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
]

function shuffleCards(arr) {
    var currentIndex = arr.length-1, tempVal, randInd
    while (0 !== currentIndex) {
        randInd = Math.floor(Math.random() * currentIndex)
        tempVal = arr[currentIndex]
        arr[currentIndex] = arr[randInd]
        arr[randInd] = tempVal
        currentIndex -= 1
    }
}

function loseGameModal() {
    var lostGame = document.querySelector('.modal-container-go')
    lostGame.classList.remove('hidden')
    gameOverSound.loop = false;
    gameOverSound.play()
    gameTimer = 0
    clearInterval(gameOver)
    }

var gameOver = setInterval(loseGame, 1000)

function loseGame() {
    gameTimer++
    if (gameTimer > 180) {
        loseGameModal()
    } else if ((attempts - matches) === 10) {
        loseGameModal()
    }
}


// if ((attempts - matches) === 10 || gameTimer > 5) {






