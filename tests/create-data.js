const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');

const testFile = path.join(__dirname, 'fake.json');

const writeStream = fs.createWriteStream(testFile)

for (let index = 0; index < 10000; index++) {
    const firstName = faker.name.firstName();
    const email = faker.internet.email(firstName);
    const age = faker.datatype.number({ min: 10, max: 100 });
    const salary = faker.random.numeric(4, { allowLeadingZeros: true })
    const isActive = faker.datatype.boolean()

    const user = {
        firstName,
        email,
        age,
        salary,
        isActive
    }
    writeStream.write(`${JSON.stringify(user)},`)
}

writeStream.end();