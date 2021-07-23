import React, { useRef, useState } from 'react'
// import { useRouter } from 'next/router'
import {useAuthContext} from '../AuthProvider'

const Login = () => {

    const { handleLogin, emailRef, passwordRef }:any = useAuthContext()

    // const emailRef = useRef<HTMLInputElement>(null)
    // const passwordRef = useRef<HTMLInputElement>(null)

    // const router = useRouter()

    // const handleLogin = async () => {
    //     const response = await fetch('http://localhost:3000/api/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type' : 'application/json'
    //         },
    //         body: JSON.stringify({
    //             email: emailRef.current?.value,
    //             password: passwordRef.current?.value
    //         })
    //     })
    //     const json = await response.json()

    //     setIsLoggedIn(true)
        
    //     router.push('/')
    // }

    return(
        <div>
            <h1>Login</h1>
            <input type='text' placeholder='Email' ref={emailRef}/>
            <input type='password' placeholder='Password' ref={passwordRef}/>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login;