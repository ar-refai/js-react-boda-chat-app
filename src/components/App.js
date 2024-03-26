import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes ,Route } from "react-router-dom";
import Login from "./Login";
import Chats from "./Chats";
import { AuthContextProvider } from "../context/AuthContext";


function App() {


  return (
    <div className="h-screen" style={{fontFamily:'avenir'}}>
      <Router>
      <AuthContextProvider>
        <Routes>
          <Route path='/' Component={Login} />
          <Route path='/chats' Component={Chats} />

        </Routes>
      </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
