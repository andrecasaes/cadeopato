import { useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Ranking from './components/Ranking';
import { AuthProvider } from './context/AuthContext';
import particlesConfig from './assets/particlesjs-config.json'; // Import the JSON configuration
import './App.css'; // Import the global CSS file
import particlesJS from 'particles.js';

function App() {
  useEffect(() => {
    window.particlesJS('particles-js', particlesConfig);
  }, []);

  return (
    <AuthProvider>
      <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}></div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;