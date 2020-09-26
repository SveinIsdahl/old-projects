// @ts-check
function setup() {


    function getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday

        var weekNo = Math.ceil((((d - Number(yearStart)) / 86400000) + 1) / 7);
        // Return array of year and week number
        return weekNo;
    }

    //Array av ukene som er igjen av året, inneholder div-elementer
    let ukeArray = [];
    // Array som inneholder ukene som er igjen av året, som igjen inneholder array for hver uke som inneholder 7 uke-div-elementer
    let dagUkeArray = [];

    //Antall dager fra nåværende dato
    let dateAccumulator = 0;

    window.onload = function createCalendar() {
        let date = new Date();
        let kalender = document.getElementById("kalender")

        //1-52
        let ukenr = getWeekNumber(new Date());

        //1-7
        let ukedag = date.getDay();

        //1-31
        let dag = date.getDate();

        //0-11
        let month = date.getMonth();

        dateAccumulator -= ukedag - 1;
        for (let i = ukenr; i < 53; i++) {
            let ukeDiv = ukeArray[i]

            ukeDiv = document.createElement("div");
            kalender.append(ukeDiv);
            ukeDiv.className = "uke";

            dagUkeArray[i] = [];

            for (let j = 1; j <= 7; j++) {
                let dagDiv = dagUkeArray[i][j];

                let tempDate = new Date();
                tempDate.setDate(new Date().getDate() + dateAccumulator);

                dagDiv = document.createElement("div");
                ukeDiv.append(dagDiv);
                dagDiv.innerHTML = tempDate.getDate() + "." + tempDate.getMonth();
                dagDiv.className = "dag";

                if (dateAccumulator === 0) {
                    dagDiv.style.background = "lightblue"
                }

                dateAccumulator++

            }
        }
    }
}