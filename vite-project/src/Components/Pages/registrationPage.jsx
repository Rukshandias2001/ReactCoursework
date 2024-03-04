import React from 'react'
import '../CSS/registration.css';
import loginpage from'../images/login.webp';


const registrationPage = () => {
  return (

  <div className="form-signin w-100 m-auto">
    <h1>Registration page</h1>
    <form>
  <img className="mb-4" src="loginpage" alt="" width="72" height="57"/>
  <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

  <div className="form-floating">
    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
    
  </div>
  <div className="form-floating">
    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
    
  </div>

  <div className="form-check text-start my-3">
    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
    <label className="form-check-label" for="flexCheckDefault">
      Remember me
    </label>
  </div>
  <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
  <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
</form>
  </div>

  )
}

export default registrationPage