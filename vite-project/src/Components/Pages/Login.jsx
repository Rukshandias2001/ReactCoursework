import React, { useContext } from "react";
import "../CSS/Login.css";
import loginpage from "../images/login.webp";
import axios from "axios";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { user, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const register = async (e) => {
    
    e.preventDefault(); // Prevent form submission from reloading the page
    localStorage.setItem( 'username' ,user.username );
    localStorage.setItem('password',user.password);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register/login",
        user
      );
      if (!response) {
        console.log("no response");
      }

      if (response.status == 200) {
        alert("login successfull!");
        console.log(response);
        navigate("/search");
      } else if (response && response.data === 400) {
        alert("There is a user under those two data unsuccessful!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCHange = (e) => {
    const { name, value } = e.target;
    setUsername((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="form-signin w-100 m-auto">
      <form onSubmit={register}>
        <img className="mb-4" src={loginpage} alt="" width="72" height="57" />
        <h1 className="h3 mb-3 fw-normal">Please Login !</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="username"
            value={user.username}
            onChange={handleCHange}
          />
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={user.password}
            onChange={handleCHange}
          />
        </div>

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="remember-me"
            id="flexCheckDefault"
          />
          <label className="form-check-label" for="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
          Login in
        </button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
      </form>
    </div>
  );
};
