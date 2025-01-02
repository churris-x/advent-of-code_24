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

const route = input => {
    const rows = input.split('\n');
    const size = rows[0].length;

    let y = rows.findIndex(row => row.includes('^'));
    let x = rows[y].indexOf('^');

    const columns = rows.map((row, index) => rows.map(i => i[index]).join(''));

    let direction = 'N';

    let inBounds = (x >= 0 && x < size) && (y >= 0 && y < size);


    const goNorth = () => {
        direction = 'N';
        columns[x] = walk(columns[x], y);
        y--;
    };
    const goSouth = () => {
        direction = 'S';
        columns[x] = walk(columns[x], y);
        y++;
    };
    const goEast = () => {
        direction = 'E';
        rows[y] = walk(rows[y], x);
        x++;
    };
    const goWest = () => {
        direction = 'W';
        rows[y] = walk(rows[y], x);
        x--;
    };

    while (inBounds) {
        switch (direction) {
            case ('N'): {
                const next = columns[x][y - 1];
                if (next === '#') {goEast()} else goNorth();
                break;
            }
            case ('S'): {
                const next = columns[x][y + 1];
                if (next === '#') {goWest()} else goSouth();
                break;
            }
            case ('E'): {
                const next = rows[y][x + 1];
                if (next === '#') {goSouth()} else goEast();
                break;
            }
            case ('W'): {
                const next = rows[y][x - 1];
                if (next === '#') {goNorth()} else goWest();
                break;
            }
        }

        inBounds = (x >= 0 && x < size) && (y >= 0 && y < size);
    }

    const grid = rows.map((row, index) => row.split('').map((char, i) => {
        if (char === 'X') return 'X';
        if (columns[i][index] === 'X') return 'X';
        return char;
    }).join(''));

    // console.table(grid);

    return grid.join('').match(/X/g).length;
}

console.log('1) eg:    ', route(eg));
console.log('1) input: ', route(input));

// Part 2 ---------------------------------------------------------------------

// const placeholder = () => {};

// console.log('2) eg:    ', placeholder(eg));
// console.log('2) input: ', placeholder(input));

/*
Wrong guesses:

Correct:
    1) 4939
    2) 
*/
