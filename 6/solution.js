const fs = require('fs');
const eg = fs.readFileSync(require.resolve('./eg.txt')).toString().slice(0, -1);
const input = fs.readFileSync(require.resolve('./input.txt')).toString().slice(0, -1);

// Part 1 ---------------------------------------------------------------------
/*

  0123456789
0|....#.....
1|.........#
2|..........
3|..#.......
4|.......#..
5|..........
6|.#..^.....
7|........#.
8|#.........
9|......#...

Two arrays, one for columns and one for rows

I need to preserve the x y coordinate between arrays


*/

const walk = (string, index) => `${string.slice(0, index)}X${string.slice(index + 1)}`;

const placeholder = input => {
    const rows = input.split('\n');
    const size = rows[0].length;

    let y = rows.findIndex(row => row.includes('^'));
    let x = rows[y].indexOf('^');

    const columns = rows.map((row, index) => rows.map(i => i[index]).join(''));

    let direction = 'N';

    let inBounds = (x >= 0 && x < size) && (y >= 0 && y < size);



    // const goNorth = () => {};
    // const goSouth = () => {};
    // const goEast = () => {};
    // const goWest = () => {};

    while (inBounds) {

        switch (direction) {
            case ('N'): {
                const next = columns[x][y - 1];
                if (next === '#') {
                    direction = 'E';
                    x++;
                } else {
                    columns[x] =
                    y--;
                }
                break;
            }
            case ('S'): {
                const next = columns[x][y + 1];
                if (next === '#') {
                    direction = 'W';
                    x--;
                } else {

                    y++;
                }
                break;
            }
            case ('E'): {
                const next = columns[y][x + 1];
                if (next === '#') {
                    direction = 'S';
                    y++;
                } else {

                    x++;
                }
                break;
            }
            case ('W'): {
                const next = columns[y][x - 1];
                if (next === '#') {
                    direction = 'N';
                    y--;
                } else {

                    x--;
                }
                break;
            }
        }

        inBounds = (x >= 0 && x < size) && (y >= 0 && y < size);
    }

    return columns;
}

console.table(placeholder(eg));

// console.log('1) eg:    ', placeholder(eg));
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
