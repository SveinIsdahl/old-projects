//@ts-check

let boardArray = [];
let pieceArray = [];
class Piece {
    constructor(type) {
        this.type = type;
        this.pos;

    }
    updatePosition(pos) {
        (this.pos !== undefined) ? boardArray[this.pos].style.backgroundImage = "" : undefined;



        if (typeof pos === "string") {
            const squareArr = pos.split("");
            let alphabet = "ABCDEFGH".split("");
            let file = 0;
            const rank = Number(squareArr[1]) - 1;
            alphabet.forEach((k, i) => {
                (squareArr[0] === k) ? file = i : undefined
            })
            this.updatePieceDiv(boardArray[rank * 8 + file])
            this.pos = rank * 8 + file;

        }

        if (typeof pos === "number") {
            this.updatePieceDiv(boardArray[pos])
            this.pos = pos;

        }
    }
    updatePieceDiv(div) {
        const sprite = spritePos(this.type);

        div.style.backgroundImage = "url(pieces.svg)";
        div.style.backgroundPositionX = sprite.x + "%";
        div.style.backgroundPositionY = sprite.y + "%";
    }

}

/**
 * @param {HTMLElement} board
 */
function setupBoard(board) {
    const size = Number(board.offsetHeight) / 8;
    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const isLight = (file + rank) % 2 !== 0;

            let color = "#117f11";
            if (isLight === true) {
                color = "#cccccc"
            }

            let div = document.createElement("div");
            board.appendChild(div);
            div.style.backgroundColor = color;
            div.style.width = size + "px";
            div.style.height = size + "px";
            div.style.position = "absolute";
            div.style.bottom = rank * size + "px";
            div.style.left = file * size + "px";

            div.style.backgroundImage = "0";
            div.style.backgroundRepeat = "no-repeat";

            div.style.backgroundSize = "600%";
            boardArray.push(div);
            //div.innerHTML = "rank" + rank + "file" + file;
        }
    }
}




window.onload = () => {
    const board = document.getElementById("board");
    /*
    window.addEventListener("resize", () => {
        board.innerHTML = "";
        setupBoard(board);
    })
    */

    eventlistenerSetup(board);
    resetBoard(board);
    //Initialize board with standard position
    FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
}
function eventlistenerSetup(board) {
    // Input FEN to BOARD
    document.getElementById("FENbtn").addEventListener("click", () => {
        resetBoard(board);
        //@ts-ignore
        FEN(document.getElementById("FENinp").value);
    })

    // Standard FEN button
    document.getElementById("standardbtn").addEventListener("click", () => {
        resetBoard(board);
        //@ts-ignore
        FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    })
}
function resetBoard(board) {
    boardArray = [];
    pieceArray = [];
    board.innerHTML = "";
    setupBoard(board)
}
function FEN(string) {
    let ranks = string.split("/").reverse();

    for (let i = 0; i < ranks.length; i++) {
        let rank = ranks[i]
        let currentRank = rank.split("");

        for (let j = 0; j < currentRank.length; j++) {

            let symbol = currentRank[j];

            // Hvis string er et tall
            if (symbol === "8") {
                continue
            }
            else if ((!isNaN(parseFloat(symbol)) && isFinite(symbol))) {

                if (currentRank[j + 1] === undefined) {
                    continue
                }
                let currentPiece = new Piece(currentRank[j + 1]);

                currentPiece.updatePosition(i * 8 + j + parseInt(symbol));
                pieceArray.push(currentPiece);

                j++;
                continue
            }
            else {
                let currentPiece = new Piece(symbol);
                // (rank*8 + file)
                currentPiece.updatePosition(i * 8 + j);
                pieceArray.push(currentPiece);

            }

        };
        //}

        //currentPiece.updatePosition(index+1 + "")
    };

}
function spritePos(piece) {
    switch (piece) {
        case "K":
            return { x: 0, y: 0 }
        case "Q":
            return { x: 20, y: 0 }
        case "B":
            return { x: 40, y: 0 }
        case "N":
            return { x: 60, y: 0 }
        case "R":
            return { x: 80, y: 0 }
        case "P":
            return { x: 100, y: 0 }
        case "k":
            return { x: 0, y: 100 }
        case "q":
            return { x: 20, y: 100 }
        case "b":
            return { x: 40, y: 100 }
        case "n":
            return { x: 60, y: 100 }
        case "r":
            return { x: 80, y: 100 }
        case "p":
            return { x: 100, y: 100 }

        default:
            break;
    }
}