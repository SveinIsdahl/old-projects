"use strict";


let training_data = [{
    inputs: [0, 1],
    targets: [1]
},
{
    inputs: [1, 0],
    targets: [1]
},
{
    inputs: [0, 0],
    targets: [0]
},
{
    inputs: [1, 1],
    targets: [0]
}
]



function setup() {
    let network = new NeuralNetwork(2, 1000, 1);
    network.learning_rate = 0.6;
    for (let i = 0; i < 1000; i++) {
        let data = random(training_data);
        network.train(data.inputs, data.targets);
    }

    console.log(network.feedforward([1, 0]));
    console.log(network.feedforward([0, 1]));
    console.log(network.feedforward([0, 0]));
    console.log(network.feedforward([1, 1]));

}
function draw() {

}