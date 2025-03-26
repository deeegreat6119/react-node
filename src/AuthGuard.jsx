// import React, { useEffect } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { baseUrl } from "./constants"

const AuthGuard = ({children}) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        setIsLoading(true)
        fetch(`${baseUrl}/Profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
           .then(res => res.json())
           .then((data) => {
            setIsLoading(false)
            if (data.success) {
                setUser(data.data)
            } else {
                navigate("/Signin")
            }
           })
           .catch((error)=> {
            console.error(error)
            navigate("/Signin")
            localStorage.removeItem("token")
           })
    }, [navigate]);
    if (isLoading){
        return <div>Loading...</div>
    }else if(user){
        return <>{children}</>
    }
}

export default AuthGuard