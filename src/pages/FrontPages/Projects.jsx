import React from 'react';
import Navbar from '../../components/Navbar'
import ProjectsComponent from '../../components/PageComponents/projects/ProjectsComponent'
import BackToTopButton from '../../components/BackToTopButton'
import PublicationYear from '../../components/PageComponents/publications/PublicationYear'
import Footer from '../../components/Footer';

const Projects = () => {
  
  
  return (
    <div>
         <Navbar/>
         <PublicationYear/>
         <ProjectsComponent/>
         <Footer />
         <BackToTopButton />
    </div>
  )
}

export default Projects
