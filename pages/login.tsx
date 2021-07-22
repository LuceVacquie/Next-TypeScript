import React, { useRef, useState } from 'react'

const Login = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const [message, setMessage] = useState<any>(null)

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            })
        })
        const json = await response.json()

        setMessage(json)
    }

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