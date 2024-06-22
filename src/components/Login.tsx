import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// 定义 Response 类型
interface Response<T> {
  success: boolean;
  message: string;
  data: T;
}

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 300px;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post<Response<any>>(
        `http://localhost:8080/api/auth/login`,
        null,
        {
          params: {
            username,
            password,
          },
        }
      );

      console.log("Response:", response.data);
      if (response.data.success) {
        console.log("login success");
        // 登录成功,跳转到主页
        navigate("/");
      } else {
        console.log("login failed");
        // 登录失败,显示错误信息
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("登录失败,请稍后重试");
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <h2>登录</h2>
        <div>
          <label htmlFor="username">用户名:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">密码:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>登录</button>
        <div>
          没有账号?<Link to="/register">立即注册</Link>
        </div>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
