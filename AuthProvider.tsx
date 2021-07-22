import React, {FC, createContext, useContext, useState} from 'react'

interface AuthContextProps{
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    isRegistered: boolean,
    setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>,
}

const authContext = createContext<AuthContextProps | null>(null)

export const useAuthContext = () => useContext(authContext)

const AuthProvider:FC = ({children}) => {

    const[isRegistered, setIsRegistered] = useState(false)
    const[isLoggedIn, setIsLoggedIn] = useState(false)

    const state = {
        isLoggedIn,
        setIsLoggedIn,
        isRegistered,
        setIsRegistered
    }

    return(
        <authContext.Provider value={state}>{children}</authContext.Provider>
    )
}

export default AuthProvider;