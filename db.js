const mongoose = require("mongoose");

const mongoUri =
  "mongodb+srv://akshayb03:Bangarangatlas%4003@ecomm-prod-cluster.pgcqazn.mongodb.net/Ecomm_Products?retryWrites=true&w=majority";

mongoose.connect(mongoUri);

mongoose.connection.on("error", () => {
  console.log("Error in connection");
});

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});
