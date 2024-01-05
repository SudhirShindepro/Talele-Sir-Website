import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCardList from "./ProjectCard";

const ProjectsComponent = () => {
  const [projects, setProjects] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  useEffect(() => {
    const fetchAvailableYears = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/projects/years"
        );
        setAvailableYears(response.data);
      } catch (error) {
        console.error("Error fetching available years", error);
      }
    };

    fetchAvailableYears();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/projects/byYear/${selectedYear}`
        );
        setProjects(response.data);
      } catch (error) {
        console.error(
          `Error fetching projects for year ${selectedYear}`,
          error
        );
      }
    };

    if (selectedYear) {
      fetchProjects();
    }
  }, [selectedYear]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const [projectDesc, setProjectDesc] = useState(null);
  const [projectId] = useState(1);

  const fetchProjectDescById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/projectdesc/${projectId}`
      );
      setProjectDesc(response.data);
    } catch (error) {
      console.error("Error fetching project description by ID:", error);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProjectDescById();
    }
  }, [projectId]);

  return (
    <>
      <section className="text-white p-8 md:p-20 items-center bg-gray-900 body-font mt-14 lg:justify-end ">
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between w-full">
          <div className="p-4 md:p-8 text-center md:text-left">
            {projectDesc && (
              <div>
                <h1 className="text-2xl mb-8 mt-10 md:text-4xl font-bold">
                  {projectDesc.titleString}
                </h1>
                <img
                  src={`data:image/png;base64,${projectDesc.data}`}
                  alt="Project Image"
                  className="w-full mb-4 md:mb-8"
                />
                <h2 className="text-xl md:text-4xl mb-4 md:mb-1">
                  Projects in Year: {selectedYear}
                </h2>
              </div>
            )}
          </div>

          <div
            style={{ marginBottom: 16 }}
            className="flex gap-3 items-center text-center md:flex-row  md:right-20 md:top-24 lg:right-20 lg:mt-2"
          >
            <h2 className="text-white md:mr-2">Projects in Year:</h2>
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="border text-black rounded-md py-2 px-3 md:ml-0 md:mt-2 lg:ml-2"
            >
              <option value="">Year</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ProjectCardList projects={projects} />
      </section>
    </>
  );
};

export default ProjectsComponent;
