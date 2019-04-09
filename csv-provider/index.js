const fs = require('fs')
const parse = require('csv-parse')

module.exports = loadAsync = async (url) => {
    const file = await readFile(url);
    const parsed = await parseFile(file)

    return parsed
        .map(parseLine)
        .filter(filterMisspelled)
        .map(getTerm);
}


// Load file from disk
const readFile = url => new Promise((resolve, reject) => {
    fs.readFile(url, 'utf8', (err, contents) => {
        if (err) return reject(err);
        resolve(contents);
    });
});

// Parse csv
const parseFile = file => new Promise((resolve, reject) => {
    parse(file, {
        comment: '#'
    }, (err, output) => {
        if (err) return reject(err);
        resolve(output);
    })
})

// Parse line
const parseLine = str => str[0].split(';');

// Filter out misspelled 
const filterMisspelled = params => params[5] === 'False';

// Get term
const getTerm = params => params[0];