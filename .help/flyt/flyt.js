// @ts-check

const eksempler = [ `#.info: stroke=blue fill=white visual=note
[<start>s] -> [Velg alternativ]
[<state>Velg alternativ] -> [<sender>Send til server]
[Send til server] -> [Lagre data]
[<actor>Bruker] --> [Velg alternativ]
[Lagre data] ->[Beregn score]
[Beregn score] -> [<sender>Send score]
[Send score] -> [<state>Vis score]
[Vis score] -> [<choice>Neste?]
[Bruker] --> [Neste?]
[Neste?] ja -> [Velg alternativ]
[Neste?] nei -> [<end>e]
`
];

function setup() {
    const s = eksempler[0];
    const divGui = document.getElementById("gui");
    const btnTegn = document.getElementById("tegn");
    const btnSkjul = document.getElementById("skjul");
    const txtUML = document.getElementById("uml");
    txtUML.value = s;
    const canvas = document.getElementById('diagram');
    btnTegn.addEventListener("click", tegnDiagram);
    btnSkjul.addEventListener("click", skjul);

    function skjul() {
        divGui.classList.toggle("skjult");
        btnSkjul.classList.toggle("skjult");
    }

    function tegnDiagram() {
        const source = txtUML.value;
        nomnoml.draw(canvas, source);
    }
}