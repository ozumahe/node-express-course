require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");

const JsonProduct = require("./products.json");

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(JsonProduct);
    console.log("Successfull!!!");
    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};

start();
