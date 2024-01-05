import React from "react";

const CourseCard = ({ course, onDelete }) => {
  const { videoLink } = course;
  console.log(course.videoLink);

  const handleRedirect = () => {
    window.location.href = videoLink;
  };

  return (
    
  <div className="container px-5 py-24">
    <div className="lg:w-1/3 md:w-1/2 mx-auto bg-white rounded-lg p-8 grid grid-col-3 md:ml-auto w-full mt-10 md:mt-0 ">
      <h1 className="text-gray-900 text-lg mb-1 font-medium title-font">
        {course.title}
      </h1>
      <p className="leading-relaxed mb-5 text-gray-600">
        {course.description}
      </p>
      <button
        onClick={handleRedirect}
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Watch Video
      </button>
      <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
        {course.duration}
      </span>
      <span className="flex-grow flex flex-col pl-4 mt-4 md:mt-0">
        <span className="title-font font-medium text-gray-900">
          {course.creator}
        </span>
        <span className="text-gray-400 text-xs tracking-widest mt-0.5">
          Creator
        </span>
      </span>
    </div>
  </div>

  );
};

export default CourseCard;
