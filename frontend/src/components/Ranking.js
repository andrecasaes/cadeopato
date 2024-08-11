// src/components/Ranking.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Ranking.css"; // Import the custom CSS file
import { FaCrown } from "react-icons/fa"; // Crown icon for top rank
import { Typography, AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

const Ranking = () => {
  const [rankings, setRankings] = useState([]);
  const API_ROOT = process.env.REACT_APP_API_ROOT;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/rankings`);
        setRankings(response.data);
      } catch (error) {
        console.error("Error fetching rankings:", error);
      }
    };
    fetchRankings();
  }, [API_ROOT]);

  return (
    <>
      <AppBar className="Appbar" position="sticky" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate(-1)} // Use navigate(-1) to go back to the previous page
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography
            component="div"
            sx={{ flexGrow: 1, alignItems: "center", textAlign: "center" }}
          >
            <h2 style={{ margin: 0 }}> Ranking</h2>
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="container py-4">
        <div className="list-group">
          {rankings.map((ranking, index) => (
            <div
              key={index}
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                index === 0 ? "top-rank" : ""
              }`}
            >
              <div className="d-flex align-items-center">
                {index === 0 && <FaCrown className="crown-icon text-warning" />}
                <h5 className="mb-0 ml-2">{ranking.house}</h5>
              </div>
              <span className="badge badge-primary badge-pill">
                {ranking.points} pontos
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Ranking;
