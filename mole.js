const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const holes2 = document.querySelectorAll('.hole-up');

let lastHole;
let timeUp = false;
let score = 0;
let title = document.getElementById("title")
let gameTime = 35; //seconds
let winCon = 100;

let menuAudio = document.getElementById("bg-audio");
let gameAudio = document.getElementById("game-audio");
let winnerSound = document.getElementById("winner-sound");
let winVideo = document.getElementById('winner-vid')
let loserVideo = document.getElementById('loser-vid')
loserVideo.hidden = true;
winVideo.hidden = true;
gameAudio.setCurrentTime = 0;
menuAudio.setCurrentTime = 0;
menuAudio.volume = 0.25;

let bonk = document.getElementById("bonk");
//create a function to make a random time for mole to pop from the hole
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    //prevent same hole from getting the same number
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    if (score >= winCon) gameTime = 0;
    let time = randomTime(500, 1000)
    if (score > 40) {
        time = randomTime(500, 700); //get a random time to determine how long mole should peep
    } else if (score > 60) {
        time = randomTime(500)
    } else if (score > 80) {
        time = randomTime(200);
    }

    const hole = randomHole(holes); //get the random hole from the randomHole function
    hole.classList.add('up'); //add the CSS class so selected mole can "pop up"
    setTimeout(() => {
        hole.classList.remove('up'); //make the selected mole "pop down" after a random time
        if (!timeUp) {
            peep();
        }
    }, time);

}


function startGame() {
    title.innerText = "Get 100 Points to Win!"
    menuAudio.pause();
    menuAudio.setCurrentTime = 0;
    gameAudio.volume = .25;
    gameAudio.play();
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    loserVideo.pause();
    setTimeout(() => {
        peep(); //initial peep
        gameTimer();
    }, 13000)
}

function endGame() {
    timeUp = true;
    gameTime = 0;
    if (score >= winCon) {
        title.innerText = "You Win!"
        gameAudio.pause();
        winnerSound.play();
        winnerSound.volume = .4;
        return;
    }
    if (score < winCon) {
        title.innerText = "You Lose!"
        gameAudio.pause();
        loserVideo.hidden = false;
        loserVideo.play();
        loserVideo.volume = .4
        return;
    }
}

function gameTimer() {
    if (gameTime > 0) {
        setTimeout(() => {
            gameTime--;
            gameTimer();
        }, 1000); //show random moles for 25 seconds
    } else {
        endGame();
    }
}

function wack(e) {
    if (!e.isTrusted) return; //** new thing I learned */
    bonk.play();
    score++;
    this.parentNode.classList.remove('up'); //this refers to item clicked
    scoreBoard.textContent = score;
    if (score === 30) {
        gameAudio.pause();
        winVideo.hidden = false;
        winVideo.play();
        winVideo.volume = .4;
        setTimeout(() => {
            gameAudio.play();
            winVideo.hidden = true;
        }, 6000);
    }
    if (score === 40) {
        gameTime += 15;
    }
    if (score === 60) {
        gameTime += 10;
    }
    if (score === 80) {
        gameTime += 10;
    }
    // if (score === 60) {
    //     gameAudio.pause();
    //     winVideo.hidden = false;
    //     winVideo.play();
    //     winVideo.volume = .4;
    //     setTimeout(() => {
    //         gameAudio.play();
    //         winVideo.hidden = true;
    //     }, 6000);
    // }
    if (score >= winCon) endGame();
}

moles.forEach(mole => mole.addEventListener('click', wack))
holes2.forEach(mole => mole.addEventListener('click', wack))


// function startGame() {
//     audio.pause();
//     audio.setCurrentTime = 0;
//     gameAudio.volume = .25;
//     gameAudio.play();
//     scoreBoard.textContent = 0;
//     timeUp = false;
//     score = 0;
//     loserVideo.pause();
//     endGame();
// }

// function endGame() {
    //     setTimeout(() => {
        //         peep();
        //         setTimeout(() => {
            //             if (score >= 40) {
                //                 title.innerText = "You Win!"
                //                 gameAudio.pause();
                //                 winnerSound.play();
                //                 winnerSound.volume = .4;
                //                 return;
                //             }
                //             if (score < 40) {
                    //                 title.innerText = "You Lose!"
                    //                 gameAudio.pause();
//                 loserVideo.hidden = false;
//                 loserVideo.play();
//                 loserVideo.volume = .4
//                 return;
//             }
//             timeUp = true;
//         }, 35000); //show random moles for 25 seconds

//     }, 12000)
// }
