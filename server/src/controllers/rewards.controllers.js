const User = require("../models/user.models");

/*
 * with this we can create prizes and scores 
 */
const rewards = async (req, res) => {
  try {
    const { email } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    /*
     * whats happening here ?
     *** we are giving output bonus points if it is greater than 0.5 it will show 10 else we will show 1,
     ***but prize is if it is greater than .25 it will show 1 else 0
     *
     **** this is our programs main feature ,
     *
     */
    const bonusPoints = Math.random() < 0.5 ? 10 : 1;
    const prize = Math.random() < 0.25 ? 1 : 0;
    /*
     * updates user based on scores and prizes
     */
    existUser.scores += bonusPoints;
    existUser.prizes += prize;
    await existUser.save();

    /*
     * making response
     */
    res.status(201).json({
      success: true,
      message: prize
        ? "congratulations ! you won prize "
        : bonusPoints === 10
        ? "You earned 10 bonus points!"
        : "1 point added.",
      data: {
        prize: existUser.prizes,
        score: existUser.scores,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error at rewards",
      error: error.message,
    });
  }
};
/*
 * here we are going to show this
 */
const getUserWithData = async (req, res) => {
  try {
    const email = req.user.email;
    /*
     * here we are going to only share scores and prizes
     */
    const getUser = await User.findOne({ email }).select(" scores prizes ");

    if (!getUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user found",
      user: getUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: " error at getting user",
      error: error.message,
    });
  }
};

module.exports = { rewards, getUserWithData };
