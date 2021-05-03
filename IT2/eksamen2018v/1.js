//@ts-check

const scores = [1,2,3];

/**
 * Sjekker om dette er ny highscore
 * eller lik forrige
 * @param {number} currentScore
 * @returns {string} 
 */
function highScore(currentScore) {
    
    let highestScore = scores[0];
  
    scores.forEach((k, i) => {
        if(k>highestScore) {
            highestScore = k;
        }
    }) 
    scores.push(currentScore);
    
    if(highestScore > currentScore) {
        return "Low"
    }
    else if(highestScore === currentScore) {
        return "Tied with highscore"
    }
    else if(highestScore < currentScore) {
        return "New Highscore!"
    }
    return "Error"
}


function setup() {
    
}

export {setup, highScore}