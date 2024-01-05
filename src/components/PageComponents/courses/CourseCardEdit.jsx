// CourseCard.js
import axios from 'axios';
import React, { useState } from 'react';

const CourseCard = ({ course, onDelete }) => {
  const [courses, setCourses] = useState([]);
    const {id, videoLink } = course;
    console.log(course.videoLink);

    const handleRedirect = () => {
        window.location.href = videoLink;
      };

      const handleDelete = async () => {
        try {
          await axios.delete(`http://localhost:8080/api/create-courses/${id}`);
          onDelete(id);
          window.location.reload(); // Reload the page
        } catch (error) {
          console.error('Error deleting course:', error);
      
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
      
      const handleRefresh = () => {
        window.location.reload();
      };
      

  return (
    <div className='course-card-container'>
        <div className='course-card'>
        <div><h3>{course.title}</h3></div>
        <div><p>{course.description}</p></div>
        <div><p>Creator: {course.creator}</p></div>
        <div><p>Duration: {course.duration}</p></div>
        <div><button className='card-btn' onClick={handleRedirect}>Watch Video</button></div>   
        <button className='card-btn' onClick={()=>{
                      handleDelete();
                      handleRefresh();
                      }}>Delete</button>
        </div>
    </div>
  );
};

export default CourseCard;
