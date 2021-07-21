import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import {open} from 'sqlite'
import sqlite3 from 'sqlite3'


const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    if(req.method === 'PUT') {
        const statement = await db.prepare('UPDATE user SET name=?, email=? where id=?')
        const result = await statement.run(req.body.name, req.body.email, req.query.id)
        // result.finalize()
    }

    const user = await db.get('select id, name, email from user where id = ?', [req.query.id])
    
    res.json(user)
}

export default getUserById;