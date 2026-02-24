function runTask5() {
    let currentHour = new Date().getHours();

    console.log("--- Реалізація через if..else ---");
    if (currentHour >= 23 || currentHour < 5) {
        console.log("Доброї ночі");
    } else if (currentHour >= 5 && currentHour < 11) {
        console.log("Доброго ранку");
    } else if (currentHour >= 11 && currentHour < 17) {
        console.log("Доброго дня");
    } else if (currentHour >= 17 && currentHour < 23) {
        console.log("Доброго вечора");
    }

    console.log("--- Реалізація через switch ---");
    switch (true) {
        case (currentHour >= 23 || currentHour < 5):
            console.log("Доброї ночі");
            break;
        case (currentHour >= 5 && currentHour < 11):
            console.log("Доброго ранку");
            break;
        case (currentHour >= 11 && currentHour < 17):
            console.log("Доброго дня");
            break;
        case (currentHour >= 17 && currentHour < 23):
            console.log("Доброго вечора");
            break;
        default:
            console.log("Неможливо визначити час");
    }
}