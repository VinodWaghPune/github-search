import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-base-100 w-[100%] border-2 border-gray-400">
      <a className="btn btn-wide text-xl"> <Link to='/'> Main1 (with useState)</Link></a>
      <a className="btn btn-ghost text-xl"><Link to='/main2'> Main2 (with useReducer)</Link></a>
     
      
    </div>
  );
}

export default Navbar;
