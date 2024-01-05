
import React, { useState, useEffect } from 'react';
import PublicationsComponent from './PublicationsComponent';

const PublicationList = () => {
  const [publications, setPublications] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetchUniqueYears();
  }, []);

  const fetchUniqueYears = async () => {
    try {
      const uniqueYears = await PublicationsComponent.getUniqueYears();
      setYears(uniqueYears);
    } catch (error) {
      console.error('Error fetching unique years', error);
    }
  };

  const fetchPublicationsByYear = async () => {
    try {
      const publicationsByYear = await PublicationsComponent.getPublicationsByYear(selectedYear);
      setPublications(publicationsByYear);
    } catch (error) {
      console.error(`Error fetching publications for year ${selectedYear}`, error);
    }
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleFetchByYear = () => {
    fetchPublicationsByYear();
  };

  return (
    <div>
      <div>
        <label htmlFor="year">Select Year:</label>
        <select id="year" onChange={handleYearChange} value={selectedYear}>
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button onClick={handleFetchByYear}>Fetch</button>
      </div>


      <div className="publication-container">
        {publications.map((publication) => (
          <div key={publication.id} className="publication-item">
            <h3>{publication.participants}</h3>
            <p>{publication.description}</p>
            <p>Conference Option: {publication.conferenceOption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicationList;
