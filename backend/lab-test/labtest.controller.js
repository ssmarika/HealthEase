import express from "express";
import { isAdmin, isUser } from "../middleware/authentication.js";
import validateReqBody from "../middleware/validate.req.body.js";
import { labTestValidationSchema } from "./labtest.validation.js";
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
  isAdmin,
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

//?view lab tests
router.get("/list", isUser, async (req, res) => {
  const testDetail = await LabTest.find();
  return res.status(200).send({ message: "List", testDetail });
});

export default router;
