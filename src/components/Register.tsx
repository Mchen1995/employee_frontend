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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RegisterCard = styled.div`
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RegisterButton = styled.button`
  width: 318px;
  padding: 0.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const BackLoginLink = styled(Link)`
  display: block;
  margin-top: 16px;
  text-align: center;
`;

const InputField = styled.input`
  width: 300px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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
        <h1>注册</h1>
        <div>
          <label htmlFor="username"></label>
          <InputField
            type="text"
            placeholder="用户名"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <InputField
            type="password"
            placeholder="密码"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email"></label>
          <InputField
            type="email"
            placeholder="邮箱"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <RegisterButton onClick={handleRegister}>注册</RegisterButton>
        <div>
          <BackLoginLink to="/login">返回登录</BackLoginLink>
        </div>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
