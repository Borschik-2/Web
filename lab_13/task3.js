function runTask3() {
    let isAdult = prompt("Введіть ваш вік:", "");

    if (Number(isAdult) >= 18) {
        console.log("Ви досягли повнолітнього віку");
    } else {
        console.log("Ви ще надто молоді");
}
}