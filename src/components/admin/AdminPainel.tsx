import React, { ReactNode } from 'react';
import { Layout, Menu, Button } from 'antd';
import { DesktopOutlined, FileOutlined, TeamOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo_sos.png';
import "./AdminPainel.css"

const { Sider, Content } = Layout;

interface AdminPanelProps {
  children: ReactNode;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ children }) => {
  const location = useLocation();

  const handleLogout = () => {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };

  const items = [
    {
      key: '/admin/reports',
      icon: <FileOutlined />,
      label: <Link to="/admin/reports">Reports em Aberto</Link>,
    },
    {
      key: '/admin/beaches',
      icon: <DesktopOutlined />,
      label: <Link to="/admin/beaches">Praias</Link>,
    },
    {
      key: '/admin/ongs',
      icon: <TeamOutlined />,
      label: <Link to="/admin/ongs">ONGs</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" collapsible>
        <div className='logo-img'>
          <img src={logo} alt="Logo" />
        </div>
        <div className="logo-text">Admin Panel</div>
        <Menu theme="light" defaultSelectedKeys={[location.pathname]} mode="inline" items={items} />
        <div style={{ padding: '16px' }}>
          <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout} block className="logout-button">
            Logout
          </Button>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
