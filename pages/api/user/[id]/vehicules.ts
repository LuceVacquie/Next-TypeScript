import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import {open} from 'sqlite'
import sqlite3 from 'sqlite3'


const getVehiculesById = async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    const vehiculesByUser = await db.all('select * from vehicule where ownerId = ?', [req.query.id])
    
    res.json(vehiculesByUser)
}

export default getVehiculesById;