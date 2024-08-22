import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Custom CSS file for additional styles
import { FaSignInAlt } from 'react-icons/fa'; // Icons
import DuckIcon from '../assets/duck.svg';
import Logo from '../assets/logo.svg';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false); // State to control the modal visibility
  const [password, setPassword] = useState(''); // State to store the entered password
  const [error, setError] = useState(''); // State to store any error message
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); // State to track admin authentication

  // Get the API base URL from the environment variables
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

  // Fetch users from API
  useEffect(() => {
    axios.get(`${apiBaseUrl}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [apiBaseUrl]);

  const handleLogin = (selectedUser) => {
    // Mock authentication (replace with real login logic if necessary)
    login({ selectedUser }, 'mock-token');
    navigate('/dashboard');
  };

  const handleAdmin = () => {
    const isAdminAuthenticated = sessionStorage.getItem('isAdminAuthenticated');
    if (isAdminAuthenticated) {
      navigate('/admin');
    } else {
      setOpen(true); // Open the password modal when the Admin button is clicked
    } 
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    // Replace 'yourAdminPassword' with the actual password you want to check against
    
    if (password === 'segredo133') {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setOpen(false); // Close the modal
      setError('');   // Clear any previous error message
      navigate('/admin'); // Navigate to the admin page
    } else {
      setError('Senha incorreta.'); // Display an error message
    }
  };

  const handleClose = () => {
    setOpen(false); // Close the modal if the user cancels
    setPassword(''); // Clear the password field
    setError(''); // Clear the error message
  };

  return (
    <div className="main-back d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-card card p-4 shadow-sm">
        <div className="text-center mb-4 header">
          <img src={Logo} alt="Duck Icon" className="header-icon" />
        </div>
        <div className="container text-center mb-3">
          <h5>Selecione o seu perfil</h5>
          <div className="row">
            {users.map((user) => (
              <div
                key={user._id}
                className="col-6 mb-4 user-card"
                onClick={() => handleLogin(user)}
              >
                <div className="card p-2">
                  <img
                    src={user.profilePicture ? `${apiBaseUrl}/${user.profilePicture}` : DuckIcon}
                    alt={user.username}
                    className="card-img-top user-img mx-auto d-block"
                  />
                  <div className="card-body">
                    <h5>{user.username}</h5>
                    <p className='card-text'>{user.house?.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            Se vc é o duckmaster, por favor, insira a senha para acessar a página de administração.
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
            error={!!error} // Display error style if there's an error
            helperText={error} // Display error message below the text field
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
