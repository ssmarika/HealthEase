import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const isUser = async (req, res, next) => {
  //extract token from req.headers
  const { authorization } = req.headers;

  const splittedArray = authorization?.split(" ");

  const token = splittedArray?.length === 2 ? splittedArray[1] : null;

  //if not token , throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  //decrypt token

  let payload;

  try {
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    payload = jwt.verify(token, secretKey);
  } catch (error) {
    //if decryption  fails throw error
    return res.status(401).send({ message: "Unauthorized" });
  }

  //find the user using email
  const user = await User.findOne({ email: payload.email });

  //if not user throw error
  if (!user) {
    return res.status(401).send({ message: "unauthorized" });
  }

  req.loggedInUserId = user._id;

  //call next function
  next();
};

export const isAdmin = async (req, res, next) => {
  try {
    // extract token from req.headers

    const { authorization } = req.headers;

    const splittedArray = authorization?.split(" ");

    const token = splittedArray?.length === 2 ? splittedArray[1] : null;

    // if not token ,throw error
    if (!token) {
      throw new Error();
      //here the error is an object , () holds the message
    }

    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;

    //  verify token
    const payload = jwt.verify(token, secretKey);

    // find user using email from payload
    const user = await User.findOne({ email: payload.email });

    // if not user found, throw error
    if (!user) {
      throw new Error();
    }

    // check if user role is "admin"
    //  if user role is not "admin", throw error
    if (user.role !== "admin") {
      throw new Error();
    }

    // attach user._id to req
    req.loggedInUserId = user._id;

    // call next function
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }
};

export const isClient = async (req, res, next) => {
  try {
    // extract token from req.headers

    const { authorization } = req.headers;

    const splittedArray = authorization?.split(" ");

    const token = splittedArray?.length === 2 ? splittedArray[1] : null;

    // if not token ,throw error
    if (!token) {
      throw new Error();
    }

    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;

    //  verify token
    const payload = jwt.verify(token, secretKey);

    // find user using email from payload
    const user = await User.findOne({ email: payload.email });

    // if not user found, throw error
    if (!user) {
      throw new Error();
    }

    // check if user role is "client"
    //  if user role is not "client", throw error
    if (user.role !== "client") {
      throw new Error();
    }

    // attach user._id to req
    req.loggedInUserId = user._id;

    // call next function
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }
};
