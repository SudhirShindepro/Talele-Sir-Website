import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLinkedin } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import EditNavbar from "../../components/EditNavbar";
import BackToTopButton from "../../components/BackToTopButton";
import Footer from "../../components/Footer";

function EditHome() {
  const [positions, setPositions] = useState([]);
  const [pastPosition, setPastPosition] = useState({ position: "" });
  const [file, setFile] = useState(null);
  const [setImageId] = useState(null);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState([""]);
  const [imageData, setImageData] = useState(null);

  // Current Position
  const [currentPositions, setCurrentPositions] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({ position: "" });
  const [currentInputs, setCurrentInputs] = useState([" "]);

  // Education
  const [educations, setEducations] = useState([]);
  const [education, setEducation] = useState({ degree: "" });
  const [educationInputs, setEducationInputs] = useState([" "]);

  // Teching Experience
  const [teachingPositions, setTeachingPositions] = useState([]);
  const [teachingPosition, setTeachingPosition] = useState({ position: "" });
  const [teachingInputs, setTeachingInputs] = useState([" "]);

  // Awards
  const [awards, setAwards] = useState([]);
  const [award, setAward] = useState({ awardName: "" });
  const [awardInputs, setAwardInputs] = useState([""]);

  // Recognition
  const [recognitions, setRecognitions] = useState([]);
  const [recognition, setRecognition] = useState({ recognition: "" });
  const [recognitionInputs, setRecognitionInputs] = useState([""]);

  // Area Of Inrests
  const [areaOfInterests, setAreaOfInterests] = useState([]);
  const [areaOfInterest, setAreaOfInterest] = useState({ area: "" });
  const [areaOfInterestInputs, setAreaOfInterestInputs] = useState([""]);

  // Publications
  const [publications, setPublications] = useState([]);
  const [publication, setPublication] = useState({ title: "" });
  const [publicationInputs, setPublicationInputs] = useState([""]);

  // Membership
  const [memberships, setMemberships] = useState([]);
  const [membership, setMembership] = useState({ membership: "" });
  const [membershipInputs, setMembershipInputs] = useState([""]);

  // Visiting Faculty
  const [visitingFacultyPositions, setVisitingFacultyPositions] = useState([]);
  const [visitingFacultyPosition, setVisitingFacultyPosition] = useState({
    positionTitle: "",
  });
  const [visitingFacultyInputs, setVisitingFacultyInputs] = useState([""]);

  // Course
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({ course: "" });
  const [courseInputs, setCourseInputs] = useState([""]);

  const [user, setUser] = useState({
    id: 1,
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchUser();
    fetchPositions();
    fetchImage();
    fetchCurrentPositions();
    fetchEducations();
    fetchTeachingPositions();
    fetchAwards();
    fetchRecognitions();
    fetchAreaOfInterests();
    fetchPublications();
    fetchMemberships();
    fetchVisitingFacultyPositions();
    fetchCourses();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/app/users/1");
      console.log("User data received:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlePositionChange = (e) => {
    const { name, value } = e.target;
    setPastPosition((prevPosition) => ({
      ...prevPosition,
      [name]: value,
    }));
  };

  const fetchPositions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/positions");
      setPositions(response.data);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  const handleUpdatePastPosition = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/positions", {
        method: "POST", // Assuming your update endpoint is a PUT request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pastPosition),
      });

      if (response.ok) {
        console.log("Past position updated successfully");
      } else {
        console.error("Error updating past position");
      }
    } catch (error) {
      console.error("Error updating past position:", error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/app/users/${user.id}`,
        user
      );
      navigate("/");
      console.log("User updated:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const handleInputChangenew = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    setInputs([...inputs, ""]); // Add a new empty input
  };

  const handleDeletePosition = async (positionId) => {
    try {
      await axios.delete(`http://localhost:8080/api/positions/${positionId}`);
      setPositions((prevPositions) =>
        prevPositions.filter((position) => position.id !== positionId)
      );
      console.log(`Position with ID ${positionId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting position with ID ${positionId}:`, error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.put(
        "http://localhost:8080/api/images/update/1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageId(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const fetchImage = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/images/1`);
      setImageData(response.data.data);
    } catch (error) {
      console.error("Error fetching image:", error.message);
    }
  };

  // Current POsition
  const handleDeleteCurrentPosition = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/currentpositions/${id}`);
      setCurrentPositions((prevCurrentPositions) =>
        prevCurrentPositions.filter((position) => position.id !== id)
      );

      console.log(`Current Position with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting current position with ID ${id}:`, error);
    }
  };

  const handleCurrentPositionChange = (e) => {
    const { name, value } = e.target;
    setCurrentPosition((prevPosition) => ({
      ...prevPosition,
      [name]: value,
    }));
  };

  const handleUpdateCurrentPosition = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/currentpositions",
        {
          method: "POST", // Assuming your update endpoint is a PUT request
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentPosition),
        }
      );

      if (response.ok) {
        console.log("Current position updated successfully");
      } else {
        console.error("Error updating current position");
      }
    } catch (error) {
      console.error("Error updating current position:", error);
    }
  };

  const handleAddCurrentInput = () => {
    setCurrentInputs([...currentInputs, ""]); // Add a new empty input for current position
  };

  const handleCurrentInputChangenew = (index, value) => {
    const newCurrentInputs = [...currentInputs];
    newCurrentInputs[index] = value;
    setCurrentInputs(newCurrentInputs);
  };

  const fetchCurrentPositions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/currentpositions"
      );
      setCurrentPositions(response.data);
    } catch (error) {
      console.error("Error fetching current positions:", error);
    }
  };

  // Education

  const handleDeleteEducation = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/educations/${id}`);
      setEducations((prevEducations) =>
        prevEducations.filter((education) => education.id !== id)
      );

      console.log(`Education with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting education with ID ${id}:`, error);
    }
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));
  };

  const handleUpdateEducation = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/educations", {
        method: "POST", // Assuming your update endpoint is a PUT request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(education),
      });

      if (response.ok) {
        console.log("Education updated successfully");
      } else {
        console.error("Error updating education");
      }
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  const handleAddEducationInput = () => {
    setEducationInputs([...educationInputs, ""]); // Add a new empty input for education
  };

  const handleEducationInputChangenew = (index, value) => {
    const newEducationInputs = [...educationInputs];
    newEducationInputs[index] = value;
    setEducationInputs(newEducationInputs);
  };

  const fetchEducations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/educations");
      setEducations(response.data);
    } catch (error) {
      console.error("Error fetching educations:", error);
    }
  };

  // Teching Experience
  const handleDeleteTeachingPosition = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/teachingpositions/${id}`);
      setTeachingPositions((prevTeachingPositions) =>
        prevTeachingPositions.filter((position) => position.id !== id)
      );

      console.log(`Teaching Position with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting teaching position with ID ${id}:`, error);
    }
  };

  const handleTeachingPositionChange = (e) => {
    const { name, value } = e.target;
    setTeachingPosition((prevTeachingPosition) => ({
      ...prevTeachingPosition,
      [name]: value,
    }));
  };

  const handleUpdateTeachingPosition = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/teachingpositions",
        {
          method: "POST", // Assuming your update endpoint is a PUT request
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teachingPosition),
        }
      );

      if (response.ok) {
        console.log("Teaching position updated successfully");
      } else {
        console.error("Error updating teaching position");
      }
    } catch (error) {
      console.error("Error updating teaching position:", error);
    }
  };

  const handleAddTeachingInput = () => {
    setTeachingInputs([...teachingInputs, ""]); // Add a new empty input for teaching position
  };

  const handleTeachingInputChangenew = (index, value) => {
    const newTeachingInputs = [...teachingInputs];
    newTeachingInputs[index] = value;
    setTeachingInputs(newTeachingInputs);
  };

  const fetchTeachingPositions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/teachingpositions"
      );
      setTeachingPositions(response.data);
    } catch (error) {
      console.error("Error fetching teaching positions:", error);
    }
  };

  // Awards
  const handleDeleteAward = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/awards/${id}`);
      setAwards((prevAwards) => prevAwards.filter((award) => award.id !== id));

      console.log(`Award with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting award with ID ${id}:`, error);
    }
  };

  const handleAwardChange = (e) => {
    const { name, value } = e.target;
    setAward((prevAward) => ({
      ...prevAward,
      [name]: value,
    }));
  };

  const handleUpdateAward = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/awards", {
        method: "POST", // Assuming your update endpoint is a PUT request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(award),
      });

      if (response.ok) {
        console.log("Award updated successfully");
      } else {
        console.error("Error updating award");
      }
    } catch (error) {
      console.error("Error updating award:", error);
    }
  };

  const handleAddAwardInput = () => {
    setAwardInputs([...awardInputs, ""]); // Add a new empty input for awards
  };

  const handleAwardInputChangenew = (index, value) => {
    const newAwardInputs = [...awardInputs];
    newAwardInputs[index] = value;
    setAwardInputs(newAwardInputs);
  };

  const fetchAwards = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/awards");
      setAwards(response.data);
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
  };

  // Recognition

  const handleDeleteRecognition = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/recognitions/${id}`);
      setRecognitions((prevRecognitions) =>
        prevRecognitions.filter((recognition) => recognition.id !== id)
      );

      console.log(`Recognition with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting recognition with ID ${id}:`, error);
    }
  };

  const handleRecognitionChange = (e) => {
    const { name, value } = e.target;
    setRecognition((prevRecognition) => ({
      ...prevRecognition,
      [name]: value,
    }));
  };

  const handleUpdateRecognition = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/recognitions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recognition),
      });

      if (response.ok) {
        console.log("Recognition updated successfully");
      } else {
        console.error("Error updating recognition");
      }
    } catch (error) {
      console.error("Error updating recognition:", error);
    }
  };

  const handleAddRecognitionInput = () => {
    setRecognitionInputs([...recognitionInputs, ""]);
  };

  const handleRecognitionInputChangenew = (index, value) => {
    const newRecognitionInputs = [...recognitionInputs];
    newRecognitionInputs[index] = value;
    setRecognitionInputs(newRecognitionInputs);
  };

  const fetchRecognitions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/recognitions"
      );
      setRecognitions(response.data);
    } catch (error) {
      console.error("Error fetching recognitions:", error);
    }
  };

  // Area Of Intrests
  const handleDeleteAreaOfInterest = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/areaofinterests/${id}`);
      setAreaOfInterests((prevAreaOfInterests) =>
        prevAreaOfInterests.filter((areaOfInterest) => areaOfInterest.id !== id)
      );

      console.log(`Area of Interest with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting Area of Interest with ID ${id}:`, error);
    }
  };

  const handleAreaOfInterestChange = (e) => {
    const { name, value } = e.target;
    setAreaOfInterest((prevAreaOfInterest) => ({
      ...prevAreaOfInterest,
      [name]: value,
    }));
  };

  const handleUpdateAreaOfInterest = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/areaofinterests",
        {
          method: "POST", // Assuming your update endpoint is a PUT request
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(areaOfInterest),
        }
      );

      if (response.ok) {
        console.log("Area of Interest updated successfully");
      } else {
        console.error("Error updating Area of Interest");
      }
    } catch (error) {
      console.error("Error updating Area of Interest:", error);
    }
  };

  const handleAddAreaOfInterestInput = () => {
    setAreaOfInterestInputs([...areaOfInterestInputs, ""]); // Add a new empty input for Area of Interest
  };

  const handleAreaOfInterestInputChangenew = (index, value) => {
    const newAreaOfInterestInputs = [...areaOfInterestInputs];
    newAreaOfInterestInputs[index] = value;
    setAreaOfInterestInputs(newAreaOfInterestInputs);
  };

  const fetchAreaOfInterests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/areaofinterests"
      );
      setAreaOfInterests(response.data);
    } catch (error) {
      console.error("Error fetching area of interests:", error);
    }
  };

  // Publications
  const handleDeletePublication = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/publications/${id}`);
      setPublications((prevPublications) =>
        prevPublications.filter((publication) => publication.id !== id)
      );

      console.log(`Publication with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting publication with ID ${id}:`, error);
    }
  };

  const handlePublicationChange = (e) => {
    const { name, value } = e.target;
    setPublication((prevPublication) => ({
      ...prevPublication,
      [name]: value,
    }));
  };

  const handleUpdatePublication = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/publications", {
        method: "POST", // Assuming your update endpoint is a PUT request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(publication),
      });

      if (response.ok) {
        console.log("Publication updated successfully");
      } else {
        console.error("Error updating publication");
      }
    } catch (error) {
      console.error("Error updating publication:", error);
    }
  };

  const handleAddPublicationInput = () => {
    setPublicationInputs([...publicationInputs, ""]); // Add a new empty input for publications
  };

  const handlePublicationInputChangenew = (index, value) => {
    const newPublicationInputs = [...publicationInputs];
    newPublicationInputs[index] = value;
    setPublicationInputs(newPublicationInputs);
  };

  const fetchPublications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/publications"
      );
      setPublications(response.data);
    } catch (error) {
      console.error("Error fetching publications:", error);
    }
  };

  // Membership
  const handleDeleteMembership = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/memberships/${id}`);
      setMemberships((prevMemberships) =>
        prevMemberships.filter((membership) => membership.id !== id)
      );

      console.log(`Membership with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting membership with ID ${id}:`, error);
    }
  };

  const handleMembershipChange = (e) => {
    const { name, value } = e.target;
    setMembership((prevMembership) => ({
      ...prevMembership,
      [name]: value,
    }));
  };

  const handleUpdateMembership = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/memberships", {
        method: "POST", // Assuming your update endpoint is a PUT request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(membership),
      });

      if (response.ok) {
        console.log("Membership updated successfully");
      } else {
        console.error("Error updating membership");
      }
    } catch (error) {
      console.error("Error updating membership:", error);
    }
  };

  const handleAddMembershipInput = () => {
    setMembershipInputs([...membershipInputs, ""]); // Add a new empty input for memberships
  };

  const handleMembershipInputChangenew = (index, value) => {
    const newMembershipInputs = [...membershipInputs];
    newMembershipInputs[index] = value;
    setMembershipInputs(newMembershipInputs);
  };

  const fetchMemberships = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/memberships");
      setMemberships(response.data);
    } catch (error) {
      console.error("Error fetching memberships:", error);
    }
  };

  // Visiting Faculty
  const handleDeleteVisitingFacultyPosition = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/visitingfacultypositions/${id}`
      );
      setVisitingFacultyPositions((prevVisitingFacultyPositions) =>
        prevVisitingFacultyPositions.filter((position) => position.id !== id)
      );

      console.log(
        `Visiting Faculty Position with ID ${id} deleted successfully`
      );
    } catch (error) {
      console.error(
        `Error deleting Visiting Faculty Position with ID ${id}:`,
        error
      );
    }
  };

  const handleVisitingFacultyPositionChange = (e) => {
    const { name, value } = e.target;
    setVisitingFacultyPosition((prevPosition) => ({
      ...prevPosition,
      [name]: value,
    }));
  };

  const handleUpdateVisitingFacultyPosition = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/visitingfacultypositions",
        {
          method: "POST", // Assuming your update endpoint is a PUT request
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(visitingFacultyPosition),
        }
      );

      if (response.ok) {
        console.log("Visiting Faculty Position updated successfully");
      } else {
        console.error("Error updating Visiting Faculty Position");
      }
    } catch (error) {
      console.error("Error updating Visiting Faculty Position:", error);
    }
  };

  const handleAddVisitingFacultyInput = () => {
    setVisitingFacultyInputs([...visitingFacultyInputs, ""]); // Add a new empty input for Visiting Faculty Positions
  };

  const handleVisitingFacultyInputChangenew = (index, value) => {
    const newVisitingFacultyInputs = [...visitingFacultyInputs];
    newVisitingFacultyInputs[index] = value;
    setVisitingFacultyInputs(newVisitingFacultyInputs);
  };

  const fetchVisitingFacultyPositions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/visitingfacultypositions"
      );
      setVisitingFacultyPositions(response.data);
    } catch (error) {
      console.error("Error fetching Visiting Faculty Positions:", error);
    }
  };

  // Course
  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/courses/${id}`);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== id)
      );

      console.log(`Course with ID ${id} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting course with ID ${id}:`, error);
    }
  };

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleUpdateCourse = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/courses", {
        method: "POST", // Assuming your update endpoint is a PUT request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      if (response.ok) {
        console.log("Course updated successfully");
      } else {
        console.error("Error updating course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleAddCourseInput = () => {
    setCourseInputs([...courseInputs, ""]); // Add a new empty input for courses
  };

  const handleCourseInputChangenew = (index, value) => {
    const newCourseInputs = [...courseInputs];
    newCourseInputs[index] = value;
    setCourseInputs(newCourseInputs);
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/courses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };


  
  return (
    <>
    <EditNavbar/>
    <section className="text-gray-400 bg-gray-900 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
  <button type="button" className="updatebutton" onClick={handleUpdateUser}>Update</button>
      <input onChange={handleInputChange} name="name" type="text" className="title-font sm:text-2xl text-2xl mt-20 mb-4 font-medium text-black" value={user.name}/>
      <textarea className="mb-8 mt-4 sm:text-2xl leading-relaxed" overflow="scroll" type="text" name="description" onChange={handleInputChange} value={user.description}/>
      <div className="flex justify-center">
      <button className="icon">
            <FaLinkedin />
          </button>
          <button className="icon">
            <AiFillTwitterCircle />
          </button>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      {imageData ? (
            <img
            className="object-cover object-center rounded"
              src={`data:image/jpeg;base64,${imageData}`}
              alt="Latest Image"
            />
          ) : (
            <p>Loading latest image...</p>
          )}
<div className="upload-btn">
            <input className="w-full mt-4 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" type="file" onChange={handleFileChange} />
            <button
              className=" mt-4 ml-4 text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-sm"
              onClick={() => {
                handleUpload();
                handleRefresh();
              }}
            >
              Upload
            </button>
          </div>
    </div>
  </div>
</section> 

<section className="text-white bg-gray-900 body-font mt-1">
<div className="container px-5 w-full py-10">
        <h1 className="text-4xl font-bold mb-8 ml-2">Current Positions</h1>
        <div className="px-5">
            <div className="mb-4">
                 <table className="w-full border-collapse border border-gray-800">
    <thead>
      <tr>
        <th className="p-2 border-b border-gray-800">Position</th>
        <th className="p-2 border-b border-gray-800">Action</th>
      </tr>
    </thead>
    <tbody>
      {currentPositions.map((position) => (
        <tr key={position.id} className="border-b border-gray-800">
          <td className="p-2">{position.position}</td>
          <td className="p-2">
            <button
              className="delete-btn"
              onClick={() => handleDeleteCurrentPosition(position.id)}
            >
              <MdDeleteForever />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {inputs.map((input, index) => (
    <div key={index} className="mt-4">
      <input
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        type="text"
        name="position"
        value={currentPosition.position}
        onChange={handleCurrentPositionChange}
      />

      <div className="button-container mt-2">
        <button
          className="text-white bg-indigo-500 border-0 -mr-3 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg "
          onClick={() => {
            handleUpdateCurrentPosition();
            handleAddCurrentInput();
            handleCurrentInputChangenew();
            handleRefresh();
          }}
        >
          Add
        </button>
      </div>
    </div>
  ))}
            </div>
        </div>
      </div>
    </section>

    <section className="text-white bg-gray-900 body-font mt-1">
      <div className="container px-5 w-full py-10">
        <h1 className="text-4xl font-bold mb-8 ml-2"> Educational Qualification</h1>
        <div className="px-5">
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-800">
    <thead>
      <tr>
        <th className="p-2 border-b border-gray-800">Degree</th>
        <th className="p-2 border-b border-gray-800">Action</th>
      </tr>
    </thead>
    <tbody>
      {educations.map((education) => (
        <tr key={education.id} className="border-b border-gray-800">
          <td className="p-2">{education.degree}</td>
          <td className="p-2">
            <button
              className="delete-btn"
              onClick={() => handleDeleteEducation(education.id)}
            >
              <MdDeleteForever />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {educationInputs.map((input, index) => (
    <div key={index} className="mt-4">
      <input
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        type="text"
        name="degree"
        value={education.degree}
        onChange={(e) => handleEducationChange(e, index)}
      />

      <div className="button-container mt-2">
        <button
          className="text-white bg-indigo-500 border-0 -mr-3 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg  "
          onClick={() => {
            handleUpdateEducation();
            handleAddEducationInput();
            handleEducationInputChangenew();
            handleRefresh();
          }}
        >
          Add
        </button>
      </div>
    </div>
  ))}
            </div>
        </div>
      </div>
    </section>

    <section className="text-white bg-gray-900 body-font mt-1">
      <div className="container px-5 w-full py-10">
        <h1 className="text-4xl font-bold mb-8 ml-2">Past Positions</h1>
        <div className="px-5">
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-800">
    <thead>
      <tr>
        <th className="p-2 border-b border-gray-800">Position</th>
        <th className="p-2 border-b border-gray-800">Action</th>
      </tr>
    </thead>
    <tbody>
      {positions.map((position) => (
        <tr key={position.id} className="border-b border-gray-800">
          <td className="p-2">{position.position}</td>
          <td className="p-2">
            <button
              className="delete-btn"
              onClick={() => handleDeletePosition(position.id)}
            >
              <MdDeleteForever />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {inputs.map((input, index) => (
    <div key={index} className="mt-4">
      <input
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        type="text"
        name="position"
        value={pastPosition.position}
        onChange={handlePositionChange}
      />

      <div className="button-container mt-2">
        <button
          className="text-white bg-indigo-500 border-0 -mr-3 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg  "
          onClick={() => {
            handleUpdatePastPosition();
            handleAddInput();
            handleInputChangenew();
            handleRefresh();
          }}
        >
          Add
        </button>
      </div>
    </div>
  ))}
            </div>
        </div>
      </div>
    </section>

    <section className="text-white bg-gray-900 body-font mt-1">
      <div className="container px-5 w-full py-10">
        <h1 className="text-4xl font-bold mb-8 ml-2">Teaching Experience</h1>
        <div className="px-5">
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-800">
    <thead>
      <tr>
        <th className="p-2 border-b border-gray-800">Position</th>
        <th className="p-2 border-b border-gray-800">Action</th>
      </tr>
    </thead>
    <tbody>
      {teachingPositions.map((position) => (
        <tr key={position.id} className="border-b border-gray-800">
          <td className="p-2">{position.position}</td>
          <td className="p-2">
            <button
              className="delete-btn"
              onClick={() => handleDeleteTeachingPosition(position.id)}
            >
              <MdDeleteForever />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {teachingInputs.map((input, index) => (
    <div key={index} className="mt-4">
      <input
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        type="text"
        name="position"
        value={teachingPosition.position}
        onChange={handleTeachingPositionChange}
      />

      <div className="button-container mt-2">
        <button
          className="text-white bg-indigo-500 border-0 -mr-3 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg  "
          onClick={() => {
            handleUpdateTeachingPosition();
            handleAddTeachingInput();
            handleTeachingInputChangenew();
            handleRefresh();
          }}
        >
          Add
        </button>
      </div>
    </div>
  ))}
            </div>
        </div>
      </div>
    </section>

    <section className="text-white bg-gray-900 body-font mt-1">
      <div className="container px-5 w-full py-10">
        <h1 className="text-4xl font-bold mb-8 ml-2">Awards</h1>
        <div className="px-5">
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-800">
    <thead>
      <tr>
        <th className="p-2 border-b border-gray-800">Award</th>
        <th className="p-2 border-b border-gray-800">Action</th>
      </tr>
    </thead>
    <tbody>
      {awards.map((award) => (
        <tr key={award.id} className="border-b border-gray-800">
          <td className="p-2">{award.award}</td>
          <td className="p-2">
            <button
              className="delete-btn"
              onClick={() => handleDeleteAward(award.id)}
            >
              <MdDeleteForever />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {awardInputs.map((input, index) => (
    <div key={index} className="mt-4">
      <input
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        type="text"
        name="award"
        value={award.award}
        onChange={(e) => handleAwardChange(e, index)}
      />

      <div className="button-container mt-2">
        <button
          className="text-white bg-indigo-500 border-0 -mr-3 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg  "
          onClick={() => {
            handleUpdateAward();
            handleAddAwardInput();
            handleAwardInputChangenew();
            handleRefresh();
          }}
        >
          Add
        </button>
      </div>
    </div>
  ))}
            </div>
        </div>
      </div>
    </section>

    <section className="text-white bg-gray-900 body-font mt-1">
      <div className="container px-5 w-full py-10">
        <h1 className="text-4xl font-bold mb-8 ml-2">Recognition</h1>
        <div className="px-5">
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-800">
    <thead>
      <tr>
        <th className="p-2 border-b border-gray-800">Recognition</th>
        <th className="p-2 border-b border-gray-800">Action</th>
      </tr>
    </thead>
    <tbody>
      {recognitions.map((recognition) => (
        <tr key={recognition.id} className="border-b border-gray-800">
          <td className="p-2">{recognition.recognition}</td>
          <td className="p-2">
            <button
              className="delete-btn"
              onClick={() => handleDeleteRecognition(recognition.id)}
            >
              <MdDeleteForever />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {recognitionInputs.map((input, index) => (
    <div key={index} className="mt-4">
      <input
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        type="text"
        name="recognition"
        value={recognition.recognition}
        onChange={(e) => handleRecognitionChange(e, index)}
      />

      <div className="button-container mt-2">
        <button
          className="text-white bg-indigo-500 border-0 -mr-3 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg  "
          onClick={() => {
            handleUpdateRecognition();
            handleAddRecognitionInput();
            handleRecognitionInputChangenew();
            handleRefresh();
          }}
        >
          Add
        </button>
      </div>
    </div>
  ))}
            </div>
        </div>
      </div>
    </section>

    <section className="text-white bg-gray-900 body-font mt-1">
      <div className="container px-5 w-full py-10">
        <h1 className="text-4xl font-bold mb-8 ml-2">Area Of Intrests</h1>
        <div className="px-5">
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-800">
    <thead>
      <tr>
        <th className="p-2 border-b border-gray-800">Area of Interest</th>
        <th className="p-2 border-b border-gray-800">Action</th>
      </tr>
    </thead>
    <tbody>
      {areaOfInterests.map((areaOfInterest) => (
        <tr key={areaOfInterest.id} className="border-b border-gray-800">
          <td className="p-2">{areaOfInterest.area}</td>
          <td className="p-2">
            <button
              className="delete-btn"
              onClick={() => handleDeleteAreaOfInterest(areaOfInterest.id)}
            >
              <MdDeleteForever />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {areaOfInterestInputs.map((input, index) => (
    <div key={index} className="mt-4">
      <input
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        type="text"
        name="area"
        value={areaOfInterest.area}
        onChange={handleAreaOfInterestChange}
      />

      <div className="button-container mt-2">
        <button
          className="text-white bg-indigo-500 border-0 -mr-3 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg  "
          onClick={() => {
            handleUpdateAreaOfInterest(index);
            handleAddAreaOfInterestInput();
            handleAreaOfInterestInputChangenew(index, "");
            handleRefresh();
          }}
        >
          Add
        </button>
      </div>
    </div>
  ))}
            </div>
        </div>
      </div>
    </section>

    <section className="text-white bg-gray-900 body-font mt-1">
      <div className="container px-5 w-full py-10">
        <h1 className="text-4xl font-bold mb-8 ml-2">Publications</h1>
        <div className="px-5">
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-800">
    <thead>
      <tr>
        <th className="p-2 border-b border-gray-800">Publication</th>
        <th className="p-2 border-b border-gray-800">Action</th>
      </tr>
    </thead>
    <tbody>
      {publications.map((publication) => (
        <tr key={publication.id} className="border-b border-gray-800">
          <td className="p-2">{publication.title}</td>
          <td className="p-2">
            <button
              className="delete-btn"
              onClick={() => handleDeletePublication(publication.id)}
            >
              <MdDeleteForever />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {publicationInputs.map((input, index) => (
    <div key={index} className="mt-4">
      <input
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        type="text"
        name="title"
        value={publication.title}
        onChange={handlePublicationChange}
      />

      <div className="button-container mt-2">
        <button
          className="text-white bg-indigo-500 border-0 -mr-3 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg  "
          onClick={() => {
            handleUpdatePublication(index);
            handleAddPublicationInput();
            handlePublicationInputChangenew(index, "");
            handleRefresh();
          }}
        >
          Add
        </button>
      </div>
    </div>
  ))}
            </div>
        </div>
      </div>
    </section>

    <section className="text-white bg-gray-900 body-font mt-1">
      <div className="container px-5 w-full py-10">
        <h1 className="text-4xl font-bold mb-8 ml-2">Memberships</h1>
        <div className="px-5">
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-800">
    <thead>
      <tr>
        <th className="p-2 border-b border-gray-800">Membership</th>
        <th className="p-2 border-b border-gray-800">Action</th>
      </tr>
    </thead>
    <tbody>
      {memberships.map((membership) => (
        <tr key={membership.id} className="border-b border-gray-800">
          <td className="p-2">{membership.membership}</td>
          <td className="p-2">
            <button
              className="delete-btn"
              onClick={() => handleDeleteMembership(membership.id)}
            >
              <MdDeleteForever />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {membershipInputs.map((input, index) => (
    <div key={index} className="mt-4">
      <input
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        type="text"
        name="membership"
        value={membership.membership}
        onChange={handleMembershipChange}
      />

      <div className="button-container mt-2">
        <button
          className="text-white bg-indigo-500 border-0 -mr-3 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg  "
          onClick={() => {
            handleUpdateMembership(index);
            handleAddMembershipInput();
            handleMembershipInputChangenew(index, "");
            handleRefresh();
          }}
        >
          Add
        </button>
      </div>
    </div>
  ))}
            </div>
        </div>
      </div>
    </section>

    <section className="text-white bg-gray-900 body-font mt-1">
      <div className="container px-5 w-full py-10">
        <h1 className="text-4xl font-bold mb-8 ml-2">Visiting Faculty Positions</h1>
        <div className="px-5">
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-800">
    <thead>
      <tr>
        <th className="p-2 border-b border-gray-800">Position</th>
        <th className="p-2 border-b border-gray-800">Action</th>
      </tr>
    </thead>
    <tbody>
      {visitingFacultyPositions.map((position) => (
        <tr key={position.id} className="border-b border-gray-800">
          <td className="p-2">{position.positionTitle}</td>
          <td className="p-2">
            <button
              className="delete-btn"
              onClick={() => handleDeleteVisitingFacultyPosition(position.id)}
            >
              <MdDeleteForever />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {visitingFacultyInputs.map((input, index) => (
    <div key={index} className="mt-4">
      <input
        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        type="text"
        name="positionTitle"
        value={visitingFacultyPosition.positionTitle}
        onChange={handleVisitingFacultyPositionChange}
      />

      <div className="button-container mt-2">
        <button
          className="text-white bg-indigo-500 border-0 -mr-3 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg  "
          onClick={() => {
            handleUpdateVisitingFacultyPosition();
            handleAddVisitingFacultyInput();
            handleVisitingFacultyInputChangenew(index, "");
            handleRefresh();
          }}
        >
          Add
        </button>
      </div>
    </div>
  ))}
            </div>
        </div>
      </div>
    </section>

    <section className="text-white bg-gray-900 body-font mt-1">
      <div className="container px-5 w-full py-10">
        <h1 className="text-4xl font-bold mb-8 ml-2">Course / Workshop Conducted</h1>
        <div className="px-5">
            <div className="mb-4">
                <table className="w-full border-collapse border border-gray-800">
    <thead>
      <tr>
        <th className="p-2 border-b border-gray-800">Course Title</th>
        <th className="p-2 border-b border-gray-800">Action</th>
      </tr>
    </thead>
    <tbody>
      {courses.map((course, index) => (
        <tr key={course.id} className="border-b border-gray-800">
          <td className="p-2">{course.course}</td>
          <td className="p-2">
            <button
              className="delete-btn"
              onClick={() => handleDeleteCourse(course.id)}
            >
              <MdDeleteForever />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {courseInputs.map((input, index) => (
    <div key={index} className="mt-4">
      <input
        className="li border border-gray-800 p-2"
        type="text"
        name="course"
        value={course.course}
        onChange={handleCourseChange}
      />

      <div className="button-container mt-2">
        <button
          className="text-white bg-indigo-500 border-0 -mr-3 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg  "
          onClick={() => {
            handleUpdateCourse();
            handleAddCourseInput();
            handleCourseInputChangenew(index, "");
            handleRefresh();
          }}
        >
          Add
        </button>
      </div>
    </div>
  ))}
            </div>
        </div>
      </div>
    </section>
        <BackToTopButton/>
      <Footer/>
    </>
  );
}
export default EditHome;
