import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ImageLoader from "./ImageLoader";

const SolveClueModal = ({ open, handleClose, duck, apiBaseUrl, onClueSolved }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentDuck, setCurrentDuck] = useState(duck);

  useEffect(() => {
    setUserAnswer("");
    setIsCorrect(false);
    setCurrentDuck(duck);
  }, [duck]);

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    if (userAnswer.toLowerCase() === currentDuck?.clues[0]?.answer.toLowerCase()) {
      setIsCorrect(true);

      try {
        const response = await fetch(`${apiBaseUrl}/clues/${currentDuck.clues[0]._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ solved: true }),
        });

        if (response.ok) {
          const updatedClue = await response.json();
          onClueSolved(updatedClue);

          // Update the current duck state with the solved clue
          setCurrentDuck((prevDuck) => ({
            ...prevDuck,
            clues: prevDuck.clues.map((clue) =>
              clue._id === updatedClue._id ? updatedClue : clue
            ),
          }));
        }
      } catch (error) {
        console.error("Erro ao atualizar a charada:", error);
      }
    } else {
      setIsCorrect(false);
      alert("Resposta incorreta, tente novamente.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="solve-clue-modal-title"
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
        <Typography id="solve-clue-modal-title" variant="h6" gutterBottom>
          Resolver Charada para o Pato #{currentDuck?.id}
          <IconButton
            aria-label="fechar"
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
        {currentDuck?.clues[0]?.solved ? (
          <>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Esta charada já foi resolvida.
            </Typography>
            {currentDuck?.photo && (
              <Box sx={{ mb: 3 }}>
                <ImageLoader
                  src={`${apiBaseUrl}/${currentDuck.photo.replace(/\\/g, "/")}`}
                  alt={`Pato ${currentDuck.id}`}
                  variant="rectangular"
                  width="100%"
                />
              </Box>
            )}
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {currentDuck?.clues[0]?.clue || "Nenhuma charada disponível."}
            </Typography>
            <TextField
              label="Resposta"
              value={userAnswer}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ mt: 2 }}
            >
              Enviar Resposta
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default SolveClueModal;
