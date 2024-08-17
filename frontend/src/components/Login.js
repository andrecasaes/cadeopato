import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Custom CSS file for additional styles
import { FaSignInAlt } from 'react-icons/fa'; // Icons
import DuckIcon from '../assets/duck.svg';
import House1 from '../assets/house1.jpg';
import House2 from '../assets/house2.jpg';
import House3 from '../assets/house3.jpg';
import House4 from '../assets/house4.jpg';

const houses = [
  { id: 'House1', name: 'Quackarena', img: House1 },
  { id: 'House2', name: 'Quackllini', img: House2 },
  { id: 'House3', name: 'Quackpamonnha', img: House3 },
  { id: 'House4', name: 'Quacktetia', img: House4 },
];

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (selectedHouse) => {
    // Mock authentication
    login({ house: selectedHouse }, 'mock-token');
    navigate('/dashboard');
  };

  return (
    <div className="main-back d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-card card p-4 shadow-sm">
        <div className="text-center mb-4 header">
          <img src={DuckIcon} alt="Duck Icon" className="header-icon" />
          <h2 className="mt-2">QUACKOLYMPICS</h2>
        </div>
        <div className="container text-center mb-3">
          <h5>Selecione o seu time</h5>
          <div className="row">
            {houses.map((houseItem) => (
              <div 
                key={houseItem.id} 
                className={`col-6 mb-4 house-card`} 
                onClick={() => handleLogin(houseItem)}
              >
                <div className="card p-2">
                  <img 
                    src={houseItem.img} 
                    alt={houseItem.name} 
                    className="card-img-top house-img mx-auto d-block"
                  />
                  <div className="card-body">
                    <h6 className="card-title">{houseItem.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
