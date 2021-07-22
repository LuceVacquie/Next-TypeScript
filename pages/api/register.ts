import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcrypt'
import {open} from 'sqlite'
import sqlite3 from 'sqlite3'


const register = async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    if(req.method === 'POST') {
        hash(req.body.password, 10, async function(err, hash){

        const statement = await db.prepare(
            'INSERT INTO user (name, email, password) values (?, ?, ?)'
        )
        const result = await statement.run(
            req.body.name, 
            req.body.email, 
            hash
        )
        // result.finalize()

        const user = await db.all('select * from user')
        res.json(user)
        })   
    } else {
        res.status(405).json({message: 'We only support POST'})
    }
}

export default register;