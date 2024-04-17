const user = require("../models/user");
const appointment_model = require("../models/appointment");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");

module.exports = async (req, res) => {
  try {
    const appointmentsExist = await user.find({
      TestType: { $exists: true, $in: ["G2", "G"] },
    });
    const today = new Date().toISOString().split("T")[0];
    const date = req.query.date || today; // Default to today if no date query param

    // Separate appointments by TestType
    const appointmentsG2 = appointmentsExist.filter(
      (appointment) => appointment.TestType === "G2"
    );
    const appointmentsG = appointmentsExist.filter(
      (appointment) => appointment.TestType === "G"
    );

    // Retrieve appointment details
    const getAppointmentDetails = async (appointments) => {
      console.log(appointments, "asddddd");
      return Promise.all(
        appointments.map(async (appointment) => {
          return await appointment_model.findById(appointment.appointmentId);
        })
      );
    };

    // Get appointment details for G2 appointments
    const appointmentsG2Details = await getAppointmentDetails(appointmentsG2);

    // Get appointment details for G appointments
    const appointmentsGDetails = await getAppointmentDetails(appointmentsG);

    res.render("examiner", {
      appointmentsG2: appointmentsG2Details,
      appointmentsG: appointmentsGDetails,
      userdata: null,
      carDetails: null,
      date: today,
    }); // Render with appointments data
  } catch (error) {
    console.error(error); // Log any errors that occur during the query
    res.status(500).send("Internal Server Error"); // Send an appropriate error response
  }
};
