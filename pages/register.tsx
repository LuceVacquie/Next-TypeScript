import React, { useRef, useState } from 'react'
// import { useRouter } from 'next/router'
import {useAuthContext} from '../AuthProvider'

const Register = () => {
    // const nameRef = useRef<HTMLInputElement>(null)
    // const emailRef = useRef<HTMLInputElement>(null)
    // const passwordRef = useRef<HTMLInputElement>(null)

    const { handleRegistration, nameRef, emailRef, passwordRef }:any = useAuthContext()

    // const router = useRouter()

    // const handleRegistration = async () => {
    //     const response = await fetch('http://localhost:3000/api/register', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type' : 'application/json'
    //         },
    //         body: JSON.stringify({
    //             name: nameRef.current?.value,
    //             email: emailRef.current?.value,
    //             password: passwordRef.current?.value
    //         })
    //     })
    //     const json = await response.json()

    //     router.push('/')
    // }

    return(
        <div>
            <h1>Register</h1>
            {/* <form onSubmit={handleRegistration}> */}
                <input type='text' placeholder='Name' ref={nameRef}/>
                <input type='text' placeholder='Email' ref={emailRef}/>
                <input type='password' placeholder='Password' ref={passwordRef}/>
                <button onClick={handleRegistration}>Register</button>
            {/* </form> */}
            
        </div>
    )
}

export default Register;