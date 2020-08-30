// @ts-check
class Dice extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: "open" });
        this.faceValue = 1;
        this._root.innerHTML = `
        <div id="dice" class="dice d1">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <style>
        .dice {
            display: grid; 
            grid-template-areas: 
             "a b c"
             "d e f"
             "g h i"
            ;
            justify-self: center;
            align-items: center;
            padding:10px;
            position: relative;
            width: 100px;
            height: 100px;
            border: solid gray 1px;
            border-radius: 16px;
            margin:12px;
            box-shadow: 2px 2px 2px black;
            background-color: rgba(245, 245, 220, 0.534);
            transform: rotate(0deg);
            transition: 90ms;
          }
          
          div.dice > div {
              width: 12px;
              height: 12px;
              border-radius: 50%;
              border:solid black 1px;
              margin-left:12px;
              box-shadow: inset 2px 2px 2px black;
              opacity: 0;
          }
          
          div.dice > div:nth-child(1) {
              grid-area: a;
          }
          div.dice > div:nth-child(2) {
              grid-area: b;
          }
          div.dice > div:nth-child(3) {
              grid-area: c;
          }
          div.dice > div:nth-child(4) {
              grid-area: d;
          }
          div.dice > div:nth-child(5) {
              grid-area: e;
          }
          div.dice > div:nth-child(6) {
              grid-area: f;
          }
          div.dice > div:nth-child(7) {
              grid-area: g;
          }
          div.dice > div:nth-child(8) {
              grid-area: h;
          }
          div.dice > div:nth-child(9) {
              grid-area: i;
          }
          
          div.dice.d1 > div:nth-child(5),
          
          div.dice.d2 > div:nth-child(1),
          div.dice.d2 > div:nth-child(9),
          
          div.dice.d3 > div:nth-child(5),
          div.dice.d3 > div:nth-child(1),
          div.dice.d3 > div:nth-child(9),
          
          div.dice.d4 > div:nth-child(1),
          div.dice.d4 > div:nth-child(3),
          div.dice.d4 > div:nth-child(7),
          div.dice.d4 > div:nth-child(9),
          
          div.dice.d5 > div:nth-child(1),
          div.dice.d5 > div:nth-child(3),
          div.dice.d5 > div:nth-child(5),
          div.dice.d5 > div:nth-child(7),
          div.dice.d5 > div:nth-child(9),
          
          div.dice.d6 > div:nth-child(1),
          div.dice.d6 > div:nth-child(3),
          div.dice.d6 > div:nth-child(4),
          div.dice.d6 > div:nth-child(6),
          div.dice.d6 > div:nth-child(7),
          div.dice.d6 > div:nth-child(9)
          {
              opacity: 1;
          }
        </style>
          `;

    }

    static get observedAttributes() {
        return ["face", "roll"];
    }

    get face() {
        return this.faceValue
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const mydice = this._root.querySelector("#dice");
        let count = 10;
        const rolling = () => {
            if (count > 0) {
                count --;
                const r = Math.trunc(Math.random() * 6 + 1);
                mydice.className = "dice d" + r;
                this.faceValue = Number(newValue);
                mydice.style.transform = `rotate(${r*15+ count*36}deg)`;
                setTimeout(rolling,100);
            } else {
                mydice.style.transform = `rotate(0deg)`;
            }
        }
        if (name === "face") {
            mydice.className = "dice d" + newValue;
            this.faceValue = Number(newValue);
        }
        if (name === "roll") {
            count = 10;
            rolling();
        }


    }
}

window.customElements.define("dice-roll", Dice);
