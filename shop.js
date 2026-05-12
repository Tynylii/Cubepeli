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