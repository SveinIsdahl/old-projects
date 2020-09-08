class Kort {
    constructor(verdi) {
        //1-13
        this.verdi = verdi;
        // Ruter, hjerter, klover, spar
        this.sort = "";
        //Typer: toppRad, kortstokk, bord
        //this.bunkeType = "";
    }

}

function stokk(array) {
    var m = array.length,
        temp, i;

    // Så lenge det finnes elementer å sortere (m)
    while (m) {
        // Plukk random tall
        i = Math.floor(Math.random() * m--);

        // og bytt med siste element
        temp = array[m];
        array[m] = array[i];
        array[i] = temp;
    }

    return array;
}

//Hver gang et trekk blir gjort, oppdater verdier
let bordid = ["bord1", "bord2", "bord3", "bord4", "bord5", "bord6", "bord7"];





function setup() {


    //Funk for å vise antall kort i bunke og øverste kort i bunke
    function step() {
        kortstokk1.innerHTML = String(kortstokk.length) + " kort";
        for (let i = 0; i < 7; i++) {
            let currentBord = document.getElementById(bordid[i]);

            //Viser antall kort i bunke
            currentBord.innerHTML = String(bord[i].length) + " kort";

            //Viser øverste kort
            currentBord.innerHTML += "<br><br>" + bord[i][0].sort + " " + bord[i][0].verdi;
        }

    }

    // Rad på toppen hvor alle kortene skal ligge til slutt
    let kortstokk1 = document.getElementById("kortstokk1");
    let toppRad1 = [];
    let toppRad2 = [];
    let toppRad3 = [];
    let toppRad4 = [];

    //Kort på bordet
    let bord = [
        [],
        [],
        [],
        [],
        [],
        [],
        []
    ]

    // topp av stokken er pivot = 0
    let kortstokk = [];

    // Loop for å lage alle kort
    for (let j = 0; j < 4; j++) {
        for (let i = 1; i <= 13; i++) {
            let nyttKort = new Kort(i);
            switch (j) {
                case 0:
                    nyttKort.sort = "klover"
                    break;
                case 1:
                    nyttKort.sort = "hjerter"
                    break;
                case 2:
                    nyttKort.sort = "ruter"
                    break;
                case 3:
                    nyttKort.sort = "spar"
                    break;
                default:
                    break;
            }
            kortstokk.push(nyttKort);
        }
    }

    //Stokker kortstokken
    kortstokk = stokk(kortstokk);


    // Deler ut kortene på bordet
    for (let i = 6; i >= 0; i--) {
        for (let j = 0; j < i + 1; j++) {
            bord[i][j] = kortstokk.pop();

        }
    }

    step();
}