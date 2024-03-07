import { createContext, useContext, useState } from "react";
// Creating an authentication context using createContext
const AuthContext=createContext(null)

// AuthProvider component manages user authentication state and provides login/logout functionality
export const AuthProvider=({children})=>{
    // Initializing user state with the token stored in localStorage
    const [user,setUser]=useState(localStorage.getItem("token"))

    // Function to update user state upon successful login
    const login=(user)=>{
        setUser(user)
    }
// Function to clear user token from localStorage upon logout
    const logout=()=>{
        localStorage.removeItem("token")
        setUser(null)
    }
    // Providing user state and login/logout functions to child components via context
    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )

}

// Custom hook useAuth provides access to user authentication state and functions
export const useAuth = () => {
    // Accessing authentication context using useContext hook
    return useContext(AuthContext);
};