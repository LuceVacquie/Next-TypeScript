import React from 'react'
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import {open} from 'sqlite'
import sqlite3 from 'sqlite3'
import { guid } from './guid'
import { verify } from 'jsonwebtoken'

export const authenticated = (fn: NextApiHandler) => async (
    req: NextApiRequest, 
    res: NextApiResponse
) => {
    verify(req.cookies.auth!, guid, async function(err, decoded){
        if(!err && decoded){
            return await fn(req, res)
        }
        res.status(401).json({message: 'You are not authenticated'})
    })
}

const getUsers = authenticated(async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    const users = await db.all('select id, email, name from user')
    
    res.json(users)
})

export default getUsers;