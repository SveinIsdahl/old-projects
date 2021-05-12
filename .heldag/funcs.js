
//@ts-check
/**
 * Finner verdien til et HTMLElement uten error
 * @param {any} e 
 */
 const getValue = e => e.value
 /**
  * Short-hand for console.log
  * @param {any} x 
  */
 const l = x => console.log(x);
 /**
  * Finner id til HTMLElement
  * @param {string} id
  */
 const $ = id => document.getElementById(id);
 /**
  * Lager select fra Array
 * @param {Array} listeArr
 * @returns {HTMLSelectElement} select
 */
 function makeSelect(listeArr) {
     const sel = document.createElement("select");
     listeArr.forEach((e) => {
         const option = document.createElement("option");
         option.innerHTML = e;
         sel.append(option);
     })
     return sel;
 }

 export {getValue, l, $, makeSelect}