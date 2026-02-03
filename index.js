const money = document.getElementById("money");
let moneyamount = 0;

const gravity = 0.8;
const bounce = -0.6;
const friction = 0.98;
const hitThreshold = 2;

const cubes = [];

const list = [
  "AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black",
  "BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse",
  "Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue",
  "DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki",
  "DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSeaGreen",
  "DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet",
  "DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite",
  "ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey",
  "Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki",
  "Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral",
  "LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink",
  "LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey",
  "LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon",
  "MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen",
  "MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed",
  "MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace",
  "Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen",
  "PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum",
  "PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown",
  "SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue",
  "SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle",
  "Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"
];

const sound1 = new Audio('audio/bouncesound1.mp3');

function playSound() {
    sound1.play();
}

function getrandomcolor() {
    return list[Math.floor(Math.random() * list.length)];
}

function addMoney() {
    moneyamount++;
    money.textContent = moneyamount + "$";
    localStorage.setItem("money", moneyamount);
    playSound();
}

function createCube() {
    const el = document.createElement("div");
    el.className = "cube";
    document.body.appendChild(el);

    const cube = {
        el: el,
        posX: (window.innerWidth / 2) - 25,
        posY: (window.innerHeight / 2) - 25,
        velX: 0,
        velY: 0,
        isHolding: false
    };

    el.addEventListener("mousedown", () => {
        cube.isHolding = true;
        el.style.cursor = "grabbing";
    });

    window.addEventListener("mouseup", () => {
        cube.isHolding = false;
        el.style.cursor = "grab";
    });

    window.addEventListener("mousemove", (e) => {
        if (cube.isHolding) {
            const wall = window.innerWidth - 50;
            const floor = window.innerHeight - 50;

            let newX = Math.max(0, Math.min(e.clientX - 25, wall));
            let newY = Math.max(0, Math.min(e.clientY - 25, floor));

            cube.velX = newX - cube.posX;
            cube.velY = newY - cube.posY;

            cube.posX = newX;
            cube.posY = newY;

            cube.el.style.left = cube.posX + "px";
            cube.el.style.top = cube.posY + "px";
        }
    });

    el.addEventListener("touchstart", (e) => {
        cube.isHolding = true;
        e.preventDefault();
    }, { passive: false });

    el.addEventListener("touchend", () => {
        cube.isHolding = false;
    });

    window.addEventListener("touchmove", (e) => {
        if (cube.isHolding) {
            const touch = e.touches[0];
            const wall = window.innerWidth - 50;
            const floor = window.innerHeight - 50;

            let newX = Math.max(0, Math.min(touch.clientX - 25, wall));
            let newY = Math.max(0, Math.min(touch.clientY - 25, floor));

            cube.velX = newX - cube.posX;
            cube.velY = newY - cube.posY;

            cube.posX = newX;
            cube.posY = newY;

            cube.el.style.left = cube.posX + "px";
            cube.el.style.top = cube.posY + "px";

            e.preventDefault();
        }
    }, { passive: false });

    cubes.push(cube);
}

function physicsLoop() {
    const floor = window.innerHeight - 50;
    const wall = window.innerWidth - 50;

    cubes.forEach(cube => {
        if (!cube.isHolding) {
            cube.velY += gravity;
            cube.posY += cube.velY;
            cube.posX += cube.velX;
            cube.velX *= friction;

            // LATTIA
            if (cube.posY > floor) {
                cube.posY = floor;
                if (Math.abs(cube.velY) > hitThreshold) {
                    addMoney();
                    document.body.style.backgroundColor = getrandomcolor();
                }
                cube.velY *= bounce;
            }

            // KATTO
            if (cube.posY < 0) {
                cube.posY = 0;
                if (Math.abs(cube.velY) > hitThreshold) {
                    addMoney();
                    document.body.style.backgroundColor = getrandomcolor();
                }
                cube.velY *= bounce;
            }

            // OIKEA REUNA
            if (cube.posX > wall) {
                cube.posX = wall;
                if (Math.abs(cube.velX) > hitThreshold) {
                    addMoney();
                    document.body.style.backgroundColor = getrandomcolor();
                }
                cube.velX *= bounce;
            }

            // VASEN REUNA
            if (cube.posX < 0) {
                cube.posX = 0;
                if (Math.abs(cube.velX) > hitThreshold) {
                    addMoney();
                    document.body.style.backgroundColor = getrandomcolor();
                }
                cube.velX *= bounce;
            }

            cube.el.style.left = cube.posX + "px";
            cube.el.style.top = cube.posY + "px";
        }
    });

    requestAnimationFrame(physicsLoop);
}

function morecubes(amount, cost) {
    if (moneyamount < cost) return;

    moneyamount -= cost;
    money.textContent = moneyamount + "$";
    localStorage.setItem("money", moneyamount);

    for (let i = 0; i < amount; i++) {
        createCube();
    }
}

function reloadmoney() {
  money.textContent = moneyamount + "$";
}

window.onload = function() {
  load();
  reloadmoney();
  createCube();
  physicsLoop();
};

function load() {
    moneyamount = parseInt(localStorage.getItem("money")) || 0;
    
    const savedCubeCount = parseInt(localStorage.getItem("cubeCount")) || 1;
    
    for (let i = 0; i < savedCubeCount - 1; i++) {
        createCube();
    }
}

window.onbeforeunload = function() {
    localStorage.setItem("money", moneyamount);
    localStorage.setItem("cubeCount", cubes.length);
};
