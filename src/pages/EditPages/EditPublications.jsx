import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import EditNavbar from '../../components/EditNavbar'
import PublicationEditComponent from '../../components/PageComponents/publications/PublicationEditComponent';
import PublicationForm from '../../components/PageComponents/publications/PublicationForm';
import BackToTopButton from '../../components/BackToTopButton';

const EditPublications = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
   const navigate = useNavigate();
   const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [publicationId] = useState(1);
  const [publicationDesc, setPublicationDesc] = useState(null);

   const OpenPublicationForm = () => {
    setIsFormOpen(true);
  };

const handleCloseForm = () => {
    setIsFormOpen(false);
  };

const handleAddSuccess = () => {
    setSuccessMessage('Publication added successfully!');
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
  
      const response = await axios.put('http://localhost:8080/api/publicationdesc/updateImage/1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Publication description updated successfully');
      // You might want to do something with the response if needed
  
    } catch (error) {
      console.error('Error updating publication description:', error);
    }
  };
  

  const fetchPublicationDescById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/publicationdesc/1`);
      setPublicationDesc(response.data);
    } catch (error) {
      console.error('Error fetching publication description by ID:', error);
    }
  };

  useEffect(() => {
    if (publicationId) {
      fetchPublicationDescById();
    }
  }, [publicationId]);
  return (
    <div>
        <EditNavbar/>
        <div className='component hero'>
        <button type="button" className="updatebutton" onClick={handleUpdateUser}>
        Update 
      </button>
      <PublicationEditComponent/>
      <button onClick={OpenPublicationForm}>Add New Publication</button>
      {successMessage && <div>{successMessage}</div>}
       <PublicationForm onAddSuccess={handleAddSuccess} onClose={handleCloseForm} isOpen={isFormOpen} />  
       {publicationDesc && (
        <div>
          <h1 className='h1'>{publicationDesc.titleString}</h1>
          <img src={`data:image/png;base64,${publicationDesc.data}`} alt="Publication Image" />
        </div>
      )}
      
      <form className='mt-4' onSubmit={handleSubmit}>
      <h1 className='text-white text-lg mb-1 font-medium title-font'>Publication Description Form</h1>
      <div class="mt-4 mb-4">
        <input placeholder='Title' className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ' type="text" value={title} onChange={handleTitleChange} required />
        </div>
        <div class="mt-4 mb-4">
        <input type="file" className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ' onChange={handleImageChange} required />
        </div>
        <button className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg' type="submit">Submit</button>
      </form>
      </div>
      <BackToTopButton />
    </div>
  )
}

export default EditPublications
