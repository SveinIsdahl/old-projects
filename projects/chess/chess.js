//@ts-check

/**
 * @param {any} x
 */
const l = x => console.log(x)
const consts = {
    lightBackground: "#117f11",
    darkBackground: "#cccccc",
    greenColorChange: 60,
}

let boardArray = [];
let pieceArray = [];
let selectedPiecePos = -1;
let turn = "white";

class Piece {
    /**
     * @param {string} type
     */
    type;
    /** @type {number} */
    pos;
    constructor(type) {
        this.type = type;
        this.pos;

    }
    /**
     * Moves a piece by updating the selected div and removing piece from previous square
     * @param {string | number} pos
     */
    move(pos) {

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
     * Sets background image of square div to a piece 
     * @param {HTMLElement} div
     */
    updatePieceDiv(div) {
        const sprite = this.spritePos(this.type);
        div.style.backgroundImage = "url(pieces.svg)";
        div.style.backgroundPositionX = sprite.x + "%";
        div.style.backgroundPositionY = sprite.y + "%";
    }
    /**
     * Returns sprite position
     * @param {string} type
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
     * Selects a piece
     * @param {number} pos
     */
    select(pos) {
        pieceArray.forEach((piece) => {
            if (piece.pos === pos && piece.color === turn) {
                selectedPiecePos = pos;
                /**
                 * @param {number} k
                 */
                boardArray[pos].style.backgroundColor = this.setTileColor(boardArray[pos].style.backgroundColor, consts.greenColorChange);
            }
        })
    }
    /**
 * Drops a piece if conditions are met
 * @param {number} dropLocation
 */
    parentDrop(dropLocation) {
        let piece = this.getPiece(selectedPiecePos);

        // Piece in droplocation is of same color as selected piece
        if ((this.hasPiece(dropLocation)) && (this.getPiece(dropLocation).color === piece.color)) {
            boardArray[selectedPiecePos].style.backgroundColor = this.setTileColor(boardArray[selectedPiecePos].style.backgroundColor, -consts.greenColorChange);
            selectedPiecePos = -1;
            return
        }

        this.removePiece(dropLocation);
        piece.move(dropLocation);
        boardArray[selectedPiecePos].style.backgroundColor = this.setTileColor(boardArray[selectedPiecePos].style.backgroundColor, -consts.greenColorChange);

        turn === "white" ? turn = "black" : turn = "white";
        selectedPiecePos = -1;
    }
    /**
     * Checks of a square has a piece
     * @param {number} square
     */
    hasPiece(square) {

        for (let i = 0; i < pieceArray.length; i++) {
            if (pieceArray[i].pos === square) {
                return true
            }
        }
    }
    /**
     * @param {number} pos
     */
    getPiece(pos) {
        for (let piece of pieceArray) {
            if (pos === piece.pos) {
                return piece
            }
        }
        return undefined
    }
    /**
     * @param {number} pos
     */
    removePiece(pos) {

        pieceArray.forEach((piece, index) => {
            if (piece.pos === pos) {
                piece.move(undefined);
                pieceArray.splice(index, 1);
            }

        })
    }
    /**
     * @param {string} color
     * @param {number} g
     */
    setTileColor(color, g) {
        let colors = color.split("(");
        colors.splice(0, 1);
        colors = colors[0].split(" ").join().split(",").filter(k => k !== "");
        return "rgb(" + colors[0] + ", " + (Number(colors[1]) + g) + ", " + colors[2] + ""
    }

    get color() {
        return this.type === this.type.toUpperCase() ? "white" : "black"
    }
}
class King extends Piece {
    /**
 * Drops a piece if conditions are met
 * @param {number} dropLocation
 */
    drop(dropLocation) {
        if (this.validMove(dropLocation)) {
            this.parentDrop(dropLocation);
        }
        else {
            boardArray[selectedPiecePos].style.backgroundColor = this.setTileColor(boardArray[selectedPiecePos].style.backgroundColor, -consts.greenColorChange);
            selectedPiecePos = -1;
            return
        }
    }
    validMove(dropLoaction) {
        let arr = this.moves()
        for (let pos of arr) {
            if (pos === dropLoaction) {
                return true
            }
        }
    }
    moves() {
        return [7, 8, 9, -1, 1, -9, -8, -7].map(e => e + this.pos);
    }
}
class Queen extends Piece {
    /**
    * Drops a piece if conditions are met
    * @param {number} dropLocation
    */
    drop(dropLocation) {
        if (this.validMove(dropLocation)) {
            this.parentDrop(dropLocation);
        }
        else {
            boardArray[selectedPiecePos].style.backgroundColor = this.setTileColor(boardArray[selectedPiecePos].style.backgroundColor, -consts.greenColorChange);
            selectedPiecePos = -1;
            return
        }
    }
    validMove(dropLoaction) {
        let arr = this.moves()
        for (let pos of arr) {
            if (pos === dropLoaction) {
                return true
            }
        }
    }
    moves() {
        return [7, 8, 9, -1, 1, -9, -8, -7].map(e => e + this.pos);
    }
}
class Knight extends Piece {
    /**
    * Drops a piece if conditions are met
    * @param {number} dropLocation
    */
    drop(dropLocation) {
        if (this.validMove(dropLocation)) {
            this.parentDrop(dropLocation);
        }
        else {
            boardArray[selectedPiecePos].style.backgroundColor = this.setTileColor(boardArray[selectedPiecePos].style.backgroundColor, -consts.greenColorChange);
            selectedPiecePos = -1;
            return
        }
    }
    validMove(dropLoaction) {
        let arr = this.moves()
        for (let pos of arr) {
            if (pos === dropLoaction) {
                return true
            }
        }
    }
    moves() {
        // Wrong
        let arr = [16 - 1, 16 + 1, 6, 10, -10, -6 - 16 - 1, -16 + 1].map(e => e + this.pos);
        arr.forEach((e,index) => {
            let directionsArr = Object.keys(minToEdge(e)).map(k=> Number(k));
            let posArr = minToEdge(this.pos)
            for (let i = 0; i < directionsArr.length; i++) {
                if(Math.abs(directionsArr[i]-posArr[i]) >= 3) {
                    arr.splice(index, 1);
                }
                
            }
        })
        return arr
    }
}
class Bishop extends Piece {
    /**
    * Drops a piece if conditions are met
    * @param {number} dropLocation
    */
    drop(dropLocation) {
        if (this.validMove(dropLocation)) {
            this.parentDrop(dropLocation);
        }
        else {
            boardArray[selectedPiecePos].style.backgroundColor = this.setTileColor(boardArray[selectedPiecePos].style.backgroundColor, -consts.greenColorChange);
            selectedPiecePos = -1;
            return
        }
    }
    validMove(dropLoaction) {
        let arr = this.moves()
        for (let pos of arr) {
            if (pos === dropLoaction) {
                return true
            }
        }
    }
    moves() {
        return [7, 8, 9, -1, 1, -9, -8, -7].map(e => e + this.pos);
    }
}
class Rook extends Piece {
    /**
    * Drops a piece if conditions are met
    * @param {number} dropLocation
    */
    drop(dropLocation) {
        if (this.validMove(dropLocation)) {
            this.parentDrop(dropLocation);
        }
        else {
            boardArray[selectedPiecePos].style.backgroundColor = this.setTileColor(boardArray[selectedPiecePos].style.backgroundColor, -consts.greenColorChange);
            selectedPiecePos = -1;
            return
        }
    }
    validMove(dropLoaction) {
        let arr = this.moves()
        for (let pos of arr) {
            if (pos === dropLoaction) {
                return true
            }
        }
    }
    moves() {
        return [7, 8, 9, -1, 1, -9, -8, -7].map(e => e + this.pos);
    }
}
class Pawn extends Piece {
    /**
    * Drops a piece if conditions are met
    * @param {number} dropLocation
    */
    drop(dropLocation) {
        if (this.validMove(dropLocation)) {
            this.parentDrop(dropLocation);
        }
        else {
            boardArray[selectedPiecePos].style.backgroundColor = this.setTileColor(boardArray[selectedPiecePos].style.backgroundColor, -consts.greenColorChange);
            selectedPiecePos = -1;
            return
        }
    }
    validMove(dropLoaction) {
        let arr = this.moves()
        for (let pos of arr) {
            if (pos === dropLoaction) {
                return true
            }
        }
    }
    moves() {
        let moves = [];
        let inv

        if (this.color === "white") {
            inv = 1;
            if (this.pos > 7 && this.pos < 15) {
                moves.push(this.pos + 16);
            }
        }
        else {
            inv = -1;
            if (this.pos > 47 && this.pos < 55) {
                moves.push(this.pos - 16);
            }
        }
        if (Piece.prototype.hasPiece(this.pos + 7 * inv)) {
            moves.push(this.pos + 7 * inv);
        }
        if (!Piece.prototype.hasPiece(this.pos + 8 * inv)) {
            moves.push(this.pos + 8 * inv)
        }
        if (Piece.prototype.hasPiece(this.pos + 9 * inv)) {
            moves.push(this.pos + 9 * inv)
        }

        return moves
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

            let color = consts.lightBackground;
            if (isLight === true) {
                color = consts.darkBackground;
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
                if (selectedPiecePos === -1) {
                    Piece.prototype.select(rank * 8 + file);
                }
                else {
                    let piece = Piece.prototype.getPiece(selectedPiecePos);
                    piece.drop(rank * 8 + file);
                }

            })
            boardArray.push(div);
            //div.innerHTML = "rank" + rank + "file" + file;
        }
    }
}
window.onload = () => {
    const board = document.getElementById("board");
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
    selectedPiecePos = -1;
    turn = "white";
    let ranks = string.split("/").reverse();
    if (ranks.length !== 8) {
        alert("Invalid FEN");
        FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
        return
    }
    for (let i = 0; i < ranks.length; i++) {
        let rank = ranks[i]
        let currentRank = rank.split("");
        let counter = 0;
        for (let j = 0; j < 8; j++) {
            let symbol = currentRank[counter];
            // Hvis string er et tall
            // @ts-ignore
            if ((!isNaN(parseFloat(symbol)) && isFinite(symbol))) {
                j += parseInt(symbol) - 1;
            }
            else {
                let currentPiece;
                if (symbol === undefined) {
                    continue
                }
                let lowSym = symbol.toLowerCase();

                switch (lowSym) {
                    case ("k"):
                        currentPiece = new King(symbol);
                        break;
                    case ("q"):
                        currentPiece = new Queen(symbol);
                        break;
                    case ("n"):
                        currentPiece = new Knight(symbol);
                        break;
                    case ("b"):
                        currentPiece = new Bishop(symbol);
                        break;
                    case ("r"):
                        currentPiece = new Rook(symbol);
                        break;
                    case ("p"):
                        currentPiece = new Pawn(symbol);
                        break;

                    default:
                        break;
                }
                // (rank*8 + file)
                currentPiece.move(i * 8 + j);
                pieceArray.push(currentPiece);
            }
            counter++

        };
        //}
    };

}
/**
 * @param {number} pos
 * @returns {object} distances to edge of board in cardinal directions
 */
function minToEdge(pos) {
    let distances = {};
    distances.w = pos % 8;
    distances.s = Math.floor(pos / 8);
    distances.e = 7 - distances.w;
    distances.n = 7 - distances.s;
    return distances
}