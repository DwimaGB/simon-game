
const update = document.getElementById('event'),
    body = document.querySelector('body'),
    green = document.querySelector('[data-green]'),
    red = document.querySelector('[data-red]'),
    yellow = document.querySelector('[data-yellow]'),
    blue = document.querySelector('[data-blue]');

const buttons = document.querySelectorAll('.game-btn')

const greenSound = new Audio('sounds/green.mp3'),
    redSound = new Audio('sounds/red.mp3'),
    yellowSound = new Audio('sounds/yellow.mp3'),
    blueSound = new Audio('sounds/blue.mp3'),
    wrong = new Audio('sounds/wrong.mp3');

const game = [
    [green, greenSound],
    [red, redSound],
    [yellow, yellowSound],
    [blue, blueSound]
]

let nextLevel = true;
let running = false;
let level = 1;
let series = [];
// let playerClicked = [];
let playerCurrent = 0;



for (let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener('click', () => {

        if (running) {
            game[i][1].play();
        }

        check(i);

    })
}



window.addEventListener('keydown', () => {
    if (!running) {
        for (let btn of buttons) {
            btn.disabled = false;
        }
        mainGame();
    }

});

window.onclick = function (evt) {
    for(let btn of buttons){
        if(evt.target === btn){
            return;
        }
    }
    if (!running) {
        for (let btn of buttons) {
            btn.disabled = false;
        }
        mainGame();
    }
}


/* ||***********************|| */


function select(color) {
    game[color][0].classList.toggle('choosen');
    // game[color][1].play();
    setTimeout(() => {
        game[color][0].classList.toggle('choosen');
    }, 500)
}

function randomTile() {

    randomNum = Math.floor(Math.random() * 4);

    select(randomNum);

    series.push(randomNum);

}


function check(btn) {

    if (btn !== series[playerCurrent]) {

        reset();
        loseUpdate();
        wrong.play();

        return;
    }

    playerCurrent += 1;

    // if players wins without making any mistakes till the latest sequence
    if (playerCurrent === series.length) {

        level += 1; // nextlevel
        playerCurrent = 0;// ready to check for  next sequence
        displayUpdate();

        // add new sequence
        setTimeout(randomTile, 300);
    }


}

function loseUpdate() {
    body.classList.toggle('wrong');
    setTimeout(() => {
        body.classList.toggle('wrong');
    }, 100)

    for (let btn of buttons) {
        btn.disabled = true;
    }
}

function displayUpdate() {
    update.innerText = `Level ${level}`;

    if (!running) {
        update.innerText = 'Press Any Key to Play Again'
    }
}

function reset() {

    running = false;
    level = 1;
    series = [];
    playerCurrent = 0;
    displayUpdate();
}

const mainGame = function () {

    running = true;
    displayUpdate();
    randomTile();

}

/* ||||||||||||| */


