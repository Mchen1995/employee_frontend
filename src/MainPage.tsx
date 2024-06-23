import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ApartmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import EmployeeModule from "./EmployeeModule";
import RewardPunishmentModule from "./RewardModule";
import AttendanceRecords from "./AttendanceRecords";

const { Header, Content, Sider } = Layout;

const MainPage: React.FC = () => {
  const [currentModule, setCurrentModule] = useState("employeeManagement");

  const handleMenuClick = (key: string) => {
    setCurrentModule(key);
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
          {currentModule === "attendanceRecord" && <AttendanceRecords />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainPage;
