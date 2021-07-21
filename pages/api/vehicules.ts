import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'


const getAllVehicules = (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'GET'){
        res.status(500).json({message: 'Sorry we only accept GET request'})
    }
    res.json({hello: 'world', method: req.method})
}

export default getAllVehicules;