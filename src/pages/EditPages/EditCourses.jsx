import React from 'react'
import { useNavigate } from "react-router-dom";
import EditNavbar from '../../components/EditNavbar'
import CreateCourseForm from '../../components/PageComponents/courses/CreateCourseForm'
import Footer from '../../components/Footer'

const EditCourses = () => {

  const navigate = useNavigate();

  const handleUpdateUser = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
        <EditNavbar/>
      <div className='component hero'>
      <button type="button" className="updatebutton" onClick={handleUpdateUser}>
        Update 
      </button>
         <CreateCourseForm/>
         </div>
         <Footer/>
    </div>
  )
}

export default EditCourses
