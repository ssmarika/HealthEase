import express from "express";
import {
  loginValidationSchema,
  userValidationSchema,
} from "./user.validation.js";
import validateReqBody from "../middleware/validate.req.body.js";
import User from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//?register user
//extract the info from the req body
//validate the information
//invalid then throw error
//extract user info
//find the user by email
//if exists throw error
//hash password
//add to database

router.post(
  "/register",

  //extract the info from the req body
  //validate the information
  //invalid then throw error
  validateReqBody(userValidationSchema),

  async (req, res) => {
    //extract user info
    const newUser = req.body;

    //find the user by email
    const user = await User.findOne({ email: newUser.email });

    //if user existes throw error
    if (user) {
      return res.status(404).send({ Message: "User already exists" });
    }

    //hash password so cannot be seen in the database
    const plainPassword = newUser.password;
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRound);

    newUser.password = hashedPassword;

    //inset the new user into the table

    await User.create(newUser);

    return res.status(201).send("User added successfully");
  }
);

//?login user
//validate req body
//check if th user exists
//if does not exist throw error
//check password
//generate token
router.post(
  "/login",
  //validate login credentials
  validateReqBody(loginValidationSchema),
  async (req, res) => {
    //extract the information from request body
    const data = req.body;

    // find the user by email
    const user = await User.findOne({ email: data.email });

    //if does not exist throw error
    if (!user) {
      return res.status(404).send({ message: "Invalid Credentials" });
    }

    //if exists check the password
    const hashedPassword = user.password;
    const plainPassword = data.password;
    const valid = await bcrypt.compare(plainPassword, hashedPassword);

    if (!valid) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

    //generate token
    const payload = { email: user.email };
    const sign = process.env.ACCESS_TOKEN_SECRET_KEY;

    const accessToken = jwt.sign(
      payload,
      sign
      //   , {
      //   expiresIn: 'process.env.ACCESS_TOKEN_EXPIRES_IN',
      // }
    );

    return res
      .status(200)
      .send({ message: "Successfully logged in", user, accessToken });
  }
);

export default router;
