import express from "express";
import connectDB from "./database-connection/db.connect.js";

const app = express();

//to make app understand json
app.use(express.json());

//database connection
await connectDB();

//network and server
const PORT = process.env.DB_PORT;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
