const express = require("express");
const { getEmployees } = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, authorize("HR"), getEmployees);

module.exports = router;