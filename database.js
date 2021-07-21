const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

async function openDb() {
    return sqlite.open({
        filename: './database.db',
        driver: sqlite3.Database
    });
}

async function setup() {
    const db = await openDb();
    
    await db.migrate({force: 'last'})

    const users = await db.all('SELECT * FROM user')
    console.log(JSON.stringify(users, null, 2))

    const vehicules = await db.all('SELECT * FROM vehicule')
    console.log(JSON.stringify(vehicules, null, 2))
}

setup()