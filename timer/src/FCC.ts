const testArray = [
    0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 49, 70,
];

// function for binary search
function binarySearch(
    array: number[],
    target: number
): number[] | "Value Not Found" {
    let min = 0;
    let max = array.length - 1;
    let guess;
    let guesses: number[] = [];

    while (min <= max) {
        guess = Math.floor((min + max) / 2);
        if (array[guess] === target) {
            guesses.push(array[guess]);
            return guesses;
        } else if (array[guess] < target) {
            min = guess + 1;
            guesses.push(array[guess]);
        } else {
            max = guess - 1;
            guesses.push(array[guess]);
        }
    }
    return "Value Not Found";
}

binarySearch(testArray, 1); //?

export default binarySearch;
