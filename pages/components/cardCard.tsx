import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
    brand: string,
    model: string,
    year: number
}

const CarCard:FC<Props> = ({brand, model, year}) => {
    return(
        <Container>
            <div>Make: {brand}</div>
            <div>Model: {model}</div>
            <div>Year: {year}</div>
        </Container>
    )
}

//STYLED COMPONENTS
const Container = styled.div`
    background-color: yellow;
`;

export default CarCard;