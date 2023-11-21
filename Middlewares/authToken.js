const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const jwtSecret = require("../constants");

const authTokenVerify = async (req, res, next) => {
  console.log("here");
  const token = req.headers?.authorization?.split(" ")[1];
  console.log("token", token);
  console.log("token", token);
  console.log("jwtSecret", jwtSecret);
  jwt.verify(token, jwtSecret.jwtSecret, async (err, payload) => {
    if (err) {
      console.log("Invalid Signatures");
      return res.status(400).send({ Error: err.message });
    }
    if (payload) {
      console.log("Payload", payload._id);
      const user = await User.findById(payload._id);
      if (user) {
        console.log("user!!", user);
        req.user = user;
      }
    }
    next();
  });
};

module.exports = authTokenVerify;
