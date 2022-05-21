import { getProperty, incProperty, setProperty } from "./updateProperty.js";

export const character = document.querySelector('[char]');
const jumpSpeed = .45;
const gravity = .0015;

let isJumping, yVelocity;

export function setupChar() {
    isJumping = false;
    yVelocity = 0;
    setProperty(character, '--bottom', 0);
    document.removeEventListener('keydown', onJump)
    document.addEventListener('keydown', onJump)
}

export function updateChar(delta, speedScale) {
    handleRun(delta, speedScale);
    handleJump(delta);
}

export function getCharRect() {
    return character.getBoundingClientRect();
}

function handleRun(delta, speedScale) { 
    // if(!isJumping) {
    //     if (currentFrameTime > frameTime) {
    //         charFrame = (charFrame + 1) % charFrameCount;
    //         character.src = `./assets/character-${charFrame + 1}.png`;
    //         currentFrameTime -= frameTime;
    //     }
    //     currentFrameTime += delta * speedScale;
    // }
}

function handleJump(delta) {
    if(!isJumping) return;

    incProperty(character, '--bottom', yVelocity * delta);
    
    if(getProperty(character, '--bottom') <= 0) {
        setProperty(character, '--bottom', 0);
        isJumping = false;
    }

    yVelocity -= gravity * delta;
}

function onJump(e) {
    if(e.code !== 'Space' || isJumping) return;

    yVelocity = jumpSpeed;
    isJumping = true;
}