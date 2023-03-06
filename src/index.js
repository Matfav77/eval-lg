const fs = require('fs');
const path = require('path');
const { jsonParser } = require('./jsonParser');

const userData = path.join(__dirname, '../data/users.json');
const csvFile = path.join(__dirname, '../data/users.csv');

// Path to basic test files.
// const largeTestData = path.join(__dirname, '../tests/fake.json');
// const largeTestOutput = path.join(__dirname, '../tests/fake.csv');
// const emptyFileTest = path.join(__dirname, '../tests/empty.json');
// const emptyTestOutput = path.join(__dirname, '../tests/empty.csv');
// const unequalKeysTest = path.join(__dirname, '../tests/unequalKeys.json');
// const unequalKeysTestOutput = path.join(__dirname, '../tests/unequalKeys.csv');


async function main(pathToJsonFile, pathToCreatedCsvFile) {

    const parser = jsonParser(pathToCreatedCsvFile);

    if (!fs.existsSync(pathToJsonFile)) return console.log(`The input file with users data cannot be found at this path ${pathToJsonFile}, please ensure it is there before running this script.`);

    const readStream = fs.createReadStream(pathToJsonFile, 'utf-8');
    const writeStream = fs.createWriteStream(pathToCreatedCsvFile, 'utf-8');

    readStream
        .on('error', error => console.log('Error while reading:', error))
        .pipe(parser)
        .pipe(writeStream)
        .on('error', error => console.log('Error while writing:', error))
        .on('finish', () => console.log(`A new CSV file was created at the following path ${pathToCreatedCsvFile}. If a file with the same name was already there, it was overwritten.`))
}


main(userData, csvFile);