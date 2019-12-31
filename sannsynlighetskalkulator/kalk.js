function fact(num) {
    let produkt = 1;
    for (let i = 0; i < num; i++) {
        produkt = produkt * (num - i);
    }
    return produkt;
}

// Ueffektiv metode, virker ikke for store tall
// Burde bruke pascals trekant/regel
function binomialkoeffisient(n, k) {
    if (n <= 0 || n < k || k <= 0) {
        return "error"
    }
    else {
        return Math.round(fact(n)/ (fact(k) * fact(n - k))  )
    }

}

function bForsok(n, k, p) {
    return binomialkoeffisient(n, k) * Math.pow(p, k) * Math.pow((1-p), n-k)
}

function hgForsok() {

}

console.log(fact(5));
console.log(binomialkoeffisient(4, 4));
console.log(bForsok(4, 3, 0.4));
console.log(hgForsok())