const fs = require('fs');
const path = require('path');
const JSONStream = require('JSONStream');

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

    let firstInput = true;
    let keys = [];
    let title = '';

    // parsing each object in the JSON file to JS obj, one by one, then returning it as string through pipe

    const jsonParser = JSONStream.parse('*', (user) => {

        if (firstInput) {
            keys = [...Object.keys(user).filter(key => key !== 'isActive')];        // Using first user object from the file to set up csv headers, assuming all user objects have the same keys
            for (let key of keys) {                                                 // and ensuring data is written in the same order for each user
                title += `"${key.toUpperCase()}",`;
            }
            title = title.slice(0, -1) + '\n';                                      // Removing last comma and adding a line jump
            fs.writeFile(pathToCreatedCsvFile, '"sep=,"\n' + title, { encoding: 'utf8', flag: 'w' }, err => err && console.log(err));
            firstInput = false;
        }

        if (!user.isActive) return;                                                 // Filtering out inactive users

        let line = '';
        for (let key of keys) {
            if (!user[key]) line += '"unknown",'                               // Checking for missing key-value pairs in each user object
            else line += `"${user[key]}",`;
        }
        line = line.slice(0, -1) + '\n';
        return line;

    });

    if (!fs.existsSync(pathToJsonFile)) return console.log(`The input file with users data cannot be found at this path ${pathToJsonFile}, please ensure it is there before running this script.`);

    const readStream = fs.createReadStream(pathToJsonFile, 'utf-8');
    const writeStream = fs.createWriteStream(pathToCreatedCsvFile, 'utf-8');


    readStream
        .on('error', error => console.log('Error while reading:', error))
        .pipe(jsonParser)
        .pipe(writeStream)
        .on('error', error => console.log('Error while writing:', error))
        .on('finish', () => console.log(`A new CSV file was created at the following path ${pathToCreatedCsvFile}. If a file with the same name was already there, it was overwritten.`))
}

main(userData, csvFile);