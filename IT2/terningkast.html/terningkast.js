// @ts-check


function setup() {
    let spillDiv = document.getElementById('spill')
    let button = document.getElementById('roll');
    let autoButton = document.getElementById('autoButton')
    let imageArray = [];
    let antallTerninger = 5;
    let distributionArray = [0, 0, 0, 0, 0, 0];

    //Lager alle img-elementer og setter properties
    for (let i = 0; i < antallTerninger; i++) {
        imageArray.push(document.createElement('img'));
        spillDiv.appendChild(imageArray[i]);
        imageArray[i].style.width = "100px";
        imageArray[i].style.height = "100px";
        imageArray[i].src = 1 + ".png";
    }

    function roll() {
        for (let i = 0; i < antallTerninger; i++) {
            imageArray[i].src = rullTerning() + ".png";
        }
    }

    function rullTerning() {
        let number =  Math.trunc(Math.random() * 6 + 1);
        distributionArray[number-1]++;
        return number
        
    }

    function autoRoll() {
        for(let i = 0; i < 1000; i++) {
            roll();
        }
        let average = 0;

        for (let i = 0; i < distributionArray.length; i++) {
            average += distributionArray[i];

        }
        average /= distributionArray.length;

        console.log(distributionArray);
        console.log("Average: " +  average);
        console.log("Standard deviation: ");
    }

    button.addEventListener("click", roll);
    autoButton.addEventListener("click", autoRoll);
}

