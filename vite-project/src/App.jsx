import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './Components/NavBar/NavBar';
import About from './Components/Pages/About';
import Search from './Components/Pages/Search';
import Contactus from './Components/Pages/Contactus'
import Homapage from './Components/Pages/Homapage';
import Footer from './Components/Footer/Footer.Jsx';
import DisplayPropertypage from './Components/Pages/DisplayPropertypage';
import Favourite from './Components/Pages/Favourite';



function App() {
 

  return (
   <>
   
    <Router>
        
          <NavBar/>
          <div>
            <Routes>
              <Route path="/about" element={<About/>} />
              <Route path="/" element={<Search />} />
              <Route path="/favourite" element={<Favourite />} />
              <Route path="/contact" element={< Contactus/>} /> 
              <Route path="/homepage" element={<Homapage/>} />
              <Route path ="/displayhome/:id" element={<DisplayPropertypage/>}/>
            </Routes>
          </div>
      </Router>
      <Footer/>
   </>
  )
}

export default App
