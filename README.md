# Advent of code 2024
Solutions to each day, in the following format:

```bash
1                   # day
├── eg.txt          # example input
├── input.txt       # actual puzzle input
├── solution.js     # contains the puzzle solution
└── todo.txt        # puzzle preamble and premise
```

## Use
1. Run `$ npm i` to install `dotenv`.

2. Run `$ npm start`, you will be prompted for your AoC session token (cookie) to fetch your puzzle inputs. You can also manually write it to the `.env` file with the key `AUTH_TOKEN=2343223432...`

3. Run `$ npm run fetch <days>` to fetch the desired days, you can fetch many days at once with brace expansion, eg: `$ npm run fetch {1..5}` will translate to `$ npm run fetch 1 2 3 4 5`
4. Run puzzles with `$ node <day>/solution.js` if the coresponding folder existis

## NPM scripts
- `$ npm run fetch <days>` or input which days you want to fetch
- `$ npm run delete <days>` or input which days you want to delete, confirm with <kbd>y</kbd>

## Todo:
- [ ] Parse and download the task exercise as well -> [This extension](https://github.com/deathau/markdownload) works particularly well
- [ ] Add functionality for multiple examples? Array?

## FAQ
- How to get your Auth token
    - Log in to the advent of code website, open the inspector got to Cookies. Click on `session` and copy the value.

## Previous years
- [2022](https://github.com/churris-x/advent-of-code_22)
- [2023](https://github.com/churris-x/advent-of-code_23)

## License

My solutions are released under the [MIT License][mit].
Puzzles and inputs belong to [Advent of Code][aoc]

[mit]: http://www.opensource.org/licenses/MIT
[aoc]: https://adventofcode.com/2023/about#legal
