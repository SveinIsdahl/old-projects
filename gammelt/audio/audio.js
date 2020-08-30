/*
const REAL_TIME_FREQUENCY = 45;
const ANGULAR_FREQUENCY = REAL_TIME_FREQUENCY * 2 * Math.PI;

let audioContext = new AudioContext();
let myBuffer = audioContext.createBuffer(1, 88200, 44100);
let myArray = myBuffer.getChannelData(0);
for (let sampleNumber = 0; sampleNumber < 88200; sampleNumber++) {
    myArray[sampleNumber] = generateSample(sampleNumber);
}

function generateSample(sampleNumber) {
    let sampleTime = sampleNumber / 44100;
    let sampleAngle = sampleTime * ANGULAR_FREQUENCY;
    return Math.sin(sampleAngle);
}

let src = audioContext.createBufferSource();
src.buffer = myBuffer;
src.connect(audioContext.destination);
src.start();
*/

let wave = [];
let button;
let playing;

function setup() {
    createCanvas(400, 400);
    background(100);
    for (let i = 0; i <= 2; i++) {
        wave[i] = new p5.Oscillator();
        wave[i].setType("sine");
        wave[i].start();
        wave[i].amp(0.1); 

    }
    //
    wave[0].freq(220.5); //A
    wave[1].freq(138.5); //C#
    wave[2].freq(164.5); //E
    frameRate(10);
} 

function draw() {
    let j = noise(random());
    console.log(j);
    wave[0].freq(220.5 * j * 2, 5.8);
    wave[1].freq(138.5 * j * 2, 5.8);
    wave[2].freq(164.5 * j * 2, 5.8);


}    