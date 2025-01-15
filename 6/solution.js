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
    const columns = rows.map((row, index) => rows.map(i => i[index]).join(''));
    const size = rows[0].length;

    let y = rows.findIndex(row => row.includes('^'));
    let x = rows[y].indexOf('^');
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
            case ('N'):
                if (columns[x][y - 1] == '#') { goEast() } else goNorth();
                break;
            case ('S'):
                if (columns[x][y + 1] == '#') { goWest() } else goSouth();
                break;
            case ('E'):
                if (rows[y][x + 1] == '#') { goSouth() } else goEast();
                break;
            case ('W'):
                if (rows[y][x - 1] == '#') { goNorth() } else goWest();
                break;
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

// console.log('1) eg:    ', route(eg));
// console.log('1) input: ', route(input));

// Part 2 ---------------------------------------------------------------------
/*
    The guard will always hit obstacles in a row,
    three obstacles can always be made into a square

    Can it be as simple as all the number of obstaces shifted?

    eg has 8 obstacles, and 6 loop points

    ########
      123456

    ok, no but I don't understand why

    Some key understandings:

    1) It's actually quite easy to detect a loop,
    if the guard passes through the same point,
    with the same direction as before, he is in a loop

    2) All previous positions should be kept in a stack,
    since they are possible positions for a new "block" that causes a loop.
    This is what will be iterated on.

    # TODO: Store all previous positions in array

*/

const loop = input => {
    const rows = input.split('\n');
    const columns = rows.map((row, index) => rows.map(i => i[index]).join(''));
    const size = rows[0].length;

    let y = rows.findIndex(row => row.includes('^'));
    let x = rows[y].indexOf('^');
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

    const obstacles = {};

    let isLooping = false;

    const checkLoop = (x, y, direction) => (obstacles[`${x},${y}`] === direction);

    while (inBounds && !isLooping) {
        switch (direction) {
            case ('N'):
                if (columns[x][y - 1] == '#') {
                    if (checkLoop(x, y, direction)) isLooping = true;
                    obstacles[`${x},${y}`] = direction;
                    goEast();
                } else goNorth();
                break;
            case ('S'):
                if (columns[x][y + 1] == '#') {
                    if (checkLoop(x, y, direction)) isLooping = true;
                    obstacles[`${x},${y}`] = direction;
                    goWest();
                } else goSouth();
                break;
            case ('E'):
                if (rows[y][x + 1] == '#') {
                    if (checkLoop(x, y, direction)) isLooping = true;
                    obstacles[`${x},${y}`] = direction;
                    goSouth();
                } else goEast();
                break;
            case ('W'):
                if (rows[y][x - 1] == '#') {
                    if (checkLoop(x, y, direction)) isLooping = true;
                    obstacles[`${x},${y}`] = direction;
                    goNorth();
                } else goWest();
                break;
        }

        inBounds = (x >= 0 && x < size) && (y >= 0 && y < size);
    }

    // const grid = rows.map((row, index) => row.split('').map((char, i) => {
    //     if (char === 'X') return 'X';
    //     if (columns[i][index] === 'X') return 'X';
    //     return char;
    // }).join(''));

    // console.table(grid);

    // return grid.join('').match(/X/g).length;

    console.log({isLooping});

    return obstacles
    // return Object.keys(obstacles).length - 2;
}

console.log('2) eg:    ', loop(eg));
// console.log('2) input: ', loop(input));

/*
Wrong guesses:
    2) 135 too low

Correct:
    1) 4939
    2) 
*/
