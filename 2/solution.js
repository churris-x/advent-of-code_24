const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------

const placeholder = input => input
    .split('\n')
    .map(i => i.split(' ').map(i => Number(i)))
    .reduce((totalSafe, report) => {
        return totalSafe + report
            .reduce(([safe, increasing], number, index, array) => {
                if (safe === 0) return [0, increasing]

                const prev = array[index - 1]

                if (!prev) return [1, number - array[index + 1] < 0]

                if (prev - number === 0) return [0, increasing]
                if (Math.abs(prev - number) > 3) return [0, increasing]

                if (increasing && prev - number < 0) return [1, true]
                if (!increasing && prev - number > 0) return [1, false]

                return [0, null]

            }, [1, null])[0]
    }, 0)

console.log('1) eg: ', placeholder(eg));
console.log('1) input: ', placeholder(input));

// Part 2 ---------------------------------------------------------------------

const analyseReport = report => report
    .reduce(([safe, increasing, failed], number, index, array) => {
        if (safe === 0) return [0, increasing, failed]

        const prev = array[index - 1]

        if (!prev) return [1, number - array[index + 1] < 0, failed]

        if (prev - number === 0) return [0, increasing, failed ?? [prev, index -1]]
        if (Math.abs(prev - number) > 3) return [0, increasing, failed ?? [prev, index -1]]

        if (increasing && prev - number < 0) return [1, true, failed]
        if (!increasing && prev - number > 0) return [1, false, failed]

        return [0, null, failed ?? [prev, index -1]]

    }, [1, null, null])


const placeholder2 = input => input
    .split('\n')
    .map(i => i.split(' ').map(i => Number(i)))
    .reduce((totalSafe, report) => {
        let safety = analyseReport(report)

        if (safety[0] === 0) {
            safety = analyseReport(report.filter((item, index) => !(item === safety[2][0] && index === safety[2][1])))
        }

        if (safety[0] === 0) {
            safety = analyseReport(report.filter((item, index) => !(item === report[safety[2][1] + 1] && index === safety[2][1] + 1)))
        }


        safety = safety[0]


        return totalSafe + safety
    }, 0)

console.log('2) eg: ', placeholder2(eg));
console.log('2) input: ', placeholder2(input));

/*
Wrong guesses:
    1) 14
    2) 304
    2) 280 too low
Correct:
    1) 
    2) 
*/
