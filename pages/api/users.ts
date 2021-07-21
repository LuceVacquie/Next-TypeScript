import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import sqlite from 'sqlite'
// import sqlite3 from 'sqlite3'

// async function openDb() {
//     return sqlite.open({
//         filename: '../../database.db',
//         driver: sqlite3.Database
//     });
// }

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await sqlite.open('./mydb.sqlite')

    const users = await db.all('select * from user')
    
    res.json(users)
}

export default getUsers;