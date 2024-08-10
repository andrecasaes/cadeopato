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
  Grid,
  Card,
  CardMedia,
  CardContent,
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
import { styled } from '@mui/material/styles';

// Styled ToggleButton using CSS Variables
const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  color: 'var(--text-color)',
  fontFamily: 'var(--font-family)',
  '&:hover': {
    backgroundColor: 'var(--primary-color-hover)',
    color: 'white',
  },
  '&.Mui-selected': {
    backgroundColor: 'var(--primary-color)',
    color: 'white',
  },
}));

const AdminPanel = () => {
  const [ducks, setDucks] = useState([]);
  const [filteredDucks, setFilteredDucks] = useState([]);
  const [currentDuck, setCurrentDuck] = useState({
    id: "",
    type: "",
    house: "",
    photo: "",
  });
  const [selectedHouse, setSelectedHouse] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const API_ROOT = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    const fetchDucks = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/ducks`);
        setDucks(response.data);
        setFilteredDucks(response.data.sort((a, b) => a.id - b.id));
      } catch (error) {
        console.error("Error fetching ducks:", error);
      }
    };
    fetchDucks();
  }, [API_ROOT]);

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
      formData.append("house", currentDuck.house);
      if (currentDuck.photo instanceof File) {
        formData.append("photo", currentDuck.photo);
      }

      if (isEditing) {
        await axios.put(`${API_ROOT}/ducks/${currentDuck._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const updatedDucks = ducks.map((duck) =>
          duck._id === currentDuck._id ? { ...duck, ...currentDuck } : duck
        );
        setDucks(updatedDucks);
        setFilteredDucks(updatedDucks);
      } else {
        formData.append("found", false); // Default value for new ducks
        const response = await axios.post(`${API_ROOT}/ducks`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setDucks([...ducks, response.data]);
        setFilteredDucks([...ducks, response.data]);
      }
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error saving duck:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_ROOT}/ducks/${currentDuck._id}`);
      const updatedDucks = ducks.filter((duck) => duck._id !== currentDuck._id);
      setDucks(updatedDucks);
      setFilteredDucks(updatedDucks);
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error deleting duck:", error);
    }
  };

  const openEditModal = (duck) => {
    setCurrentDuck(duck);
    setIsEditing(true);
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentDuck({
      id: "",
      type: "",
      house: selectedHouse || "",
      photo: "",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleHouseFilter = (event, newHouse) => {
    setSelectedHouse(newHouse);
    if (newHouse) {
      setFilteredDucks(
        ducks
          .filter((duck) => duck.house === newHouse)
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
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <ToggleButtonGroup
            value={selectedHouse}
            exclusive
            onChange={handleHouseFilter}
            aria-label="house filter"
          >
            <CustomToggleButton value="House1" aria-label="House 1">
              House 1
            </CustomToggleButton>
            <CustomToggleButton value="House2" aria-label="House 2">
              House 2
            </CustomToggleButton>
            <CustomToggleButton value="House3" aria-label="House 3">
              House 3
            </CustomToggleButton>
            <CustomToggleButton value="House4" aria-label="House 4">
              House 4
            </CustomToggleButton>
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
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 1,
              boxShadow: 24,
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
                  name="house"
                  value={currentDuck.house}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="House1">House 1</MenuItem>
                  <MenuItem value="House2">House 2</MenuItem>
                  <MenuItem value="House3">House 3</MenuItem>
                  <MenuItem value="House4">House 4</MenuItem>
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
                  <Box mt={2}>
                    {currentDuck.photo instanceof File ? (
                      <img
                        src={URL.createObjectURL(currentDuck.photo)}
                        alt="Duck Preview"
                        style={{ width: "100%", borderRadius: 4 }}
                      />
                    ) : (
                      <img
                        src={`${API_ROOT}/${currentDuck.photo.replace(/\\/g, '/')}`}
                        alt="Duck Preview"
                        style={{ width: "100%", borderRadius: 4 }}
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

        <Grid container spacing={4} mt={4}>
          {filteredDucks.map((duck) => (
            <Grid item key={duck._id} xs={12} sm={6} md={4}>
              <Card
                className="duck-card"
                onClick={() => openEditModal(duck)}
                sx={{ cursor: "pointer" }}
              >
                <CardMedia
                  component="img"
                  image={
                    duck.photo
                      ? `${API_ROOT}/${duck.photo.replace(/\\/g, '/')}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={`Duck ${duck.id}`}
                  height="150"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    Duck {duck.id} - {duck.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Casa: {duck.house}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={duck.found ? "success.main" : "error.main"}
                  >
                    {duck.found ? "Encontrado" : "Escondido"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default AdminPanel;
