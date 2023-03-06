const fs = require('fs');
const JSONStream = require('JSONStream');

module.exports.jsonParser = function jsonParser(pathToCreatedCsvFile) {

    let firstInput = true;
    let keys = [];
    let headers = '';

    // parsing each object in the JSON file to JS obj, one by one, then returning it as string through pipe

    const parser = JSONStream.parse('*', (user) => {

        if (firstInput) {
            keys = [...Object.keys(user).filter(key => key !== 'isActive')];        // Using first user object from the file to set up csv headers, assuming all user objects have the same keys
            for (let key of keys) {                                                 // and ensuring data is written in the same order for each user thereafter
                headers += `"${key.toUpperCase()}",`;
            }
            headers = headers.slice(0, -1) + '\n';                                      // Removing last comma and adding a line jump
            fs.writeFile(pathToCreatedCsvFile, '"sep=,"\n' + headers, { encoding: 'utf8', flag: 'w' }, err => err && console.log(err));
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
    })

    return parser;
};