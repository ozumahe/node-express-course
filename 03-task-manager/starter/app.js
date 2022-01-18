const express = require("express");
const app = express();
const task = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.json());

app.use("/api/v1/tasks", task);

// Middle Ware
// port
const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`listing on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
