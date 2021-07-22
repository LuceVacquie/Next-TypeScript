import React from 'react'
// import fetch from 'isomorphic-unfetch'
import { NextPageContext, NextPage } from 'next'
import getData from './api/getData'

interface Props {
    users: any,
}

const Profile:NextPage<Props> = ({users}) => {

    return(
        <div>
            <h1>User Profile</h1>
            {JSON.stringify(users)}
        </div>
    )
}

Profile.getInitialProps = async (context: NextPageContext) => {
    const json = await getData('http://localhost:3000/api/users', context)
    return {users: json}
}

export default Profile;