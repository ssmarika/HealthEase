import mongoose from "mongoose";

const validateMongoIdFromParams = (req, res, next) => {
  //extract id from req.params
  const id = req.params;

  //check for mongo id validity

  const isValidId = mongoose.isValidObjectId(id);

  //if not valid throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongoId" });
  }

  // call next function

  next();
};

export default validateMongoIdFromParams;
