const express = require("express");
const {
  createTask,
  getAllTasks,
  getMyTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize("HR"), createTask);
router.get("/", protect, authorize("HR"), getAllTasks);
router.get("/my", protect, authorize("Employee"), getMyTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, authorize("HR"), deleteTask);

module.exports = router;