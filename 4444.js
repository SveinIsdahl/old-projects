function test() {
    let tall = document.getElementById("input").value;

    /*    if (4 + 4 == tall) {
            console.log("4+4=" + tall);
        }
        else if (4 - 4 == tall) {
            console.log("4-4=" + tall);
        }
        else if (4 * 4 == tall) {
            console.log("4*4=" + tall);
        }
        else if (4 / 4 == tall) {
            console.log("4/4=" + tall);
        }
        else {
            console.log(tall + " er umulig å proudsere med +-"*""/"");
        }
    */
    function pluss(a, b) {
        return a + b;
    }
    function minus(a, b) {
        return a - b;
    }
    function gange(a, b) {
        return a * b;
    }
    function dele(a, b) {
        return a / b;
    }
    let varPluss = pluss(4, 4);
    let varMinus = minus(4, 4);
    let varGange = gange(4, 4);
    let varDele = dele(4, 4);
    if (varPluss == tall){
        let output = "4 + 4" + " = " + tall; 
        document.getElementById("output").innerHTML = output;
    }
    else if (varMinus == tall) {
        let output = "4 - 4" + " = " + tall;
        document.getElementById("output").innerHTML = output;
    }
    else if (varGange == tall) {
        let output = "4 * 4" + " = " + tall;
        document.getElementById("output").innerHTML = output;
    }
    else if (varDele == tall) {
        let output = "4 / 4" + " = " + tall;
        document.getElementById("output").innerHTML = output;
    }
    else {
        document.getElementById("output").innerHTML = tall + " er umulig å få med +-*/";
    }


}


