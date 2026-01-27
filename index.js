const cube = document.getElementById('cube');
const money = document.getElementById("money")
let moneyamount = 0;
let isHolding = false;

// 1. SPAWNAUS KESKELLE: Lasketaan keskipiste heti alussa
let posX = (window.innerWidth / 2) - 25;
let posY = (window.innerHeight / 2) - 25;
let velocityY = 0;
let velocityX = 0;
const gravity = 0.8;
const bounce = -0.6;
const friction = 0.98;

function physicsLoop() {
    if (!isHolding) {
        velocityY += gravity;
        posY += velocityY;
        posX += velocityX;
        velocityX *= friction;

        const floor = window.innerHeight - 50;
        const wall = window.innerWidth - 50;

        // Pystysuunnan rajat (Lattia ja Katto)
        if (posY > floor) {
            posY = floor;
            velocityY *= bounce;
            moneyamount++
            money.textContent = moneyamount + "$"
            if (Math.abs(velocityY) < 1) velocityY = 0;
        } else if (posY < 0) {
            posY = 0;
            velocityY *= bounce;
              moneyamount++
            money.textContent = moneyamount + "$"
        }

        // Vaakasuunnan rajat (Seinät)
        if (posX > wall) {
            posX = wall;
            velocityX *= bounce;
            moneyamount++
            money.textContent = moneyamount + "$"
        } else if (posX < 0) {
            posX = 0;
            velocityX *= bounce;
            moneyamount++
            money.textContent = moneyamount + "$"
        }

        cube.style.top = posY + 'px';
        cube.style.left = posX + 'px';
    }
    requestAnimationFrame(physicsLoop);
}

physicsLoop();

cube.addEventListener('mousedown', () => {
    isHolding = true;
    cube.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', () => {
    isHolding = false;
    cube.style.cursor = 'grab';
});

window.addEventListener('mousemove', (e) => {
    if (isHolding) {
        const floor = window.innerHeight - 50;
        const wall = window.innerWidth - 50;

        // 2. RAJOITETAAN VETÄMINEN: Estetään hiirtä viemästä kuutiota rajojen yli
        // Käytetään Math.min ja Math.max pitämään arvot välillä 0 - max
        let newX = Math.max(0, Math.min(e.clientX - 25, wall));
        let newY = Math.max(0, Math.min(e.clientY - 25, floor));

        velocityX = newX - posX;
        velocityY = newY - posY;

        posX = newX;
        posY = newY;
        
        cube.style.left = posX + 'px';
        cube.style.top = posY + 'px';
    }
});