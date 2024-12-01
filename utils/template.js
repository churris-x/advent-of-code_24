const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------

const placeholder = input => input;

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
