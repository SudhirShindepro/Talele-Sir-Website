import React, { useState } from 'react';
import { IoMdCloseCircle } from "react-icons/io";

const ProjectCard = ({ project, onDeleteClick }) => {
  const { id, name, description, videoLink, image, photo } = project;

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

  const handleRedirect = () => {
    window.location.href = videoLink;
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const containerStyle = {
    borderRadius: '30px',
    border: '1px solid',
    boxShadow: '12px 12px #cfd5e0',
  };

  return (
    
<div style={containerStyle} className="w-full  mx-auto bg-white border overflow-hidden">
<section className="text-gray-900 border rounded-lg border-white py-8 flex flex-wrap body-font ">
  <div className="container mx-auto flex items-center justify-center flex-col">
    <img className="w-4/5 h-64 object-cover pb-10" src={`data:img/png;base64,${image}`} alt={`${name} Img`} />
    <div className="text-center p-4 w-full">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-black-900">{name}</h1>
      <p className="mb-8 text-gray-900 leading-relaxed">{description}</p>
      <div className="cursor-pointer p-2  bg-gray-900" onClick={handleToggle}>
        <h2 className="text-lg font-semibold text-white">Read More</h2>
      </div>
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
        <IoMdCloseCircle />
      </button>
      <div className="modal-content">
        {photo && <img className='modal-img w-full h-auto' src={`data:img/png;base64,${photo}`} alt={`${name} Img`} />}
      </div>
    </div>
  )}

  {isAbstractOpen && (
    <div className="modal2">
      <button className="close-button" onClick={closeAbstract}>
        <IoMdCloseCircle />
      </button>
      <div className="modal-abstract p-4 md:p-6 lg:p-8">
        {abstract && <p className="text-sm md:text-base lg:text-lg">{abstract}</p>}
      </div>
    </div>
  )}

  {isReportVisible && (
    <div className="report">
      <button className="close-button" onClick={closeReport}>
        Close Report
      </button>
      <div className="report-content p-4 md:p-6 lg:p-8">
        {pdfData && <embed src={pdfData} type="application/pdf" width="100%" height="500px" />}
      </div>
    </div>
  )}

  {isPptOpen && (
    <div className="ppt">
      <button className="close-button" onClick={closePpt}>
        Close
      </button>
      <div className="ppt-content p-4 md:p-6 lg:p-8">
        {pptData && <iframe src={pptData} title="presentation" width="100%" height="500px" />}
      </div>
    </div>
  )}
</div>
  );
};

const ProjectCardList = ({ projects }) => {
  return (
    <div className="grid  gap-16 h-full lg:grid-cols-3 sm:grid-cols-1">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectCardList;
