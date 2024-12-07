const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/*
NOTE => always evaluated left-to-right

for each number -> add it, or multiply it

make a option tree

[9 7 18 13]

9 + 7 + 18 + 13
           * 13
      * 18 + 13
           * 13
  * 7 + 18 + 13
           * 13
      * 18 + 13
           * 13

*/

const sumMultiply = input => input
    .split('\n')
    .map(equation => {
        const colon = equation.indexOf(':');

        const total = Number(equation.slice(0, colon));
        const numbers = equation
            .slice(colon + 2)
            .split(' ')
            .map(i => Number(i));

        const recursiveSum = (array, total, results=[]) => {
            if (!array.length) return results.push(total);

            recursiveSum(array.slice(1), (total ?? 0) + array[0], results);
            recursiveSum(array.slice(1), (total ?? 1) * array[0], results);

            return results;
        };

        const results = recursiveSum(numbers);

        if (results.includes(total)) return total;
        return 0;
    })
    .reduce((sum, item) => sum + item, 0);

console.log('1) eg:    ', sumMultiply(eg));
console.log('1) input: ', sumMultiply(input));


// Part 2 ---------------------------------------------------------------------

const concatenate = input => input
    .split('\n')
    .map(equation => {
        const colon = equation.indexOf(':');

        const totalTest = Number(equation.slice(0, colon));
        const numbers = equation
            .slice(colon + 2)
            .split(' ')
            .map(i => Number(i));

        const recursiveSum = (array, total, results=[]) => {
            if (!array.length) return results.push(total);
            if (total > totalTest) return results.push('invalid');

            recursiveSum(array.slice(1), Number(`${(total ?? '')}${array[0]}`), results);
            recursiveSum(array.slice(1), (total ?? 0) + array[0], results);
            recursiveSum(array.slice(1), (total ?? 1) * array[0], results);

            return results;
        };

        const results = recursiveSum(numbers);

        if (results.includes(totalTest)) return totalTest;
        return 0;
    })
    .reduce((sum, item) => sum + item, 0);

console.log('2) eg:    ', concatenate(eg));
console.log('2) input: ', concatenate(input)); // takes about 4 seconds (0_0)

/*
Wrong guesses:

Correct:
    1) 945512582195
    2) 271691107779347
*/
