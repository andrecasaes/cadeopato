// src/components/Ranking.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Ranking.css'; // Import the custom CSS file
import { FaCrown } from 'react-icons/fa'; // Crown icon for top rank

const Ranking = () => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    // Fetch rankings from backend (mock data here)
    setRankings([
      { house: 'House1', points: 10 },
      { house: 'House2', points: 8 },
      { house: 'House3', points: 7 },
      { house: 'House4', points: 5 },
    ]);
  }, []);

  return (
    <div className="container-rank py-4">
      <h1 className="text-center mb-4">Ranking</h1>
      <div className="list-group">
        {rankings.map((ranking, index) => (
          <div
            key={index}
            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${index === 0 ? 'top-rank' : ''}`}
          >
            <div className="d-flex align-items-center">
              {index === 0 && <FaCrown className="crown-icon text-warning" />}
              <h5 className="mb-0 ml-2">{ranking.house}</h5>
            </div>
            <span className="badge badge-primary badge-pill">{ranking.points} pontos</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
