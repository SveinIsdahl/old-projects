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

// bForsok(antall tilfeller, gunstige tilfeller, sannsynlighet)
function bForsok(n, k, p) {
    return binomialkoeffisient(n, k) * Math.pow(p, k) * Math.pow((1-p), n-k)
}

//       hgForsøk()

/*Vi har en mengde med 
n
 elementer (9 kuler i en boks). 
m
 av disse elementene er av én type (3 av kulene er blå), og 
n
−
m
 av elementene er av en annen type (
9
−
3
=
6
 kuler er røde).

Vi skal trekke 
r
 elementer tilfeldig. (Vi trekker 5 kuler tilfeldig.)

La 
X
 være antall av de uttrukne kuler som skal være blå (vi kunne også gjort motsatt). Vi skal ha 2 blå kuler, som betyr at 
k
=
2
. Vi kan da finne sannsynligheten for at 
X
= 2
 slik
 
 */
function hgForsok(m, k, n, r) {
    return (binomialkoeffisient(m, k) * binomialkoeffisient(n-m, r-k))/binomialkoeffisient(n, r);
}

console.log(fact(5));
console.log(binomialkoeffisient(4, 4));
console.log(bForsok(4, 3, 0.4));
console.log(hgForsok());

//Ide: Lage noe med pascals trekant som visualiserer binomialkoeffisienten