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
        <button onClick={handleSearch}>查询</button>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>工号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>手机</th>
            <th>部门</th>
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
