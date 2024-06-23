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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginCard = styled.div`
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const LoginButton = styled.button`
  width: 318px;
  padding: 0.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const InputField = styled.input`
  width: 300px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const RegisterLink = styled(Link)`
  display: block;
  margin-top: 16px;
  text-align: center;
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
        <h1>登录</h1>
        <div>
          <label htmlFor="username"></label>
          <InputField
            id="username"
            type="text"
            value={username}
            placeholder="用户名"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <InputField
            id="password"
            type="password"
            value={password}
            placeholder="密码"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <LoginButton onClick={handleLogin}>登录</LoginButton>
        <div>
          <RegisterLink to="/register">立即注册</RegisterLink>
        </div>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
