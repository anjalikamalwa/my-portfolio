import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./dbconfig/dbconnection.js";
import { router } from "./routes/contactRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";


dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/message", router);



app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
