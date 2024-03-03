import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Search from './Components/Pages/Search';
import Contactus from './Components/Pages/Contactus';
import Homapage from './Components/Pages/Homapage';
import Footer from './Components/Footer/Footer.Jsx';
import DisplayPropertypage from './Components/Pages/DisplayPropertypage';
import Favourite from './Components/Pages/Favourite';
import DisplaySchema from './Components/Pages/DisplaySchema';
import { Login } from './Components/Pages/Login';

export const UserContext = createContext();

function App() {
  const [api, setApi] = useState([]);
  const contextValue = {
    api, 
    setApi
  };

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <Router>
          <NavBar/>
          <div>
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/favourite" element={<Favourite />} />
              <Route path="/contact" element={<Contactus/>} /> 
              <Route path="/homepage" element={<Homapage/>} />
              <Route path="/Schema" element={<DisplaySchema/>}/>
              <Route path="/displayhome/:id" element={<DisplayPropertypage/>}/>
            </Routes>
          </div>
        </Router>
      </UserContext.Provider>
      <Footer/>
    </>
  );
}

export default App;
