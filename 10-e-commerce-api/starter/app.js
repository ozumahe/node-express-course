require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// Order Packages
const morgan = require("morgan");
const cookiesPhaser = require("cookie-parser");

// Database
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes");

// Middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHnadlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookiesPhaser());

app.get("/", (req, res) => {
  res.send("E commercce api");
});
app.get("/api/v1", (req, res) => {
  console.log(req.cookies);
  res.send("E commercce api");
});

app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHnadlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listing on Port ${port}...`));
  } catch (e) {
    console.log(e);
  }
};

start();
