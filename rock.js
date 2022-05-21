import { setProperty, getProperty, incProperty } from "./updateProperty.js";

const speed = .05;
const rockIntMin = 3000;
const RockIntMax = 5000;
const world = document.querySelector('[world]');

let nextRockTime;
export function setupRock() {
    nextRockTime = rockIntMin;

    document.querySelectorAll("[data-rock]").forEach(rock => {
        rock.remove()
    })
}

export function updateRock(delta, speedScale) {
    document.querySelectorAll('[data-rock]').forEach(rock => {
        incProperty(rock, '--left', delta * speedScale * speed * -1);

        if(getProperty(rock, '--left') <= -100) {
            rock.remove();
        }
    })
    if(nextRockTime <= 0) {
        createRock();
        nextRockTime = randomNumberBetween(rockIntMin, RockIntMax) / speedScale;
    }
    nextRockTime -= delta;
}

export function getRockRects() {
    return [...document.querySelectorAll('[data-rock]')].map(rock => {
        return rock.getBoundingClientRect();
    })
}

function createRock() {
    const rock = document.createElement('img');
    rock.dataset.rock = true;
    rock.src = './assets/rock.png';
    rock.classList.add('rock');
    setProperty(rock, '--left', 100);
    world.append(rock);
}

function randomNumberBetween(one, two) {
    return Math.floor(Math.random() * (one - two + 1) + one);
}