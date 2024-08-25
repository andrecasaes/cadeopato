import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Ranking.css"; // Custom CSS file for additional styles
import { FaCrown } from "react-icons/fa"; // Crown icon for top rank
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Skeleton,
  Alert,
  Tabs,
  Tab, // Import Alert for error messages
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";


const Ranking = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [rankingType, setRankingType] = useState("user");
  const [error, setError] = useState(""); // State to track errors
  const navigate = useNavigate();
  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "https://localhost:4000";

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      setError(""); // Clear any previous errors
      try {
        const response = await axios.get(
          `${apiBaseUrl}/rankings?by=${rankingType}`
        );
        setRankings(response.data);
      } catch (error) {
        console.error("Error fetching rankings:", error);
        setError(
          "Não foi possível carregar os rankings. Por favor, entre em contato com o administrador."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRankings();
  }, [rankingType, apiBaseUrl]);

  const handleRankingTypeChange = (event, newRankingType) => {
    if (newRankingType !== null) {
      setRankingType(newRankingType);
    }
  };

  return (
    <>
      <AppBar className="Appbar" position="sticky" color="default">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography
            component="div"
            sx={{ flexGrow: 1, alignItems: "center", textAlign: "center" }}
          >
            <h2 style={{ margin: 0 }}>Ranking</h2>
          </Typography>
        </Toolbar>
        <Tabs
          value={rankingType}
          onChange={handleRankingTypeChange}
          aria-label="Ranking Tabs"
          centered
          sx={{
            "& .MuiTab-root": {
              color: "var(--text-color)", // Text color of the tab
              fontFamily: "var(--font-family)", // Custom font
              "&.Mui-selected": {
                color: "var(--primary-color)", // Color of the selected tab
                fontWeight: "bold", // Bold text for the selected tab
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "var(--primary-color)", // Indicator color
              height: "4px",
            },
          }}
        >
          <Tab label="Participante" value="user" />
          <Tab label="Casa" value="house" />
        </Tabs>
      </AppBar>

      <div className="container py-4">
        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <div className="list-group mt-3">
            {loading
              ? Array.from(new Array(5)).map((_, index) => (
                  <div
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex">
                      <Skeleton variant="text" width="150px" height={30} />
                    </div>
                    <Skeleton variant="text" width="15%" height={20} />
                  </div>
                ))
              : rankings.map((ranking, index) => (
                  <div
                    key={index}
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                      index === 0 ? "top-rank" : ""
                    }`}
                  >
                    <div className="d-flex align-items-center">
                      {index === 0 && (
                        <FaCrown className="crown-icon text-warning" />
                      )}
                      <h5 className="mb-0 ml-2">{ranking.entity}</h5>
                    </div>
                    <span className="badge badge-primary badge-pill">
                      {ranking.points} pontos
                    </span>
                  </div>
                ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Ranking;
