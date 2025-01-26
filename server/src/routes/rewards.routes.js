const { Router } = require("express");
const router = Router();
const { rewards } = require("../controllers/rewards.controllers");

router.post("/reward", rewards);

module.exports = { rewardsRouter: router };
