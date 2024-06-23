// EmployeeEdit.tsx
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Employee {
  id: string;
  name: string;
  department: string;
  phone: string;
}

function EmployeeEdit() {
  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(
    state as Employee | null
  );

  const handleSave = async () => {
    // 保存员工信息
    // 这里可以添加保存逻辑,例如更新数据库等
    try {
      console.log("Saved employee:", employee);
      await axios.put(`http://localhost:8080/api/employee/update`, employee);
      navigate(`/`);
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleChange = (field: keyof Employee, value: string) => {
    setEmployee((prevEmployee) =>
      prevEmployee
        ? {
            ...prevEmployee,
            [field]: value,
          }
        : null
    );
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="custom-container">
      <h1>修改员工信息</h1>
      <div>
        <label>工号: {employee.id}</label>
      </div>
      <div>
        <label>姓名: {employee.name}</label>
      </div>
      <div>
        <label>
          部门:
          <input
            type="text"
            value={employee.department}
            onChange={(e) => handleChange("department", e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          手机:
          <input
            type="text"
            value={employee.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </label>
      </div>
      <button className="custom-button" onClick={handleSave}>
        保存
      </button>
    </div>
  );
}

export default EmployeeEdit;
