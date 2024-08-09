// src/components/AdminPanel.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPanel.css"; // Import the custom CSS file
import DuckIcon from "../assets/duck.svg"; // Import the duck SVG file
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
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

const AdminPanel = () => {
  const [ducks, setDucks] = useState([]);
  const [newDuck, setNewDuck] = useState({
    id: "",
    type: "",
    house: "",
    photo: "",
  });
  const [showModal, setShowModal] = useState(false);
  const API_ROOT = process.env.REACT_APP_API_ROOT;

  useEffect(() => {
    const fetchDucks = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/ducks`);
        setDucks(response.data);
      } catch (error) {
        console.error("Error fetching ducks:", error);
      }
    };
    fetchDucks();
  }, [API_ROOT]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDuck({ ...newDuck, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDuck({ ...newDuck, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_ROOT}/ducks`, {
        id: newDuck.id,
        type: newDuck.type,
        house: newDuck.house,
        photo: newDuck.photo,
        found: false,
      });
      setDucks([...ducks, response.data]);
      setNewDuck({ id: "", type: "", house: "", photo: "" });
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error adding new duck:", error);
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
          <IconButton
            edge="end"
            color="inherit"
            component={Link}
            onClick={() => setShowModal(true)}
          >
            <AddCircleIcon />
          </IconButton>
        </Toolbar>
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
              Add novo pato
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
                  value={newDuck.id}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="duckType-label">Tipo</InputLabel>
                <Select
                  labelId="duckType-label"
                  id="duckType"
                  name="type"
                  value={newDuck.type}
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
                  value={newDuck.house}
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
                {newDuck.photo && (
                  <Box mt={2}>
                    <img
                      src={newDuck.photo}
                      alt="Duck Preview"
                      style={{ width: "100%", borderRadius: 4 }}
                    />
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
                Adicionar
              </Button>
            </Box>
          </Box>
        </Modal>

        <Grid container spacing={4} mt={4}>
          {ducks.map((duck) => (
            <Grid item key={duck._id} xs={12} sm={6} md={4}>
              <Card className="duck-card">
                <CardMedia
                  component="img"
                  image={duck.photo || "https://via.placeholder.com/150"}
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
