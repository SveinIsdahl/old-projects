//@ts-check
const size = 10;
let matrix = [];
let divMatrix = [];

window.onload = () => {
    let boardDiv = document.getElementById("board");
    for (let i = 0; i < size; i++) {
        boardDiv.style.gridTemplateColumns += " 1fr";
    }

    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        divMatrix[i] = [];
        for (let j = 0; j < size; j++) {
            matrix[i][j] = 0;
            divMatrix[i][j] = document.createElement("div");
            boardDiv.appendChild(divMatrix[i][j]);
            divMatrix[i][j].className = "square";
            divMatrix[i][j].style.backgroundColor = "white";

        }
    }
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            divMatrix[i][j].addEventListener("click", () => {
                if (matrix[i][j] === 0) {
                    divMatrix[i][j].style.background = "black";
                    matrix[i][j] = 1;
                }
                else {
                    divMatrix[i][j].style.background = "white";
                    matrix[i][j] = 0;
                }
                console.log(matrix)
            });

        }
    }




}
function step() {
    let newMatrix = matrix;
    for (let i = 1; i < size - 1; i++) {
        for (let j = 1; j < size - 1; j++) {
            
            let sum = neighbours([i, j]);;
            let state = matrix[i][j];

            if (state === 0 && sum === 3) {
                newMatrix[i][j] = 1;
            } else if (state === 1 && (sum < 2 || sum > 3)) {
                newMatrix[i][j] = 0;
            } else {
                newMatrix[i][j] = matrix[i][j];
            }
        }
    }
    console.log(matrix);

    matrix = newMatrix;

}
function draw() {
    step();

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if ((matrix[i][j] === 0 && divMatrix[i][j].style.backgroundColor === "black")) {
                divMatrix[i][j].style.backgroundColor = "white"
            }
            if ((matrix[i][j] === 1 && divMatrix[i][j].style.backgroundColor === "white")) {
                divMatrix[i][j].style.backgroundColor = "black"
            }
        }
    }

    //setTimeout(() => { requestAnimationFrame(draw) }, 30);
}

/**
 * @param {number} squarePosition
 */
function neighbours(squarePosition) {
    let i = squarePosition[0]
    let j = squarePosition[1]
    let n = {}
    let sum = 0;

  /*
    
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            sum += matrix[y+i][x+j]
        }
        
    }
    sum -= matrix[y][x]
    */


    
    n.topleft = matrix[i - 1][j - 1];
    n.left = matrix[i][j - 1];
    n.bottomleft = matrix[i + 1][j - 1];
    n.bottom = matrix[i + 1][j];
    n.bottomright = matrix[i + 1][j + 1];
    n.right = matrix[i][j + 1];
    n.topright = matrix[i - 1][j + 1];
    n.top = matrix[i - 1][j];
    


    let array = [n.topleft, n.top, n.topright, n.right, n.bottomright, n.bottom, n.bottomleft, n.left]
    array.forEach(k => {
        sum += k;
    });
    
    console.log(n)
    return sum
}