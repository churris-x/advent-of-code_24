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

const getAmount = input => {
    const east = input.split('\n');

    const size = east[0].length;

    const south = Array(size).fill('');
    const north_east = Array(2 * size - 1).fill('');
    const south_east = Array(2 * size - 1).fill('');

    for (const [lineIndex, line] of east.entries()) {
        for (const [index, char] of line.split('').entries()) {
            south[index] = south[index].concat(char);
        }
    }

    for (const [lineIndex, line] of east.entries()) {
        for (const [index, char] of line.split('').entries()) {
            const row = index + lineIndex;
            north_east[row] = north_east[row].concat(char);
        }
    }

    for (const [lineIndex, line] of east.entries()) {
        for (const [index, char] of line.split('').entries()) {
            const row = index - lineIndex + size - 1;
            south_east[row] = south_east[row].concat(char);
        }
    }


    const west = east
        .reverse()
        .map(i => i.split('').reverse().join(''));

    const north = south
        .reverse()
        .map(i => i.split('').reverse().join(''));

    const south_west = north_east
        .reverse()
        .map(i => i.split('').reverse().join(''));

    const north_west = south_east
        .reverse()
        .map(i => i.split('').reverse().join(''));

    // console.table({north, south, east, west, north_east, south_west, south_east, north_west });

    const parse = grid => grid
        .reduce((total, line) => total + (line.match(/XMAS/g)?.length ?? 0), 0);

    const total = [
        north, south,
        east, west,
        north_east, south_west,
        south_east, north_west
    ].reduce((total, grid) => total + parse(grid), 0);

    return total;

}

console.log('1) eg: ', getAmount(eg));
console.log('1) input: ', getAmount(input));

// Part 2 ---------------------------------------------------------------------

// const placeholder = () => {};

// console.log('2) eg: ', placeholder(eg));
// console.log('2) input: ', placeholder(input));

/*
Wrong guesses:

Correct:
    1) 2545
    2) 
*/
