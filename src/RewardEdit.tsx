// EmployeeEdit.tsx
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface Reward {
  id: string;
  employeeId: string;
  content: string;
  reason: string;
  recordDate: string;
}

function RewardEdit() {
  const { state } = useLocation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [reward, setReward] = useState<Reward | null>(state as Reward | null);

  const handleSave = async () => {
    try {
      console.log("Saved reward:", reward);
      await axios.put(`http://localhost:8080/api/reward/update`, reward);
      navigate(`/`);
    } catch (error) {
      console.error("Error saving reward:", error);
    }
  };

  const handleChange = (field: keyof Reward, value: string) => {
    setReward((prevReward) =>
      prevReward
        ? {
            ...prevReward,
            [field]: value,
          }
        : null
    );
  };

  if (!reward) {
    return <div>Loading...</div>;
  }

  return (
    <div className="custom-container">
      <h2>修改奖惩记录</h2>
      <div>
        <label>序号: {reward.id}</label>
      </div>
      <div>
        <label>工号: {reward.employeeId}</label>
      </div>
      <div>
        <label>
          内容:
          <input
            type="text"
            value={reward.content}
            onChange={(e) => handleChange("content", e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          原因:
          <input
            type="text"
            value={reward.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
          />
        </label>
      </div>
      <button className="custom-button" onClick={handleSave}>
        保存
      </button>
    </div>
  );
}

export default RewardEdit;
