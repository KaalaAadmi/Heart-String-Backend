import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;
const api = process.env.API_URI;


const connect = () => {
    mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));
};

app.use(cors());
app.use(express.json());
app.get(`${api}/hello`, (req, res) => {
  console.log("hello");
  res
    .status(200)
    .send({ message: "Hello User!\nHow are you? Welcome to my API!" });
});
app.use(`${api}/auth`, authRoute);

connect();
app.listen(port, () => {
  console.log("Listening on port: " + port);
});
