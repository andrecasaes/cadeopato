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
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled ToggleButton using CSS Variables
const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  color: "var(--text-color)",
  fontWeight: "bold",
  fontFamily: "var(--font-family)",
  "&:hover": {
    backgroundColor: "var(--primary-color-hover)",
    color: "white",
  },
  "&.Mui-selected": {
    backgroundColor: "var(--primary-color)",
    color: "white",
  },
}));

const Ranking = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [rankingType, setRankingType] = useState("user");
  const navigate = useNavigate();
  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "https://localhost:4000";

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiBaseUrl}/rankings?by=${rankingType}`
        );
        setRankings(response.data);
      } catch (error) {
        console.error("Error fetching rankings:", error);
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
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <ToggleButtonGroup
            value={rankingType}
            exclusive
            onChange={handleRankingTypeChange}
            aria-label="user filter"
          >
            <CustomToggleButton value="user">Participante</CustomToggleButton>
            <CustomToggleButton value="house">Casa</CustomToggleButton>
          </ToggleButtonGroup>
        </Box>
      </AppBar>

      <div className="container py-4">
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
      </div>
    </>
  );
};

export default Ranking;
