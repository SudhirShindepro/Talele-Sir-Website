import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import EditNavbar from '../../components/EditNavbar'
import ProjectForm from '../../components/PageComponents/projects/ProjectForm'
import ProjectEditComponent from '../../components/PageComponents/projects/ProjectEditComponent';
import BackToTopButton from '../../components/BackToTopButton';
import Footer from '../../components/Footer';

const EditProjects = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [projectId, setProjectId] = useState(1);
  const [projectDesc, setProjectDesc] = useState(null);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleAddSuccess = () => {
    setSuccessMessage('Project added successfully!');
    // You can clear the form or do other actions if needed
  };

  const handleUpdateUser = () => {
    navigate("/");
    window.location.reload();
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', image);

      const response = await axios.put('http://localhost:8080/api/projectdesc/updateImage/1', formData);
      console.log('Project description added successfully with ID:', response.data);
      setProjectId(response.data); // Store the ID for fetching later
    } catch (error) {
      console.error('Error adding project description:', error);
    }
  };

  const fetchProjectDescById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/projectdesc/1`);
      setProjectDesc(response.data);
    } catch (error) {
      console.error('Error fetching project description by ID:', error);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectDescById();
    }
  }, [projectId]);

  return (
    <div>
        <EditNavbar/>        
        <div className='component hero'>
        <button type="button" className="updatebutton" onClick={handleUpdateUser}>
        Update 
      </button>
        <button className='' onClick={handleOpenForm}>Add New Project</button>
        {successMessage && <div>{successMessage}</div>}
        <ProjectForm onAddSuccess={handleAddSuccess} onClose={handleCloseForm} isOpen={isFormOpen} />
        {projectDesc && (
        <div>
          <p>{projectDesc.titleString}</p>
          <img src={`data:image/png;base64,${projectDesc.data}`} alt="Project Image" />
        </div>
      )}
       
      <form className='mt-4' onSubmit={handleSubmit}>
      <h1 className='text-white text-lg mb-1 font-medium title-font'>Project Description Form</h1>
      <div class="mt-4 mb-4">
        <input placeholder='Title' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ' type="text" value={title} onChange={handleTitleChange} required />
        </div>
        <div class="mt-4 mb-4">
        <input className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ' type="file" onChange={handleImageChange} required />
        </div>
        <button className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg' type="submit">Submit</button>
      </form>
      <ProjectEditComponent/>
         </div>
         
         <BackToTopButton />
         <Footer/>
    </div>
  )
}

export default EditProjects
