// @ts-check

const $ = (id) => document.getElementById(id);

const mineBilder = [];
const alleDiver = [];
window.onload = function() {
    const divBilder = $("bilder");
    const imglist = [];
    for (let i = 1; i < 100; i++) {
        const img = new Image();
        imglist.push(img); // slik at img ikke blir gc (garbage collected)
        const navn = "b" + i + ".jpg";
        img.src = `media/${navn}`;
        img.onload = (e) => {
            mineBilder.push(navn);
        };
    }

    // trenger egentlig await - men prøver uten slik at vi slipper å introdusere async
    // så jeg venter 1s slik at alle bilder kan bli testa
    // med fire bilder og på localhost fungererer det med 50ms - bør øke dersom på remote server
    // en bedre løsning vil være å bruke promise og await
    setTimeout(() => {
        for (let i = 0; i < mineBilder.length; i++) {
            const navn = mineBilder[i];
            const div = document.createElement("div");
            alleDiver.push(div);
            divBilder.append(div);
            div.style.backgroundImage = `url("media/${navn}")`;
            div.style.left = `${250 * (i  % 3)}px`;
            div.style.top = `${200 * Math.floor(i / 3)}px`;
            div.addEventListener("click", framvis);
        }
    }, 1500);

    function framvis(e) {
        alleDiver.forEach((k) => { k.classList.remove("ontop") });
        /*
        for (const bilde of alleBilder) {
            bilde.classList.remove("ontop");
        }
        */
        const div = e.target;
        div.classList.add("ontop");
        div.classList.remove("animert");
        void div.offsetWidth;
        div.classList.add("animert", "ontop");




    }
}


/**
 * Et eksempel på promise for å laste et bilde
 * Denne gjør at vi slipper timeout
  const loadImage = (url) => new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', reject);
    img.src = url;
  });
  const img = await loadImage(`media/${navn}`).catch(e => null)
  if (img) mineBilder.push(navn)
 */