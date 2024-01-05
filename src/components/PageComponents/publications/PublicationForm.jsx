import React, { useState } from 'react';
import axios from 'axios';

const PublicationForm = ({ onClose, isOpen, onAddSuccess }) => {
  const [formData, setFormData] = useState({
    description: '',
    conferenceOption: '',
    participants: '',
    year: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/conferences', formData);
      console.log('Participant added successfully!');
      setFormData({
        participants: '',
        description: '',
        conferenceOption: '',
        year: '',
      });
    } catch (error) {
      console.error('Error adding participant', error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={`project-form-container ${isOpen ? 'visible' : ''}`}>
      <h3 className="text-gray-900 text-center text-2xl font-semibold title-font mb-2">Details of New Project</h3>
      <form onSubmit={handleSubmit}>
      <div className="relative mb-4">
        <label className='leading-7 text-sm text-gray-600'>
          Participants:
          <input
          className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            type="text"
            name="participants"
            value={formData.participants}
            onChange={handleChange}
          />
        </label>
        </div>
        <div className="relative mb-4">
        <label className='leading-7 text-sm text-gray-600'>
          Description:
          <textarea
          className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        </div>
        <div className="relative mb-4">
        <label className='leading-7 text-sm text-gray-600'>
          Conference Type:
          <input
          className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            type="text"
            name="conferenceOption"
            value={formData.conferenceOption}
            onChange={handleChange}
          />
        </label>
        </div>
        <div className="relative mb-4">
        <label className='leading-7 text-sm text-gray-600'>
          Year:
          <input
          className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            placeholder="e.g. 2012-13"
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </label>
        </div>
        <button
          className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          onClick={() => {
            handleRefresh();
          }}
          type="submit"
        >
          Submit
        </button>
        <button type="button" onClick={onClose} className="text-white bg-red-500 border-0 py-2 px-8 ml-5 focus:outline-none hover:bg-red-600 rounded text-lg">
        Close
      </button>
      </form>
    </div>
  );
};

export default PublicationForm;
