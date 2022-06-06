// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const { isAuthenticated } = require("./middleware/jwt.middleware");

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const authRouter = require("./routes/auth.routes"); //  <== IMPORT
app.use("/auth", authRouter);

const imageRouter = require("./routes/image.routes"); //  <== IMPORT
app.use("/api", imageRouter);

const imagesRouter = require("./routes/images.routes"); //  <== IMPORT
app.use("/api", imagesRouter);

const requestRouter = require("./routes/request.routes"); //  <== IMPORT
app.use("/api", isAuthenticated, requestRouter);

const artistRouter = require("./routes/artist.routes"); //  <== IMPORT
app.use("/api", isAuthenticated, artistRouter);

const userRouter = require("./routes/user.routes"); //  <== IMPORT
app.use("/api", isAuthenticated, userRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
