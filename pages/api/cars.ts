import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import {open} from 'sqlite'
import sqlite3 from 'sqlite3'
import { authenticated } from './users'


export default authenticated (
    
    async function getCars(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    const cars = await db.all('select * from car')
    
    res.json(cars)
})