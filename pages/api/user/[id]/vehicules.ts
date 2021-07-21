import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'


const getVehiculesByUser = (req: NextApiRequest, res: NextApiResponse) => {
    res.json({byId: req.query.id, message:'getVehiculesByUser'})
}

export default getVehiculesByUser;