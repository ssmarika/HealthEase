import express from "express";
import connectDB from "./database-connection/db.connect.js";
import UserRoutes from "./user/user.controller.js";

const app = express();

//to make app understand json
app.use(express.json());

//register routers
app.use("/user", UserRoutes);

//database connection
await connectDB();

//network and server
const PORT = process.env.DB_PORT;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
