import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  clientId: { type: mongoose.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true, maxlength: 30 },
  address: { type: String, required: true, trim: true, maxlength: 200 },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },

  tests: [
    {
      testId: { type: mongoose.ObjectId, ref: "LabTest", required: true },
      name: { type: String, required: true, trim: true },
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["pending", "approved", "cancelled", "completed"],
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
