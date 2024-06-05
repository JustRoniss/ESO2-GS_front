import React, { useState } from 'react';
import { Layout, Input, Button, Drawer } from 'antd';
import { MenuOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import './Navbar.css';
import logo from '../images/logo_sos.png'

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const showDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
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
        />
        <Input.Password
          placeholder="Password"
          prefix={<LockOutlined />}
          className="input-field"
        />
        <Button type="primary">Login</Button>
      </div>
    </Header>
  );
};

export default Navbar;