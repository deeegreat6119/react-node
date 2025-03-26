import React from 'react'
import { useEffect, useState } from "react";

const Home = () => {
  const baseUrl = "http://localhost:5000/";
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}students`)
      .then((res) => res.json())
      .then((response) => {
        setStudents(response.students);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="profile-box">
      {students.map((student) => (
        <div className="profile-container" key={student.id}>
          <div className="profile-header">
            <h1>Student Profile</h1>
          </div>
          <div className="profile-content">
            <div className="profile-image">
              <img src={student.passport} alt="Student Passport" />
            </div>
            <div className="profile-details">
              <p>
                <strong>Name:</strong> {student.firstname} {student.lastname}
              </p>
              <p>
                <strong>Matric Number:</strong> {student.matricNumber}
              </p>
              <p>
                <strong>Email:</strong> {student.email}
              </p>
              <p>
                <strong>Phone:</strong> {student.phone}
              </p>
              <p>
                <strong>Gender:</strong> {student.gender}
              </p>
              <p>
                <strong>Date of Birth:</strong> {student.dob}
              </p>
              <p>
                <strong>State:</strong> {student.state}
              </p>
              <p>
                <strong>Course:</strong> {student.course}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
