import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EmployeeModule.css";

interface Employee {
  id: string;
  name: string;
  gender: string;
  phone: string;
  department: string;
}

interface Response<T> {
  success: boolean;
  message: string;
  data: T[];
}

const TableContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const EmployeeModule: React.FC = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchParams, setSearchParams] = useState({
    id: "",
    name: "",
    gender: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (
    params: { id: string; name: string; gender: string } = searchParams
  ) => {
    try {
      const response = await axios.get<Response<Employee>>(
        "http://localhost:8080/api/employee/list",
        { params: searchParams }
      );
      if (response.data.success) {
        console.log("query success");
        setEmployees(response.data.data);
      } else {
        console.log("query failed");
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSearch = () => {
    fetchEmployees(searchParams);
  };
  const handleEdit = (employee: Employee) => {
    // 跳转到编辑页面并传递员工信息
    console.log("pass" + employee.name);
    navigate(`/employee/edit/${employee.id}`, { state: employee });
  };

  const handleDelete = (id: string) => {
    fetch(`http://localhost:8080/api/employee/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // 删除成功后,刷新表格
        refreshEmployeeTable();
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const handleCreate = () => {
    console.log("jump to create");
    navigate("/employee/create", { state: {} });
  };

  const refreshEmployeeTable = () => {
    fetchEmployees(searchParams);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "id" | "name"
  ) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [field]: e.target.value,
    }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      gender: e.target.value,
    }));
  };

  return (
    <TableContainer style={{ height: "90vh" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <input
            type="text"
            placeholder="工号"
            value={searchParams.id}
            onChange={(e) => handleInputChange(e, "id")}
          />
          <input
            type="text"
            placeholder="姓名"
            value={searchParams.name}
            onChange={(e) => handleInputChange(e, "name")}
          />

          <label>
            <input
              type="radio"
              name="gender"
              value="0"
              checked={searchParams.gender === "0"}
              onChange={handleGenderChange}
            />
            男
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="1"
              checked={searchParams.gender === "1"}
              onChange={handleGenderChange}
            />
            女
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value=""
              checked={searchParams.gender === ""}
              onChange={handleGenderChange}
            />
            不限
          </label>
          <button className="custom-button" onClick={handleSearch}>
            查询
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ padding: "12px 20px" }}>工号</th>
              <th style={{ padding: "12px 20px" }}>姓名</th>
              <th style={{ padding: "12px 20px" }}>性别</th>
              <th style={{ padding: "12px 20px" }}>手机</th>
              <th style={{ padding: "12px 20px" }}>部门</th>
              <th style={{ padding: "12px 20px" }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td style={{ padding: "12px 20px" }}>{employee.id}</td>
                <td style={{ padding: "12px 20px" }}>{employee.name}</td>
                <td style={{ padding: "12px 20px" }}>
                  {employee.gender === "0" ? "男" : "女"}
                </td>
                <td style={{ padding: "12px 20px" }}>{employee.phone}</td>
                <td style={{ padding: "12px 20px" }}>{employee.department}</td>
                <td style={{ padding: "12px 20px" }}>
                  <Button onClick={() => handleEdit(employee)}>编辑</Button>
                  <button onClick={() => handleDelete(employee.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ alignItems: "center" }}>
          <button className="custom-button" onClick={handleCreate}>
            新增
          </button>
        </div>
      </div>
    </TableContainer>
  );
};

export default EmployeeModule;
