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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "id" | "name" | "gender"
  ) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [field]: e.target.value,
    }));
  };

  return (
    <div>
      <div>
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
        <input
          type="text"
          placeholder="Gender"
          value={searchParams.gender}
          onChange={(e) => handleInputChange(e, "gender")}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.gender}</td>
              <td>{employee.phone}</td>
              <td>{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeModule;
