const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(409).json({
        success: false,
        message: "user already existed ",
        user: existUser,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashPassword });
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      success: true,
      message: "user create successfully",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "error occurred at signing up the user",
      error: error.message,
    });
  }
};

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: "user not exist ",
        user: existUser,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, existUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "invalid password",
      });
    }

    const token = jwt.sign(
      { userId: existUser._id, email: existUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "user sign in successfully",
      user: existUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error occurred at signing In the user",
      error: error.message,
    });
  }
};

module.exports = { SignUp, SignIn };
