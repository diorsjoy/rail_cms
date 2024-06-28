import {
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/axios.ts";
import useNavbar from "../hooks/useNavbar.ts";
import { accessTokenService } from "../lib/accessTokenService.ts";
import LanguageSelector from "./LanguageSelector.tsx";
import "./NavbarElements.css";
import { AuthProvider } from "../providers/AuthProvider.tsx";
const { Header, Sider, Content } = Layout;

const NavbarElements = () => {
  const { collapsed, toggleCollapse } = useNavbar();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    api
      .post(
        "/Account",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessTokenService.get()}`,
          },
        }
      )
      .then((data) => {
        console.log("data", data);
      })
      .catch((error) => {
        console.log("error", error);
      });

    accessTokenService.remove();

    navigate("/sign-in");
  };

  return (
    <AuthProvider>
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
                label: t("Home"),
              },
              {
                key: "/sign-up",
                icon: <ProfileOutlined />,
                label: t("Sign-up"),
              },
              {
                key: "/sign-in",
                icon: <LoginOutlined />,
                label: t("Sign-In"),
              },
              {
                key: "/about",
                icon: <UserOutlined />,
                label: t("About"),
              },
              {
                key: "/faq",
                icon: <UserOutlined />,
                label: t("FAQ"),
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
            <Space
              style={{
                marginLeft: "auto",
              }}
            >
              <LanguageSelector />
              <Button
                type="text"
                icon={<LogoutOutlined />}
                style={{ marginLeft: "auto" }}
                onClick={handleLogout}
              >
                {t("Sign Out")}
              </Button>
            </Space>
          </Header>

          <Content className="site-layout-content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </AuthProvider>
  );
};

export default NavbarElements;
