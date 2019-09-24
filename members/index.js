const csv = require('fast-csv');
const fs = require('fs');

function members() {
    async function find(column, value) {
        if (!value) {
            value = column;
            column = 'Sandbox_Info : UID';
        }

        const members = await this.read();
        id = members.findIndex(m => m[column] == value);
        if (id >= 0) {
            return members[id];
        }

        return false;
    }

    function read() {
        const members = [];
        return new Promise((resolve, reject) => {
            return fs.createReadStream(__dirname + "/members.csv")
                .pipe(csv.parse({headers: true}))
                .on('data', data => members.push(data))
                .on('end', () => resolve(members));
        })
    }

    async function write() {

    }

    return {
        find, read, write
    }
}

module.exports = members();
