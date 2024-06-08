import React, { useState } from 'react';
import { Layout, Input, Button, Drawer, message } from 'antd';
import { MenuOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import './Navbar.css';
import logo from '../images/logo_sos.png'
import api from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const handleLogin = async () => {
    try {
      const response = await api.post('/fakeuser/verify', {
        nome: username,
        fakepassword: password,
      }, {
        validateStatus: (status) => {
          return status >= 200 && status < 400;
        }
      });
  
      if (response.status === 302) {
        document.cookie = "auth=true; path=/";
        message.success('Login successful');
        navigate('/admin',  { replace: true });
      } else {
        message.error('Login failed');
      }
    } catch (error) {
      message.error('Login failed');
      console.log(error)
    }
  };

  return (
    <Header className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <MenuOutlined className="menu-icon" onClick={showDrawer} />
      <Drawer
        title="Menu"
        placement="left"
        onClose={closeDrawer}
        open={drawerOpen}
      >
        <Input
          placeholder="Username"
          prefix={<UserOutlined />}
          className="input-field"
        />
        <Input.Password
          placeholder="Password"
          prefix={<LockOutlined />}
          className="input-field"
        />
      </Drawer>
      
      <div className="right-menu">
        <Input
          placeholder="Username"
          prefix={<UserOutlined />}
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input.Password
          placeholder="Password"
          prefix={<LockOutlined />}
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="primary" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;
