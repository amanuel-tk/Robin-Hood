import { createContext, useContext, useState } from "react";

const AuthContext=createContext(null)

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(localStorage.getItem("token"))

    const login=(user)=>{
        setUser(user)
    }

    const logout=()=>{
        localStorage.removeItem("token")
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth=()=>{
    return useContext(AuthContext)
}