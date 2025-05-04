import express from "express";
import { isAdmin, isClient } from "../middleware/authentication.js";
import validateReqBody from "../middleware/validate.req.body.js";
import { bookingValidationSchema } from "./booking.validation.js";
import Booking from "./booking.model.js";

import validateMongoIdFromParams from "../middleware/validate.mongoid.js";
import { paginationData } from "../lab-test/labtest.validation.js";
import LabTest from "../lab-test/labtest.model.js";

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

    const { name, address, serviceType, date, time } = req.body;

    const test = await LabTest.findById(testId);

    const testName = test.name;

    const status = "pending";

    await Booking.create({
      clientId,
      testId,
      name,
      address,
      serviceType,

      date,
      time,
      testName,
      status,
    });

    return res.status(200).send({ message: "Appointment booked" });
  }
);

//booking view to admins
router.post(
  "/adminlist",
  isAdmin,

  validateReqBody(paginationData),
  async (req, res) => {
    const { page, limit, searchText } = req.body;

    let match = {};

    if (searchText) {
      match = { name: { $regex: searchText, $options: "i" } };
    }

    const skip = (page - 1) * limit;

    const bookingList = await Booking.aggregate([
      { $match: match },
      { $skip: skip },
      { $limit: limit },
    ]);
    return res.status(200).send({ Message: "Appointment List", bookingList });
  }
);

//booking view to client

router.post(
  "/clientlist",
  isClient,

  validateReqBody(paginationData),
  async (req, res) => {
    const { page, limit, searchText } = req.body;

    let match = { clientId: req.loggedInUserId };

    if (searchText) {
      match.name = { $regex: searchText, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const bookingList = await Booking.aggregate([
      { $match: match },
      { $skip: skip },
      { $limit: limit },
    ]);
    return res.status(200).send({ Message: "Appointment List", bookingList });
  }
);

//?delete appointment
router.delete(
  "/delete/:id",
  isClient,
  validateMongoIdFromParams,
  async (req, res) => {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).send({ message: "Appointment not found" });
    }

    await Booking.deleteOne({ _id: bookingId });
    return res.status(200).send({ message: "Deleted Successfully" });
  }
);

export default router;

// //?update the booking status
// router.put(
//   "/status/:id",
//   isAdmin,
//   validateMongoIdFromParams,
//   async (req, res) => {
//     const bookingId = req.params.id;

//     const booking = await Booking.findById(bookingId);

//     if (!booking) {
//       return res.status(401).send({ message: "Appointment does not exist" });
//     }

//     await Booking.updateOne({ _id: bookingId }, {$set: });
//     return res.status(200).send({ message: "Updated" });
//   }
// );
