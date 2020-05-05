"use strict";
//Randomize, addisjon. matrisemultiplikasjon (Statisk), transponere, map
class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        for (var i = 0; i < this.rows; i++) {
            this.data[i] = new Array(cols);
            for (var j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }
    log() {
        console.table(this.data);
    }
    static fromArray(array) {
        let m = new Matrix(array.length, 1);
        for (let i = 0; i < array.length; i++) {
            m.data[i][0] = array[i];
        }
        return m;
    }
    toArray() {
        let array = [];
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                array.push(this.data[i][j]);
            }
        }
        return array;
    }
    randomize() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.random() * 2 - 1;
            }
        }
    }
    add(n) {
        //Addisjon av matrise
        if (n instanceof Matrix) {
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j];
                }
            }
            //Addisjon av skalar til alle elementer
        } else {
            for (var i = 0; i < this.rows; i++) {
                for (var j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
    }
    //Ikke kommutativt, derfor 2 verdier
    //produktet har antall rader fra a
    //men har antall kolonner fra b
    //skalarprodukt
    static mult(a, b) {
        if (a.cols != b.rows) {
            console.log("Må være samme antall kolonner i matrise A som i B");
            return;
        }
        // Ny Matrise
        var result = new Matrix(a.rows, b.cols);
        for (var i = 0; i < a.rows; i++) {
            for (var j = 0; j < b.cols; j++) {
                // Sum av alle radene til A ganger columns til B
                var sum = 0;
                for (var k = 0; k < a.cols; k++) {
                    sum += a.data[i][k] * b.data[k][j];
                }
                result.data[i][j] = sum;
            }
        }
        return result;
    }
    //Bytter rader og kolonner i matrisen
    transpose() {
        var result = new Matrix(this.cols, this.rows);
        for (var i = 0; i < result.rows; i++) {
            for (var j = 0; j < result.cols; j++) {
                result.data[i][j] = this.data[j][i];
            }
        }
        return result;
    }
    // Sender hver verdi i matrisen gjennom en gitt funksjon
    map(func) {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                let value = this.data[i][j];
                this.data[i][j] = func(value);
            }
        }
    }

    //a-b
    static subtract(a, b) {
        let result = new Matrix(a.rows, a.cols);
        for (var i = 0; i < result.rows; i++) {
            for (var j = 0; j < result.cols; j++) {
                result.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return result;
    }


}
