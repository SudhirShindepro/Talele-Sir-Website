// ProjectForm.js
import React, { useState } from 'react';
import axios from 'axios';


function ProjectForm({ onClose, isOpen, onAddSuccess }) {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      year: '',
      image: null,
      abstract: '',
      videoLink:'',
      report: null,
      ppt: null,
      photo: null,
    });
    const [setFormVisible] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const handleChange = (e) => {
      const { name, value, files } = e.target;
  
      if (name === 'image' && files) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: files[0],
        }));
  
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
          setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: files ? files[0] : value,
        }));
      }
    };

    const handleRefresh = () => {
      window.location.reload();
    };
  
    const handleViewFile = (file) => {
      window.open(URL.createObjectURL(file), '_blank');
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formDataForSubmit = new FormData();
      for (const key in formData) {
        formDataForSubmit.append(key, formData[key]);
      }
    
      try {
        await axios.post('http://localhost:8080/api/projects', formDataForSubmit);
        console.log('Project added successfully!');
        setFormVisible(false); // Close the form
        onAddSuccess(); // Trigger the parent component to handle success
        setFormData({ // Clear the form data
          name: '',
          description: '',
          year: '',
          abstract: '',
          videoLink:'',
          image: null,
          report: null,
          ppt: null,
          photo: null,
        });
        window.location.reload();
      } catch (error) {
        console.error('Error adding project', error);
        // Handle error appropriately
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Server responded with error status:', error.response.status);
          console.error('Server responded with error data:', error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
        }
      }
    };
    
  return (
    
       <div className={`project-form-container ${isOpen ? 'visible' : ''}`}>
        <div className=" bg-gray-100 rounded-lg p-1 flex flex-col w-full mt-2">
        <h3 className='text-gray-900 text-lg text-center font-medium title-font mb-5'>Details of New Project</h3>
        
      <form onSubmit={handleSubmit} className="project-form">

      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Name:</label>
        <input className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Year:</label>
        <input className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' placeholder='eg: 2022-23' type="text" name="year" value={formData.year} onChange={handleChange} required />
        </div>

        <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Abstract:</label>
        <textarea name="abstract" value={formData.abstract} onChange={handleChange} required />
        </div>

        <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Video Link:</label>
        <input className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' type="text" name="videoLink" value={formData.videoLink} onChange={handleChange} required />
        </div>

        <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Image:</label>
        <div className="file-input">
          <input className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' type="file" name="image" onChange={handleChange} accept="image/*" required />
          {imagePreview && (
            <button type="button" className="view-button" onClick={() => handleViewFile(formData.image)}>
              View
            </button>
          )}
        </div>
        {imagePreview && <img src={imagePreview} alt="Uploaded Preview" className="image-preview" />}
        </div>

        <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Report (PDF):</label>
        <div className="file-input">
          <input className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' type="file" name="report" onChange={handleChange} accept=".pdf" required />
          {formData.report && (
            <button type="button" className="view-button" onClick={() => handleViewFile(formData.report)}>
              View
            </button>
          )}
        </div>
        </div>

        <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">PPT (PDF):</label>
        <div className="file-input">
          <input className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' type="file" name="ppt" onChange={handleChange} accept=".pdf" required />
          {formData.ppt && (
            <button type="button" className="view-button" onClick={() => handleViewFile(formData.ppt)}>
              View
            </button>
          )}
        </div>
        </div>

        <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600">Team Photo:</label>
        <div className="file-input">
          <input className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' type="file" name="photo" onChange={handleChange} accept="image/*" />
          {photoPreview && (
            <button type="button" className="view-button" onClick={() => handleViewFile(formData.photo)}>
              View
            </button>
          )}
        </div>
        </div>
        {/* {photoPreview && <img src={photoPreview} alt="Uploaded Preview" className="image-preview" />} */}
        {/* ... (other file input fields) */}

        <div className="form-buttons">
          <button onClick={()=>{ handleRefresh();}} type="submit" className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
            Submit
          </button>
          <button type="button" onClick={onClose} className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-900 rounded text-lg">
          close
          </button>
        </div>
      </form>

      {/* {formData.report && (
        <div className="pdf-view">
          <p>View PDF: <a href={URL.createObjectURL(formData.report)} target="_blank" rel="noopener noreferrer" className="pdf-link">PDF Link</a></p>
        </div>
        
      )} */}
    </div>
    </div>
  );
}

export default ProjectForm;
