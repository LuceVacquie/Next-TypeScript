import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'


const getVehiculeById = (req: NextApiRequest, res: NextApiResponse) => {
    res.json({byId: req.query.id, message: 'getVehiculeById'})
}

export default getVehiculeById;