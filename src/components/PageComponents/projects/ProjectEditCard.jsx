import React, { useState } from 'react';
import axios from 'axios';

const ProjectEditCard = ({ project, onDeleteClick  }) => {
    const { id, name, description,image, videoLink, photo } = project;
    const [projects, setProjects] = useState([]);
    const [isPhotoOpen, setisPhotoOpen] = useState(false);
  const [isAbstractOpen, setisAbstractOpen] = useState(false);
  const [abstract, setabstract] = useState('');
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [pdfData, setPdfData] = useState(null);
  const [isPptOpen, setIsPptOpen] = useState(false);
  const [pptData, setPptData] = useState(null);

  const openPhoto = () => {
    setisPhotoOpen(true);
  };

  const closePhoto = () => {
    setisPhotoOpen(false);
  };

  const closeAbstract = () => {
    setisAbstractOpen(false);
  };

  const openAbstract = async (buttonType) => {
    try {
      const response = await fetch(`http://localhost:8080/api/projects/${id}/abstractText`);
      if (response.ok) {
        const data = await response.text();
        setisAbstractOpen(true);
        setabstract(data);
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  const openReport = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/projects/${id}/report`);
      if (response.ok) {
        const data = await response.blob();
        setPdfData(URL.createObjectURL(data));
        setIsReportVisible(true);
      } else {
        console.error('Error fetching PDF:', response.status);
      }
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  const closeReport = () => {
    setIsReportVisible(false);
  };
  
  const openPpt = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/projects/${id}/ppt`);
      if (response.ok) {
        const data = await response.blob();
        setPptData(URL.createObjectURL(data));
        setIsPptOpen(true);
      } else {
        console.error('Error fetching PPT:', response.status);
      }
    } catch (error) {
      console.error('Error fetching PPT:', error);
    }
  };

  const closePpt = () => {
    setIsPptOpen(false);
  };

    const handleDeleteClick = async (projectId) => {
      try {
        await axios.delete(`http://localhost:8080/api/projects/${id}`);
        // Filter out the deleted project from the state
        const updatedProjects = projects.filter((project) => project.id !== projectId);
        setProjects(updatedProjects);
        console.log(`Deleted project with ID: ${projectId}`);
        window.location.reload();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    };

    const handleRedirect = () => {
      // Redirect to the video link
      window.location.href = videoLink;
    };
  

    const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
    return (
      <div className="max-w-md mx-auto mr-4 mb-4 grid grid-col-3 w-full bg-white shadow-md overflow-hidden">
        <section className="text-gray-900  border rounded-lg border-white py-8 flex flex-wrap body-font ">
  <div className="container mx-auto flex items-center justify-center flex-col">
    <img className="w-4/5 h-64 object-cover pb-10" src={`data:img/png;base64,${image}`} alt={`${name} Img`} />
    <div className="text-center lg:w-2/3 w-full">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-black-900">{name}</h1>
      <p className="mb-8 text-gray-900 leading-relaxed">{description}</p>
      <div className="cursor-pointer p-2  bg-gray-900" onClick={handleToggle}>
        <h2 className="text-lg font-semibold text-white">Read More</h2>
      </div>
      <button className="items-center text-white mt-4 bg-red-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-300 font-semibold rounded text-lg" onClick={handleDeleteClick}>Delete</button>
      {isExpanded && (
        <div className="p-4">
          <div className="flex justify-center flex-wrap gap-4">
        <button onClick={() => openAbstract('abstract')} className="flex items-center text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-300 font-semibold rounded text-lg">Abstract</button>
        <button onClick={openReport} className=" flex items-center text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-300 font-semibold rounded text-lg">Report</button>
        <button onClick={openPpt} className=" flex items-center text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-300 font-semibold rounded text-lg">PPT</button>
        <button onClick={handleRedirect} className="flex items-center text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-300 font-semibold rounded text-lg">Watch Demo</button>
        <button onClick={openPhoto} className="flex items-center text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-300 font-semibold rounded text-lg">Team Photo</button>
      </div>
        </div>
      )}
    </div>
  </div>
</section>

        {isPhotoOpen && (
        <div className="modal">
          <button className="close-button" onClick={closePhoto}>
            Close
          </button>
          <div className="modal-content">
            {photo && <img className='modal-img' src={`data:img/png;base64,${photo}`} alt={`${name} Img`} />}
          </div>
        </div>
      )}

      {isAbstractOpen && (
        <div className="modal2">
          <button className="close-button" onClick={closeAbstract}>
            Close
          </button>
          <div className="modal-abstract">
            {abstract && <p>{abstract}</p>}
          </div>
        </div>
      )}

      {isReportVisible && (
        <div className="report">
          <button className="close-button" onClick={closeReport}>
            Close Report
          </button>
          <div className="report-content">
            {pdfData && <embed src={pdfData} type="application/pdf" width="100%" height="500px" />}
          </div>
        </div>
      )}

{isPptOpen && (
        <div className="ppt">
          <button className="close-button" onClick={closePpt}>
            Close
          </button>
          <div className="ppt-content">
            {pptData && <iframe src={pptData} title="presentation" width="100%" height="500px" />}
          </div>
        </div>
      )}

      </div>
    );
  };
  
  const ProjectEditCardList = ({ projects }) => {
    return (
      <div className="project-card-list">
        {projects.map((project) => (
          <ProjectEditCard key={project.id} project={project} />
        ))}
      </div>
    );
  };

export default ProjectEditCardList
