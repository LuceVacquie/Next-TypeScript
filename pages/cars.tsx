import React from 'react'
import { NextPageContext, NextPage } from 'next'
import getData from './api/getData'
import CarCard from './components/cardCard'

interface Props {
    cars: any,
}

const Cars:NextPage<Props> = ({cars}) => {

    const carsList:Array{} = JSON.stringify(cars)
    console.log(carsList)
    return(
        <div>
            <h1>List of cars</h1>
            {carsList.map((car:Object) => {
                <CarCard key={car.id}/>
            })}
        </div>
    )
}

Cars.getInitialProps = async (context: NextPageContext) => {
    const json = await getData('http://localhost:3000/api/cars', context)
    return {cars: json}
}

export default Cars;