import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Navbar from './components/Navbar';
import { Layout } from 'antd';
import AdminPanel from './components/admin/AdminPainel';
import Reports from './components/admin/Reports';
import Beaches from './components/admin/Beaches';
import Ongs from './components/admin/Ongs';


const AppContent: React.FC = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const cookieValue = document.cookie.includes("auth=true");
    return cookieValue ? true : false;
  });

  useEffect(() => {
    const cookieValue = document.cookie.includes("auth=true");
    setIsAuthenticated(cookieValue ? true : false);
  }, [location]);

  return (
    <Layout>
      {location.pathname.startsWith('/admin') ? (
        <AdminPanel>
          <Routes>
            <Route path="/admin/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/home" />} />
            <Route path="/admin/beaches" element={isAuthenticated ? <Beaches />: <Navigate to="/home" />} />
            <Route path="/admin/ongs" element={isAuthenticated ? <Ongs /> : <Navigate to="/home" />} />
          </Routes>
        </AdminPanel>
      ) : (
        <>
          <Navbar />
          <Layout.Content style={{ padding: '50px', marginTop: '64px' }}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/admin" element={isAuthenticated ? <Navigate to="/admin/reports" /> : <Navigate to="/home" />} />
            </Routes>
          </Layout.Content>
        </>
      )}
    </Layout>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
