import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Search from "./Components/Pages/Search";
import Contactus from "./Components/Pages/Contactus";
import Homapage from "./Components/Pages/Homapage";
import Footer from "./Components/Footer/Footer.Jsx";
import DisplayPropertypage from "./Components/Pages/DisplayPropertypage";
import Favourite from "./Components/Pages/Favourite";
import DisplaySchema from "./Components/Pages/DisplaySchema";
import { Login } from "./Components/Pages/Login";
import Registration from "./Components/Pages/Registration";

export const UserContext = createContext();

function App() {
  const [api, setApi] = useState([]);
  const [user, setUsername] = useState({ username: "", password: "" });

  const contextValue = {
    api,
    setApi,
    user,
    setUsername,
  };

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <BrowserRouter>
          <NavBar />
          <div>
            <Routes>
              <Route path="/" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/favourite" element={<Favourite />} />
              <Route path="/contact" element={<Contactus />} />
              <Route path="/homepage" element={<Homapage />} />
              <Route path="/Schema" element={<DisplaySchema />} />
              <Route
                path="/displayhome/:id"
                element={<DisplayPropertypage />}
              />
              <Route path="/registration" element={<Registration />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
      <Footer />
    </>
  );
}

export default App;
