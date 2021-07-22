import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import {open} from 'sqlite'
import sqlite3 from 'sqlite3'


const getCarsById = async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    const carsByUser = await db.all('select * from car where ownerId = ?', [req.query.id])
    
    res.json(carsByUser)
}

export default getCarsById;