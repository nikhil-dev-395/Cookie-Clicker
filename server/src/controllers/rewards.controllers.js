const User = require("../models/user.models");

const rewards = async () => {
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

module.exports = { rewards };
