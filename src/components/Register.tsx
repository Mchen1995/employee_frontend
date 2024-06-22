import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom"; // 使用 React Router 进行页面跳转

// 定义 Response 类型
interface Response<T> {
  isSuccess: boolean;
  message: string;
  data: T;
}

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const RegisterCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 300px;
`;

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post<Response<any>>(
        `http://localhost:8080/api/auth/register`,
        null,
        {
          params: {
            username,
            password,
            email,
          },
        }
      );

      if (response.data.isSuccess) {
        // 成功,跳转到主页
        window.location.href = "/"; // 或者使用 React Router 进行页面跳转
      } else {
        // 失败,显示错误信息
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("zhuce失败,请稍后重试");
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <h2>注册</h2>
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
        <div>
          <label htmlFor="email">邮箱:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={handleRegister}>注册</button>
        <div>
          已有账号?<Link to="/login">返回登录</Link>
        </div>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
