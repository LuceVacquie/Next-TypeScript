import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
    brand: string,
    model: string,
    year: number
}

const CarCard:FC<Props> = ({brand, model, year}) => {
    return(
        <div>
            <div>Make: {brand}</div>
            <div>Model: {model}</div>
            <div>Year: {year}</div>
        </div>
    )
}

export default CarCard;