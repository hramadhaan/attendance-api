const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// Routes
const roleRoutes = require("./routes/role");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Route Configuration
app.use("/role", roleRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.data?.[0]?.msg || "Server Failure";
  res.status(status).json({
    success: false,
    message: message,
  });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@staging.njkcbpl.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error while listening on", err);
  });
