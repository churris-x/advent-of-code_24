const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------

const sortAndSeparate = input => input
    .split('\n')
    .map(i => i
        .split('   ')
        .map(i => Number(i))
    )
    .reduce(([left, right], line ) => {
        return [[...left, line[0]], [...right, line[1]]]
    }, [[], []])
    .map(list => list.sort())
    .reduce((distance, column, _, array) => {
        const [left, right] = array;

        return left.reduce((total, number, index) => {
            return total + Math.abs(number - right[index])
        }, 0)
    }, 0);




console.log('1) eg: ', sortAndSeparate(eg));
console.log('1) input: ', sortAndSeparate(input));

// Part 2 ---------------------------------------------------------------------

// const placeholder = () => {};

// console.log('2) eg: ', placeholder(eg));
// console.log('2) input: ', placeholder(input));

/*
Wrong guesses:

Correct:
    1) 765748
    2) 
*/
