function runTask5() {
    console.clear();

    let shoppingList = [
        { name: "Хліб", amount: 1, isBought: true },
        { name: "Молоко", amount: 2, isBought: false },
        { name: "Яблука", amount: 5, isBought: false }
    ];

    function showList(list) {
        let notBought = list.filter(item => !item.isBought);
        let bought = list.filter(item => item.isBought);
        let sortedList = notBought.concat(bought);

        for (let item of sortedList) {
            let status = item.isBought ? "[✔]" : "[ ]";
            console.log(`${status} ${item.name} - ${item.amount} шт.`);
        }
    }

    function addItem(list, name, amount) {
        let existingItem = list.find(item => item.name === name);
        if (existingItem) {
            existingItem.amount += amount;
        } else {
            list.push({ name: name, amount: amount, isBought: false });
        }
    }

    function buyItem(list, name) {
        let item = list.find(item => item.name === name);
        if (item) {
            item.isBought = true;
        }
    }

    showList(shoppingList);
    addItem(shoppingList, "Молоко", 2);
    addItem(shoppingList, "Сир", 1);
    showList(shoppingList);
    buyItem(shoppingList, "Яблука");
    showList(shoppingList);
}