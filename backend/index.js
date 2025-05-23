import express from "express";
import connectDB from "./database-connection/db.connect.js";
import UserRoutes from "./user/user.controller.js";
import LabTestRoutes from "./lab-test/labtest.controller.js";
import BookingRoutes from "./bookings/booking.controller.js";
import cors from "cors";
import { swaggerUi, swaggerDocument } from "./swagger.js";

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  cors({
    origin: "*", //allow request from all domain
  })
);
//to make app understand json
app.use(express.json());

//database connection
await connectDB();

//register routers
app.use("/user", UserRoutes);
app.use("/labtest", LabTestRoutes);
app.use("/booking", BookingRoutes);

//network and server
const PORT = process.env.DB_PORT || 8080;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
