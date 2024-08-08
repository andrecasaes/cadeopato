// src/components/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Custom CSS file for additional styles
import { FaSignInAlt } from 'react-icons/fa'; // Icons
import DuckIcon from '../assets/duck.svg' 

const Login = () => {
  const [house, setHouse] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock authentication
    login({ house }, 'mock-token');
    navigate('/dashboard');
  };

  return (
    <div className="main-back d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-card card p-4 shadow-sm">
        <div className="text-center mb-4">
          <img src={DuckIcon} alt="Duck Icon" />
          <h2 className="mt-2">Patolimpíadas Casaes</h2>
        </div>
        <div className="mb-3">
          <select
            value={house}
            onChange={(e) => setHouse(e.target.value)}
            className="form-select"
          >
            <option value="">Selecione o seu time</option>
            <option value="House1">Casa 1</option>
            <option value="House2">Casa 2</option>
            <option value="House3">Casa 3</option>
            <option value="House4">Casa 4</option>
          </select>
        </div>
        <button
          onClick={handleLogin}
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
          disabled={!house} // Disable button if no house is selected
        >
          <FaSignInAlt className="me-2" />
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
