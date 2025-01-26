const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.send("hii this is routes based");
});

module.exports = { userRouter: router };
