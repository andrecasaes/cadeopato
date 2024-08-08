// src/components/Dashboard.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css"; // Import the custom CSS file
import DuckIcon from "../assets/duck.svg";

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const [ducks, setDucks] = useState([]);

  useEffect(() => {
    // Fetch ducks from backend (mock data here)
    setDucks([
      { id: 1, type: "normal", found: false },
      { id: 2, type: "normal", found: false },
      { id: 3, type: "normal", found: false },
      { id: 4, type: "normal", found: false },
      { id: 5, type: "normal", found: false },
      { id: 6, type: "normal", found: false },
      { id: 7, type: "normal", found: false },
      { id: 8, type: "especial", found: false },
      { id: 9, type: "especial", found: true },
    ]);
  }, []);

  const handleFound = (duckId) => {
    // Notify backend of found duck
    setDucks((prevDucks) =>
      prevDucks.map((duck) =>
        duck.id === duckId ? { ...duck, found: true } : duck
      )
    );
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
        Dashboard
      </h1>
      <div className="row">
        {ducks.map((duck) => (
          <div key={duck.id} className="col-md-4 mb-3">
            <div className="card duck-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title d-flex align-items-center">
                    Pato {duck.id}
                  </h5>
                  {duck.found ? (
                    <span className="badge badge-success">Achou</span>
                  ) : (
                    <button
                      onClick={() => handleFound(duck.id)}
                      className="btn btn-primary"
                    >
                      Marcar como achado
                    </button>
                  )}
                </div>
                <p className="card-text">Tipo: {duck.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
