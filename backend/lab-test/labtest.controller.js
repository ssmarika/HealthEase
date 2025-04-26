import express from "express";
import { isAdmin, isUser } from "../middleware/authentication.js";
import validateReqBody from "../middleware/validate.req.body.js";
import { labTestValidationSchema } from "./labtest.validation.js";
import LabTest from "./labtest.model.js";

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

//?view lab tests
router.get("/list", isUser, async (req, res) => {
  const testDetail = await LabTest.find();
  return res.status(200).send({ message: "List", testDetail });
});

export default router;
