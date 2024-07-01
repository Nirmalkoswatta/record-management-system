import express from "express";
import mongoose from "mongoose";
import recordRouter from "./routes/record.route.js"
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose.connect("mongodb+srv://nekanayake789:Naveen%23123@furrypets.sfoid0i.mongodb.net/?retryWrites=true&w=majority&appName=furrypets").then(() => {
  console.log("Connected to the database");
}).catch((err) => { 

  console.log("Could not connect to the database. Exiting now...", err);
  process.exit();
});

app.use("/api/records", recordRouter);