require('dotenv').config()
const fs = require('fs');

const { AUTH_TOKEN } = process.env;
const file = process.argv[1];

// TODO(Fran): check if no day use Date.getDate();
// TODO(Fran): add year param? new Date(`1/1/${21}`).getFullYear() to allow 2 digit
// TODO(Fran): only log relative file path, not full path

const getInputByDay = async day => {
    if (!AUTH_TOKEN) throw `${file} is missing AUTH_TOKEN`;
    if (!day || isNaN(day)) throw `${file} needs a day number, got instead: ${day}`;
    if (day < 1 || day > 25) throw `${file}: day should be between 1-25, got instead: ${day}`;

    const url = `https://adventofcode.com/2023/day/${day}/input`;
    // TODO(Fran): try catch this
    const response = await fetch(url, {
        'headers': {
            'cookie': `session=${AUTH_TOKEN}`,
        }
    });
    const data = await response.text();
    return data;
};

// Fetches and saves input to a file when this file is called
const day = process.argv[2];

if (day) {
    (async () => {
        try {
            const input = await getInputByDay(day);
            
            // TODO(Fran): check if folder already exists, if not create it
            await fs.writeFile(`${day}/input.txt`, input, error => { 
                if (error) throw error;
                console.log(`Input for day ${day} wrote successfuly.`);
            });
        } catch (error) {
            console.error(error)
        }
    })();
}

module.exports = {
    getInputByDay,
};
