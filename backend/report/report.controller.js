import express from "express";
import multer from "multer";
import fs from "fs";
import Report from "./report.model.js";

const router = express.Router();

//multer setup for file upload
//create a directory for file uploads if it doesn't exist
// this directory will be used to store the uploaded files
// the files will be stored in the 'files' directory
// so that they can be accessed via the /files route in the client side
// this is done so that we can view the uploaded files in the browser
// if the directory does not exist, it will be created
// multer is used to handle file uploads in express

const uploadDir = "./files";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
// multer storage configuration
// it specifies the destination directory for uploaded files and how to name the files

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

//upload report
router.post("/upload", upload.single("file"), async (req, res) => {
  const filename = req.file.filename;
  const title = req.body.title;
  const bookingId = req.body.bookingId;

  await Report.create({ title, pdf: filename, bookingId });
  res.status(200).send({
    message: "File uploaded successfully",
  });
});

//view report by booking id
router.get("/view/:bookingId", async (req, res) => {
  const bookingId = req.params.bookingId;

  const report = await Report.findOne({ bookingId });
  if (!report) {
    return res.status(404).send({ message: "Report not found" });
  }
  res.status(200).send({
    message: "Report found",
    report: {
      title: report.title,
      pdf: report.pdf,
      bookingId: report.bookingId,
    },
  });
});

export default router;
