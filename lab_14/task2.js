function runTask2() {
    console.clear();
    let arr = [2, 3, 4, 5];

    let productFor = 1;
    for (let i = 0; i < arr.length; i++) {
        productFor *= arr[i];
    }
    console.log(productFor);

    let productWhile = 1;
    let j = 0;
    while (j < arr.length) {
        productWhile *= arr[j];
        j++;
    }
    console.log(productWhile);
}