import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import recordRouter from "./routes/record.route.js";

const { MONGO_URI, PORT = 3000, CORS_ORIGIN } = process.env;

if (!MONGO_URI) {
  console.error("MONGO_URI is not set. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

const app = express();
app.use(cors(CORS_ORIGIN ? { origin: CORS_ORIGIN } : undefined));
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => res.json({ ok: mongoose.connection.readyState === 1 }));
app.use("/api/records", recordRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Could not connect to the database. Exiting now...", err.message);
    process.exit(1);
  });
