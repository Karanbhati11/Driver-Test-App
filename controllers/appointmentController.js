const appointmentSchema = require("../models/appointment");

module.exports = async (req, res) => {
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

  const date = req.query.date || today; // Default to today if no date query param

  const bookedSlots = await appointmentSchema.find({ date });

  const bookedTimes = times.map((slot) =>
    bookedSlots.map((items) => {
      if (slot.time.includes(items.time)) {
        slot.isTimeSlotTaken = false;
      }
    })
  );

  return res.render("appointment", {
    bookedTimes: bookedTimes,
    times: times,
    date: date,
    minDate: today,
  });
  // res.render("appointment");
};
