const User = require("../models/User");

exports.getEmployees = async (req, res) => {
  const employees = await User.find({ role: "Employee" }).select("-password");
  res.json(employees);
};