import React, { useState, useRef, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../Context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useContext(StoreContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      };
      const path = currState === "Sign Up" ? "/api/users/signup" : "/api/users/login";
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.message || "Authentication failed");
        return;
      }
      // store token and user data
      if (data.token) localStorage.setItem("auth_token", data.token);
      if (data.data) login(data.data);
      setShowLogin(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          {/* ❌ close button */}
          <img
            src={assets.cross_icon}
            alt="close"
            onClick={() => setShowLogin(false)}  // closes popup
            style={{ cursor: "pointer" }}
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && <input ref={nameRef} type="text" placeholder="Name" required />}
          <input ref={emailRef} type="email" placeholder="Email" required />
          <input ref={passwordRef} type="password" placeholder="Password" required />
        </div>

        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the terms & conditions</p>
        </div>

        <p>
          {currState === "Sign Up"
            ? "Already have an account? "
            : "Don't have an account? "}
          <span
            onClick={() =>
              setCurrState(currState === "Sign Up" ? "Login" : "Sign Up")
            }
          >
            {currState === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;

