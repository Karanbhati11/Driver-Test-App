const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");
const Schema = mongoose.Schema;
const appointment = require("../models/appointment");
const userSchema = new Schema({
  firstname: {
    type: String,
    default: "default",
    unique: false,
    required: true,
  },
  lastname: { type: String, default: "default", unique: false, required: true },
  License_No: {
    type: String,
    default: "default",
    unique: true,
    required: true,
  },
  Age: {
    type: String,
    default: "0",
    unique: false,
    required: [true, "age is required!"],
  },
  Username: { type: String, default: "demo", unique: true, required: true },
  Password: { type: String, default: "demo", unique: false, required: true },
  UserType: { type: String, default: "demo", unique: false, required: true },
  car_details: {
    make: { type: String, default: "default", unique: false, required: true },
    model: { type: String, default: "default", unique: false, required: true },
    year: { type: String, default: "0", unique: false, required: true },
    platno: { type: String, default: "default", unique: false, required: true },
  },
  TestType: { type: String, require: false },
  Comment: { type: String, require: false },
  TestResult: { type: String, require: false },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: appointment,
    required: false,
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  bcrypt.hash(user.Password, 10, (error, hash) => {
    user.Password = hash;
    user.License_No = cryptr.encrypt(user.License_No);
    next();
  });
});

module.exports = mongoose.model("user", userSchema);
