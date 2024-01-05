import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
<header className="text-gray-900  bg-white body-font fixed w-full top-0" >
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <Link to="/login" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <span className="ml-3 text-xl">Prof. Kiran Talele</span>
    </Link>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link to="/" className="mr-5 hover:text-red-400">Home</Link>
      <Link to="/project" className="mr-5 hover:text-red-400">Projects</Link>
      <Link to="/publications" className="mr-5 hover:text-red-400">Publications</Link>
      <Link to="/courses" className="mr-5 hover:text-red-400">Courses</Link>
      <Link to="/about" className="mr-5 hover:text-red-400">About Me</Link>
    </nav>
  </div>
</header>
  );
}

export default Navbar;







