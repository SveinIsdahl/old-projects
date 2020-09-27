// @ts-check
let database;
let ref;
let retrievedDataArray = [];
let stagedDataArray = [];
let keys;
//Antall dager fra nåværende dato
let dateAccumulator = 0;


function setup() {
    // irebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyD_6EPzd56KtaDCm9k1Od-MorOcuxwMlMI",
        authDomain: "calendar-9d4d6.firebaseapp.com",
        databaseURL: "https://calendar-9d4d6.firebaseio.com",
        projectId: "calendar-9d4d6",
        storageBucket: "calendar-9d4d6.appspot.com",
        messagingSenderId: "103816515999",
        appId: "1:103816515999:web:07a5093add3e224a14adaa"
    };
    // Initialize Firebase
    // @ts-ignore
    firebase.initializeApp(firebaseConfig);
    // @ts-ignore
    database = firebase.database();
    ref = database.ref("calendar");

    //On event value, 
    ref.on('value', gotData, (e) => { console.log("error " + e) })

    /**
     * 
     * @param {object} returnedData
     */
    function gotData(returnedData) {
        retrievedDataArray = [];
        let data = returnedData.val();
        keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let k = keys[i];
            retrievedDataArray.push(data[k]);
        }
        createCalendar();
        dateAccumulator = 0;
    }

    /**
     * @param {Date} d
     */
    function getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday
        //@ts-ignore
        var weekNo = Math.ceil((((d - Number(yearStart)) / 86400000) + 1) / 7);
        // Return array of year and week number
        return weekNo;
    }



    function createCalendar() {
        // Array som inneholder ukene som er igjen av året, som igjen inneholder array for hver uke som inneholder 7 uke-div-elementer

        let dagUkeArray = [];

        let date = new Date();
        let kalender = document.getElementById("kalender");
        kalender.innerHTML = "";
        //1-52
        let ukenr = getWeekNumber(date);

        //1-7
        let ukedag = date.getDay();

        dateAccumulator -= ukedag - 1;
        for (let i = (ukenr - 1); i < 53; i++) {
            let ukeDiv;
            ukeDiv = document.createElement("div");
            kalender.append(ukeDiv);
            ukeDiv.className = "uke";

            dagUkeArray[i] = [];
            for (let j = 1; j <= 7; j++) {
                let dagDiv = dagUkeArray[i][j];

                let tempDate = new Date();
                tempDate.setDate(new Date().getDate() + dateAccumulator - 7);

                let tempDateString = tempDate.getDate() + "." + (tempDate.getMonth() + 1);

                dagDiv = document.createElement("textarea");
                ukeDiv.append(dagDiv);
                dagDiv.className = "dag";
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