import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageLoader from "./ImageLoader";

const DuckModal = ({
  open,
  handleClose,
  isEditing,
  currentDuck,
  houses,
  users,
  handleInputChange,
  handlePhotoChange,
  handleSubmit,
  handleDelete,
  submitting,
  apiBaseUrl,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginX: 6,
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 1,
          boxShadow: 24,
          maxWidth: "90vw",
          maxHeight: "90vh",
          overflowY: "auto",
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
            onClick={handleClose}
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
              disabled={isEditing}
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
                  <ImageLoader
                    src={URL.createObjectURL(currentDuck.photo)}
                    alt="Duck Preview"
                    variant="retangular"
                    className="duck-image-preview"
                    height="200px"
                  />
                ) : (
                  <ImageLoader
                    src={`${apiBaseUrl}/${currentDuck.photo.replace(/\\/g, "/")}`}
                    variant="retangular"
                    alt="Duck Preview"
                    className="duck-image-preview"
                    height="200px"
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
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : isEditing
              ? "Update Duck"
              : "Add Duck"}
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
  );
};

export default DuckModal;
