import {
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import useNavbar from "../hooks/useNavbar.ts";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./NavbarElements.css"; // Import the CSS file

const { Header, Sider, Content } = Layout;

const NavbarElements = () => {
  const { collapsed, toggleCollapse } = useNavbar();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          onClick={(item) => {
            navigate(item.key);
          }}
          items={[
            {
              key: "/",
              icon: <UserOutlined />,
              label: "Home",
            },
            {
              key: "/sign-up",
              icon: <ProfileOutlined />,
              label: "Sign-up",
            },
            {
              key: "/sign-in",
              icon: <LoginOutlined />,
              label: "Sign-In",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="site-layout-header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapse}
            className="header-button"
          />
        </Header>
        <Content className="site-layout-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default NavbarElements;
