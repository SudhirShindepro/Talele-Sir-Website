import React from 'react'
import Navbar from '../../components/Navbar'
import CoursesComponent from '../../components/PageComponents/courses/CoursesComponent'
import Footer from '../../components/Footer';
import BackToTopButton from '../../components/BackToTopButton';

const Courses = () => {
  return (
    <div>
         <Navbar/>
         <CoursesComponent/>
         <Footer />
         <BackToTopButton />
    </div>
  )
}

export default Courses
