const fs = require('fs');

// NOTE(Fran): this is still WIP
const getFile = async path => {
    
    const fullPath = process.argv[1];
    const pwd = fullPath.slice(0, fullPath.lastIndexOf('/'))

    try {
        const file = await fs.readFileSync(pwd?.concat(path.slice(1)));
        return file.toString().slice(0, -1);
    } catch (error) {
        console.log(error);
        console.log(`File "${path}" not found!`);
        return '';
    }
}

module.exports = getFile;
