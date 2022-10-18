import express from "express";
import {
  getCurrentUser,
  signUp,
  signUpValidator,
} from "./../controllers/user-controller";

const router = express.Router();

router.get("/currentuser", getCurrentUser);
router.post("/signup", signUpValidator, signUp);

export { router as userRouter };
