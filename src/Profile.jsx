import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { baseUrl } from "./constants"

const Profile = () => {
    const [user, setUser] = useState("")
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
    return (
        <div className="container">
            <h1 className="header">Welcome, {user.firstname}!</h1>
            <div className="profileSection">
                <div className="imageContainer">
                    <img
                        src={user.image} // Assuming images are stored on the server
                        alt="Profile"
                        className="profileImage"
                    />
                </div>
                <div className="detailsContainer">
                    <h2 className="name">
                        {user.firstname} {user.lastname}
                    </h2>
                    <p className="detail"><strong>Email:</strong> {user.email}</p>
                    <p className="detail"><strong>Course:</strong> {user.course}</p>
                    <p className="detail"><strong>Date of Birth:</strong> {user.dob}</p>
                    <p className="detail"><strong>State:</strong> {user.state}</p>
                    <p className="detail"><strong>Matric Number:</strong> {user.matricNumber}</p>
                    <p className="detail"><strong>Gender:</strong> {user.gender}</p>
                    
                </div>
            </div>
            <button className="logoutButton" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Profile