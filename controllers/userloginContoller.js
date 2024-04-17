const usermodel = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  //Get info from UI
  const { username, password } = req.body;
  //    fetching userdata
  try {
    // checking for user
    const user = await usermodel.findOne({ Username: username });
    if (user) {
      // checking the correct password
      bcrypt.compare(password, user.Password, (err, isValid) => {
        if (isValid) {
          // session
          // checking user type
          if (
            user.UserType === "Driver" ||
            user.UserType === "Admin" ||
            user.UserType === "Examiner"
          ) {
            req.session.userInfo = {
              userId: user._id,
              userType: user.UserType,
            };
            res.redirect("/");
          } else {
            console.log("not a valid userType");
            res.render("login", { message: "Not a valid UserType" });
          }
        } else {
          res.render("login", { message: "Wrong Password" });
        }
      });
    } else {
      console.log("No User Found!");
      res.render("login", { message: "No User Found! Register First" });
    }
  } catch (err) {
    console.log("something went wrong" + err);
    res.render("login", { message: "Something went wrong!" });
  }
};
