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

    const cars = await db.all('SELECT * FROM car')
    console.log(JSON.stringify(cars, null, 2))
}

setup()