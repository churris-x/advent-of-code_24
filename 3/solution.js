const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------

// mul(123,123)
// TODO: don't use regex

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

// TODO: don't use regex

const parseInstructions = input => input
    .split('\n')
    .flatMap(line => line.split(''))
    .reduce(([prevInstruction, multiply, total], char) => {
        const instruction = prevInstruction + char;

        if (instruction.includes( 'don\'t()')) return ['', false, total]
        if (instruction.includes('do()')) return ['', true, total]

        expression = instruction.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/)?.[0]

        if (expression) {
            if (!multiply) return ['', multiply, total]
            const [a, b] = expression.slice(4, -1).split(',')
            return ['', multiply, total + a * b]
        }

        return [instruction, multiply, total]

    }, ['', true, 0])[2]


console.log('2) eg: ', parseInstructions(eg));
console.log('2) input: ', parseInstructions(input));

/*
Wrong guesses:
    2) 2291705 too low
    2) 81678445 too low
Correct:
    1) 161085926
    2) 82045421
*/
