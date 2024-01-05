import React, { useState, useEffect } from "react";
import axios from "axios";

const PublicationEditComponent = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [publications, setPublications] = useState([]);
  const [totalConferences, setTotalConferences] = useState({});

  useEffect(() => {
    const fetchAvailableYears = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/conferences/years"
        );
        setAvailableYears(response.data);
      } catch (error) {
        console.error("Error fetching available years", error);
      }
    };

    fetchAvailableYears();
  }, []);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    // Fetch publications initially (you can modify this logic based on your needs)
    fetchPublicationsByYear(selectedYear);
  }, [selectedYear]);

  const fetchPublicationsByYear = async (year) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/conferences/byYear/${year}`
      );
      setPublications(response.data);
    } catch (error) {
      console.error(" ", error);
    }
  };

  useEffect(() => {
    console.log("Fetching total conferences...");
    const getTotalConferences = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/conferences/totalConferences"
        );
        setTotalConferences(response.data);
        console.log("Total conferences fetched:", response.data);
      } catch (error) {
        console.error("Error fetching total conferences:", error);
      }
    };

    getTotalConferences();
  }, []); // Fetch total conferences only once on component mount

  const handleDeletePublication = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/conferences/${id}`);
      // Filter out the deleted publication from the state
      const updatedPublications = publications.filter((publication) => publication.id !== id);
      setPublications(updatedPublications);
      console.log(`Deleted publication with ID: ${id}`);
    } catch (error) {
      console.error('Error deleting publication:', error);
    }
  };

  return (
    <div>
      <div>
        <h2 className="selected-year">{selectedYear}</h2>
        <div>
        <div className="publication-item">
          <p>
            International Conferences: {totalConferences.International || 0}
          </p>
          <p>National Conferences: {totalConferences.National || 0}</p>
        </div>
        <div className="publication-container">
          {publications.map((publication) => (
            <div key={publication.id} className="publication-item">
              <h3>{publication.participants}</h3>
              <p>{publication.description}</p>
              <p>Conference Type: {publication.conferenceOption}</p>
              <button className="bg-red-600" onClick={() => handleDeletePublication(publication.id)}>Delete</button>
            </div>
          ))}
        </div>
        <div style={{marginBottom:16}} className="flex gap-3 items-center justify-center text-center md:flex-row  md:right-20 md:top-24 lg:right-20 lg:mt-2">
        <h2 className="text-white md:mr-2">Select Year:</h2>
          <select className="border text-black rounded-md py-2 px-3 md:ml-0 md:mt-2 lg:ml-2" value={selectedYear} onChange={handleYearChange}>
            <option value="">Year</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PublicationEditComponent
