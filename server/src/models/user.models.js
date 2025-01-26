const mongoose = require("mongoose");

/*
* here we are going to update rewards and scores ,
* on the starting we are going to make it register/login here

*/
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    rewards: {
      type: Number,
      default: 0,
    },
    scores: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
