import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/FrontPages/Login.jsx'
import EditHome from './pages/EditPages/EditHome';
import Home from './pages/FrontPages/Home.jsx';
import Projects from './pages/FrontPages/Projects';
import Publications from './pages/FrontPages/Publications';
import Courses from './pages/FrontPages/Courses';
import About from './pages/FrontPages/About';
import EditProjects from './pages/EditPages/EditProjects';
import EditPublications from './pages/EditPages/EditPublications';
import EditCourses from './pages/EditPages/EditCourses';
import EditAbout from './pages/EditPages/EditAbout';


function App() {
  
  return (
    <div className='App'>
     
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/project" element={<Projects/>} />
        <Route path="/publications" element={<Publications/>} />
        <Route path="/courses" element={<Courses/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/edit/home" element={<EditHome/>} />
      <Route path="/edit/project" element={<EditProjects/>} />
      <Route path="/edit/publications" element={<EditPublications/>} />
      <Route path="/edit/courses" element={<EditCourses/>} />
      <Route path="/edit/about" element={<EditAbout/>} />
      </Routes>

    </div>
  );
}

export default App;
