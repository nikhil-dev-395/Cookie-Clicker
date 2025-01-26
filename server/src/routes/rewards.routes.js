const { Router } = require("express");
const router = Router();
const {
  rewards,
  getUserWithData,
} = require("../controllers/rewards.controllers");

router.post("/reward", rewards);
router.get("/getuser", getUserWithData);

module.exports = { rewardsRouter: router };
