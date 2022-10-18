import express, { json } from "express";
import "express-async-errors";
import mongoose from "mongoose";

import { NotFoundError } from "./errors/not-found-err";
import { errorHandler } from "./midddlewares/error-handler";
import { userRouter } from "./routes/user-router";

const app = express();
app.use(json());

app.use("/api/users", userRouter);
app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

const server = app.listen(3000, () => {
  console.log("app running on port 3000");
});

mongoose.connect("mongodb://auth-mongo-srv:27017/auth", () => {
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
  console.log("DB connection successfull");
});
