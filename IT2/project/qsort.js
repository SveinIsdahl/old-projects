//@ts-check

const qsort = (/** @type {any[]} */ arr) => {
    if(arr.length < 2) return arr;
    const x = arr[0];
    const xs = arr.slice(1);
    return (qsort(xs.filter(v=>v <=x))).
    concat([x]).concat(
        (v=>v<=x)
    )

}

console.log(qsort([1,5,7,1,3,2,7,3,5]));