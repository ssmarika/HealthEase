import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  clientId: {},
  testId: {},
  description: {},
  suggestion: {},
});
