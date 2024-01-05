import React from 'react'
import Navbar from '../../components/Navbar'
import AboutComponent from '../../components/PageComponents/AboutComponent'
import Footer from '../../components/Footer'
import BackToTopButton from '../../components/BackToTopButton'

const About = () => {
  return (
    <div>
         <Navbar/>
         <AboutComponent/>
         <Footer />
         <BackToTopButton/>
    </div>
  )
}

export default About
