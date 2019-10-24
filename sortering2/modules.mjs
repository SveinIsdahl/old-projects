export function swap(arr, a, b) {
    let rep = arr[a];
    arr[a] = arr[b];
    arr[b] = rep;
}