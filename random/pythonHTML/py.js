//@ts-check
const output = document.getElementById("output");
const code = document.getElementById("code");

function addToOutput(s) {
    output.value += '>>>' + code.value + '\n' + s + '\n';
}

output.value = 'Initializing...\n';
async function main() {
    await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.17.0/full/' });
    output.value += 'Ready!\n';
}
let pyodideReadyPromise = main();

async function evaluatePython() {
    await pyodideReadyPromise;
    try {
        let output = await pyodide.runPythonAsync(code.value);
        addToOutput(output);
    } catch (err) {
        addToOutput(err);
    }
}