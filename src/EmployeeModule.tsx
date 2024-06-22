import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space } from "antd";
import axios from "axios";

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

const EmployeeModule: React.FC = () => {
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

  const columns = [
    { title: "工号", dataIndex: "id", key: "id" },
    { title: "姓名", dataIndex: "name", key: "name" },
    { title: "性别", dataIndex: "gender", key: "gender" },
    { title: "手机号", dataIndex: "phone", key: "phone" },
    { title: "部门", dataIndex: "department", key: "department" },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="工号"
          value={searchParams.id}
          onChange={(e) =>
            setSearchParams({ ...searchParams, id: e.target.value })
          }
        />
        <Input
          placeholder="姓名"
          value={searchParams.name}
          onChange={(e) =>
            setSearchParams({ ...searchParams, name: e.target.value })
          }
        />
        <Input
          placeholder="性别"
          value={searchParams.gender}
          onChange={(e) =>
            setSearchParams({ ...searchParams, gender: e.target.value })
          }
        />
        <Button type="primary" onClick={handleSearch}>
          查询
        </Button>
      </Space>
      <Table dataSource={employees} columns={columns} rowKey="id" />
    </div>
  );
};

export default EmployeeModule;
