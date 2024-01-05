import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCardEdit from './CourseCardEdit';

const CreateCourseForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id:'',
    title: '',
    description: '',
    videoLink: '',
    creator: '',
    duration: '',
  });

  const handleCreateCourseClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataForSubmit = new FormData();
    for (const key in formData) {
      formDataForSubmit.append(key, formData[key]);
    }

    try {
      // Update the URL with your actual endpoint for creating a course
      await axios.post('http://localhost:8080/api/create-courses', formDataForSubmit);
      console.log('Course added successfully!');
      // Close the form
      setShowForm(false);
      // Reset the form data
      setFormData({
        title: '',
        description: '',
        videoLink: '',
        creator: '',
        duration: '',
      });
       window.location.reload();
    } catch (error) {
      console.error('', error);
      if (error.response) {
        console.error('', error.response.status);
        console.error('', error.response.data);
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    // Fetch data from the database when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/create-courses');
        setCourses(response.data); // Assuming the API response is an array of courses
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="text-gray-600 body-font ">
      <button className='text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={handleCreateCourseClick}>Create Course</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <label className='leading-7 text-sm text-white'>
            Title:
            <input
            className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          </div>
          <div className=" mb-4">
          <label className='leading-7 text-sm text-white'>
            Description:
            <textarea
            className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          </div>
          <div className=" mb-4">
          <label className='leading-7 text-sm text-white'>
            Video Link:
            <input
            className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              type="text"
              name="videoLink"
              value={formData.videoLink}
              onChange={handleChange}
            />
          </label>
          </div>
          <div className=" mb-4">
          <label className='leading-7 text-sm text-white'>
            Creator:
            <input
            className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              type="text"
              name="creator"
              value={formData.creator}
              onChange={handleChange}
            />
          </label>
          </div>
          <div className=" mb-4">
          <label className='leading-7 text-sm text-white'>
            Course Duration:
            <input
            className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
            placeholder='e.g. 2hrs 15mins'
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </label>
          </div>
          <button className='text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg' type="submit">Submit</button>
        </form>
      )}
      <div>
          {courses.map((course) => (
             <CourseCardEdit key={course.id} course={course} />
          ))}
  
      </div>
    </section>
  );
};

export default CreateCourseForm;
