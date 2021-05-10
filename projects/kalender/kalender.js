// @ts-check
let database;
let ref;
let retrievedDataArray = [];
let stagedDataArray = [];
let keys;
//Antall dager fra nåværende dato
let dateAccumulator = 0;

function loadDatabase(id) {
    if(document.getElementById("sign")){
        document.getElementById("sign").remove();
    }
    //email
    ref = database.ref("kalender/" + id);

    //On event value, 
    ref.on('value', gotData, (e) => { console.log("error " + e); })
}
function login(firebase) {
    //@ts-ignore
    firebase.auth().signInWithEmailAndPassword(document.getElementById("email").value, document.getElementById("pwd").value)
        .then((userCredential) => {
            // Signed in
            let user = userCredential.user;

            loadDatabase(user.uid);
        })
        .catch((error) => {
            alert("Feil");

        });
}
function signup(firebase) {
    //@ts-ignore
    firebase.auth().createUserWithEmailAndPassword(document.getElementById("email").value, document.getElementById("pwd").value)
        .then((userCredential) => {
            let user = userCredential.user;
            loadDatabase(user.uid);
        })
        .catch((error) => {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    alert(`Email alerde i bruk`);
                    break;
                case 'auth/invalid-email':
                    alert(`Email ikke korrekt.`);
                    break;
                case 'auth/weak-password':
                    alert('Svakt passord');
                    break;
                default:
                    alert(error.message);
                    break;
            }

        });
}

window.onload = () => {
    // firebase configuration
    let firebaseConfig = {
        apiKey: "AIzaSyD_6EPzd56KtaDCm9k1Od-MorOcuxwMlMI",
        authDomain: "calendar-9d4d6.firebaseapp.com",
        databaseURL: "https://calendar-9d4d6.firebaseio.com",
        projectId: "calendar-9d4d6",
        storageBucket: "calendar-9d4d6.appspot.com",
        messagingSenderId: "103816515999",
        appId: "1:103816515999:web:07a5093add3e224a14adaa"
    };

    let actionCodeSettings = {
        url: 'https://sveinisdahl.github.io/',
        // This must be true.
        handleCodeInApp: true,
        /*
        iOS: {
          bundleId: 'com.example.ios'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
        },
        dynamicLinkDomain: 'example.page.link'
        */
    };


    // Initialize Firebase
    // @ts-ignore
    firebase.initializeApp(firebaseConfig);

    // @ts-ignore
    database = firebase.database();
    //@ts-ignore
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            loadingAnimation(true);
            //@ts-ignore
            loadDatabase(firebase.auth().currentUser.uid);

        } else {
            loadingAnimation(false)
            //sign in/up form
            document.getElementById("sign").innerHTML = `
            <label><b>Email</b></label>
            <input type="text" id="email" required>
            <br>
            <label><b>Passord</b></label>
            <input type="password" id="pwd" required>
    
            <button id="loginbtn">Logg Inn</button> <button id="signupbtn">Opprett Bruker</button>`;
            //@ts-ignore
            document.getElementById("loginbtn").addEventListener("click", () => { login(firebase) });
            //@ts-ignore
            document.getElementById("signupbtn").addEventListener("click", () => { signup(firebase) })
            //
        }
    });
}

/**
     * 
     * @param {object} returnedData
     */
function gotData(returnedData) {
    let data = returnedData.val();

    if (data == null || data == undefined) {
        retrievedDataArray = [{ "test": "test1", "test2": "test3" }];
        createCalendar();
        loadingAnimation(false);

        dateAccumulator = 0;

    }
    else {
        retrievedDataArray = [];
        keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i];
            retrievedDataArray.push(data[k]);
        }
        createCalendar();
        dateAccumulator = 0;
    }

}

/**
 * @param {Date} d
 */
function getWeekNumber(d) {
    // Kopi for å ikke endre
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Sett til nærmeste torsdag: current date + 4 - current day number
    // Søndag = dag nr 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Første dag i året
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Full uke til nærmeste torsdag
    //@ts-ignore
    var weekNo = Math.ceil((((d - Number(yearStart)) / 86400000) + 1) / 7);
    // array med år og ukenr
    return weekNo;
}

function createCalendar() {
    // Array som inneholder ukene som er igjen av året, som igjen inneholder array for hver uke som inneholder 7 uke-div-elementer
    let dagUkeArray = [];

    let date = new Date();
    let kalender = document.getElementById("kalender");
    kalender.innerHTML = "";
    //1-52
    let ukenr = getWeekNumber(date) - 1;

    //1-7
    let ukedag = date.getDay();

    dateAccumulator -= ukedag - 1;
    for (let i = (ukenr - 1); i < 52; i++) {

        let ukeNrDiv = document.createElement("div");
        kalender.append(ukeNrDiv);
        ukeNrDiv.className = "ukeNr";

        ukeNrDiv.innerHTML = "Uke " + ukenr;
        ukenr += 1;

        let ukeDiv;
        ukeDiv = document.createElement("div");
        kalender.append(ukeDiv);
        ukeDiv.className = "uke";

        dagUkeArray[i] = [];
        for (let j = 1; j <= 7; j++) {
            let dagDiv = dagUkeArray[i][j];

            let tempDate  = new Date();
            tempDate.setDate(new Date().getDate() + dateAccumulator - 7);

            let tempDateString = tempDate.getDate() + "." + (tempDate.getMonth() + 1);

            dagDiv = document.createElement("textarea");
            ukeDiv.append(dagDiv);
            dagDiv.className = "dag";
            if(j%7 === 0 || j%6 === 0) {
                dagDiv.style.backgroundColor = "#787070";
                //dagDiv.style.width ="50%"
            }
            dagDiv.style.resize = "none";

            dagDiv.addEventListener("change", () => {
                addToDataStaging(dagDiv, tempDateString);
            })

            for (let k = 0; k < retrievedDataArray.length; k++) {
                dagDiv.value = tempDateString + "\r\n";

                let string = String(retrievedDataArray[k]["text"]);

                //Dersom date i databasen === dagDiv sin dato, legg til tekst i dagDiv
                if (retrievedDataArray[k]["date"] === tempDateString) {
                    if ((retrievedDataArray[k]["text"] == tempDateString) || string.includes(tempDateString) !== true || string.includes(tempDateString + "\n") !== true) {
                        dagDiv.value = tempDateString + "\r\n";

                        break;
                    }
                    dagDiv.value = retrievedDataArray[k]["text"];
                    break;
                }
            }
            if (dateAccumulator === 7) {
                dagDiv.style.background = "#99aaee"
            }
            dateAccumulator++
        }
    }
}
/**
 * @param {HTMLTextAreaElement} textarea
 * @param {string} date
 */
function addToDataStaging(textarea, date) {
    const text = textarea.value;
    const stagingObject = {
        "date": date,
        "text": text
    }
    for (let i = 0; i < stagedDataArray.length; i++) {
        if (stagedDataArray[i][date] === date) {
            stagedDataArray[i] = stagingObject;
        }
    }
    for (let i = 0; i < retrievedDataArray.length; i++) {

        if (retrievedDataArray[i].date === date) {
            retrievedDataArray.splice(i, 1);
            ref.child(keys[i]).remove();

            stagedDataArray.push(stagingObject);
        }
    }
    ref.push(stagingObject);
}

function loadingAnimation(state) {
    /** @type {HTMLElement} */
    const div = document.getElementById("ring");
    if(state) {
        div.className = "lds-ring";
    }
    else {
        div.classList.remove("lds-ring"); 
        void div.offsetWidth;
    }
}