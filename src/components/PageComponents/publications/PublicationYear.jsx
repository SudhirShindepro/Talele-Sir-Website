import React, { useState, useEffect } from "react";
import axios from "axios";

const PublicationYear = () => {

    const [totalConferences, setTotalConferences] = useState({});
    const [publications] = useState([]);

  
    
    const getTotalConferences = async (year) => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/conferences/totalConferences"
          );
          setTotalConferences(response.data);
        } catch (error) {
          console.error(" ", error);
        }
      };
    
      useEffect(() => {
        getTotalConferences();
      }, []);

  return (
    <div className="publication-container">
          {publications.map((publication) => (
            <div key={publication.id} className="publication-item">
              <p>
                International Conferences: {totalConferences.International || 0}
              </p>
              <p>National Conferences: {totalConferences.National || 0}</p>
            </div>
          ))}
        </div>
  )
}

export default PublicationYear
