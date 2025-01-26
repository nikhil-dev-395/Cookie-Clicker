const { Router } = require("express");
const { SignUp, SignIn } = require("../controllers/user.controllers");
const router = Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);

module.exports = { userRouter: router };
