const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;

  const task = await Task.create({
    title,
    description,
    assignedTo,
    createdBy: req.user.id
  });

  res.json(task);
};

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find().populate("assignedTo", "name");
  res.json(tasks);
};

exports.getMyTasks = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user.id });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const { status } = req.body;

  const task = await Task.findById(req.params.id);
  task.status = status;
  await task.save();

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};