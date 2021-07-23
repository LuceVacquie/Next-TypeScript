import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'
import { guid } from './guid'


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
                const jwt = sign(claims, guid, {expiresIn: '1h'}) //second arg = GUID from an online generator
                
                //use cookie to keep the session
                res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development', // if want a https website
                    sameSite: 'strict', //or true
                    maxAge: 3600, //expiration time of the session
                    path: '/' //by default cookie path = /api -> don't want that
                }))

                res.json({message: 'Welcome back to the app'})
            
            } else {
                res.json({message: 'Oups, something went wrong!'})
            }
        }) 
    } else {
        res.status(405).json({message: 'We only support POST'})
    }
}

export default login;