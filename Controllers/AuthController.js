const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { firstname, lastname, password, username, createdAt } = req.body;
    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //   return res.json({ message: "User already exists with given userbname" });
    // }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.json({ message: "Username already exists" });
    }
    const user = await User.create({ firstname, lastname, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.status(200).json({ message: "User signed up successfully", success: true, token, user });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message, success: false });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error('All fields are required');
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: 'Incorrect username or password' });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: 'Incorrect email or password' });
    }
    const token = createSecretToken(user._id);
    res.status(200).json({ message: "User logged in successfully", success: true, token });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message, success: false });
  }
};

