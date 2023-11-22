const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI);

mongoose.connection.on("error", () => {
  console.log("Error in connection");
});

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});
