import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProjectEditCard from './ProjectEditCard'

const ProjectEditComponent = () => {
    const [projects, setProjects] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [availableYears, setAvailableYears] = useState([]);
  
    useEffect(() => {
      const fetchAvailableYears = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/projects/years');
          setAvailableYears(response.data);
        } catch (error) {
          console.error('Error fetching available years', error);
        }
      };
  
      fetchAvailableYears();
    }, []);
  
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/projects/byYear/${selectedYear}`);
          setProjects(response.data);
        } catch (error) {
          console.error(`Error fetching projects for year ${selectedYear}`, error);
        }
      };
  
      if (selectedYear) {
        fetchProjects();
      }
    }, [selectedYear]);
  
    const handleYearChange = (e) => {
      setSelectedYear(e.target.value);
    };
  
    
  
    return (

        <section>
          <div style={{marginBottom:16}} className="flex gap-3 items-center text-center md:flex-row  md:right-20 md:top-24 lg:right-20 lg:mt-2">
          <h2 className="text-white md:mr-2">Projects in Year:</h2>
              <select className="border text-black rounded-md py-2 px-3 md:ml-0 md:mt-2 lg:ml-2" value={selectedYear} onChange={handleYearChange}>
                <option value="">Year</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
         
          </div>
          <ProjectEditCard projects={projects}/>
        </section>

    );
  };
export default ProjectEditComponent
