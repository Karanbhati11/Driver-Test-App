const User = require("../models/user");

module.exports = async (req, res, next) => {
  // get user from database
  // session
  const user = await User.findById(req.session?.userInfo?.userId);
  if (!user) {
    console.log("not a valid user!!");
    return res.redirect("/");
  }
  next();
  // authenticate
};
