import React from 'react'
import CarCard from './components/cardCard'
import carsList from '../MOCK_DATA.json'

const Cars = () => {

    return(
        <div>
            <h1>List of cars</h1>
            {carsList.map((car) => (
                <CarCard 
                    key={car['vin']} 
                    brand={car['make']} 
                    model={car['model']} 
                    year={car['year']}
                />
            ))}
        </div>
    )
}

export default Cars;