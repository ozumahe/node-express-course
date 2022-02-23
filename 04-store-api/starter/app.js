require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

// async errors
const notFoundMiddleWare = require("./middleware/not-found");
const errorMiddleWare = require("./middleware/error-handler");

app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send('<h1>Store ApI</h1><a href="/api/v1/products">Produts Routs</a>');
});

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    // connect to DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {}
};

start();
