const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------

// mul(123,123)

const parse = input => input
    .split('\n')
    .flatMap(line => [...line.matchAll(/mul\([0-9]{1,3},[0-9]{1,3}\)/g)]
        .map(i => i[0])
    )
    .reduce((total, multiply) => {

        const [a, b] = multiply.slice(4, -1).split(',')
        return total + a * b
    }, 0)

console.log('1) eg: ', parse(eg));
console.log('1) input: ', parse(input));

// Part 2 ---------------------------------------------------------------------

const parseInstructions = input => input
    .split('\n')



console.log('2) eg: ', parseInstructions(eg));
// console.log('2) input: ', placeholder(input));

/*
Wrong guesses:

Correct:
    1) 161085926
    2) 
*/
