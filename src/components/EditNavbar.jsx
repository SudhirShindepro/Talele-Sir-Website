import React from "react";
import { Link } from "react-router-dom";

function EditNavbar() {
  return (
<header className="text-gray-900  bg-white body-font fixed w-full top-0 " >
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <span className="ml-3 text-xl">Prof. Kiran Talele</span>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link to="/edit/home" className="mr-5 hover:text-red-400">Home</Link>
      <Link to="/edit/project" className="mr-5 hover:text-red-400">Projects</Link>
      <Link to="/edit/publications" className="mr-5 hover:text-red-400">Publications</Link>
      <Link to="/edit/courses" className="mr-5 hover:text-red-400">Courses</Link>
      <Link to="/edit/about" className="mr-5 hover:text-red-400">About Me</Link>
    </nav>
  </div>
</header>
  );
}

export default EditNavbar;
