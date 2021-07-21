import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'
import {open} from 'sqlite'
import sqlite3 from 'sqlite3'


const getVehiculeById = async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    const vehicule = await db.get('select * from vehicule where id = ?', [req.query.id])
    
    res.json(vehicule)
}

export default getVehiculeById;