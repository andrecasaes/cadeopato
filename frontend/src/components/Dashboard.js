import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
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

  // Redirect to login if no user is logged in
  if (!authState.user) {
    window.location.href = "/";
  }
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {
    const fetchDucks = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/ducks/search?userId=${authState.user.selectedUser._id}`
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
  }, [apiBaseUrl, authState.user.selectedUser._id]);

  const toggleFoundState = async (duckId, found) => {
    try {
      await axios.put(`${apiBaseUrl}/ducks/${duckId}`, { found });

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
        src={authState.user.selectedUser.profilePicture ? `${apiBaseUrl}/${authState.user.selectedUser.profilePicture}` : DuckIcon}
        alt={authState.user.selectedUser.house.name}
        className="start-icon"
      />
    </IconButton>

    <Typography component="div" sx={{ flexGrow: 1, alignItems: "center", textAlign: "center" }}>
      <h2 style={{margin:0}}> {authState.user.selectedUser.username} Dashboard</h2>
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
