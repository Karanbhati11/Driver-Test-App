const appointment = require("../models/appointment");
const user = require("../models/user");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");
module.exports = async (req, res) => {
  const {
    firstName,
    lastName,
    licenseNumber,
    age,
    carMake,
    carModel,
    carYear,
    plateNumber,
    date,
    selectedTimeSlots,
  } = req.body;

  // regex to check the license number AXXXX-XXXXX-XXXXX;
  const licenseRegex = /^[A-Z]\d{4}-\d{5}-\d{5}$/;
  const existingUser = await user.findById(req.session.userInfo?.userId);
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
  const today = new Date().toISOString().split("T")[0];
  const datequery = date || today; // Default to today if no date query param
  const bookedSlots = await appointment.find({ datequery });

  const bookedTimes = times.map((slot) =>
    bookedSlots.map((items) => {
      if (slot.time.includes(items.time)) {
        slot.isTimeSlotTaken = false;
      }
    })
  );
  // function to render data
  const renderFunction = (message, response) => {
    if (response) {
      const decryptedString = cryptr.decrypt(response.License_No);
      response.License_No = decryptedString;
      res.render("G2", {
        message: message,
        response: response,
        bookedTimes: bookedTimes,
        times: times,
        date: date,
        minDate: today,
        notBooked: true,
      });
    } else {
      res.redirect("/");
    }
  };

  // book appointment
  if (selectedTimeSlots && selectedTimeSlots.length) {
    try {
      const findAppointment = await appointment.findOne({
        date: datequery,
        time: selectedTimeSlots,
      });

      if (findAppointment && existingUser) {
        await appointment.findByIdAndUpdate(findAppointment._id, {
          isTimeSlotAvailable: true,
        });
      }

      await user.findByIdAndUpdate(req.session.userInfo?.userId, {
        appointmentId: findAppointment._id,
        TestType: "G2",
      });
    } catch (err) {
      console.log("err", err);
    }
  }

  if (existingUser) {
    if (
      firstName === "" ||
      lastName === "" ||
      licenseNumber === "" ||
      age === "" ||
      carMake === "" ||
      carModel === "" ||
      carYear === "" ||
      plateNumber === ""
    ) {
      renderFunction("Please enter all the fields", existingUser);
    } else if (!licenseRegex.test(licenseNumber)) {
      renderFunction("Please enter a valid license number", existingUser);
    } else {
      const newUser = {
        firstname: firstName,
        lastname: lastName,
        License_No: cryptr.encrypt(licenseNumber),
        Age: age,
        car_details: {
          make: carMake,
          model: carModel,
          year: carYear,
          platno: plateNumber,
        },
      };

      // finding by id and updating the user
      await user
        .findByIdAndUpdate(req.session.userInfo.userId, newUser)
        .then((response) => {
          res.redirect("/");
        })
        .catch((err) => {
          console.log("error" + err);
        });
    }
  } else {
    renderFunction("something went wrong", existingUser);
  }
};
