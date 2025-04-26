import express from "express";
import { isAdmin, isClient } from "../middleware/authentication.js";
import validateReqBody from "../middleware/validate.req.body.js";
import { bookingValidationSchema } from "./booking.validation.js";
import Booking from "./booking.model.js";
import validateMongoIdFromParams from "../middleware/validate.mongoid.js";
import mongoose from "mongoose";

const router = express.Router();

//?make booking
router.post(
  "/post",
  isClient,
  validateReqBody(bookingValidationSchema),
  async (req, res) => {
    const clientId = req.loggedInUserId;

    const { testId, serviceType } = req.body;

    const validMongoId = mongoose.isValidObjectId(testId);

    console.log(validMongoId);

    if (!validMongoId) {
      return res.status(404).send({ message: "Test not found" });
    }

    await Booking.create({
      clientId,
      testId,
      serviceType,
    });

    return res.status(200).send({ message: "Appointment booked" });
  }
);

//booking view to admins
router.get("/adminlist", isAdmin, async (req, res) => {
  const bookingDetail = await Booking.find();
  return res.status(200).send({ message: "List", bookingDetail });
});

//booking view to client
router.get("/list", isClient, async (req, res) => {
  const clientId = req.loggedInUserId;
  const bookingDetail = await Booking.find({ clientId });
  return res.status(200).send({ message: "List", bookingDetail });
});
export default router;
