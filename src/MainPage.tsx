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
    <Layout style={{ height: "100%" }}>
      <Header
        style={{
          height: 64,
          paddingInline: 48,
          lineHeight: "64px",
          textAlign: "center",
        }}
      >
        员工管理系统
      </Header>
      <Layout>
        <Sider>
          <Menu
            mode="inline"
            defaultSelectedKeys={["employeeManagement"]}
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
        <Content className="site-layout-background">
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
