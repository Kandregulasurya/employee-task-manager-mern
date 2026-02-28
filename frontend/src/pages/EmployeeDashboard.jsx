import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import "../styles/employeeDashboard.css";

const statuses = ["Not Started", "In Progress", "Completed"];

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await API.get("/tasks/my");
    setTasks(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  return (
    <>
      <Navbar title="Employee Dashboard" />

      <div className="container">
        <div className="board">
          {statuses.map((status) => (
            <Column
              key={status}
              status={status}
              title={status}
              tasks={tasks.filter((t) => t.status === status)}
              updateStatus={updateStatus}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;

/* ===============================
   COLUMN COMPONENT
================================= */

const Column = ({ status, title, tasks, updateStatus }) => {
  return (
    <div className={`column ${status.toLowerCase().replace(" ", "-")}`}>
      <div className="head">
        <h2>{title}</h2>
        <span className="count">{tasks.length}</span>
      </div>

      <div className="taskList">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            updateStatus={updateStatus}
          />
        ))}
      </div>
    </div>
  );
};

/* ===============================
   TASK CARD COMPONENT
================================= */

const TaskCard = ({ task, updateStatus }) => {
  const statusClass = task.status
    .toLowerCase()
    .replace(" ", "-");

  return (
    <div className={`task-card ${statusClass}`}>
      <h4>{task.title}</h4>

      {/* Description Added */}
      <p className="task-desc">
        {task.description || "No description provided."}
      </p>

      <span className="status-badge">{task.status}</span>

      <div className="btn-group">
        {task.status !== "Not Started" && (
          <button onClick={() => updateStatus(task._id, "Not Started")}>
            Not Start
          </button>
        )}

        {task.status !== "In Progress" && (
          <button onClick={() => updateStatus(task._id, "In Progress")}>
            In Progress
          </button>
        )}

        {task.status !== "Completed" && (
          <button onClick={() => updateStatus(task._id, "Completed")}>
            Completed
          </button>
        )}
      </div>
    </div>
  );
};