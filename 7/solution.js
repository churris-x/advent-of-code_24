const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/*

NOTE => always evaluated left-to-right

1. generate valid equations
2. evaluate them

*/

const nChooseK = (array, k) => {
    let n = array.length
    let head, tail, result = [];

    if (k > n || k < 1) return [];
    if (k === n) return [array];
    if (k === 1 ) return array.map(item => [item]);

    for (let i = 0; i < n - k + 1; i++) {
        head = array.slice(i, i + 1);
        tail = nChooseK(array.slice(i + 1), k - 1);

        for (let j = 0; j < tail.length; j++) {
            result.push( head.concat(tail[ j ]));
        }
    }
    return result;
}

const placeholder = input => {
    const equations = input.split('\n');


    // delete this
    const equation = equations[7]
    // ---- this will be in a loop ----

    const colon = equation.indexOf(':');

    const total = Number(equation.slice(0, colon));
    const numbers = equation
        .slice(colon + 2)
        .split(' ')
        .map(i => Number(i));


    const symbolsCount = numbers.length - 1
    const symbolsMap = '+*'

    const symbols = [];

    // for (let i = 0; i < symbolsCount; i++) {
    //     symbols
    // }


    return [total, numbers];

};

console.log('1) eg:    ', placeholder(eg));
// console.log('1) input: ', placeholder(input));





// Part 2 ---------------------------------------------------------------------

// const placeholder = () => {};

// console.log('2) eg:    ', placeholder(eg));
// console.log('2) input: ', placeholder(input));

/*
Wrong guesses:

Correct:
    1) 
    2) 
*/
