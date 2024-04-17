const mongoose = require("mongoose");

const dbConnection = async () => {
  // connecting to database
  const connectionString =
    "mongodb+srv://karanbhati:ThisismyDB@cluster0.tf3y4i5.mongodb.net/";

  try {
    await mongoose.connect(connectionString);
    console.log("Database Connected!");
  } catch (err) {
    console.log("Connection Error!" + err);
  }
};

module.exports = { dbConnection };
