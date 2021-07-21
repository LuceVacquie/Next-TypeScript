import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcrypt'
import {open} from 'sqlite'
import sqlite3 from 'sqlite3'


const login = async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    if(req.method === 'POST') {
        compare(req.body.password, 10, async function(err, hash){

        const user = await db.get('select * from user where email = ?', [req.query.email])

        res.json(user)
        })   
    } else {
        res.status(405).json({message: 'We only support POST'})
    }
}

export default login;