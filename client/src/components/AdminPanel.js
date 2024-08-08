import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminPanel.css'; // Import the custom CSS file
import DuckIcon from '../assets/duck.svg'; // Import the duck SVG file
import { Modal, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [ducks, setDucks] = useState([]);
  const [newDuck, setNewDuck] = useState({ id: '', type: '', house: '', photo: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch all ducks from backend (mock data here)
    setDucks([
      { id: 1, type: 'plain', house: 'House1', photo: '', found: false },
      { id: 2, type: 'sunglasses', house: 'House2', photo: '', found: true },
      // Add more mock ducks as needed
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDuck({ ...newDuck, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewDuck({ ...newDuck, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = ducks.length + 1;
    setDucks([...ducks, { ...newDuck, id: newId }]);
    setNewDuck({ id: '', type: '', house: '', photo: '' });
    setShowModal(false); // Close the modal
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">
        <Link to="/" className="btn btn-link p-0 me-2">
          <img
            src={DuckIcon}
            alt="Home"
            style={{ width: "24px", height: "24px" }}
          />
        </Link>
        Admin Panel
      </h1>
      
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        <i className="fas fa-plus-circle"></i> Add Duck
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Duck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="duckNumber">Duck Number</label>
              <input
                type="text"
                className="form-control"
                id="duckNumber"
                name="id"
                value={newDuck.id}
                onChange={handleInputChange}
                placeholder="Enter duck number"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="duckType">Duck Type</label>
              <select
                className="form-control"
                id="duckType"
                name="type"
                value={newDuck.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select type</option>
                <option value="plain">Plain</option>
                <option value="sunglasses">Sunglasses</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="duckHouse">House</label>
              <select
                className="form-control"
                id="duckHouse"
                name="house"
                value={newDuck.house}
                onChange={handleInputChange}
                required
              >
                <option value="">Select house</option>
                <option value="House1">House 1</option>
                <option value="House2">House 2</option>
                <option value="House3">House 3</option>
                <option value="House4">House 4</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="duckPhoto">Photo</label>
              <input
                type="file"
                className="form-control-file"
                id="duckPhoto"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                required
              />
              {newDuck.photo && (
                <div className="preview mt-2">
                  <img src={newDuck.photo} alt="Duck Preview" className="img-thumbnail" />
                </div>
              )}
            </div>
            <Button type="submit" variant="success" className="w-100 mt-3">Add Duck</Button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="row mt-4">
        {ducks.map((duck) => (
          <div key={duck.id} className="col-md-4 mb-3">
            <div className="card duck-card">
              <img
                src={duck.photo || 'https://via.placeholder.com/150'}
                className="card-img-top"
                alt={`Duck ${duck.id}`}
              />
              <div className="card-body">
                <h5 className="card-title d-flex align-items-center">
                  Duck {duck.id} - {duck.type}
                </h5>
                <p className="card-text">House: {duck.house}</p>
                <p className={`card-text ${duck.found ? 'text-success' : 'text-danger'}`}>
                  {duck.found ? 'Found' : 'Hidden'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
