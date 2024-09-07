import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import {
  Modal,
  Box,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { PhotoCamera, Cameraswitch, Replay, Save } from "@mui/icons-material"; // Correct import for Cameraswitch
import axios from "axios";

const apiBaseUrl =
  process.env.REACT_APP_API_BASE_URL || "https://localhost:4000";

const QuickPhotoUpload = ({ open, handleClose, onUploadSuccess }) => {
  const [imageSrc, setImageSrc] = useState(null); // For storing the captured image
  const [duckNumber, setDuckNumber] = useState(''); // For storing the duck number input
  const webcamRef = useRef(null); // Reference to the webcam
  const [uploading, setUploading] = useState(false); // Loading state for uploads
  const [devices, setDevices] = useState([]); // List of available media devices
  const [selectedDeviceId, setSelectedDeviceId] = useState(''); // Currently selected rear camera ID
  const [errorMessage, setErrorMessage] = useState(''); // Error message for duck not found
  const [successMessage, setSuccessMessage] = useState(''); // Success message

  useEffect(() => {
    // Fetch media devices and filter for back-facing cameras
    const getMediaDevices = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        setErrorMessage('Navegador não suporta o acesso à câmera.');
        return;
      }
  
      try {
        // Force the browser to prompt for camera permission
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        // If permission is granted, enumerate devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
        const rearCameras = videoDevices.filter((device) =>
          device.label.toLowerCase().includes('back')
        );
  
        // Set the first rear camera by default
        if (rearCameras.length > 0) {
          setDevices(rearCameras);
          setSelectedDeviceId(rearCameras[0].deviceId);
        } else if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId); // Default to the first available camera
        } else {
          setErrorMessage('Nenhuma câmera disponível!');
        }
  
        // Stop the stream after getting permission (since we'll use the webcam component)
        stream.getTracks().forEach(track => track.stop());
      } catch (error) {
        setErrorMessage('Permissão da câmera negada ou erro ao acessar a câmera.');
        console.error('Camera permission error:', error);
      }
    };
  
    getMediaDevices();
  }, []);
  

  // Function to capture the image from the webcam
  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setImageSrc(imageSrc);
      setSuccessMessage(''); // Clear success message when retaking photo
    } else {
      setErrorMessage('Erro ao capturar a foto. Tente novamente.');
    }
  };

  // Function to switch between rear cameras
  const switchCamera = () => {
    if (devices.length > 1) {
      const currentIndex = devices.findIndex((device) => device.deviceId === selectedDeviceId);
      const nextIndex = (currentIndex + 1) % devices.length;
      setSelectedDeviceId(devices[nextIndex].deviceId);
    }
  };

  // Function to handle the duck number input
  const handleDuckNumberChange = (e) => {
    setDuckNumber(e.target.value);
    setErrorMessage(''); // Clear the error message when the duck number changes
    setSuccessMessage(''); // Clear success message when duck number changes
  };

  // Function to handle the upload of the photo
  const handleUpload = async () => {
    if (!duckNumber || !imageSrc) {
      setErrorMessage('Número do pato ou foto ausente.');
      return; // Prevent upload if duck number or image is missing
    }

    setUploading(true);
    setErrorMessage(''); // Clear any previous error messages
    setSuccessMessage(''); // Clear success message

    try {
      const formData = new FormData();

      // Convert the base64 image to a file object for upload
      const blob = await fetch(imageSrc).then((res) => res.blob());
      formData.append('photo', new File([blob], 'duck-photo.jpg', { type: 'image/jpeg' }));

      // PUT request to update only the image of the duck by custom ID
      await axios.put(`${apiBaseUrl}/ducks/image/${duckNumber}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Show success message and reset the form to allow another upload
      setSuccessMessage(`Pato ${duckNumber} mudou de visual!`);
      setImageSrc(null); // Reset the image to allow capturing/uploading another one
      setDuckNumber(''); // Reset duck number input
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage(`Pato ${duckNumber} não encontrado!`);
      } else if (error.response) {
        setErrorMessage('Erro ao carregar a foto. Tente novamente.');
      } else {
        setErrorMessage('Erro de rede. Verifique sua conexão.');
      }
    } finally {
      setUploading(false); // Stop loading after the request completes
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 1,
          boxShadow: 24,
          width: "400px",
          textAlign: "center",
        }}
      >
        {successMessage && (
          <Alert severity="success" sx={{ mt: 2, mb: 2 }}>
            {successMessage}
          </Alert>
        )}
        {!imageSrc ? (
          <>
            {selectedDeviceId && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
                videoConstraints={{
                  deviceId: selectedDeviceId, // Use the selected rear camera
                }}
              />
            )}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              {devices.length > 1 && (
                <IconButton
                  onClick={switchCamera}
                  sx={{
                    backgroundColor: "var(--secondary-color)",
                    "&:hover": {
                      backgroundColor: "var(--primary-color-hover)",
                    },
                    color: "white",
                    borderRadius: "50%",
                    padding: "16px",
                  }}
                >
                  <Cameraswitch sx={{ fontSize: 40 }} />
                </IconButton>
              )}
              <IconButton
                onClick={capturePhoto}
                sx={{
                  backgroundColor: "var(--accent-color)",
                  "&:hover": {
                    backgroundColor: "var(--primary-color-hover)",
                  },
                  color: "white",
                  borderRadius: "50%",
                  marginLeft: "16px",
                  padding: "16px",
                }}
              >
                <PhotoCamera sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>
          </>
        ) : (
          <>
            <img
              src={imageSrc}
              alt="Captured Duck"
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <TextField
              label="Numero do Pato"
              type="number"
              fullWidth
              value={duckNumber}
              onChange={handleDuckNumberChange}
              sx={{ mt: 2 }}
              required
            />
            {errorMessage && (
              <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <IconButton
                onClick={() => setImageSrc(null)}
                disabled={uploading}
                sx={{
                  backgroundColor: "var(--primary-color)",
                  "&:hover": {
                    backgroundColor: "var(--primary-color-hover)",
                  },
                  color: "white",
                  borderRadius: "50%",
                  padding: "16px",
                }}
              >
                <Replay sx={{ fontSize: 40 }} />
              </IconButton>
              <IconButton
                onClick={handleUpload}
                disabled={uploading}
                sx={{
                  backgroundColor: uploading ? "gray" : "var(--success-color)",
                  "&:hover": {
                    backgroundColor: uploading
                      ? "gray"
                      : "var(--primary-color-hover)",
                  },
                  color: "white",
                  borderRadius: "50%",
                  padding: "16px",
                  marginLeft: "16px",
                }}
              >
                {uploading ? (
                  <CircularProgress size={24} />
                ) : (
                  <Save sx={{ fontSize: 40 }} />
                )}
              </IconButton>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default QuickPhotoUpload;
