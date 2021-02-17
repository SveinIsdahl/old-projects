//@ts-check

//Avstander mellom byer, placeDist[i] er array over avstand mellom placeDist[i] og alle andre byer
const placeDist = [
    [0, 2, 3, 4],
    [2, 0, 3, 2],
    [3, 3, 0, 4],
    [4, 2, 4, 0],
]

const visitedCities = [];
let distance = 0;

for (let i = 0; i < placeDist.length; i++) {
    for (let j = 0; j < placeDist[i].length; j++) {
        //Kan ikke gå til samme by
        if(i===j) {
            continue;
        }
    }
    visitedCities.push(i);

}

