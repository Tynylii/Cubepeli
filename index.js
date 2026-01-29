const cube = document.getElementById('cube');
const money = document.getElementById("money");
let moneyamount = 0;
let isHolding = false;

let posX = (window.innerWidth / 2) - 25;
let posY = (window.innerHeight / 2) - 25;
let velocityY = 0;
let velocityX = 0;

const gravity = 0.8;
const bounce = -0.6;
const friction = 0.98;
const hitThreshold = 2;

const list = [
  "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black",
  "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse",
  "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue",
  "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki",
  "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSeaGreen",
  "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet",
  "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite",
  "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey",
  "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki",
  "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral",
  "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink",
  "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey",
  "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon",
  "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen",
  "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed",
  "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace",
  "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen",
  "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum",
  "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown",
  "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue",
  "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle",
  "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"
];

let selection;

function getrandomcolor() {
    const randomindex = Math.floor(Math.random() * list.length);
    selection = list[randomindex];
}

function addMoney() {
    moneyamount++;
    money.textContent = moneyamount + "$";
    localStorage.setItem("money", moneyamount);
}

function physicsLoop() {
    if (!isHolding) {
        velocityY += gravity;
        posY += velocityY;
        posX += velocityX;
        velocityX *= friction;

        const floor = window.innerHeight - 50;
        const wall = window.innerWidth - 50;

        if (posY > floor) {
            posY = floor;
            if (Math.abs(velocityY) > hitThreshold) {
                addMoney();
                getrandomcolor();
                document.body.style.backgroundColor = selection;
            }
            velocityY *= bounce;
            if (Math.abs(velocityY) < 1) velocityY = 0;
        } else if (posY < 0) {
            posY = 0;
            if (Math.abs(velocityY) > hitThreshold) {
                addMoney();
                getrandomcolor();
                document.body.style.backgroundColor = selection;
            }
            velocityY *= bounce;
        }

        if (posX > wall) {
            posX = wall;
            if (Math.abs(velocityX) > hitThreshold) {
                addMoney();
                getrandomcolor();
                document.body.style.backgroundColor = selection;
            }
            velocityX *= bounce;
        } else if (posX < 0) {
            posX = 0;
            if (Math.abs(velocityX) > hitThreshold) {
                addMoney();
                getrandomcolor();
                document.body.style.backgroundColor = selection;
            }
            velocityX *= bounce;
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

function load() {
  moneyamount = parseInt(localStorage.getItem("money")) || 0;
}

function reloadmoney() {
  money.textContent = moneyamount + "$";
}

window.onload = function() {
  load();
  reloadmoney();
};

window.onbeforeunload = function() {
  localStorage.setItem("money", moneyamount);
};

cube.addEventListener('touchstart', (e) => {
    isHolding = true;
    e.preventDefault(); 
}, { passive: false });

cube.addEventListener('touchend', () => {
    isHolding = false;
});

window.addEventListener('touchmove', (e) => {
    if (isHolding) {
        const floor = window.innerHeight - 50;
        const wall = window.innerWidth - 50;

        const touch = e.touches[0];
        
        let newX = Math.max(0, Math.min(touch.clientX - 25, wall));
        let newY = Math.max(0, Math.min(touch.clientY - 25, floor));

        velocityX = newX - posX;
        velocityY = newY - posY;

        posX = newX;
        posY = newY;
        
        cube.style.left = posX + 'px';
        cube.style.top = posY + 'px';

        e.preventDefault();
    }
}, { passive: false });