const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------

/*
  0123456789
0 xoxoxoxoxo
1 oxoxoxoxox
2 xoxoxoxoxo
3 oxoxoxoxox
4 xoxoxoxoxo
5 oxoxoxoxox
6 xoxoxoxoxo
7 oxoxoxoxox
8 xoxoxoxoxo
9 oxoxoxoxox


n x n square = 2n - 1 diagonals?

0123
XMAS

diagonal

[0], [01, 10], [02, 11, 20], [30, 21, 12, 03],
[40, 31, 22, 13, 04]

*/


const placeholder = input => {
    const normal = input.split('\n')

    const backwards = input
        .split('\n')
        .reverse()
        .map(i => i.split('').reverse().join(''))


    const size = normal[0].length

    // let diagonal_up = []
    // for (const line of normal) {
    // }

    const diagonal_up = normal
        .map(line => {

        })


    // console.log(normal, backwards, size);
}


const parse = grid => grid
    .reduce((total, line) => line.match(/XMAS/g).length, 0)


console.log('1) eg: ', placeholder(eg));
// console.log('1) input: ', placeholder(input));

// Part 2 ---------------------------------------------------------------------

// const placeholder = () => {};

// console.log('2) eg: ', placeholder(eg));
// console.log('2) input: ', placeholder(input));

/*
Wrong guesses:

Correct:
    1) 
    2) 
*/
