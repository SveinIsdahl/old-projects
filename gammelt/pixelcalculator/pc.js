let tall = [445, 300]

function calculate(array) {
    let sum = 1;
    if (array.length != 2) {
        return "array.length != 2";
    }
    for (let i = 0; i < array.length; i++) {
        if (array[i] >= 1 && array[i] <= 1920) {
            sum *= array[i];
        }
        else {
            return "error";
        }
    }
    return sum;

}


console.log(calculate(tall));
