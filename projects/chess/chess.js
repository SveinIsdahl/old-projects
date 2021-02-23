//@ts-check

let boardArray = [];
let pieceArray = [];
let selectedPiece = -1;

class Piece {
    /**
     * @param {any} type
     */
    constructor(type) {
        this.type = type;
        this.pos;

    }
    /**
     * @param {string | number} pos
     */
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
            //boardArray[pos].setAttribute("data-number", this.pos + "");
        }

        if (typeof pos === "number") {
            this.updatePieceDiv(boardArray[pos]);
            this.pos = pos;
            //boardArray[pos].setAttribute("data-number", this.pos + "");
        }
    }
    /**
     * @param {{ style: { backgroundImage: string; backgroundPositionX: string; backgroundPositionY: string; }; }} div
     */
    updatePieceDiv(div) {
        const sprite = this.spritePos(this.type);

        div.style.backgroundImage = "url(pieces.svg)";
        div.style.backgroundPositionX = sprite.x + "%";
        div.style.backgroundPositionY = sprite.y + "%";
    }
    /**
     * @param {any} type
     */
    spritePos(type) {
        switch (type) {
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
                console.log("Error, invalid piece symbol");
                break;
        }
    }
    /**
     * @param {number} pos
     */
    select(pos) {
        pieceArray.forEach((piece) => {
            if (piece.pos === pos) {
                selectedPiece = pos;
            }
        })

    }
    /**
     * @param {number} dropLoaction
     */
    drop(dropLoaction) {
        if ((this.hasPiece(dropLoaction)) && (this.getPiece(dropLoaction).color === this.getPiece(selectedPiece).color)) {
            console.log(this.getPiece(dropLoaction).color);
            console.log(this.getPiece(selectedPiece).color)
            console.log(pieceArray)
            console.log("has piece of same color");
            selectedPiece = -1;
            return


        }
        pieceArray.forEach((piece) => {
            if (piece.pos === selectedPiece) {
                piece.updatePosition(dropLoaction);
            }

        })
        selectedPiece = -1;
    }
    /**
     * @param {any} location
     */
    hasPiece(location) {

        for (let i = 0; i < pieceArray.length; i++) {
            if (pieceArray[i].pos === location) {
                return true
            }
        }
    }
    /**
     * @param {number} [pos]
     */
    getPiece(pos) {
        for(let piece of pieceArray) {
            if(pos === piece.pos) {
                return piece
            }
        }
        return undefined
    }
    get color() {
        return this.type === this.type.toUpperCase() ? "white" : "black"
    }

}
let p = new Piece();
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
            //div.setAttribute("data-number", rank * 8 + file + "");
            div.addEventListener("click", () => {
                if (selectedPiece === -1) {
                    p.select(rank * 8 + file);
                }
                else {
                    p.drop(rank * 8 + file);
                }

            })
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

/**
 * @param {HTMLElement} board
 */
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
/**
 * @param {HTMLElement} board
 */
function resetBoard(board) {
    boardArray = [];
    pieceArray = [];
    board.innerHTML = "";
    setupBoard(board)
}
/**
 * @param {string} string
 */
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
    };

}
