import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  pdf: { type: String, required: true },
  bookingId: { type: mongoose.ObjectId, ref: "Booking", required: true },
  title: { type: String, required: true, trim: true, maxlength: 30 },
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
