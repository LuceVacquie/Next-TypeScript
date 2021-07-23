//REACT & NEXT
import React, {FC, createContext, useContext, useState, useRef} from 'react'
import { useRouter } from 'next/router'



interface AuthContextProps{
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    isRegistered: boolean,
    setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>,
    handleRegistration: () => void,
    // nameRef: <HTMLInputElement>,
    // emailRef: <HTMLInputElement>,
    // passwordRef: <HTMLInputElement>,
    handleLogin: () => void,
    handleLogout: () => void
}



const authContext = createContext<AuthContextProps | null>(null)

export const useAuthContext = () => useContext(authContext)



const AuthProvider:FC = ({children}) => {

    //STATES
    const[isRegistered, setIsRegistered] = useState(false)
    const[isLoggedIn, setIsLoggedIn] = useState(false)

    //REGISTER FUNCTION
    const nameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const router = useRouter()

    const handleRegistration = async () => {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            })
        })
        const json = await response.json()

        router.push('/')
    }

    //LOGIN FUNCTION
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

        setIsLoggedIn(true)
        
        router.push('/')
    }

    //LOGOUT FUNCTION
    const handleLogout = () => {
        
        //if jwt exists
        //if same jwt
        //delete jwt
        setIsLoggedIn(false)
    }

    //GO TO EXPORT
    const state = {
        isLoggedIn,
        setIsLoggedIn,
        isRegistered,
        setIsRegistered,
        nameRef,
        emailRef,
        passwordRef,
        handleRegistration,
        handleLogin,
        handleLogout
    }

    return(
        <authContext.Provider value={state}>{children}</authContext.Provider>
    )
}

export default AuthProvider;