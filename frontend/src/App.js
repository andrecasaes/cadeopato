import React, { useEffect, Suspense } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import particlesConfig from './assets/particlesjs-config.json';
import './App.css';
import particlesJS from 'particles.js';
import LoadingDuck from './components/LoadingDuck';

// Lazy loading the components
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const AdminPanel = React.lazy(() => import('./pages/AdminPanel'));
const Ranking = React.lazy(() => import('./pages/Ranking'));

function App() {
  useEffect(() => {
    window.particlesJS('particles-js', particlesConfig);
  }, []);

  return (
    <AuthProvider>
      <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }}></div>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Router>
          <Suspense fallback={<LoadingDuck />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/ranking" element={<Ranking />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
