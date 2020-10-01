//@ts-check
/**
 * @param {any} x
 */
function l(x) {
    console.log(x)
}
window.onload = () => {
    let array = ["a", "a", "b", "c", "d", "e", "f", "g"];
    l(array)
        //Legger til i array, returnerer lengde
    array.push("h");
    array.shift();

    // Finner index av elementer som === h
    array.indexOf("h");



    //Endrer ikke array
    //return verdier fra om med start og slutt, 
    //altå 2, og 3 her
    l("\n slice(2, 4): \n" + array.slice(2, 4))

    // uten slutt return alle verdier fra og med start til og  slutt
    l("\n slice(3): \n" + array.slice(3))

    l(" \n toString(): \n" + array.toString());

    l(" \n filter n === 'a' ")
    l(array.filter((n) => {
        return n === "a"
    }))

    l(" \n filter n > 3 på [1, 2, 3, 4, 5]")
    l([1, 2, 3, 4, 5].filter((n) => {
        return n > 3
    }))


    l("\n join(' --- ')  \n" + array.join(" --- "));

    l("splice endrer eksisterende array");
    l(array)
    l(array.splice(array.length - 2))
    l(array)

    /*
    note: The map() and forEach() functions seem like they are the same, 
    but they are in fact different. 
    The difference is that forEach() iterates over an array and applies some operation with side effects to each array member such as saving each one to the database, 
    or some other side effect. 
    map() on the other hand iterates over an array, 
    updates each member of that array, 
    and returns another array of the same size with the transformed members (such as converting an array of strings to all lowercase).


    */
}