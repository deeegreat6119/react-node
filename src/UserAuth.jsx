import React from 'react'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "./constants"

const useAuth = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`${baseUrl}/Profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
           .then(res => res.json())
           .then((data) => {
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

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/Signin")
    }
  return (user, handleLogout)
}

export default useAuth