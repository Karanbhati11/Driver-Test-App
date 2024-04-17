const user = require("../models/user");

module.exports = async (req, res) => {
  const { username, password, cpassword, usertype } = req.body;

  // checking if the user exists or not
  const existuser = await user.findOne({ Username: username });

  if (
    username === "" ||
    password === "" ||
    cpassword === "" ||
    usertype === ""
  ) {
    // console.log("Enter all the fields");
    res.render("signup", { message: "Enter all the Fields" });
  } else if (password.length < 8) {
    res.render("signup", {
      message: "password should be atleast 8 charater long!",
    });
  } else if (password !== cpassword) {
    // console.log("passwords dont match");
    res.render("signup", { message: "Passwords don't Match" });
  } else if (existuser) {
    res.render("signup", { message: "username already exists" });
  } else {
    // creating new user
    const newUser = {
      Username: username,
      Password: password,
      UserType: usertype,
    };

    const createUser = new user(newUser);
    await createUser.save();
    res.redirect("/login");
  }
};
