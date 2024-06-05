
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

import Navbar from './components/Navbar';
import { Layout } from 'antd';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Navbar />
        <Layout.Content style={{ padding: '50px', marginTop: '64px' }}>
          <Routes>
            <Route path="/home" element={<Home />} />

          </Routes>
        </Layout.Content>
      </Layout>
    </Router>
  );
}

export default App;