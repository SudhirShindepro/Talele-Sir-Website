import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaLinkedin } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import BackToTopButton from "../BackToTopButton";

function HomeComponent() {
  const [user, setUser] = useState({
    id: 1,
    name: "",
    lastName: "",
  });

  const imageId = 1;

  const [positions, setPositions] = useState([]);
  const [currentPositions, setCurrentPositions] = useState([]);
  const [educations, setEducations] = useState([]);
  const [teachingPositions, setTeachingPositions] = useState([]);
  const [awards, setAwards] = useState([]);
  const [recognitions, setRecognitions] = useState([]);
  const [areaOfInterests, setAreaOfInterests] = useState([]);
  const [publications, setPublications] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [visitingFacultyPositions, setVisitingFacultyPositions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [imageData, setImageData] = useState(null);

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

  const fetchPositions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/positions");
      setPositions(response.data);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
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

  const fetchEducations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/educations");
      setEducations(response.data);
    } catch (error) {
      console.error("Error fetching educations:", error);
    }
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

  const openLinkedInPage = () => {
    // Replace 'YOUR_LINKEDIN_PROFILE_URL' with the actual URL of your LinkedIn profile
    const linkedinUrl = "https://www.linkedin.com/in/k-t-v-talele";
    window.open(linkedinUrl, "_blank");
  };

  const openTwitterPage = () => {
    // Replace 'YOUR_LINKEDIN_PROFILE_URL' with the actual URL of your LinkedIn profile
    const linkedinUrl = "https://twitter.com/kiran_talele";
    window.open(linkedinUrl, "_blank");
  };

  const fetchImage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/images/${imageId}`
      );
      setImageData(response.data.data);
    } catch (error) {
      console.error("Error fetching image:", error.message);
    }
  };

  const fetchAwards = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/awards");
      setAwards(response.data);
    } catch (error) {
      console.error("Error fetching awards:", error);
    }
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

  const fetchMemberships = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/memberships");
      setMemberships(response.data);
    } catch (error) {
      console.error("Error fetching memberships:", error);
    }
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
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-8xl text-6xl mt-20 mb-4 font-medium text-white">
              {user.name}
            </h1>
            <p className="mb-8 mt-4 sm:text-2xl leading-relaxed">
              {user.description}
            </p>
            <div className="flex justify-center">
              <button onClick={openLinkedInPage} className="icon">
                <FaLinkedin />
              </button>
              <button onClick={openTwitterPage} className="icon">
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
          </div>
        </div>
      </section>

      <section className="text-white bg-gray-900 body-font mt-1">
        <div className="container px-5 w-full py-10">
          <h1 className="text-4xl font-bold mb-8 ml-2">Current Positions</h1>
          <div className="px-5">
            <div className="mb-4">
              <h2 className="text-xl text-left font-medium">
                {currentPositions.map((position) => (
                  <li className="pb-2" key={position.id}>
                    {position.position}
                  </li>
                ))}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="text-white bg-gray-900 body-font mt-1">
        <div className="container px-5 w-full py-10">
          <h1 className="text-4xl font-bold mb-8 ml-2">
            {" "}
            Educational Qualification
          </h1>
          <div className="px-5">
            <div className="mb-4">
              <h2 className="text-xl text-left font-medium">
                {educations.map((education) => (
                  <li className="pb-2" key={education.id}>
                    {education.degree}
                  </li>
                ))}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="text-white bg-gray-900 body-font mt-1">
        <div className="container px-5 w-full py-10">
          <h1 className="text-4xl font-bold mb-8 ml-2">Past Positions</h1>
          <div className="px-5">
            <div className="mb-4">
              <h2 className="text-xl text-left font-medium">
                {positions.map((position) => (
                  <li className="pb-2" key={position.id}>
                    {position.position}
                  </li>
                ))}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="text-white bg-gray-900 body-font mt-1">
        <div className="container px-5 w-full py-10">
          <h1 className="text-4xl font-bold mb-8 ml-2">Teaching Experience</h1>
          <div className="px-5">
            <div className="mb-4">
              <h2 className="text-xl text-left font-medium">
                {teachingPositions.map((position) => (
                  <li className="pb-2" key={position.id}>
                    {position.position}
                  </li>
                ))}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="text-white bg-gray-900 body-font mt-1">
        <div className="container px-5 w-full py-10">
          <h1 className="text-4xl font-bold mb-8 ml-2">Awards</h1>
          <div className="px-5">
            <div className="mb-4">
              <h2 className="text-xl text-left font-medium">
                {awards.map((award) => (
                  <li className="pb-2" key={award.id}>
                    {award.award}
                  </li>
                ))}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="text-white bg-gray-900 body-font mt-1">
        <div className="container px-5 w-full py-10">
          <h1 className="text-4xl font-bold mb-8 ml-2">Recognition</h1>
          <div className="px-5">
            <div className="mb-4">
              <h2 className="text-xl text-left font-medium">
                {recognitions.map((recognition) => (
                  <li key={recognition.id}>{recognition.recognition}</li>
                ))}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="text-white bg-gray-900 body-font mt-1">
        <div className="container px-5 w-full py-10">
          <h1 className="text-4xl font-bold mb-8 ml-2">Area Of Intrests</h1>
          <div className="px-5">
            <div className="mb-4">
              <h2 className="text-xl text-left font-medium">
                {areaOfInterests.map((areaOfInterest) => (
                  <li key={areaOfInterest.id}>{areaOfInterest.area}</li>
                ))}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="text-white bg-gray-900 body-font mt-1">
        <div className="container px-5 w-full py-10">
          <h1 className="text-4xl font-bold mb-8 ml-2">Publications</h1>
          <div className="px-5">
            <div className="mb-4">
              <h2 className="text-xl text-left font-medium">
                {publications.map((publication) => (
                  <li key={publication.id}>{publication.title}</li>
                ))}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="text-white bg-gray-900 body-font mt-1">
        <div className="container px-5 w-full py-10">
          <h1 className="text-4xl font-bold mb-8 ml-2">Memberships</h1>
          <div className="px-5">
            <div className="mb-4">
              <h2 className="text-xl text-left font-medium">
                {memberships.map((membership) => (
                  <li key={membership.id}>{membership.membership}</li>
                ))}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="text-white bg-gray-900 body-font mt-1">
        <div className="container px-5 w-full py-10">
          <h1 className="text-4xl font-bold mb-8 ml-2">
            Visiting Faculty Positions
          </h1>
          <div className="px-5">
            <div className="mb-4">
              <h2 className="text-xl text-left font-medium">
                {visitingFacultyPositions.map((position) => (
                  <li key={position.id}>{position.positionTitle}</li>
                ))}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="text-white bg-gray-900 body-font mt-1">
        <div className="container px-5 w-full py-10">
          <h1 className="text-4xl font-bold mb-8 ml-2">
            Course / Workshop Conducted
          </h1>
          <div className="px-5">
            <div className="mb-4">
              <h2 className="text-xl text-left font-medium">
                {courses.map((course) => (
                  <li key={course.id}>{course.course}</li>
                ))}
              </h2>
            </div>
          </div>
        </div>
      </section>
      <BackToTopButton />
    </>
  );
}

export default HomeComponent;
