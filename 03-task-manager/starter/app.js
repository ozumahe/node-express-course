const express = require("express");
const app = express();
const task = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

app.use(express.json());

// Middle Ware
app.use(express.static("./public"));
app.use("/api/v1/tasks", task);

app.use(notFound);
app.use(errorHandler);

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
