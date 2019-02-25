let canvas = document.getElementById("canvas");
let ctx = document.getContext("2d");

let ball1 = {
    r: 50,
    xpos: 300,
    ypos: 300,
    xvel: 0,
    yvel: 0,
    xacc: 0.001,
    yacc: 0.003
}
let ball2 = {
    r: 50,
    xpos: 500,
    ypos: 500,
    xvel: 0,
    yvel: 0,
    xacc: 0.003,
    yacc: 0.002
}