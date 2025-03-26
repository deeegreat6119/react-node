import React from "react";
import {baseUrl} from "./constants";
import { useNavigate } from "react-router";
const Signin = () => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(emailRef.current.value, passwordRef.current.value);
    fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailRef.current.value, password: passwordRef.current.value }),
    })
    .then((res)=> res.json())
    .then((data) => {
        setIsLoading(false);
        localStorage.setItem("token", data.token);
        navigate("/profile");
    })
    .catch((error) => {
        setIsLoading(false);
        console.error(error);
    });
  };
  return (
    <div className="signin-container">
  <div className="signin-box">
    <h1>Sign in</h1>
    <form className="signin-form">
      <div className="input-group">
        <i className="fas fa-envelope"></i>
        <input
          ref={emailRef}
          type="text"
          placeholder="Email"
          className="signin-input"
        />
      </div>
      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="signin-input"
        />
      </div>
      <button onClick={handleSubmit} type="submit" className="signin-button">
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  </div>
</div>
  );
};

export default Signin;
