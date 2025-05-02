import express from "express";
import { isAdmin, isClient } from "../middleware/authentication.js";
import validateReqBody from "../middleware/validate.req.body.js";
import { bookingValidationSchema } from "./booking.validation.js";
import Booking from "./booking.model.js";
import mongoose from "mongoose";
import validateMongoIdFromParams from "../middleware/validate.mongoid.js";

const router = express.Router();

//?make booking
router.post(
  "/post/:id",
  isClient,
  validateMongoIdFromParams,
  validateReqBody(bookingValidationSchema),

  async (req, res) => {
    const clientId = req.loggedInUserId;

    const testId = req.params.id;

    const { name, address, serviceType, note } = req.body;

    await Booking.create({
      clientId,
      testId,
      name,
      address,
      serviceType,
      note,
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
