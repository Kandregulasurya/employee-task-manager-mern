import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { toast } from "react-toastify";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import "../styles/hrdashboard.css";

const HRDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  // ===============================
  // Fetch Tasks
  // ===============================
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      toast.error("Failed to load tasks");
      console.log(error)
    }
  };

  // ===============================
  // Fetch Employees
  // ===============================
  const fetchEmployees = async () => {
    try {
      const res = await API.get("/users");
      setEmployees(res.data);
    } catch (error) {
      toast.error("Failed to load employees");
      console.log(error)
    }
  };

  // ===============================
  // Stats Calculation
  // ===============================
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const progress = tasks.filter(t => t.status === "In Progress").length;
  const notStarted = tasks.filter(t => t.status === "Not Started").length;

  const barData = [
    { name: "Completed", Tasks: completed },
    { name: "In Progress", Tasks: progress },
    { name: "Not Started", Tasks: notStarted }
  ];

  // ===============================
  // Create Task
  // ===============================
  const createTask = async () => {
    if (!title || !assignedTo) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      await API.post("/tasks", { title, description, assignedTo });
      toast.success("Task Created Successfully!");
      resetForm();
      fetchTasks();
    } catch {
      toast.error("Failed to create task");
    }
  };

  // ===============================
  // Delete Task
  // ===============================
  const deleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/tasks/${id}`);
        toast.success("Task Deleted!");
        fetchTasks();
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  // ===============================
  // Start Edit
  // ===============================
  const startEdit = (task) => {
    setEditId(task._id);
    setTitle(task.title);
    setDescription(task.description);
    setAssignedTo(task.assignedTo?._id);
  };

  // ===============================
  // Update Task
  // ===============================
  const updateTask = async () => {
    try {
      await API.put(`/tasks/${editId}`, {
        title,
        description,
        assignedTo
      });

      toast.success("Task Updated!");
      resetForm();
      fetchTasks();
    } catch {
      toast.error("Update failed");
    }
  };

  // ===============================
  // Reset Form
  // ===============================
  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setDescription("");
    setAssignedTo("");
  };

  return (
    <>
      <Navbar title="HR Dashboard" />
      <div className="container">

        {/* ===============================
            Stats Cards
        =============================== */}
        <div className="stats">
          <div className="stat-card">Total: {total}</div>
          <div className="stat-card">Completed: {completed}</div>
          <div className="stat-card">In Progress: {progress}</div>
          <div className="stat-card">Not Started: {notStarted}</div>
        </div>

        {/* ===============================
            Create / Edit Task
        =============================== */}
        <div className="card">
          <h3>{editId ? "Edit Task" : "Create Task"}</h3>

          <div className="form-grid">
            <input
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
              <button onClick={editId ? updateTask : createTask}>
              {editId ? "Update Task" : "Add Task"}
              </button>

              {editId && (
              <button
              style={{ background: "gray" }}
              onClick={resetForm}
              >
              Cancel
              </button>
              )}
        </div>
        </div>

        {/* ===============================
            Bar Chart
        =============================== */}
        <div className="card">
          <h3>Task Analytics</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />

              <Bar dataKey="Tasks" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => {
                  let color;

                  if (entry.name === "Completed") {
                    color = "#16a34a"; // Green
                  } else if (entry.name === "In Progress") {
                    color = "#eab308"; // Yellow
                  } else {
                    color = "#7c3aed"; // Purple
                  }

                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ===============================
            Task Table
        =============================== */}
        <div className="card">
          <h3>All Tasks</h3>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Employee</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task._id}>
                  <td data-label="Title">{task.title}</td>
                  <td data-label="Employee">{task.assignedTo?.name}</td>
                  <td data-label="Status">{task.status}</td>
                  <td data-label="Action">
                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </button>

                    <button
                      style={{ marginLeft: "5px" }}
                      onClick={() => startEdit(task)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

export default HRDashboard;