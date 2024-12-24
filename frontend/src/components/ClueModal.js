import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  FormControl,
  ButtonBase,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageLoader from "./ImageLoader"; // Ensure this is your existing component for images

const ClueModal = ({
  open,
  handleClose,
  duck,
  apiBaseUrl,
  onClueSubmit,
}) => {
  const [formState, setFormState] = useState({ clue: "", answer: "", solved: false });
  const [hasClues, setHasClues] = useState(false);
  const [expandedImage, setExpandedImage] = useState(false);

  useEffect(() => {
    if (duck?.clues?.length > 0) {
      setHasClues(true);
      const firstClue = duck.clues[0];
      setFormState({ clue: firstClue.clue, answer: firstClue.answer, solved: firstClue.solved || false });
    } else {
      setHasClues(false);
      setFormState({ clue: "", answer: "", solved: false });
    }
  }, [duck]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormState((prevState) => ({ ...prevState, solved: e.target.checked }));
  };

  const handleSubmit = async () => {
    const { clue, answer, solved } = formState;
    if (!clue || !answer) return;

    try {
      const endpoint = hasClues
        ? `${apiBaseUrl}/clues/${duck.clues[0]._id}`
        : `${apiBaseUrl}/ducks/${duck._id}/clues`;
      const method = hasClues ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clue, answer, solved }),
      });

      if (response.ok) {
        const updatedClue = await response.json();
        onClueSubmit(updatedClue);
        handleClose();
      }
    } catch (error) {
      console.error("Error handling clue:", error);
    }
  };

  const toggleImageExpansion = () => {
    setExpandedImage(!expandedImage);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="clue-modal-title"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 1,
          boxShadow: 24,
          maxWidth: "600px",
          width: "90%",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Typography id="clue-modal-title" variant="h6" gutterBottom>
          Clues for Duck #{duck?.id}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
        {duck?.photo && (
          <ButtonBase mb={3} onClick={toggleImageExpansion}>
            <Box>
              <ImageLoader
                src={`${apiBaseUrl}/${duck.photo.replace(/\\/g, "/")}`}
                alt={`Duck ${duck.id}`}
                variant="rectangular"
                width={expandedImage ? "100%" : "200px"}
              />
            </Box>
          </ButtonBase>
        )}
        <FormControl fullWidth margin="normal">
          <TextField
            label="Clue"
            name="clue"
            value={formState.clue}
            onChange={handleInputChange}
            multiline
            rows={3}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Answer"
            name="answer"
            value={formState.answer}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <label>
            <input
              type="checkbox"
              checked={formState.solved}
              onChange={handleCheckboxChange}
            />
            Solved
          </label>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!formState.clue || !formState.answer}
          sx={{ mt: 2 }}
        >
          {hasClues ? "Update Clue" : "Submit Clue"}
        </Button>
      </Box>
    </Modal>
  );
};

export default ClueModal;
