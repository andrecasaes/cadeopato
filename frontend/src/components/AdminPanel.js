import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

// Styled ToggleButton using CSS Variables
const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  color: "var(--text-color)",
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

const apiBaseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

const fetchDucks = async (setDucks, setFilteredDucks) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/ducks`);
    setDucks(response.data);
    setFilteredDucks(response.data.sort((a, b) => a.id - b.id));
  } catch (error) {
    console.error("Error fetching ducks:", error);
  }
};

const fetchHouses = async (setHouses) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/houses`);
    setHouses(response.data);
  } catch (error) {
    console.error("Error fetching houses:", error);
  }
};

const fetchUsers = async (setUsers) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/users`);
    setUsers(response.data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const AdminPanel = () => {
  const [ducks, setDucks] = useState([]);
  const [houses, setHouses] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredDucks, setFilteredDucks] = useState([]);
  const [currentDuck, setCurrentDuck] = useState({
    id: "",
    type: "",
    houseId: "",
    photo: "",
    userId: "",
  });
  const [selectedHouse, setSelectedHouse] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchDucks(setDucks, setFilteredDucks);
    fetchHouses(setHouses);
    fetchUsers(setUsers);
  }, []);

  const navigate = useNavigate();
  
  // Assuming you passed the isAdminAuthenticated prop when navigating to the admin page
  useEffect(() => {
    const isAdminAuthenticated = sessionStorage.getItem('isAdminAuthenticated');

    if (!isAdminAuthenticated) {
      navigate('/'); // Redirect to home or login page if not authenticated
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDuck({ ...currentDuck, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentDuck({ ...currentDuck, photo: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", currentDuck.id);
      formData.append("type", currentDuck.type);
      formData.append("houseId", currentDuck.houseId);
      formData.append("userId", currentDuck.userId);
      if (currentDuck.photo instanceof File) {
        formData.append("photo", currentDuck.photo);
      }
  
      if (isEditing) {
        await axios.put(`${apiBaseUrl}/ducks/${currentDuck._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        formData.append("found", false); // Default value for new ducks
        await axios.post(`${apiBaseUrl}/ducks`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchDucks(setDucks, setFilteredDucks); // Fetch the updated list of ducks
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error saving duck:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiBaseUrl}/ducks/${currentDuck._id}`);
      fetchDucks(setDucks, setFilteredDucks); // Fetch the updated list of ducks
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error deleting duck:", error);
    }
  };

  const openEditModal = (duck) => {
    setCurrentDuck({
      _id: duck._id,
      userId: duck.user._id || "",
      houseId: duck.house._id || "",
      id: duck.id,
      type: duck.type,
      found: duck.found,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentDuck({
      userId: selectedHouse || "",
      houseId: selectedUser || "",
      id: "",
      type: "normal",
      found: false,
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleHouseFilter = (event, newHouseId) => {
    setSelectedHouse(newHouseId);

    if (newHouseId) {
      setFilteredDucks(
        ducks
          .filter((duck) => duck.house._id === newHouseId)
          .sort((a, b) => a.id - b.id)
      );
    } else {
      setFilteredDucks(ducks.sort((a, b) => a.id - b.id));
    }
  };

  const handleUserFilter = (event, newUserId) => {
    setSelectedUser(newUserId);

    if (newUserId) {
      setFilteredDucks(
        ducks
          .filter((duck) => duck.user._id === newUserId)
          .sort((a, b) => a.id - b.id)
      );
    } else {
      setFilteredDucks(ducks.sort((a, b) => a.id - b.id));
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
            <HomeIcon />
          </IconButton>

          <Typography
            component="div"
            sx={{ flexGrow: 1, alignItems: "center", textAlign: "center" }}
          >
            <h2 style={{ margin: 0 }}> QuackTequila</h2>
          </Typography>
          <IconButton edge="end" color="inherit" onClick={openAddModal}>
            <AddCircleIcon />
          </IconButton>
        </Toolbar>
        {/* <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <ToggleButtonGroup
            value={selectedHouse}
            exclusive
            onChange={handleHouseFilter}
            aria-label="house filter"
          >
            {houses.map((house) => (
            <CustomToggleButton value={house._id}>
              {house.name}
            </CustomToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box> */}
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <ToggleButtonGroup
            value={selectedUser}
            exclusive
            onChange={handleUserFilter}
            aria-label="user filter"
          >
            {users.map((user) => (
            <CustomToggleButton value={user._id}>
              {user.username}
            </CustomToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </AppBar>

      <Container>
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginX: 6,
            overflowY: "auto", // Allow vertical scrolling if content is too tall
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 1,
              boxShadow: 24,
              maxWidth: "90vw", // Limit modal width on small screens
              maxHeight: "90vh", // Limit modal height and allow scrolling within
              overflowY: "auto", // Enable scrolling inside the modal box
              position: "relative",
            }}
          >
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              {isEditing ? "Edit Duck" : "Add New Duck"}
              <IconButton
                aria-label="close"
                onClick={() => setShowModal(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Numero"
                  type="number"
                  id="duckNumber"
                  name="id"
                  value={currentDuck.id}
                  onChange={handleInputChange}
                  disabled={isEditing} // Disable ID input if editing
                  required
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="duckType-label">Tipo</InputLabel>
                <Select
                  labelId="duckType-label"
                  id="duckType"
                  name="type"
                  value={currentDuck.type}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="oclinhos">Oclinhos</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="duckHouse-label">Casa</InputLabel>
                <Select
                  labelId="duckHouse-label"
                  id="duckHouse"
                  name="houseId"
                  value={currentDuck.houseId}
                  onChange={handleInputChange}
                  required
                >
                  {houses.map((house) => (
                    <MenuItem key={house._id} value={house._id}>
                      {house.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="duckUser-label">User</InputLabel>
                <Select
                  labelId="duckUser-label"
                  id="duckUser"
                  name="userId"
                  value={currentDuck.userId}
                  onChange={handleInputChange}
                  required
                >
                  {users.map((user) => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Button variant="contained" component="label">
                  Upload Photo
                  <input
                    type="file"
                    hidden
                    id="duckPhoto"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </Button>
                {currentDuck.photo && (
                  <Box mt={2} sx={{ textAlign: "center" }}>
                    {currentDuck.photo instanceof File ? (
                      <img
                        src={URL.createObjectURL(currentDuck.photo)}
                        alt="Duck Preview"
                        style={{
                          borderRadius: 4,
                          maxHeight: "200px", // Constrain image height
                          maxWidth: "100%", // Constrain image width
                        }}
                      />
                    ) : (
                      <img
                        src={`${apiBaseUrl}${currentDuck.photo.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt="Duck Preview"
                        style={{
                          borderRadius: 4,
                          maxHeight: "200px", // Constrain image height
                          maxWidth: "100%", // Constrain image width
                        }}
                      />
                    )}
                  </Box>
                )}
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
                sx={{ mt: 3 }}
              >
                {isEditing ? "Update Duck" : "Add Duck"}
              </Button>
              {isEditing && (
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleDelete}
                >
                  Delete Duck
                </Button>
              )}
            </Box>
          </Box>
        </Modal>

        <List sx={{ mt: 4 }}>
          {filteredDucks.map((duck) => (
            <ListItem
              key={duck._id}
              className="duck-list-item"
              sx={{ cursor: "pointer" }}
              onClick={() => openEditModal(duck)}
            >
              <ListItemText
                primary={<Typography variant="h5">Pato {duck.id}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      Casa: {duck.house.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Participante: {duck.user.username}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tipo: {duck.type}
                    </Typography>
                    <Typography
                      variant="body2"
                      color={duck.found ? "success.main" : "error.main"}
                    >
                      {duck.found ? "Encontrado" : "Escondido"}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <img
                  src={
                    duck.photo
                      ? `${apiBaseUrl}/${duck.photo.replace(/\\/g, "/")}`
                      : "https://via.placeholder.com/40"
                  }
                  alt={`Duck ${duck.id}`}
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default AdminPanel;
