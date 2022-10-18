import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error.";
import { RequestValidationError } from "../errors/request-validation-err";
import { User } from "../models/user-schema";

const getCurrentUser = async (req: any, res: any) => {
  res.send("Hello world form controller!!");
};

const signUp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

  const { email, password } = req.body;
  const exitingUser = await User.findOne({ email });
  if (exitingUser) {
    console.log("Email in Use");
    throw new BadRequestError("Email is already registered");
  }

  const user = User.build({ email, password });
  await user.save();
  res.status(200).json(user);
};

const signUpValidator = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Enter a valid password"),
];
export { getCurrentUser, signUpValidator, signUp };
