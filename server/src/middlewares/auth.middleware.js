const jwt = require("jsonwebtoken");

/*
* 1. take token with bearer word
* 2. split it then take second one which is token ,
* 3. decode it using jwt_secret
*/

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ success: false, message: "unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authUser;
