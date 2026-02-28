require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors({
  origin: "https://frontend-hgw1.onrender.com",
  credentials: true
}));

app.use(express.json());

// 👇 Support both routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/auth", require("./routes/authRoutes"));

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
