import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginContext = createContext();

export function LoginProvider({ children }) {

    const navigate = useNavigate();

const isLoged = () => {
    let token = localStorage.getItem("token");

    if(token){
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        navigate("/");
    }
}

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axios.defaults.headers.common['Authorization'] = "";
    navigate("/");
}

    return (
        <LoginContext.Provider value={{isLoged, logout}}>
            {children}
        </LoginContext.Provider>
    )
}

