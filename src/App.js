import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import User from "./components/User";
import Navbar from "./components/Navbar";
import Main1 from "./components/Main1";
import Main2 from "./components/Main2";
import { BrowserRouter as Router,Routes ,Route} from "react-router-dom";

function App() {
  

  return (

    <Router>
    <div className="">
      <Navbar />
      {/* main content */}

      <div className="container">
        <Routes>

      <Route exact path='/' Component={Main1}></Route>
      <Route exact path='/main2' Component={Main2}></Route>


        </Routes>

      
      
      </div>

    </div>
    </Router>
  );
}

export default App;
