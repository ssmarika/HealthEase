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

    const { name, address, date, time } = req.body;

    const test = await LabTest.findById(testId);

    const testName = test.name;

    const tests = { testId, testName };

    const status = "pending";

    await Booking.create({
      clientId,
      name,
      address,
      date,
      time,
      tests,
      status,
    });

    return res.status(200).send({ message: "Appointment booked" });
  }
);

//make multiple bookings
// router.post(
//   "/multiple",
//   isClient,
//   (req, res, next) => {
//     const clientId = req.loggedInUserId;
//     const Tests = [];

//     const { tests } = req.body;

//     const newTests = tests.forEach(async (item) => {
//       const test = await LabTest.find({ name: item.testName });
//       let testObj = { testId: test[0]._id, testName: item.testName };
//       Tests.push(testObj);
//     });
//     console.log(Tests);

//     next();
//   },
//   (req, res) => {
//     return res.status(200).send({ message: "adding" });
//   }
// );
router.post("/multiple", isClient, async (req, res) => {
  const clientId = req.loggedInUserId;

  const { tests, name, address, date, time } = req.body; // tests = array of {testName}

  // Find all test IDs in parallel and build your array
  const Tests = await Promise.all(
    tests.map(async (item) => {
      const test = await LabTest.findOne({ name: item.name }); // findOne is better, you expect one match
      if (!test) {
        // handle error or skip if test not found
        throw new Error(`Lab test not found: ${item.name}`);
      }
      return { testId: test._id, name: item.name };
    })
  );

  const status = "pending";

  await Booking.create({
    clientId,
    name,
    address,
    date,
    time,
    tests: Tests,
    status,
  });

  return res.status(200).send({ message: "Appointment booked" });
});

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

// //?update the booking status
router.put(
  "/status/:id",
  isAdmin,
  // validateMongoIdFromParams,
  async (req, res) => {
    const bookingId = req.params.id;

    const { status } = req.body;

    console.log(status);

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(401).send({ message: "Appointment does not exist" });
    }

    await Booking.updateOne({ _id: bookingId }, { $set: { status } });

    return res.status(200).send({ message: "Updating" });
  }
);

//? appointment as per the status for admin
router.post("/statuslist", isAdmin, async (req, res) => {
  const { status } = req.body;

  const bookingList = await Booking.find({ status });
  return res.status(200).send({ message: "StatusList", bookingList });
});

//? status view for admin
router.post(
  "/adminlist/:status",
  isAdmin,
  validateReqBody(paginationData),

  async (req, res) => {
    const { status } = req.params;

    const { page, limit, searchText } = req.body;

    let match = { status };

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

//? status view to clients
router.post(
  "/clientlist/:status",
  isClient,

  validateReqBody(paginationData),
  async (req, res) => {
    const { status } = req.params;
    const { page, limit, searchText } = req.body;
    let match = {
      clientId: req.loggedInUserId,
      status: status,
    };

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

export default router;
