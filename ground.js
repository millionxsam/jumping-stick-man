import { getProperty, incProperty, setProperty } from "./updateProperty.js";

const speed = .05;

const grounds = document.querySelectorAll('[ground]');

export function setupGround() {
    setProperty(grounds[0], "--left", 0);
    setProperty(grounds[1], "--left", 300);
}

export function updateGround(delta, speedScale) {
    grounds.forEach(ground => {
        incProperty(ground, '--left', delta * speedScale * speed * -1);

        if(getProperty(ground, '--left') <= -300) {
            incProperty(ground, '--left', 600);
        }
    })
}