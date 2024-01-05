import React from 'react'
import Navbar from '../../components/Navbar';
import HomeComponent from '../../components/PageComponents/HomeComponent';
import Footer from '../../components/Footer';

function Home() {
  return (
    <div>
      <Navbar/>
      <HomeComponent/>
      <Footer/>
    </div>
  )
}

export default Home
