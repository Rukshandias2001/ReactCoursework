import React from 'react'
import '../CSS/navBar.css'

function NavBar() {
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary data-bs-theme=dark navbar bg-dark border-bottom border-body ">
        <div className="container-fluid">
        <a className="nav-link" href="/search">Search</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="favourite">Favourites</a>
              <a className="nav-link" href="/displayhome/:id">displayhome</a>
              <a className="nav-link" href="/login">login</a>
              <a className="nav-link" href="/">Registration</a>
              <a className="nav-link" href="/addProperty">Add</a>
              
            </div>
          </div>
        </div>
      </nav>
      
    </div>
  )
}

export default NavBar
