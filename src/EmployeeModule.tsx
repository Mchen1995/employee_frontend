import React, { useState, useEffect } from "react";
import { Table, Input, Button, Select } from "antd";
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

  const handleSelectChange = (value: string, fieldName: string) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [fieldName]: value,
    }));
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

  const { Option } = Select;

  return (
    <TableContainer style={{ height: "90vh" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Input
            type="text"
            placeholder="工号"
            value={searchParams.id}
            onChange={(e) => handleInputChange(e, "id")}
          />
          <Input
            type="text"
            placeholder="姓名"
            value={searchParams.name}
            onChange={(e) => handleInputChange(e, "name")}
          />

          <Select
            value={searchParams.gender}
            onChange={(value) => handleSelectChange(value, "gender")}
            style={{ width: "200px" }}
          >
            <Option value="">选择性别</Option>
            <Option value="0">男</Option>
            <Option value="1">女</Option>
          </Select>

          <Button onClick={handleSearch}>查询</Button>
        </div>
        <Table
          pagination={{ pageSize: 5 }}
          dataSource={employees.map((employee) => {
            return {
              key: employee.id,
              id: employee.id,
              name: employee.name,
              gender: employee.gender === "0" ? "男" : "女",
              phone: employee.phone,
              department: employee.department,
            };
          })}
          columns={[
            {
              title: "工号",
              dataIndex: "id",
              key: "id",
              width: 100,
              align: "center",
            },
            {
              title: "姓名",
              dataIndex: "name",
              key: "name",
              width: 100,
              align: "center",
            },
            {
              title: "性别",
              dataIndex: "gender",
              key: "gender",
              width: 200,
              align: "center",
            },
            {
              title: "电话",
              dataIndex: "phone",
              key: "phone",
              width: 200,
              align: "center",
            },
            {
              title: "部门",
              dataIndex: "department",
              key: "department",
              width: 150,
              align: "center",
            },
            {
              title: "操作",
              key: "action",
              width: 150,
              align: "center",
              render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button onClick={() => handleEdit(record)}>编辑</Button>
                  <Button danger onClick={() => handleDelete(record.id)}>
                    删除
                  </Button>
                </div>
              ),
            },
          ]}
        ></Table>
        <div style={{ alignItems: "center" }}>
          <Button onClick={handleCreate}>新增</Button>
        </div>
      </div>
    </TableContainer>
  );
};

export default EmployeeModule;
