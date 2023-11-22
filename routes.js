const express = require("express");
const router = express.Router();
const User = require("./models/User");
require("./db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const { name, email, password, dob } = req.body;
  if (!name || !email || !password || !dob) {
    return res.status(401).send("Please fill all the fields correctly");
  }
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(401).send("User already exists");
    }

    const encryptedPassword = await bcrypt.hash(password, 8);

    const user = new User({
      name: name,
      email: email,
      password: encryptedPassword,
      dob: dob,
    });

    user.save();
    const token = jwt.sign({ _id: user._id }, jwtSecret);
    return res.status(200).send({ token: token });
  } catch (error) {
    return res.status(500).send("Some error has occured. Please try again");
  }
});

router.post("/signin", async (req, res, next) => {
  console.log("signin");
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).send("Please fill all the fields correctly");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  try {
    const compare = await bcrypt.compare(password, user.password);
    console.log("compare", compare);
    if (compare) {
      const token = jwt.sign({ _id: user._id }, jwtSecret);
      return res.status(200).send({ token: token, name: user.name });
    } else {
      return res.status(401).send("Password is incorrect");
    }
  } catch (err) {
    return res.status(500).send("Some error has occured. Please try again");
  }
});

router.get("/home", (req, res) => {
  return res.send("This is the home page");
});

module.exports = { router };
