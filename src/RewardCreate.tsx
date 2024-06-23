import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Reward {
  id: string;
  employeeId: string;
  content: string;
  reason: string;
  recordDate: string;
}

const RewardCreate: React.FC = () => {
  const navigate = useNavigate();
  const [reward, setReward] = useState<Reward>({
    id: "",
    employeeId: "",
    content: "",
    reason: "",
    recordDate: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setReward({
      ...reward,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/reward/create", reward);
      navigate(`/`);
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div className="custom-container">
      <h1>新增奖惩记录</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="employeeId">工号:</label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={reward.employeeId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">内容:</label>
          <input
            type="text"
            id="content"
            name="content"
            value={reward.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="reason">原因:</label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={reward.reason}
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

export default RewardCreate;
