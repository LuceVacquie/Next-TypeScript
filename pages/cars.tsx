import React from 'react'
import { NextPageContext, NextPage } from 'next'
import getData from './api/getData'
import CarCard from './components/cardCard'
import carsList from '../MOCK_DATA.json'

// interface Props {
//     cars: any,
// }

// interface Car {
//     make: string,
//     model: string,
//     vin: string,
//     year: number
// }

const Cars = () => {

    // const carsList = JSON.stringify(cars)
    return(
        <div>
            <h1>List of cars</h1>
            {carsList.map((car) => {
                <CarCard 
                    key={car.vin} 
                    brand={car.make} 
                    model={car.model} 
                    year={car.year}
                />
            })}
        </div>
    )
}

// Cars.getInitialProps = async (context: NextPageContext) => {
//     const json = await getData('http://localhost:3000/api/cars', context)
//     return {cars: json}
// }

export default Cars;