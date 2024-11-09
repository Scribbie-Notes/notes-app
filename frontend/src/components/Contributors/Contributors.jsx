import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Contributors.css";

function Contributors() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContributors() {
      let allContributors = [];
      let page = 1;

      try {
        while (true) {
          const response = await axios.get(
            `https://api.github.com/repos/Scribbie-Notes/notes-app/contributors`,
            {
              params: {
                per_page: 100,
                page,
              },
            }
          );
          const data = response.data;
          if (data.length === 0) {
            break;
          }
          allContributors = [...allContributors, ...data];
          page++;
        }
        setContributors(allContributors);
      } catch (error) {
        console.error("Error fetching contributors:", error);
        setError("Failed to load contributors. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, []);

  if (loading) {
    return <div className="loading">Loading contributors...</div>;
  }

  return (
    <div className="contributors-container">
      <h1 className="contributors-title">Our Contributors</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="contributors-grid">
        {contributors.length > 0 ? (
          contributors.map((contributor) => (
            <a
              key={contributor.id}
              href={contributor.html_url}  // Link to the contributor's GitHub profile
              target="_blank"
              rel="noopener noreferrer"
              className="contributor-card" // Apply card styling
            >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="contributor-avatar"
              />
              <h2 className="contributor-name">{contributor.login}</h2>
              <p className="contributor-contributions">
                Contributions: {contributor.contributions}
              </p>
            </a>
          ))
        ) : (
          <p>No contributors found.</p>
        )}
      </div>
    </div>
  );
}

export default Contributors;
