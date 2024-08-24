import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import DuckIcon from "../assets/duck.svg";
import Logo from "../assets/logo.svg";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Skeleton,
  Alert,
} from "@mui/material";
import ImageLoader from "./ImageLoader";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State to track API call loading
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState(""); // State to track API error


  const apiBaseUrl =
    process.env.REACT_APP_API_BASE_URL || "https://localhost:4000";

  // Fetch users from API
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiBaseUrl}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setApiError("Erro ao buscar os dados. Tente novamente mais tarde.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiBaseUrl]);
  

  const handleLogin = (selectedUser) => {
    login({ selectedUser }, "mock-token");
    navigate("/dashboard");
  };

  const handleAdmin = () => {
    const isAdminAuthenticated = sessionStorage.getItem("isAdminAuthenticated");
    if (isAdminAuthenticated) {
      navigate("/admin");
    } else {
      setOpen(true);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (password === "segredo133") {
      sessionStorage.setItem("isAdminAuthenticated", "true");
      setOpen(false);
      setError("");
      navigate("/admin");
    } else {
      setError("Senha incorreta.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPassword("");
    setError("");
  };

  return (
    <div className="main-back d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-card card p-4 shadow-sm">
        <div className="text-center mb-4 header">
          <ImageLoader
            src={Logo}
            alt="Duck Icon"
            variant="circular"
            className="header-icon mx-auto d-block"
            width={175}
            height={175}
          />
        </div>
        <div className="container text-center mb-3">
          <h5>Selecione o seu perfil</h5>
          {apiError ? (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
            {apiError}
          </Alert>
          ) : (
            <div className="row">
              {loading
                ? Array.from(new Array(4)).map((_, index) => (
                    <div key={index} className="col-6 mb-4 user-card">
                      <div className="card p-2 d-flex flex-column justify-content-center">
                        <div className="d-flex justify-content-center">
                          <Skeleton variant="circular" width={90} height={90} />
                        </div>
                        <div className="card-body">
                          <Skeleton variant="text" height={30} />
                          <Skeleton variant="text" width="60%" height={20} />
                        </div>
                      </div>
                    </div>
                  ))
                : users.map((user) => (
                    <div
                      key={user._id}
                      className="col-6 mb-4 user-card"
                      onClick={() => handleLogin(user)}
                    >
                      <div className="card p-2 d-flex flex-column justify-content-center">
                        <div className="d-flex justify-content-center">
                          <ImageLoader
                            src={
                              user.profilePicture
                                ? `${apiBaseUrl}/${user.profilePicture}`
                                : DuckIcon
                            }
                            variant="circular"
                            alt={user.username}
                            className="card-img-top user-img mx-auto d-block"
                          />
                        </div>
                        <div className="card-body">
                          <h5>{user.username}</h5>
                          <p className="card-text">{user.house?.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          )}
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-primary" onClick={handleAdmin}>
              admin
            </button>
          </div>
        </div>
      </div>
  
      {/* Password Prompt Modal */}
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
        <DialogTitle>Acesso Admin</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Se vc é o duckmaster, por favor, insira a senha para acessar a
            página de administração.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={handlePasswordChange}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );  
};

export default Login;
