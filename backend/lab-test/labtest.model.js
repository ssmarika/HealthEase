import mongoose from "mongoose";

const labTestSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 100,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
    required: true,
  },
  inPersonPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  homeServicePrice: {
    type: Number,
    required: true,
    min: 0,
  },
  available: {
    type: Boolean, // Use Mongoose's Boolean type
    required: true,
    default: true,
  },
});

// create the table
const LabTest = mongoose.model("LabTest", labTestSchema);

export default LabTest;
