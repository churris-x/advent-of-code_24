const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/*

55|44 -> 55 must always be behind 44


get all relavant rules with a filter `if rule.includes(44)`

sort by the second number, what ever it is


if (line.includes(a))


61,13,29 => n = 3

worst case is 23 choose 2
low likelyhood of rules not being fully used

'61|13', '61|29', '29|13

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

const getPages = input => {
    const [rulebook, batch] = input.split('\n\n');

    return batch.split('\n').map(example => {
        const pages = example.split(',')

        const combinations = nChooseK(pages, 2);
        const validRules = [];

        for (const [a, b] of combinations) {
            const rule = `${a}|${b}`;
            const flip = `${b}|${a}`;

            if (rulebook.includes(rule)) validRules.push(rule);
            if (rulebook.includes(flip)) validRules.push(flip);
        }

        const valid = validRules.every(rule => {
            const [a, b] = rule.split('|');

            if (pages.indexOf(a) > pages.indexOf(b)) return false
            return true
        })

        if (valid) return Number(pages[pages.length / 2 - .5])
        return 0
    })
    .reduce((sum, page) => sum + page, 0)
};

console.log('1) eg:    ', getPages(eg));
// console.log('1) input: ', getPages(input));

// Part 2 ---------------------------------------------------------------------
/*

97     61     53     29     13
97|61  61|53  53|29  29|13
97|53  61|29  53|13
97|29  61|13
97|13

*/

const getCorrectPages = input => {
    const [rulebook, batch] = input.split('\n\n');

    return batch.split('\n').map(example => {
        const pages = example.split(',')

        const combinations = nChooseK(pages, 2);
        const validRules = [];

        for (const [a, b] of combinations) {
            const rule = `${a}|${b}`;
            const flip = `${b}|${a}`;

            if (rulebook.includes(rule)) validRules.push(rule);
            if (rulebook.includes(flip)) validRules.push(flip);
        }

        const valid = validRules.map(rule => {
            const [a, b] = rule.split('|');

            if (pages.indexOf(a) > pages.indexOf(b)) return [`${a}|${b}`, false]
            return [`${a}|${b}`, true]
        })


        return valid

        // return Number(pages[pages.length / 2 - .5])
    })
    // .reduce((sum, page) => sum + page, 0)
};

console.log('2) eg:    ', getCorrectPages(eg));
// console.log('2) input: ', getCorrectPages(input));

/*
Wrong guesses:

Correct:
    1) 4462
    2) 
*/


