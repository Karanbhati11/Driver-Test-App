const express = require("express");
const app = express();
const ejs = require("ejs");
const expressSession = require("express-session");
const { dbConnection } = require("./controllers/dbConnection");
// dashboard
const dashboardController = require("./controllers/dashboardController");
// gpage
const gpageController = require("./controllers/gpageController");
const gpageupdateController = require("./controllers/gpageupdateController");
//g2page
const g2pageController = require("./controllers/g2pageController");
const g2createUserController = require("./controllers/g2createUserController");
// examiner page
const examinerPageController = require("./controllers/examinerPageController");
const commentController = require("./controllers/commentController");
// appointment
const appointmentController = require("./controllers/appointmentController");
const bookAppointmentController = require("./controllers/bookAppointmentController");
// login signup
const loginpageController = require("./controllers/loginpageController");
const signupController = require("./controllers/singuppageController");
const usersignUpController = require("./controllers/usersignUpController");
const userloginContoller = require("./controllers/userloginContoller");
// logout and middleware
const logoutController = require("./controllers/logoutController");
const authMiddleware = require("./middleware/authMiddleware");
const appointmentMiddleware = require("./middleware/appointmentMiddleware");
const examinerMiddleware = require("./middleware/examinerMiddleware");
const examinerpostController = require("./controllers/examinerpostController");
const PORT = 4000;

// dbconnection
dbConnection();

// Middleware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "thisistopsecret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use("*", (req, res, next) => {
  loggedIn = req.session.userInfo;
  next();
});

// routes
// dashboard route
app.get("/", dashboardController);
// g page route
app.get("/G", authMiddleware, gpageController);
// g2 page route
app.get("/G2", authMiddleware, g2pageController);
// appointment page route
app.get("/appointment", appointmentMiddleware, appointmentController);
// examiner route
app.get("/examiner", examinerMiddleware, examinerPageController);
// login page route
app.get("/login", loginpageController);
// signup page route
app.get("/signup", signupController);

// signup form submit route
app.post("/usersignup", usersignUpController);
// login form submit route
app.post("/userlogin", userloginContoller);
// appointment form submit
app.post("/appointment", bookAppointmentController);
// examiner post route
app.post("/examiner", examinerMiddleware, examinerpostController);
// comment route
app.post("/comment", examinerMiddleware, commentController);
// g2 page form submit route
app.post("/g2createuser", g2createUserController);
// g page form submit route
app.post("/gpageupdate", gpageupdateController);
// logout route
app.get("/logout", logoutController);

app.use((req, res) => {
  res.render("404Page");
});
// listening to server
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
