import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import Footer from "../../Footer";

const CoursesComponent = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    // Fetch data from the database when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/create-courses"
        );
        setCourses(response.data); // Assuming the API response is an array of courses
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    fetchData();
  }, []);

  return (
      <section className="text-gray-400 bg-gray-900 body-font">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
        <Footer/>
      </section>
  );
};

export default CoursesComponent;
