import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-err";

const getCurrentUser = async (req: any, res: any) => {
  res.send("Hello world form controller!!");
};

const signUp = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
  console.log("inside sign up");
  res.status(200).json({
    status: "SUCCESS",
  });
};

const signUpValidator = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 8, max: 20 })
    .withMessage("Enter a valid password"),
];
export { getCurrentUser, signUpValidator, signUp };
