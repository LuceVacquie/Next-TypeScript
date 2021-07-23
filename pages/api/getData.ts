import React from 'react'
import { NextPageContext } from 'next'
import Router from 'next/router'

const getData = async (url: string, context: NextPageContext) => {
    const cookie = context.req?.headers.cookie
    
    const response = await fetch(url, {
        headers: {
            cookie: cookie!
        }
    })

    if(response.status === 401 && !context.req){
        Router.replace('/login')
    }

    if(response.status === 401 && context.req){
        context.res?.writeHead(302, {
            Location: 'http://localhost:3000/login'
        })
        context.res?.end()
    }

    const json = await response.json()
    return json
}

export default getData;