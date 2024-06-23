import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format, parseISO } from "date-fns";

interface Attendance {
  id: string;
  employeeId: string;
  status: string;
  recordDate: string;
}

interface Response<T> {
  success: boolean;
  message: string;
  data: T[];
}

const Attendance: React.FC = () => {
  const navigate = useNavigate();
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [searchParams, setSearchParams] = useState({
    employeeId: "",
    status: "",
  });

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async (
    params: {
      employeeId: string;
      status: string;
    } = searchParams
  ) => {
    try {
      const response = await axios.get<Response<Attendance>>(
        "http://localhost:8080/api/attendance/list",
        { params: searchParams }
      );
      if (response.data.success) {
        console.log("query attendances success");
        setAttendances(response.data.data);
      } else {
        console.log("query attendances failed");
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching attendances:", error);
    }
  };

  const handleSearch = () => {
    fetchAttendances(searchParams);
  };

  const handleDelete = (id: string) => {
    fetch(`http://localhost:8080/api/attendance/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // 删除成功后,刷新表格
        refreshEmployeeTable();
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      });
  };

  const handleCreate = () => {
    console.log("jump to create attendance");
    navigate("/attendance/create", { state: {} });
  };

  const refreshEmployeeTable = () => {
    fetchAttendances(searchParams);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "employeeId" | "status"
  ) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [field]: e.target.value,
    }));
  };

  const handleSelectChange = (value: string, fieldName: string) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [fieldName]: value,
    }));
  };

  const { Option } = Select;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <input
          type="text"
          placeholder="工号"
          value={searchParams.employeeId}
          onChange={(e) => handleInputChange(e, "employeeId")}
        />

        <Select
          value={searchParams.status}
          onChange={(value) => handleSelectChange(value, "status")}
          style={{ width: "200px" }}
        >
          <Option value="">全部</Option>
          <Option value="0">正常</Option>
          <Option value="1">迟到</Option>
          <Option value="2">未打卡</Option>
        </Select>
        <button className="custom-button" onClick={handleSearch}>
          查询
        </button>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th style={{ padding: "12px 20px" }}>序号</th>
            <th style={{ padding: "12px 20px" }}>工号</th>
            <th style={{ padding: "12px 20px" }}>状态</th>
            <th style={{ padding: "12px 20px" }}>日期</th>
            <th style={{ padding: "12px 20px" }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((attendance) => (
            <tr key={attendance.id}>
              <td style={{ padding: "12px 20px" }}>{attendance.id}</td>
              <td style={{ padding: "12px 20px" }}>{attendance.employeeId}</td>
              <td
                style={{
                  padding: "12px 20px",
                  backgroundColor:
                    attendance.status === "0"
                      ? "green"
                      : attendance.status === "1"
                      ? "yellow"
                      : "red",
                }}
              >
                {attendance.status === "0"
                  ? "正常"
                  : attendance.status === "1"
                  ? "迟到"
                  : "未打卡"}
              </td>
              <td style={{ padding: "12px 20px" }}>
                {format(parseISO(attendance.recordDate), "yyyy-MM-dd")}
              </td>
              <td style={{ padding: "12px 20px" }}>
                <button onClick={() => handleDelete(attendance.id)}>
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
  );
};

export default Attendance;
