const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ HEALTH CHECK
app.get("/", (req, res) => {
  res.json({
    status: "Backend is running 🚀",
    api: "/api/movies",
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/movies", require("./routes/movieRoutes"));

const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);

module.exports = app;
