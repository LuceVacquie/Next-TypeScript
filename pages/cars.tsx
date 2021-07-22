import React from 'react'
// import fetch from 'isomorphic-unfetch'
import { NextPageContext, NextPage } from 'next'
import getData from './api/getData'

interface Props {
    cars: any,
}

const Cars:NextPage<Props> = ({cars}) => {

    return(
        <div>
            <h1>List of cars</h1>
            {JSON.stringify(cars)}
        </div>
    )
}

Cars.getInitialProps = async (context: NextPageContext) => {
    const json = await getData('http://localhost:3000/api/cars', context)
    return {cars: json}
}

export default Cars;