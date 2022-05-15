require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// controller
const stripeRouter = require("./routes/stripeRoute");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(express.static("./public"));

app.use("/stripe", stripeRouter);

// stripe
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
