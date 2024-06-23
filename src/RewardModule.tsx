import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format, parseISO } from "date-fns";

interface Reward {
  id: string;
  employeeId: string;
  content: string;
  reason: string;
  recordDate: string;
}

interface Response<T> {
  success: boolean;
  message: string;
  data: T[];
}

const RewardModule: React.FC = () => {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [searchParams, setSearchParams] = useState({
    employeeId: "",
    content: "",
    reason: "",
  });

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async (
    params: {
      employeeId: string;
      content: string;
      reason: string;
    } = searchParams
  ) => {
    try {
      const response = await axios.get<Response<Reward>>(
        "http://localhost:8080/api/reward/list",
        { params: searchParams }
      );
      if (response.data.success) {
        console.log("query rewards success");
        setRewards(response.data.data);
      } else {
        console.log("query rewards failed");
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching rewards:", error);
    }
  };

  const handleSearch = () => {
    fetchRewards(searchParams);
  };
  const handleEdit = (reward: Reward) => {
    // 跳转到编辑页面
    console.log("pass" + reward.id);
    navigate(`/reward/edit/${reward.id}`, { state: reward });
  };

  const handleDelete = (id: string) => {
    fetch(`http://localhost:8080/api/reward/delete/${id}`, {
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
    console.log("jump to create reward");
    navigate("/reward/create", { state: {} });
  };

  const refreshEmployeeTable = () => {
    fetchRewards(searchParams);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "employeeId" | "content" | "reason"
  ) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [field]: e.target.value,
    }));
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <input
          type="text"
          placeholder="工号"
          value={searchParams.employeeId}
          onChange={(e) => handleInputChange(e, "employeeId")}
        />
        <input
          type="text"
          placeholder="内容"
          value={searchParams.content}
          onChange={(e) => handleInputChange(e, "content")}
        />
        <input
          type="text"
          placeholder="原因"
          value={searchParams.reason}
          onChange={(e) => handleInputChange(e, "reason")}
        />
        <button onClick={handleSearch}>查询</button>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th style={{ padding: "12px 20px" }}>序号</th>
            <th style={{ padding: "12px 20px" }}>工号</th>
            <th style={{ padding: "12px 20px" }}>内容</th>
            <th style={{ padding: "12px 20px" }}>原因</th>
            <th style={{ padding: "12px 20px" }}>日期</th>
            <th style={{ padding: "12px 20px" }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {rewards.map((reward) => (
            <tr key={reward.id}>
              <td style={{ padding: "12px 20px" }}>{reward.id}</td>
              <td style={{ padding: "12px 20px" }}>{reward.employeeId}</td>
              <td style={{ padding: "12px 20px" }}>{reward.content}</td>
              <td style={{ padding: "12px 20px" }}>{reward.reason}</td>
              <td style={{ padding: "12px 20px" }}>
                {format(parseISO(reward.recordDate), "yyyy-MM-dd")}
              </td>
              <td style={{ padding: "12px 20px" }}>
                <Button onClick={() => handleEdit(reward)}>编辑</Button>
                <button onClick={() => handleDelete(reward.id)}>删除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ alignItems: "center" }}>
        <button onClick={handleCreate}>新增</button>
      </div>
    </div>
  );
};

export default RewardModule;
