import React, { useState, useEffect } from "react";
import axios from "axios";

const PublicationsComponent = () => {
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
  }, []);

  const [publicationId] = useState(1);
  const [publicationDesc, setPublicationDesc] = useState(null);

  const fetchPublicationDescById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/publicationdesc/1`
      );
      setPublicationDesc(response.data);
    } catch (error) {
      console.error("Error fetching publication description by ID:", error);
    }
  };

  useEffect(() => {
    if (publicationId) {
      fetchPublicationDescById();
    }
  }, [publicationId]);

  return (
    <section className="text-white p-8 md:p-20 items-center  bg-gray-900 body-font mt-14 flex flex-col item justify-items-center">
      <div className="flex justify-center items-center flex-col">
        {publicationDesc && (
          <div>
            <h1 className="text-2xl mb-8 mt-12  md:text-4xl font-bold text-center">
              {publicationDesc.titleString}
            </h1>
            <div className="text-center justify-center text-5xl flex">
              <p className="text-center text-2xl  mr-4">
                Total International Conferences:{" "}
                {totalConferences.International || 0}
              </p>
              <br />
              <p className="text-center text-2xl">
                Total National Conferences: {totalConferences.National || 0}
              </p>
            </div>

            <img
              src={`data:image/png;base64,${publicationDesc.data}`}
              alt="Publication Image"
            />
          </div>
        )}

        <div className="flex justify-center items-center flex-col">
          <div className="gap=4">
            <div
              style={{ marginBottom: 16 }}
              className="flex gap-3 items-center text-center mt-10"
            >
              <h2 className="text-white md:mr-2">Select Year:</h2>
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
          <h2 className="selected-year">
            Publications in Year: {selectedYear}
          </h2>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 ">
            {publications.map((publication) => (
              <div key={publication.id} className="publication-item p-4">
                <h3 className="text-2xl font-bold mb-2">
                  {publication.participants}
                </h3>
                <p className="text-gray-200 mb-4">{publication.description}</p>
                <p className="text-gray-300">
                  Conference Type: {publication.conferenceOption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicationsComponent;
