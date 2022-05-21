import { setupGround, updateGround } from "./ground.js";
import { updateChar, setupChar, getCharRect, character } from "./character.js";
import { updateRock, setupRock, getRockRects } from "./rock.js";

const world = document.querySelector('[world]');
const worldWidth = 100;
const worldHeight = 30;
const speedScaleInc = 0.00001;
const scoreEle = document.querySelector('[score]');
const highScoreEle = document.querySelector('[high-score]');
const startText = document.querySelector('[start]');
const startColors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'purpleviolet'];
const gameOverBoard = document.querySelector('.gameOver');
const gameOverText = document.querySelector('.gameOver h1');
const retry = document.querySelector('.gameOver button');
const discord = document.querySelector('.info .fa-discord');
const notifier = document.querySelector('.notifier');

discord.addEventListener('click', () => {
    navigator.clipboard.writeText('millionxsam#4967');
    notifier.classList.add('active');
    notifier.textContent = 'Discord username copied'

    setTimeout(() => {
        notifier.classList.remove('active');
        notifier.textContent = '';
    }, 2000)
})

gameOverBoard.style.display = 'none';

setInterval(() => {
    let randomColor = startColors[Math.floor(Math.random() * startColors.length)];
    let currentColor = startText.style.color || 'black';

    if(currentColor === randomColor) randomColor = startColors[Math.floor(Math.random() * startColors.length)];
    startText.style.color = randomColor;
    gameOverText.style.color = randomColor;
}, 750);

setWorldScale();
window.addEventListener('resize', setWorldScale);
document.addEventListener('keydown', handleStart, { once: true });
world.addEventListener('click', handleStart, { once: true });


let lastTime;
let speedScale;
let score;
let highScore = localStorage.getItem('high-score') || null;

highScoreEle.innerHTML = `<strong>Highest Score: </strong>${Math.floor(highScore)}`

function update(time) {
    
    if(lastTime == null) {
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    
    const delta = time - lastTime;
    updateGround(delta, speedScale);
    updateChar(delta, speedScale);
    updateRock(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);

    if(checkDead()) return handleLose();
    
    lastTime = time;
    window.requestAnimationFrame(update);
}

function handleLose() {
    world.style.display = 'none';
    gameOverBoard.style.display = 'flex';
}

retry.addEventListener('click', () => {
    gameOverBoard.style.display = 'none';
    world.style.display = 'initial';

    handleStart();
});

function checkDead() {
    const charRect = getCharRect();
    return getRockRects().some(rect => isCollision(rect, charRect));
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right -2 > rect2.left &&
        rect1.bottom > rect2.top
      );
}

function updateScore(delta) {
    score += delta * .01;
    scoreEle.innerHTML = `<strong>Current Score: </strong>${Math.floor(score)}`;

    if(score >= (highScore || 0)) {
        localStorage.setItem('high-score', score);
        highScore = localStorage.getItem('high-score') || null;
        highScoreEle.innerHTML = `<strong>Highest Score: </strong>${Math.floor(highScore)}`
    }
}

function updateSpeedScale(delta) {
    speedScale += delta * speedScaleInc;
}

function handleStart() {
    score = 0;
    lastTime = null;
    setupGround();
    setupChar();
    setupRock();
    speedScale = 1;
    startText.textContent = 'Use Space To Jump';
    window.requestAnimationFrame(update);

    setTimeout(() => {
        startText.classList.add('hide');
    }, 5000)
}

function setWorldScale() {
    let worldToPixel;
    if(window.innerWidth / window.innerHeight < worldWidth / worldHeight) {
        worldToPixel = window.innerWidth / worldWidth;
    } else {
        worldToPixel = window.innerHeight / worldHeight;
    }

    world.style.width = `${(worldWidth * worldToPixel) - 95}px`
    world.style.height = `${(worldHeight * worldToPixel)}px`
    
    gameOverBoard.style.width = `${(worldWidth * worldToPixel) - 95}px`
    gameOverBoard.style.height = `${(worldHeight * worldToPixel)}px`
}