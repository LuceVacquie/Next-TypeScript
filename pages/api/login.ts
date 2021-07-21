import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'


const login = async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    if(req.method === 'POST') {
        const user = await db.get('select * from user where email = ?', [req.body.email])

        compare(req.body.password, user.password, function(err, result){
            if(!err && result){
                const claims = {sub: user.id}
                const jwt = sign(claims, 'a505557c-c0ab-4f7f-bd19-842ae4d6bdb0') //second arg = GUID from an online generator
                
                res.json({authToken: jwt})
            } else {
                res.json({message: 'Oups, something went wrong!'})
            }
        }) 
    } else {
        res.status(405).json({message: 'We only support POST'})
    }
}

export default login;