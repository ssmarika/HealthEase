import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  testId: { type: mongoose.ObjectId, ref: "LabTest", required: true },
  clientId: { type: mongoose.ObjectId, ref: "User", required: true },
  serviceType: {
    type: String,
    required: true,
    enum: ["in person", "home service"],
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
