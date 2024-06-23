import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface Employee {
  id: string;
  name: string;
  phone: string;
  gender: 0 | 1;
  department: string;
}

const EmployeeCreate: React.FC = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee>({
    id: "",
    name: "",
    phone: "",
    gender: 0,
    department: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenderChange = (gender: 0 | 1) => {
    setEmployee({
      ...employee,
      gender,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/employee/create", employee);
      navigate(`/`);
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div>
      <h1>新增员工</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">工号:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={employee.id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">姓名:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">手机:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={employee.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>性别:</label>
          <label>
            <input
              type="radio"
              name="gender"
              checked={employee.gender === 0}
              onChange={() => handleGenderChange(0)}
            />
            男
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              checked={employee.gender === 1}
              onChange={() => handleGenderChange(1)}
            />
            女
          </label>
        </div>
        <div>
          <label htmlFor="department">部门:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={employee.department}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">保存</button>
      </form>
    </div>
  );
};

export default EmployeeCreate;
