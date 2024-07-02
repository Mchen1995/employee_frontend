import React, { useState } from "react";
import { Layout, Menu, Modal } from "antd";
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

const { Header, Content, Sider } = Layout;

const MainPage: React.FC = () => {
  const [currentModule, setCurrentModule] = useState("employeeManagement");

  const handleMenuClick = (key: string) => {
    setCurrentModule(key);
  };

  const navigate = useNavigate();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    try {
      await axios.get("http://localhost:8080/api/auth/logout");
      setShowLogoutConfirm(false);
      navigate("/login");
    } catch (error) {
      console.error("登出失败:", error);
    }
  };

  const cancelLogout = async () => {
    setShowLogoutConfirm(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={200}
        className="site-layout-background"
        style={{ minHeight: "100vh" }}
      >
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
          {showLogoutConfirm && (
            <Modal
              title="确认退出登录"
              visible={showLogoutConfirm}
              onOk={confirmLogout}
              onCancel={cancelLogout}
            >
              <p>您确定要退出登录吗?</p>
            </Modal>
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
