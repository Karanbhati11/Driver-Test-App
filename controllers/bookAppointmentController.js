const appointmentSchema = require("../models/appointment");

module.exports = async (req, res) => {
  const { selectedTimeSlots, date } = req.body;

  console.log(selectedTimeSlots, date);

  if (selectedTimeSlots && selectedTimeSlots.length) {
    try {
      const savePromises = selectedTimeSlots.map((slot) => {
        const newSlot = {
          date: date,
          time: slot, 
          isTimeSlotAvailable: false,
        };
        const createSlot = new appointmentSchema(newSlot);
        return createSlot.save();
      });

      //completing all the promises
      await Promise.all(savePromises);

      // After all saves are done, redirect
      return res.redirect("/");
    } catch (err) {
      console.log("Error saving slots", err);
      // Handle the error, maybe redirect to an error page or send back an error response
      return res.status(500).send("An error occurred");
    }
  } else {
    // If no time slots selected, or other logic to handle this case
    // res.redirect("");
    console.log("no time slot selected");
  }
};
