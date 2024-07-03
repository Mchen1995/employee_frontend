import React, { useState, useEffect } from "react";
import { Button, Select, Table, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format, parseISO } from "date-fns";
import styled from "styled-components";

interface Reward {
  id: string;
  employeeId: string;
  content: string;
  reason: string;
  recordDate: string;
}

interface Employee {
  id: string;
  name: string;
  gender: string;
}

interface Response<T> {
  success: boolean;
  message: string;
  data: T[];
}

const TableContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RewardModule: React.FC = () => {
  const navigate = useNavigate();
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeSearchParams, setEmployeeSearchParams] = useState({
    id: "",
    name: "",
    gender: "",
  });

  const [searchParams, setSearchParams] = useState({
    employeeId: "",
    content: "",
    reason: "",
  });

  useEffect(() => {
    fetchRewards();
    fetchEmployees();
  }, []);

  const fetchEmployees = async (
    employeeParams: {
      id: string;
      name: string;
      gender: string;
    } = employeeSearchParams
  ) => {
    try {
      const response = await axios.get<Response<Employee>>(
        "http://localhost:8080/api/employee/list",
        { params: employeeSearchParams }
      );
      if (response.data.success) {
        console.log("query employees success");
        setEmployees(response.data.data);
      } else {
        console.log("query employees failed");
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

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

  const handleSelectChange = (value: string, fieldName: string) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [fieldName]: value,
    }));
  };

  const { Option } = Select;

  return (
    <TableContainer style={{ height: "90vh" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Input
            type="text"
            placeholder="工号"
            value={searchParams.employeeId}
            onChange={(e) => handleInputChange(e, "employeeId")}
          />
          <Input
            type="text"
            placeholder="内容"
            value={searchParams.content}
            onChange={(e) => handleInputChange(e, "content")}
          />
          <Select
            value={searchParams.reason}
            onChange={(value) => handleSelectChange(value, "reason")}
            style={{ width: "200px" }}
          >
            <Option value="">选择奖惩原因</Option>
            <Option value="0">迟到</Option>
            <Option value="1">未完成指标</Option>
            <Option value="2">提前完成指标</Option>
          </Select>
          <Button onClick={handleSearch}>查询</Button>
        </div>
        <Table
          pagination={{ pageSize: 5 }}
          className="employee-table"
          dataSource={rewards.map((reward) => {
            const employee = employees.find((e) => e.id === reward.employeeId);
            return {
              key: reward.id,
              id: reward.id,
              employeeId: reward.employeeId,
              name: employee ? employee.name : "", // 如果找不到员工,则设置为空字符串
              content: reward.content,
              reason:
                reward.reason === "0"
                  ? "迟到"
                  : reward.reason === "1"
                  ? "未完成指标"
                  : "提前完成指标",
              recordDate: format(parseISO(reward.recordDate), "yyyy-MM-dd"),
            };
          })}
          columns={[
            {
              title: "序号",
              dataIndex: "id",
              key: "id",
              width: 100,
              align: "center",
            },
            {
              title: "工号",
              dataIndex: "employeeId",
              key: "employeeId",
              width: 100,
              align: "center",
            },
            {
              title: "姓名",
              dataIndex: "name",
              key: "name",
              width: 100,
              align: "center",
            },
            {
              title: "内容",
              dataIndex: "content",
              key: "content",
              width: 200,
              align: "center",
            },
            {
              title: "原因",
              dataIndex: "reason",
              key: "reason",
              width: 150,
              align: "center",
            },
            {
              title: "日期",
              dataIndex: "recordDate",
              key: "recordDate",
              width: 150,
              align: "center",
            },
            {
              title: "操作",
              key: "action",
              width: 150,
              align: "center",
              render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button onClick={() => handleEdit(record)}>编辑</Button>
                  <Button danger onClick={() => handleDelete(record.id)}>
                    删除
                  </Button>
                </div>
              ),
            },
          ]}
        />
        <div style={{ alignItems: "center" }}>
          <Button onClick={handleCreate}>新增</Button>
        </div>
      </div>
    </TableContainer>
  );
};

export default RewardModule;
