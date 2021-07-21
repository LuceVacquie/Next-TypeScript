import React from 'react'
import { NextApiRequest, NextApiResponse } from 'next'


const getUserById = (req: NextApiRequest, res: NextApiResponse) => {
    res.json({byId: req.query.id, message:'getUserById'})
}

export default getUserById;