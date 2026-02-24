function runTask4() {
    let a = Number(prompt("Введіть першу сторону трикутника:", ""));
    let b = Number(prompt("Введіть другу сторону трикутника:", ""));
    let c = Number(prompt("Введіть третю сторону трикутника:", ""));

    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0 || (a + b <= c) || (a + c <= b) || (b + c <= a)) {
        console.log("Incorrect data");
    } else {
        let p = (a + b + c) / 2;
        let area = Math.sqrt(p * (p - a) * (p - b) * (p - c));
        console.log("Площа трикутника: " + area.toFixed(3));

        let isRightTriangle = false;
        if (a * a + b * b === c * c || a * a + c * c === b * b || b * b + c * c === a * a) {
            isRightTriangle = true;
        }
        console.log("Трикутник є прямокутним: " + isRightTriangle);
    }
}