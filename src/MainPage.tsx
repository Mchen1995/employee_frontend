import React, { useState } from "react";
import { Layout, Menu } from "antd";
import axios from "axios";
import {
  UserOutlined,
  ApartmentOutlined,
  ClockCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import EmployeeModule from "./EmployeeModule";
import RewardPunishmentModule from "./RewardModule";
import AttendanceModule from "./AttendanceModule";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const { Header, Content, Sider } = Layout;

const LogoutContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const LogoutModal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const MainPage: React.FC = () => {
  const [currentModule, setCurrentModule] = useState("employeeManagement");

  const handleMenuClick = (key: string) => {
    setCurrentModule(key);
  };

  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/api/auth/logout");
      setShowLogoutModal(true);
      setTimeout(() => {
        setShowLogoutModal(false);
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("登出失败:", error);
    }
  };

  return (
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={["employeeManagement"]}
          style={{ height: "100%", borderRight: 0 }}
          onClick={(e) => handleMenuClick(e.key)}
        >
          <Menu.Item key="employeeManagement" icon={<UserOutlined />}>
            员工模块
          </Menu.Item>
          <Menu.Item key="rewardAndPunishment" icon={<ApartmentOutlined />}>
            奖罚模块
          </Menu.Item>
          <Menu.Item key="attendanceRecord" icon={<ClockCircleOutlined />}>
            考勤记录
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            退出登录
          </Menu.Item>
          {showLogoutModal && (
            <LogoutContainer>
              <LogoutModal>
                <h3>登出成功!</h3>
                <p>3 秒后将自动跳转到登录页面。</p>
              </LogoutModal>
            </LogoutContainer>
          )}
        </Menu>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {currentModule === "employeeManagement" && <EmployeeModule />}
          {currentModule === "rewardAndPunishment" && (
            <RewardPunishmentModule />
          )}
          {currentModule === "attendanceRecord" && <AttendanceModule />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainPage;
