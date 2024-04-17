const user = require("../models/user");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");

module.exports = async (req, res) => {
  const { appointment_id_g2, appointment_id_g } = req.body;

  let userdata = {};
  let carDetails = {};
  let appointmentsG = [];
  let appointmentsG2 = [];

  if (appointment_id_g) {
    await user.find({ appointmentId: appointment_id_g }).then((response) => {
      if (response[0].Comment && response[0].TestResult) {
        userdata = {
          firstname: response[0].firstname,
          lastname: response[0].lastname,
          userId: response[0]._id,
          Comment: response[0].Comment,
          TestResult: response[0].TestResult,
        };
        carDetails = response[0].car_details; // Populate car details
      } else {
        userdata = {
          firstname: response[0].firstname,
          lastname: response[0].lastname,
          userId: response[0]._id,
        };
        carDetails = response[0].car_details; // Populate car details
      }
      // Collect appointmentsG data
      appointmentsG = response;
    });
  }

  if (appointment_id_g2) {
    await user.find({ appointmentId: appointment_id_g2 }).then((response) => {
      if (response[0].Comment && response[0].TestResult) {
        userdata = {
          firstname: response[0].firstname,
          lastname: response[0].lastname,
          userId: response[0]._id,
          Comment: response[0].Comment,
          TestResult: response[0].TestResult,
        };
        carDetails = response[0].car_details; // Populate car details
      } else {
        userdata = {
          firstname: response[0].firstname,
          lastname: response[0].lastname,
          userId: response[0]._id,
        };
        carDetails = response[0].car_details; // Populate car details
      }
      // Collect appointmentsG2 data
      appointmentsG2 = response;
    });
  }

  // Render the template with collected data
  res.render("examiner", {
    userdata: userdata,
    carDetails: carDetails,
    appointmentsG: appointmentsG,
    appointmentsG2: appointmentsG2,
  });
};
