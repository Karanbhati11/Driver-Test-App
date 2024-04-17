const usermodel = require("../models/user");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");
const appointmentSchema = require("../models/appointment");
module.exports = async (req, res) => {
  console.log(req.body);
  // checking if the user exists or not
  const user = await usermodel.findById(req.session.userInfo.userId);
  const times = [
    {
      time: "09:00 AM",
      isTimeSlotTaken: true,
    },
    {
      time: "09:30 AM",
      isTimeSlotTaken: true,
    },
    {
      time: "10:00 AM",
      isTimeSlotTaken: true,
    },
    {
      time: "10:30 AM",
      isTimeSlotTaken: true,
    },
    {
      time: "11:00 AM",
      isTimeSlotTaken: true,
    },
    {
      time: "11:30 AM",
      isTimeSlotTaken: true,
    },
    {
      time: "12:00 PM",
      isTimeSlotTaken: true,
    },
    {
      time: "12:30 PM",
      isTimeSlotTaken: true,
    },
    {
      time: "01:00 PM",
      isTimeSlotTaken: true,
    },
    {
      time: "01:30 PM",
      isTimeSlotTaken: true,
    },
    {
      time: "02:00 PM",
      isTimeSlotTaken: true,
    },
  ];

  if (user && user.appointmentId && user.Comment && user.TestResult) {
    // Decrypt license number
    const decryptedString = cryptr.decrypt(user.License_No);
    // Update user object with decrypted license number
    user.License_No = decryptedString;

    res.render("G2", {
      response: user,
      message: "",
      times: times,
      notBooked: false,
      Comment: user.Comment,
      TestResult: user.TestResult,
      slotDetails: null,
    });
  } else if (user && user.appointmentId) {
    const decryptedString = cryptr.decrypt(user.License_No);
    const appointmentdate = await appointmentSchema.findById(
      user.appointmentId
    );

    user.License_No = decryptedString;
    res.render("G2", {
      response: user,
      message: "",
      slotDetails: appointmentdate,
      times: times,
      notBooked: false,
    });
  } else if (user) {
    const today = new Date().toISOString().split("T")[0];
    const date = req.query.date || today; // Default to today if no date query param
    const bookedSlots = await appointmentSchema.find({ date });
    const decryptedString = cryptr.decrypt(user.License_No);
    user.License_No = decryptedString;
    const bookedTimes = times.map((slot) =>
      bookedSlots.map((items) => {
        if (
          slot.time.includes(items.time) &&
          items.isTimeSlotAvailable === false
        ) {
          slot.isTimeSlotTaken = false;
        }
      })
    );
    res.render("G2", {
      response: user,
      message: "",
      bookedTimes: bookedTimes,
      times: times,
      date: date,
      minDate: today,
      notBooked: true,
    });
  } else {
    res.redirect("/");
  }

  console.log(user);
};
