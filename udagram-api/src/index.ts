import cors from "cors";
import express from "express";
import { IndexRouter } from "./controllers/v0/index.router";
import bodyParser from "body-parser";
import dbConnect from "./database";

import dotenv from "dotenv";

dotenv.config();

dbConnect();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use("/api/v0/", IndexRouter);

// Root URI call
app.get("/", async (req, res) => {
  res.send("/api/v0/");
});

// Start the Server
app.listen(port, () => {
  console.log(`server running ${port}`);
  console.log(`press CTRL+C to stop server`);
});
