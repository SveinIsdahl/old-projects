"use strict";

function activation(x) {
    return 1 / (1+ Math.exp(-x));
}

class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes) {
        this.inputNodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;

        this.weightsIH = new Matrix(this.hiddenNodes, this.inputNodes);
        this.weightsHO = new Matrix(this.outputNodes, this.hiddenNodes);
        this.weightsIH.randomize();
        this.weightsHO.randomize();

        this.biasH = new Matrix(this.hiddenNodes, 1);
        this.biasO = new Matrix(this.outputNodes, 1);
        this.biasH.randomize();
        this.biasO.randomize();

    }
    feedForward(inputArray) {

        let inputs = Matrix.fromArray(inputArray);
        let hidden = Matrix.mult(this.weightsIH, inputs);
        hidden.add(this.biasH);
        hidden.map(activation);

        let output = Matrix.mult(this.weightsHO, hidden);
        output.add(this.biasO);
        output.map(activation);

        return output.toArray();
    }
    train(inputs, targets) {
        let outputs = this.feedForward(inputs);

        outputs = Matrix.fromArray(outputs);
        targets = Matrix.fromArray(targets);

        //Error = answers - outputs
        let error = Matrix.subtract(targets, outputs);

        outputs.log()
        targets.log()
        error.log()

    }
}

