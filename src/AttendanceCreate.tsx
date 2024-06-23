import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface Attendance {
  id: string;
  employeeId: string;
  status: string;
  recordDate: string;
}

const AttendanceCreate: React.FC = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState<Attendance>({
    id: "",
    employeeId: "",
    status: "",
    recordDate: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAttendance({
      ...attendance,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/api/attendance/create",
        attendance
      );
      navigate(`/`);
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div className="custom-container">
      <h1>新增考勤记录</h1>
      <form onSubmit={handleSubmit}>
        <div className="custom-input">
          <label htmlFor="employeeId">工号:</label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={attendance.employeeId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="custom-input">
          <label htmlFor="status">状态:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={attendance.status}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="custom-button" type="submit">
          保存
        </button>
      </form>
    </div>
  );
};

export default AttendanceCreate;
