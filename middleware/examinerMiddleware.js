const User = require("../models/user");

module.exports = async (req, res, next) => {
  // get user from database
  // session
  const user = await User.findById(req.session?.userInfo?.userId);

  if (user?.UserType !== "Examiner") {
    console.log("not a Examiner!!");
    return res.redirect("/");
  }
  next();
  // authenticate
};
