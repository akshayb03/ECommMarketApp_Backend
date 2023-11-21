const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { router } = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);

app.get("/", (req, res) => {
  const user = req.user;
  res.send({ user });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
