//REACT & NEXT
import React, {FC, createContext, useContext, useState} from 'react'
import { NextApiRequest, NextApiResponse } from 'next'

//BCRYPT, JWT & COOKIE
import { hash } from 'bcrypt'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'

//SQLITE
import {open} from 'sqlite'
import sqlite3 from 'sqlite3'

//OTHER FILES
import { guid } from './pages/api/guid'



interface AuthContextProps{
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    isRegistered: boolean,
    setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>,
    register: () => void,
    login: () => void,
    logout: () => void
}



const authContext = createContext<AuthContextProps | null>(null)

export const useAuthContext = () => useContext(authContext)



const AuthProvider:FC = ({children}) => {

    //STATES
    const[isRegistered, setIsRegistered] = useState(false)
    const[isLoggedIn, setIsLoggedIn] = useState(false)

    //REGISTER FUNCTION
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
    
            const user = await db.all('select * from user')
            res.json(user)
            })   
        } else {
            res.status(405).json({message: 'We only support POST'})
        }

        setIsRegistered(true)
    }

    //LOGIN FUNCTION
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
                        sameSite: 'strict',
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

        setIsLoggedIn(true)
    }

    //LOGOUT FUNCTION
    const logout = () => {
        
        //if jwt exists
        //if same jwt
        //delete jwt
        setIsLoggedIn(false)
    }

    //GO TO EXPORT
    const state = {
        isLoggedIn,
        setIsLoggedIn,
        isRegistered,
        setIsRegistered,
        register,
        login,
        logout
    }

    return(
        <authContext.Provider value={state}>{children}</authContext.Provider>
    )
}

export default AuthProvider;