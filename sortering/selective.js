function selective(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        //Flytte variabler av arr[0..i-1] som er større enn key frem en posisjon
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;        
        }
        arr[j + 1] = key;        

    }

}


