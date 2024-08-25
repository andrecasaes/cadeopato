import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageLoader from "./ImageLoader";

const UserModal = ({
  open,
  onClose,
  isEditing,
  currentUser,
  houses,
  onInputChange,
  handlePhotoChange,
  onSubmit,
  onDelete,
  submitting,
  apiBaseUrl
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
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
          {isEditing ? "Edit User" : "Add New User"}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
        <Box component="form" onSubmit={onSubmit}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Username"
              id="username"
              name="username"
              value={currentUser.username}
              onChange={onInputChange}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="house-label">House</InputLabel>
            <Select
              labelId="house-label"
              id="houseId"
              name="houseId"
              value={currentUser.houseId}
              onChange={onInputChange}
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
            <Button variant="contained" component="label">
              Upload Profile Picture
              <input
                type="file"
                hidden
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </Button>
            {currentUser.profilePicture && (
              <Box mt={2} sx={{ textAlign: "center" }}>
                {currentUser.profilePicture instanceof File ? (
                  <ImageLoader
                    src={URL.createObjectURL(currentUser.profilePicture)}
                    alt="Duck Preview"
                    variant="retangular"
                    className="duck-image-preview"
                    height="200px"
                  />
                ) : (
                  <ImageLoader
                    src={`${apiBaseUrl}/${currentUser.profilePicture.replace(/\\/g, "/")}`}
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
              ? "Update User"
              : "Add User"}
          </Button>

          {isEditing && (
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 2 }}
              onClick={onDelete}
            >
              Delete User
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default UserModal;
