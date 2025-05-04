import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  testId: { type: mongoose.ObjectId, ref: "LabTest", required: true },
  clientId: { type: mongoose.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true, maxlength: 30 },
  address: { type: String, required: true, trim: true, maxlength: 200 },

  serviceType: {
    type: String,
    required: true,
    enum: ["clinic visit", "home service"],
  },
  note: { type: String, maxlength: 300 },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  testName: { type: String, required: true, trim: true },

  status: {
    type: String,
    required: true,
    enum: ["pending", "conformed", "cancelled", "completed"],
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
