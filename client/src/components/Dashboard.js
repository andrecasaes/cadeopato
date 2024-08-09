import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
  ToggleButton,
  LinearProgress,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import {
  Check as CheckIcon,
  Clear as ClearIcon,
  Home as HomeIcon,
  Leaderboard as LeaderboardIcon,
} from "@mui/icons-material";
import DuckIcon from "../assets/duck.svg";
import "./Dashboard.css"; // Import the custom CSS file

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const [ducks, setDucks] = useState([]);
  const [foundPercentage, setFoundPercentage] = useState(0);
  const [totalNumber, setTotalNumber] = useState(0);
  const [foundNumber, setFoundNumber] = useState(0);
  const API_ROOT = process.env.REACT_APP_API_ROOT;

  // Redirect to login if no user is logged in
  if (!authState.user) {
    window.location.href = "/";
  }

  useEffect(() => {
    const fetchDucks = async () => {
      try {
        const response = await axios.get(
          `${API_ROOT}/ducks/search?house=${authState.user.house.id}`
        );
        const houseDucks = response.data;
        setDucks(houseDucks);

        // Calculate the percentage of found ducks
        const foundDucks = houseDucks.filter((duck) => duck.found).length;
        const percentage = (foundDucks / houseDucks.length) * 100;
        setFoundPercentage(percentage);
        setFoundNumber(foundDucks);
        setTotalNumber(houseDucks.length);
      } catch (error) {
        console.error("Error fetching ducks:", error);
      }
    };
    fetchDucks();
  }, [authState.user.house, API_ROOT]);

  const toggleFoundState = async (duckId, found) => {
    try {
      await axios.put(`${API_ROOT}/ducks/${duckId}`, { found });

      // Update the state first
      const updatedDucks = ducks.map((duck) =>
        duck._id === duckId ? { ...duck, found } : duck
      );
      setDucks(updatedDucks);

      // Calculate the percentage after updating the state
      const foundDucks = updatedDucks.filter((duck) => duck.found).length;
      const percentage = (foundDucks / updatedDucks.length) * 100;
      setFoundPercentage(percentage);
      setFoundNumber(foundDucks);
      setTotalNumber(updatedDucks.length);
    } catch (error) {
      console.error(
        `Error marking duck as ${found ? "found" : "unfound"}:`,
        error
      );
    }
  };

  return (
    <>
<AppBar className="Appbar" position="sticky" color="default">
  <Toolbar>
    <IconButton
      edge="start"
      color="inherit"
      aria-label="home"
      component={Link}
      to="/"
    >
      <img
        src={authState.user.house.img}
        alt={authState.user.house.name}
        className="start-icon"
      />
    </IconButton>

    <Typography component="div" sx={{ flexGrow: 1, alignItems: "center", textAlign: "center" }}>
      <h2 style={{margin:0}}> {authState.user.house.name} Dashboard</h2>
    </Typography>
    <IconButton
      edge="end"
      color="inherit"
      component={Link}
      to="/ranking"
      aria-label="ranking"
    >
      <LeaderboardIcon />
    </IconButton>
  </Toolbar>
  <Box sx={{ paddingX: 2, paddingBottom: 2 }}>
    <LinearProgress variant="determinate" value={foundPercentage} />
    <Typography variant="body2" color="textSecondary" align="center">
      {foundNumber} de {totalNumber} patos encontrados
    </Typography>
  </Box>
</AppBar>

      <div className="container py-4">
        <List>
          {ducks.map((duck) => (
            <ListItem key={duck._id} className="duck-list-item">
              <ListItemText
                primary={<h5>Pato {duck.id}</h5>}
                secondary={
                  <>
                    <span>Tipo: {duck.type}</span>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <ToggleButton
                  value="check"
                  selected={duck.found}
                  onChange={() => toggleFoundState(duck._id, !duck.found)}
                  className={
                    duck.found
                      ? "toggle-button-selected"
                      : "toggle-button-unselected"
                  }
                >
                  {duck.found ? (
                    <CheckIcon style={{ color: "#28a745" }} />
                  ) : (
                    <ClearIcon style={{ color: "#dc3545" }} />
                  )}
                </ToggleButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

export default Dashboard;
