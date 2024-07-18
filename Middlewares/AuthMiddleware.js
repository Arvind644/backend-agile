const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.userVerification = async (req, res) => {
  const token = req.headers["authorization"]
console.log("authorization token", token);

  // if (!authHeader) {
  //   return res.status(403).json({ status: false, message: "Forbidden: No token provided" });
  // }

  // const token = authHeader; // Directly use the token from Authorization header

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY); // Verify token using your JWT secret
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    return res.status(200).json({ status: true, user: user.username });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ status: false, message: "Forbidden: Invalid token" });
  }
};



