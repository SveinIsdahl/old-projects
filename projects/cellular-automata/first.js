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
            divMatrix[i][j].addEventListener("click", () => {
                if (matrix[i][j] === 0) {
                    divMatrix[i][j].style.background = "black";
                    matrix[i][j] = 1;
                }
                else {
                    divMatrix[i][j].style.background = "white";
                    matrix[i][j] = 0;
                }
            });

        }
    }

    



}
function step() {
    let newMatrix = matrix;
    for (let i = 1; i < size-1; i++) {
        for (let j = 1; j < size-1; j++) {
            let nArray = neighbours([i,j]);
            let sum = 0;
            let state = matrix[i][j];
            nArray.forEach(k => {
                sum += k;
            });
    

            if (state === 0 && sum === 3) {
                newMatrix[i][j] = 1;
            } else if (state === 1 && (sum < 2 || sum > 3)){
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
    //setTimeout(() => { requestAnimationFrame(draw) }, 3000);
}

    /**
     * @param {array} squarePosition
     */
    function neighbours(squarePosition) {
        let n = {}
        n.top = matrix[squarePosition[0] - 1][squarePosition[1]];
        n.bottom = matrix[squarePosition[0] + 1][squarePosition[1]];
        n.right = matrix[squarePosition[0]][squarePosition[1] + 1];
        n.left = matrix[squarePosition[0]][squarePosition[1] - 1];

        n.topright = matrix[squarePosition[0] - 1][squarePosition[1] + 1];
        n.topleft = matrix[squarePosition[0] - 1][squarePosition[1] - 1];
        n.bottomleft = matrix[squarePosition[0] + 1][squarePosition[1] - 1];
        n.bottomright = matrix[squarePosition[0] + 1][squarePosition[1] + 1];

        let array = [n.topleft, n.top, n.topright, n.right, n.bottomright, n.bottom, n.bottomleft, n.left]
        //returnere array i stedet for object?
        return array
    }