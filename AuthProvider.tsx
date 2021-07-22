import React, {FC, createContext, useContext, useState} from 'react'

interface AuthContextProps{
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
    isRegistered: boolean,
    setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>,
    register: () => void,
    login: () => void,
    logout: () => void
}

const authContext = createContext<AuthContextProps | null>(null)

export const useAuthContext = () => useContext(authContext)

const AuthProvider:FC = ({children}) => {

    const[isRegistered, setIsRegistered] = useState(false)
    const[isLoggedIn, setIsLoggedIn] = useState(false)

    const register = () => {
        setIsLoggedIn(true)
        setIsRegistered(true)
    }

    const login = () => {
        setIsLoggedIn(true)
    }

    const logout = () => {
        setIsLoggedIn(false)
    }

    const state = {
        isLoggedIn,
        setIsLoggedIn,
        isRegistered,
        setIsRegistered,
        register,
        login,
        logout
    }

    return(
        <authContext.Provider value={state}>{children}</authContext.Provider>
    )
}

export default AuthProvider;