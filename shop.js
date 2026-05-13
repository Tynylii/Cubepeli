const money = document.getElementById("money");
let moneyamount = 0;

function morecubes(amount, cost) {
    if (moneyamount < cost) return;

    moneyamount -= cost;
    money.textContent = moneyamount + "$";
    localStorage.setItem("money", moneyamount);

    for (let i = 0; i < amount; i++) {
        createCube();
    }

    save();

    window.location.href = "index.html";
}


window.onload = function() {
    moneyamount = parseInt(localStorage.getItem("money")) || 0;
    if (money && money.firstElementChild)
        money.firstElementChild.textContent = moneyamount + "$";
};