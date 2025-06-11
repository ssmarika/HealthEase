import express from "express";
import { isAdmin, isUser } from "../middleware/authentication.js";
import validateReqBody from "../middleware/validate.req.body.js";
import {
  labTestValidationSchema,
  paginationData,
} from "./labtest.validation.js";
import LabTest from "./labtest.model.js";
import validateMongoIdFromParams from "../middleware/validate.mongoid.js";

const router = express.Router();

//?add lab tests
//check the user is admin
//validate the req body
//add into the table
router.post(
  "/add",
  isAdmin,
  validateReqBody(labTestValidationSchema),
  async (req, res) => {
    const newTest = req.body;

    await LabTest.create(newTest);

    return res.status(200).send({ message: "added successfully" });
  }
);

//?update lab test
//we update by particular id so id is to be sent in the params
//check isAdmin as only the admins can update lab tests
//validate the update data
//find the particular object to be updated then update it
router.put(
  "/update/:id",
  // isAdmin,
  validateMongoIdFromParams,
  validateReqBody(labTestValidationSchema),
  async (req, res) => {
    const testId = req.params.id;

    const test = await LabTest.findById(testId);

    if (!test) {
      return res.status(400).send({ message: "This test does not exist" });
    }

    const updatedDetail = req.body;

    await LabTest.updateOne({ _id: testId }, { $set: { ...updatedDetail } });

    return res.status(200).send({ message: "Updates Successfully" });
  }
);

//? view lab tests by id
router.get("/listbyid/:id", validateMongoIdFromParams, async (req, res) => {
  //extract the from the request params
  const testId = req.params.id;

  //find the lab test with the help of id
  const labTest = await LabTest.findById(testId);

  //if lab test not found throw error
  if (!labTest) {
    return res.status(401).send({ message: "Lab Test not available" });
  }
  return res.status(200).send({ message: "Test found", labTest });
});

//?view lab tests all
router.get("/list/all", async (req, res) => {
  const testList = await LabTest.find();
  return res.status(200).send({ message: "List", testList });
});

//list labtest names
router.get("/list/name", async (req, res) => {
  const nameList = await LabTest.aggregate([
    { $match: {} },
    { $project: { name: 1 } },
  ]);

  return res.status(200).send({ message: "Name List", nameList });
});

//? list labtest
router.post(
  "/list",

  validateReqBody(paginationData),
  async (req, res) => {
    const { page, limit, searchText } = req.body;

    let match = {};

    if (searchText) {
      match = { name: { $regex: searchText, $options: "i" } };
    }

    const skip = (page - 1) * limit;

    const testList = await LabTest.aggregate([
      { $match: match },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          name: 1,
          price: 1,
          available: 1,
        },
      },
    ]);
    return res.status(200).send({ Message: "Lab Test List", testList });
  }
);

//?delete lab test
router.delete(
  "/delete/:id",
  isAdmin,
  validateMongoIdFromParams,
  async (req, res) => {
    const testId = req.params.id;

    const test = await LabTest.findById(testId);

    if (!test) {
      return res.status(404).send({ message: "Lab test not found" });
    }

    await LabTest.deleteOne({ _id: testId });
    return res.status(200).send({ message: "Deleted Successfully" });
  }
);

export default router;
