//@ts-check

const boardArray = [];

class Piece {
    constructor(type) {
        this.type = type;
        this.pos;

    }
    updatePosition(pos) {
        (this.pos !== undefined) ? boardArray[this.pos].style.backgroundImage = "" : undefined;

        

        if(typeof pos === "string") {
            const squareArr = pos.split("");
            let alphabet = "ABCDEFGH".split("");
            let file = 0;
            const rank = Number(squareArr[1])-1;
            alphabet.forEach((k, i)=> {
                (squareArr[0] === k) ? file = i : undefined
            })
            this.updatePieceDiv(boardArray[rank*8+file])
            this.pos = rank*8+file;

        }
        
        if(typeof pos === "number") {
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
            div.innerHTML = "rank" + rank + "file" + file;
        }
    }
}




window.onload = () => {
    const board = document.getElementById("board");
    window.addEventListener("resize", () => {
        board.innerHTML = "";
        setupBoard(board);
    })

    setupBoard(board);

    let whiteKing = new Piece("P");
    whiteKing.updatePosition("H8");
    let blackKing = new Piece("K");
    blackKing.updatePosition("A1");
    blackKing.updatePosition("E1")

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