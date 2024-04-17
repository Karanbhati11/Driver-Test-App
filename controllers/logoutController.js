module.exports = (req, res) => {
  req.session.destroy(() => {
    console.log("session Destroyed");
    res.redirect("/");
  });
};
