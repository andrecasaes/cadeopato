import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const HouseModal = ({
  open,
  handleClose,
  isEditing,
  currentHouse,
  handleInputChange,
  handleSubmit,
  handleDelete,
  submitting,
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
          {isEditing ? "Edit House" : "Add New House"}
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
              label="Name"
              type="text"
              id="houseName"
              name="name"
              value={currentHouse.name}
              onChange={handleInputChange}
              required
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Address"
              type="text"
              id="houseAddress"
              name="address"
              value={currentHouse.address}
              onChange={handleInputChange}
            />
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
              ? "Update House"
              : "Add House"}
          </Button>

          {isEditing && (
            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleDelete}
            >
              Delete House
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default HouseModal;
