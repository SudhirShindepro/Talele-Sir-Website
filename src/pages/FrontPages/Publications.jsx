import React from 'react'
import Navbar from '../../components/Navbar'
import PublicationsComponent from '../../components/PageComponents/publications/PublicationsComponent'
import Footer from '../../components/Footer'
import BackToTopButton from '../../components/BackToTopButton'

const Publications = () => {
  return (
    <div>
         <Navbar/>
         <PublicationsComponent/>
         <Footer/>
         <BackToTopButton/>
    </div>
  )
}

export default Publications
