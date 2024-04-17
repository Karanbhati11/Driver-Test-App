const usermodel = require("../models/user");
const appointment = require("../models/appointment");
const User = require("../models/user");

module.exports = async (req, res) => {
  const { carMake, carModel, carYear, plateNumber, date, selectedTimeSlots } =
    req.body;

  console.log(date, selectedTimeSlots);
  // checking if userexists by userId
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

  //  function to render data
  const renderFunction = (message, response) => {
    if (response) {
      const decryptedString = cryptr.decrypt(response.License_No);
      response.License_No = decryptedString;
      res.render("G", {
        message: message,
        response: response,
        bookedTimes: bookedTimes,
        times: times,
        date: date,
        minDate: today,
      });
    } else {
      res.redirect("/");
    }
  };

  // book appointment
  if (selectedTimeSlots && selectedTimeSlots.length) {
    console.log(selectedTimeSlots);
    try {
      const findAppointment = await appointment.findOne({
        date: datequery,
        time: selectedTimeSlots,
      });

      if (findAppointment && user) {
        await appointment.findByIdAndUpdate(findAppointment._id, {
          isTimeSlotAvailable: true,
        });
      }

      await User.findByIdAndUpdate(req.session.userInfo?.userId, {
        appointmentId: findAppointment._id,
        TestType: "G",
      });
    } catch (err) {
      console.log("err", err);
    }
  }

  if (
    carMake === "" ||
    carModel === "" ||
    carYear === "" ||
    plateNumber === ""
  ) {
    renderFunction("Please enter all the fields", user);
  } else {
    // updating the user details
    const newUser = {
      car_details: {
        make: carMake,
        model: carModel,
        year: carYear,
        platno: plateNumber,
      },
    };
    await usermodel
      .findByIdAndUpdate(req.session.userInfo.userId, newUser)
      .then((response) => {
        console.log(response);
        res.redirect("/");
      })
      .catch((err) => {
        console.log("error" + err);
      });
  }
};
